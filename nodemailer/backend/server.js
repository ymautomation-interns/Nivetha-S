require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------- Multer setup (handles the uploaded attachment) ----------
// Files are temporarily stored in /uploads, then deleted after the email is sent.
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    // Keep original name but prefix with timestamp to avoid collisions
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15 MB limit — adjust as needed
});

// ---------- Nodemailer transporter ----------
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify connection on startup (helpful for catching bad credentials early)
transporter.verify((error) => {
  if (error) {
    console.error('Nodemailer transporter error:', error.message);
  } else {
    console.log('Nodemailer is ready to send emails');
  }
});

// ---------- Routes ----------

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Send email (with optional single attachment)
// Expects multipart/form-data: to, subject, message, attachment (file, optional)
app.post('/api/send-email', upload.single('attachment'), async (req, res) => {
  const { to, subject, message } = req.body;
  const file = req.file;

  // Basic validation
  if (!to || !subject || !message) {
    if (file) fs.unlink(file.path, () => {});
    return res.status(400).json({
      success: false,
      error: 'Fields "to", "subject", and "message" are all required.',
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(to)) {
    if (file) fs.unlink(file.path, () => {});
    return res.status(400).json({ success: false, error: 'Invalid recipient email address.' });
  }

  const mailOptions = {
    from: `"Email Sender App" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text: message,
    html: `<p>${message.replace(/\n/g, '<br>')}</p>`,
  };

  // Attach the file if one was uploaded
  if (file) {
    mailOptions.attachments = [
      {
        filename: file.originalname,
        path: file.path,
      },
    ];
  }

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    res.json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error('Error sending email:', error.message);
    res.status(500).json({ success: false, error: error.message });
  } finally {
    // Clean up the uploaded file from disk regardless of success/failure
    if (file) {
      fs.unlink(file.path, (err) => {
        if (err) console.error('Failed to delete temp file:', err.message);
      });
    }
  }
});

// Multer error handler (e.g. file too large)
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ success: false, error: err.message });
  }
  if (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
  next();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
