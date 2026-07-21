import React, { useState, useRef } from 'react';
import './App.css';

const API_URL = 'http://localhost:5000/api/send-email';
const MAX_FILE_SIZE_MB = 15;

function App() {
  const [formData, setFormData] = useState({
    to: '',
    subject: '',
    message: '',
  });
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState({ type: '', text: '' }); // type: 'success' | 'error' | ''
  const [isSending, setIsSending] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    if (selected.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setStatus({ type: 'error', text: `File is too large. Max size is ${MAX_FILE_SIZE_MB}MB.` });
      e.target.value = '';
      setFile(null);
      return;
    }

    setStatus({ type: '', text: '' });
    setFile(selected);
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const resetForm = () => {
    setFormData({ to: '', subject: '', message: '' });
    removeFile();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', text: '' });

    if (!formData.to || !formData.subject || !formData.message) {
      setStatus({ type: 'error', text: 'Please fill in all fields.' });
      return;
    }

    setIsSending(true);

    try {
      const data = new FormData();
      data.append('to', formData.to);
      data.append('subject', formData.subject);
      data.append('message', formData.message);
      if (file) {
        data.append('attachment', file);
      }

      const response = await fetch(API_URL, {
        method: 'POST',
        body: data,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus({ type: 'success', text: 'Email sent successfully!' });
        resetForm();
      } else {
        setStatus({ type: 'error', text: result.error || 'Failed to send email.' });
      }
    } catch (err) {
      setStatus({
        type: 'error',
        text: 'Could not reach the server. Make sure the backend is running on port 5000.',
      });
    } finally {
      setIsSending(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="page">
      <div className="card">
        <h1>Send an Email</h1>
        <p className="subtitle">Compose a message and attach a file.</p>

        <form onSubmit={handleSubmit} className="form">
          <div className="field">
            <label htmlFor="to">Recipient Email</label>
            <input
              type="email"
              id="to"
              name="to"
              placeholder="someone@example.com"
              value={formData.to}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="Subject line"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="6"
              placeholder="Write your message here..."
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label>Attachment (optional)</label>

            {!file ? (
              <label className="file-drop" htmlFor="attachment">
                <span className="file-drop-icon">📎</span>
                <span>Click to select a file</span>
                <span className="file-drop-hint">Max {MAX_FILE_SIZE_MB}MB</span>
              </label>
            ) : (
              <div className="file-preview">
                <div className="file-info">
                  <span className="file-icon">📄</span>
                  <div>
                    <div className="file-name">{file.name}</div>
                    <div className="file-size">{formatFileSize(file.size)}</div>
                  </div>
                </div>
                <button type="button" className="remove-file-btn" onClick={removeFile}>
                  ✕
                </button>
              </div>
            )}

            <input
              type="file"
              id="attachment"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>

          {status.text && (
            <div className={`status-message ${status.type}`}>{status.text}</div>
          )}

          <button type="submit" className="submit-btn" disabled={isSending}>
            {isSending ? 'Sending...' : 'Send Email'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
