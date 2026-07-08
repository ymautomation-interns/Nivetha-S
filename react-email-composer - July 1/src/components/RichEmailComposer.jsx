import { useState, useRef, useCallback, useEffect } from 'react';
import './RichEmailComposer.css';


const icons = {
  bold: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
      <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
    </svg>
  ),
  italic: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="4" x2="10" y2="4" />
      <line x1="14" y1="20" x2="5" y2="20" />
      <line x1="15" y1="4" x2="9" y2="20" />
    </svg>
  ),
  underline: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3" />
      <line x1="4" y1="21" x2="20" y2="21" />
    </svg>
  ),
  strikethrough: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4H9a3 3 0 0 0-3 3c0 2.5 4 3.5 7 4" />
      <path d="M8 20h7a3 3 0 0 0 3-3c0-2.5-4-3.5-7-4" />
      <line x1="4" y1="12" x2="20" y2="12" />
    </svg>
  ),
  alignLeft: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="15" y2="12" />
      <line x1="3" y1="18" x2="18" y2="18" />
    </svg>
  ),
  alignCenter: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="6" y1="12" x2="18" y2="12" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  ),
  alignRight: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="9" y1="12" x2="21" y2="12" />
      <line x1="6" y1="18" x2="21" y2="18" />
    </svg>
  ),
  alignJustify: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  ),
  listOrdered: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="10" y1="6" x2="21" y2="6" />
      <line x1="10" y1="12" x2="21" y2="12" />
      <line x1="10" y1="18" x2="21" y2="18" />
      <path d="M4 6h1v4" />
      <path d="M4 10h2" />
      <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
    </svg>
  ),
  listUnordered: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="9" y1="6" x2="20" y2="6" />
      <line x1="9" y1="12" x2="20" y2="12" />
      <line x1="9" y1="18" x2="20" y2="18" />
      <circle cx="5" cy="6" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="5" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="5" cy="18" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  ),
  link: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  ),
  undo: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
    </svg>
  ),
  redo: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10" />
      <path d="M20.49 15a9 9 0 1 1-2.13-9.36L23 10" />
    </svg>
  ),
  send: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  ),
  attach: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  ),
  clear: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 7h16" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12" />
      <path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
    </svg>
  ),
  fontColor: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20h16" />
      <path d="M7 16l5-12 5 12" />
      <path d="M9.5 11.5h5" />
    </svg>
  ),
  highlight: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  ),
};


const COLOR_PALETTE = [
  '#1a1a2e', '#16213e', '#0f3460', '#533483', '#e94560',
  '#ff6b6b', '#ffa502', '#ffd93d', '#6bcb77', '#4d96ff',
  '#00b4d8', '#6c5ce7', '#a29bfe', '#fd79a8', '#e17055',
  '#2d3436', '#636e72', '#b2bec3', '#dfe6e9', '#ffffff',
];

const HIGHLIGHT_PALETTE = [
  '#fff176', '#aed581', '#4dd0e1', '#ba68c8', '#ff8a65',
  '#f48fb1', '#81d4fa', '#a5d6a7', '#ffcc80', '#ef9a9a',
];


function ToolbarButton({ icon, title, onClick, active, disabled, className = '' }) {
  return (
    <button
      className={`rec-toolbar-btn ${active ? 'active' : ''} ${className}`}
      title={title}
      onMouseDown={(e) => {
        e.preventDefault(); // prevent focus loss from editor
        onClick && onClick(e);
      }}
      disabled={disabled}
      type="button"
    >
      {icon}
    </button>
  );
}


function ColorPicker({ colors, onSelect, onClose, title }) {
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  return (
    <div className="rec-color-picker" ref={ref}>
      <div className="rec-color-picker-title">{title}</div>
      <div className="rec-color-picker-grid">
        {colors.map((color) => (
          <button
            key={color}
            className="rec-color-swatch"
            style={{ backgroundColor: color }}
            onMouseDown={(e) => {
              e.preventDefault();
              onSelect(color);
            }}
            title={color}
            type="button"
          />
        ))}
      </div>
    </div>
  );
}


