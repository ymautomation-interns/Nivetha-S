import RichEmailComposer from './components/RichEmailComposer';
import './App.css';

function App() {
  const handleSend = ({ to, subject, html, text }) => {
    console.log('📧 Email Sent!');
    console.log('To:', to);
    console.log('Subject:', subject);
    console.log('HTML:', html);
    console.log('Text:', text);
    alert(`Email sent to ${to}!\n\nSubject: ${subject}\n\nBody preview:\n${text.substring(0, 200)}...`);
  };

  return (
    <div className="app-wrapper">
      <main className="app-main">
        <RichEmailComposer
          onSend={handleSend}
          placeholder="Start composing your beautiful email…"
        />
      </main>
    </div>
  );
}

export default App;
