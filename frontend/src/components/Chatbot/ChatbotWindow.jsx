import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Hook for internal routing
import { X, Send, Paperclip, Stethoscope, AlertCircle, Calendar, CheckCircle2, Info } from "lucide-react";

const ChatbotWindow = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I'm DocBuddy. Describe your symptoms or upload a lab report.", isInitial: true }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  
  // Initialize the navigate hook
  const navigate = useNavigate();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const currentInput = input.trim();
    setMessages(prev => [...prev, { sender: "user", text: currentInput }]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("http://localhost:5001/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms: currentInput })
      });
      const result = await res.json();
      setIsTyping(false);

      if (result.success) {
        const { doctor, confidence, note, is_emergency } = result.data;
        setMessages(prev => [...prev, { 
          sender: "bot", 
          text: is_emergency ? "🚨 EMERGENCY ALERT" : "Analysis complete.",
          doctor, 
          note, 
          confidence, 
          isEmergency: is_emergency 
        }]);
      }
    } catch (err) {
      setIsTyping(false);
      setMessages(prev => [...prev, { sender: "bot", text: "AI server is offline." }]);
    }
  };

 const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  setMessages(prev => [...prev, { sender: "user", text: `Scanning: ${file.name}` }]);
  setIsTyping(true);

  const formData = new FormData();
  // MUST match upload.single("report") in your routes
  formData.append('report', file); 

  try {
    // Points to your Node.js backend
    const res = await fetch("http://localhost:4000/api/report/analyze-report", { 
      method: "POST", 
      body: formData 
    });
    
    const result = await res.json();
    setIsTyping(false);

    if (result.success && result.data) {
      setMessages(prev => [...prev, { 
        sender: "bot", 
        text: "Report scan complete.",
        doctor: result.data.doctor, 
        note: result.data.note, 
        confidence: 1.0 
      }]);
    } else {
      setMessages(prev => [...prev, { sender: "bot", text: "Could not analyze the report format." }]);
    }
  } catch (err) {
    setIsTyping(false);
    setMessages(prev => [...prev, { sender: "bot", text: "Server connection error." }]);
  }
};

  return (
    <div className="fixed bottom-24 right-6 w-92 h-140 bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.2)] z-50 flex flex-col border border-slate-100 overflow-hidden animate-in fade-in zoom-in duration-300">
      
      {/* Header */}
      <div className="bg-blue-600 p-5 text-white flex justify-between items-center shadow-md">
        <div className="flex items-center gap-3">
          <Stethoscope size={22} />
          <div>
            <span className="font-bold text-sm block">DocBuddy AI</span>
            <span className="text-[10px] text-blue-100 opacity-80 uppercase font-bold tracking-widest">Smart Triage</span>
          </div>
        </div>
        <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-full"><X size={20} /></button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-[13px] shadow-sm ${
              msg.sender === "user" ? "bg-blue-600 text-white rounded-tr-none" : "bg-white border text-slate-700 rounded-tl-none"
            }`}>
              <p>{msg.text}</p>
              
              {msg.doctor && (
                <div className={`mt-4 border rounded-2xl p-4 bg-white ${msg.isEmergency ? "border-red-200" : "border-blue-50"}`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-[10px] font-bold uppercase ${msg.isEmergency ? "text-red-600" : "text-blue-600"}`}>Recommendation</span>
                    {msg.confidence > 0.8 && <CheckCircle2 size={14} className="text-green-500" />}
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600"><Stethoscope size={20} /></div>
                    <span className="font-bold text-slate-800">{msg.doctor}</span>
                  </div>
                  {msg.note && (
                    <div className="text-[11px] p-2 bg-slate-50 rounded-lg mb-3 flex gap-2 text-slate-600">
                      <Info size={14} className="shrink-0" /> {msg.note}
                    </div>
                  )}
                  
                  {/* CORRECTED NAVIGATION BUTTON */}
                  <button 
                    onClick={() => {
                      // Navigates to /doctors/Cardiologist or /doctors/ENT%20Doctor
                      navigate(`/doctors/${encodeURIComponent(msg.doctor)}`);
                      window.scrollTo(0, 0); // Scroll to top to see the list
                    }} 
                    className="w-full bg-slate-900 text-white py-2 rounded-xl text-[11px] font-bold hover:bg-blue-600 transition-all flex justify-center gap-2 items-center cursor-pointer"
                  >
                    <Calendar size={14} /> Find {msg.doctor}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        {isTyping && <div className="text-[11px] text-blue-500 animate-pulse font-medium">DocBuddy is thinking...</div>}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Section */}
      <div className="p-4 bg-white border-t border-slate-100">
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl px-3 py-1">
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
          <button onClick={() => fileInputRef.current.click()} className="p-2 text-slate-400 hover:text-blue-600 cursor-pointer"><Paperclip size={20} /></button>
          <input type="text" className="flex-1 bg-transparent border-none text-[13px] py-2 focus:outline-none" 
            placeholder="Type symptoms..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendMessage()} />
          <button onClick={sendMessage} disabled={!input.trim()} className="p-2 bg-blue-600 text-white rounded-xl disabled:bg-slate-300"><Send size={18} /></button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotWindow;