export default function RichEmailComposer({
  placeholder = 'Compose your email…',
  onSend,
  initialTo = '',
  initialSubject = '',
  initialContent = '',
  className = '',
}) {
  const editorRef = useRef(null);
  const [to, setTo] = useState(initialTo);
  const [subject, setSubject] = useState(initialSubject);
  const [showFontColor, setShowFontColor] = useState(false);
  const [showHighlight, setShowHighlight] = useState(false);
  const [activeFormats, setActiveFormats] = useState({});
  const [charCount, setCharCount] = useState(0);
  const [isFocused, setIsFocused] = useState(false);


  const exec = useCallback((command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    updateActiveFormats();
  }, []);


  const updateActiveFormats = useCallback(() => {
    setActiveFormats({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
      strikeThrough: document.queryCommandState('strikeThrough'),
      justifyLeft: document.queryCommandState('justifyLeft'),
      justifyCenter: document.queryCommandState('justifyCenter'),
      justifyRight: document.queryCommandState('justifyRight'),
      justifyFull: document.queryCommandState('justifyFull'),
      insertOrderedList: document.queryCommandState('insertOrderedList'),
      insertUnorderedList: document.queryCommandState('insertUnorderedList'),
    });
  }, []);


  const updateCharCount = useCallback(() => {
    const text = editorRef.current?.innerText || '';
    setCharCount(text.trim().length);
  }, []);


  const handleInput = useCallback(() => {
    updateActiveFormats();
    updateCharCount();
  }, [updateActiveFormats, updateCharCount]);

  const handleKeyUp = useCallback(() => {
    updateActiveFormats();
  }, [updateActiveFormats]);

  const handleMouseUp = useCallback(() => {
    updateActiveFormats();
  }, [updateActiveFormats]);


  const insertLink = useCallback(() => {
    const url = prompt('Enter URL:');
    if (url) {
      exec('createLink', url);
    }
  }, [exec]);


  const clearFormatting = useCallback(() => {
    exec('removeFormat');
  }, [exec]);


  const handleFontSize = useCallback((e) => {
    exec('fontSize', e.target.value);
  }, [exec]);


  const handleSend = useCallback(() => {
    const html = editorRef.current?.innerHTML || '';
    const text = editorRef.current?.innerText || '';
    if (onSend) {
      onSend({ to, subject, html, text });
    }
  }, [to, subject, onSend]);


  const getHTML = useCallback(() => editorRef.current?.innerHTML || '', []);
  const getText = useCallback(() => editorRef.current?.innerText || '', []);


  useEffect(() => {
    if (initialContent && editorRef.current) {
      editorRef.current.innerHTML = initialContent;
      updateCharCount();
    }
  }, [initialContent, updateCharCount]);

  return (
    <div className={`rec-container ${className}`}>
      {/* ── Meta Fields ─────────────────────────────────────────────────────── */}
      <div className="rec-meta">
        <div className="rec-meta-row">
          <label className="rec-meta-label" htmlFor="rec-to">To</label>
          <input
            id="rec-to"
            className="rec-meta-input"
            type="email"
            placeholder="recipient@example.com"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>
        <div className="rec-meta-row">
          <label className="rec-meta-label" htmlFor="rec-subject">Subject</label>
          <input
            id="rec-subject"
            className="rec-meta-input"
            type="text"
            placeholder="Enter subject line…"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
      </div>

      {/* ── Toolbar ─────────────────────────────────────────────────────────── */}
      <div className="rec-toolbar">
        <div className="rec-toolbar-group">
          <ToolbarButton icon={icons.undo} title="Undo" onClick={() => exec('undo')} />
          <ToolbarButton icon={icons.redo} title="Redo" onClick={() => exec('redo')} />
        </div>

        <div className="rec-toolbar-divider" />

        <div className="rec-toolbar-group">
          <select
            className="rec-toolbar-select"
            onChange={handleFontSize}
            defaultValue="3"
            title="Font Size"
          >
            <option value="1">Small</option>
            <option value="2">Normal-</option>
            <option value="3">Normal</option>
            <option value="4">Medium</option>
            <option value="5">Large</option>
            <option value="6">X-Large</option>
            <option value="7">XX-Large</option>
          </select>
        </div>

        <div className="rec-toolbar-divider" />

        <div className="rec-toolbar-group">
          <ToolbarButton icon={icons.bold} title="Bold (Ctrl+B)" onClick={() => exec('bold')} active={activeFormats.bold} />
          <ToolbarButton icon={icons.italic} title="Italic (Ctrl+I)" onClick={() => exec('italic')} active={activeFormats.italic} />
          <ToolbarButton icon={icons.underline} title="Underline (Ctrl+U)" onClick={() => exec('underline')} active={activeFormats.underline} />
          <ToolbarButton icon={icons.strikethrough} title="Strikethrough" onClick={() => exec('strikeThrough')} active={activeFormats.strikeThrough} />
        </div>

        <div className="rec-toolbar-divider" />

        <div className="rec-toolbar-group" style={{ position: 'relative' }}>
          <ToolbarButton
            icon={icons.fontColor}
            title="Text Color"
            onClick={() => { setShowFontColor(!showFontColor); setShowHighlight(false); }}
            className="rec-color-btn"
          />
          {showFontColor && (
            <ColorPicker
              colors={COLOR_PALETTE}
              title="Text Color"
              onSelect={(color) => { exec('foreColor', color); setShowFontColor(false); }}
              onClose={() => setShowFontColor(false)}
            />
          )}
          <ToolbarButton
            icon={icons.highlight}
            title="Highlight Color"
            onClick={() => { setShowHighlight(!showHighlight); setShowFontColor(false); }}
            className="rec-highlight-btn"
          />
          {showHighlight && (
            <ColorPicker
              colors={HIGHLIGHT_PALETTE}
              title="Highlight"
              onSelect={(color) => { exec('hiliteColor', color); setShowHighlight(false); }}
              onClose={() => setShowHighlight(false)}
            />
          )}
        </div>

        <div className="rec-toolbar-divider" />

        <div className="rec-toolbar-group">
          <ToolbarButton icon={icons.alignLeft} title="Align Left" onClick={() => exec('justifyLeft')} active={activeFormats.justifyLeft} />
          <ToolbarButton icon={icons.alignCenter} title="Align Center" onClick={() => exec('justifyCenter')} active={activeFormats.justifyCenter} />
          <ToolbarButton icon={icons.alignRight} title="Align Right" onClick={() => exec('justifyRight')} active={activeFormats.justifyRight} />
          <ToolbarButton icon={icons.alignJustify} title="Justify" onClick={() => exec('justifyFull')} active={activeFormats.justifyFull} />
        </div>

        <div className="rec-toolbar-divider" />

        <div className="rec-toolbar-group">
          <ToolbarButton icon={icons.listOrdered} title="Ordered List" onClick={() => exec('insertOrderedList')} active={activeFormats.insertOrderedList} />
          <ToolbarButton icon={icons.listUnordered} title="Unordered List" onClick={() => exec('insertUnorderedList')} active={activeFormats.insertUnorderedList} />
        </div>

        <div className="rec-toolbar-divider" />

        <div className="rec-toolbar-group">
          <ToolbarButton icon={icons.link} title="Insert Link" onClick={insertLink} />
          <ToolbarButton icon={icons.clear} title="Clear Formatting" onClick={clearFormatting} />
        </div>
      </div>

      {/* ── Editor Area ─────────────────────────────────────────────────────── */}
      <div className={`rec-editor-wrapper ${isFocused ? 'focused' : ''}`}>
        <div
          ref={editorRef}
          className="rec-editor"
          contentEditable
          suppressContentEditableWarning
          data-placeholder={placeholder}
          onInput={handleInput}
          onKeyUp={handleKeyUp}
          onMouseUp={handleMouseUp}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          role="textbox"
          aria-multiline="true"
          aria-label="Email body"
        />
      </div>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <div className="rec-footer">
        <div className="rec-footer-left">
          <span className="rec-char-count">{charCount} characters</span>
        </div>
        <div className="rec-footer-right">
          <button className="rec-btn-attach" title="Attach File" type="button">
            {icons.attach}
            <span>Attach</span>
          </button>
          <button
            className="rec-btn-send"
            onClick={handleSend}
            disabled={!to.trim() || charCount === 0}
            title="Send Email"
            type="button"
          >
            {icons.send}
            <span>Send</span>
          </button>
        </div>
      </div>
    </div>
  );
}
