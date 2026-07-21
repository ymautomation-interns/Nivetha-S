# Email Sender (React + Node/Express + Nodemailer)

A full-stack app to send emails with an optional file attachment.

```
email-sender/
├── backend/     Express + Nodemailer + Multer API
└── frontend/    React UI
```

## 1. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` and fill in your real email credentials:

```
EMAIL_USER=youraddress@gmail.com
EMAIL_PASS=your_16_char_app_password
EMAIL_SERVICE=gmail
PORT=5000
```

**Important — Gmail users:** you cannot use your normal Gmail password.
1. Enable 2-Step Verification on the Google account.
2. Go to https://myaccount.google.com/apppasswords
3. Generate an "App Password" and paste that 16-character code into `EMAIL_PASS`.

Using a different provider (Outlook, Yahoo, custom SMTP)? Replace the
`service: 'gmail'` line in `server.js` with `host`/`port`/`secure` options
for your provider's SMTP server.

Start the backend:

```bash
npm start
# or, for auto-reload during development:
npm run dev
```

Server runs at `http://localhost:5000`. Visit `http://localhost:5000/api/health`
to confirm it's up.

## 2. Frontend setup

In a separate terminal:

```bash
cd frontend
npm install
npm start
```

Opens at `http://localhost:3000`.

## 3. Using the app

1. Fill in recipient email, subject, and message.
2. Optionally click the attachment box to choose a file (max 15MB).
3. Click **Send Email**.
4. Success/error status shows below the form.

## How it works

- Frontend builds a `FormData` object (required for file uploads) and POSTs
  it to `POST /api/send-email` on the backend.
- Backend uses **Multer** to receive the uploaded file into a temporary
  `backend/uploads/` folder.
- **Nodemailer** sends the email via your configured SMTP account, attaching
  the uploaded file if present.
- The temp file is deleted from disk right after the send attempt
  (success or failure).

## Notes / things to adjust for production

- Add authentication in front of `/api/send-email` — right now anyone who
  can reach the backend can send email through your account.
- Move the file size limit / allowed file types (in `server.js`'s `multer`
  config) to match your needs.
- For production, don't run backend and frontend on different ports without
  a reverse proxy / CORS config matching your real domains.
