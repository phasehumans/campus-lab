import React, { useState, useEffect } from 'react';
import { Card, Button, Badge } from '../components/ui';
import { JOB_OPENINGS } from '../services/mockData';
import { Mic, MicOff, MessageSquare, Sparkles, ChevronRight, ArrowUpRight, Code2, Database, Layout, BrainCircuit, X, Volume2, StopCircle } from 'lucide-react';

const Interview: React.FC = () => {
  const [activeSession, setActiveSession] = useState<string | null>(null);
  const [micOn, setMicOn] = useState(true);
  const [audioLevel, setAudioLevel] = useState(0);
  const [messages, setMessages] = useState<{sender: 'ai'|'user', text: string}[]>([
    { sender: 'ai', text: "Hello! I'm your AI interviewer. Let's start with an introduction. Tell me about a challenging project you've worked on recently." }
  ]);

  // Simulate audio visualization
  useEffect(() => {
    if (activeSession && micOn) {
      const interval = setInterval(() => {
        setAudioLevel(Math.random() * 100);
      }, 100);
      return () => clearInterval(interval);
    }
    setAudioLevel(0);
  }, [activeSession, micOn]);

  const startSession = (role: string) => {
    setActiveSession(role);
    setMessages([{ sender: 'ai', text: `Welcome to the ${role} interview simulation. I'll be assessing your technical knowledge and communication skills. Shall we begin?` }]);
  };

  const jobRoles = [
    { id: 'frontend', title: 'Frontend Developer', icon: Layout, color: 'bg-blue-50 text-blue-600', questions: '50+', difficulty: 'Medium' },
    { id: 'backend', title: 'Backend Developer', icon: Database, color: 'bg-emerald-50 text-emerald-600', questions: '60+', difficulty: 'Hard' },
    { id: 'fullstack', title: 'Full Stack Engineer', icon: Code2, color: 'bg-purple-50 text-purple-600', questions: '80+', difficulty: 'Hard' },
    { id: 'data', title: 'Data Scientist', icon: BrainCircuit, color: 'bg-orange-50 text-orange-600', questions: '40+', difficulty: 'Very Hard' },
  ];

  if (!activeSession) {
    return (
      <div className="space-y-8 animate-fade-in pb-12">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-brand-600 to-brand-700 rounded-3xl p-8 md:p-12 text-white overflow-hidden shadow-2xl shadow-brand-900/10">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-xl space-y-6">
               <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-sm font-medium text-brand-50">
                  <Sparkles size={14} className="text-yellow-300" /> 
                  <span>AI-Powered Prep Suite</span>
               </div>
               <div>
                 <h1 className="text-4xl md:text-5xl font-display font-bold leading-tight mb-4">
                   Master Your Next <br/>
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-brand-100">Interview</span>
                 </h1>
                 <p className="text-brand-50 text-lg leading-relaxed opacity-90">
                   Practice with our advanced AI that adapts to your responses. Get real-time feedback on code quality, system design, and soft skills.
                 </p>
               </div>
               <div className="flex gap-4 pt-2">
                 <Button className="bg-white text-brand-600 hover:bg-brand-50 border-none px-8 py-3 h-auto text-base font-bold shadow-xl shadow-black/5">
                   Start Practice
                 </Button>
                 <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-3 h-auto text-base">
                   View Analytics
                 </Button>
               </div>
            </div>

            {/* Visual Element */}
            <div className="relative hidden md:block">
               <div className="w-72 h-80 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 flex flex-col justify-between shadow-2xl rotate-3 transform transition-transform hover:rotate-0 duration-500">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white shadow-lg">
                        <MessageSquare size={20} />
                      </div>
                      <div>
                        <div className="text-sm font-bold">AI Interviewer</div>
                        <div className="text-xs text-emerald-200">Online</div>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 bg-white/5 rounded-lg rounded-tl-none border border-white/5 text-xs text-white/80 leading-relaxed">
                      Could you explain the difference between TCP and UDP?
                    </div>
                    <div className="p-3 bg-brand-500/80 rounded-lg rounded-br-none text-xs text-white shadow-lg leading-relaxed ml-auto max-w-[90%]">
                      TCP is connection-oriented and reliable, whereas UDP is connectionless and faster but less reliable.
                    </div>
                  </div>
                  <div className="flex justify-center gap-1 pt-2">
                     {[...Array(5)].map((_, i) => (
                       <div key={i} className="w-1 bg-white/40 rounded-full animate-pulse" style={{ height: 12 + Math.random() * 20, animationDelay: `${i * 0.1}s` }}></div>
                     ))}
                  </div>
               </div>
               {/* Decorative background blobs */}
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
               <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           {/* Left: Role Selection */}
           <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900 font-display">Practice by Role</h2>
                <button className="text-sm text-brand-600 font-medium hover:underline">View All Roles</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                 {jobRoles.map((role) => (
                   <button 
                     key={role.id}
                     onClick={() => startSession(role.title)}
                     className="group text-left bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.06)] hover:border-brand-100 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                   >
                      <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-4 group-hover:translate-x-0 duration-300">
                        <div className="w-8 h-8 rounded-full bg-brand-50 flex items-center justify-center text-brand-600">
                           <ArrowUpRight size={16} />
                        </div>
                      </div>

                      <div className="flex items-start gap-4 mb-4">
                         <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm ${role.color}`}>
                            <role.icon size={26} />
                         </div>
                         <div>
                            <h3 className="font-bold text-lg text-slate-900 group-hover:text-brand-600 transition-colors">{role.title}</h3>
                            <div className="flex items-center gap-2 mt-1">
                               <Badge type="neutral">{role.difficulty}</Badge>
                               <span className="text-xs text-slate-400">•</span>
                               <span className="text-xs text-slate-500">{role.questions} Questions</span>
                            </div>
                         </div>
                      </div>
                      
                      <div className="w-full bg-slate-50 h-1.5 rounded-full overflow-hidden mt-2">
                         <div className="h-full bg-slate-200 group-hover:bg-brand-500 transition-colors w-2/3 rounded-full"></div>
                      </div>
                      <p className="text-xs text-slate-400 mt-2 font-medium">65% of students practice this</p>
                   </button>
                 ))}
              </div>

              {/* Tips Section */}
              <div className="bg-slate-900 rounded-2xl p-6 text-white flex items-center justify-between shadow-lg">
                 <div>
                    <h3 className="font-bold text-lg mb-1">Weekly Tip</h3>
                    <p className="text-slate-400 text-sm">Structure your answers using the STAR method (Situation, Task, Action, Result).</p>
                 </div>
                 <div className="hidden md:block w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/10">
                    <Sparkles size={20} className="text-yellow-400" />
                 </div>
              </div>
           </div>

           {/* Right: Job Openings */}
           <div className="lg:col-span-4 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900 font-display">Live Drives</h2>
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
              </div>
              
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                 <div className="divide-y divide-slate-50">
                    {JOB_OPENINGS.map((job) => (
                      <div key={job.id} className="p-5 hover:bg-slate-50 transition-colors group cursor-pointer relative">
                         <div className="flex justify-between items-start mb-3">
                            <div className="flex gap-4">
                               <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-lg font-bold text-slate-600 shadow-inner">
                                 {job.company.charAt(0)}
                               </div>
                               <div>
                                  <h4 className="font-bold text-slate-900 text-sm leading-tight group-hover:text-brand-600 transition-colors">{job.role}</h4>
                                  <p className="text-xs text-slate-500 mt-1 font-medium">{job.company}</p>
                               </div>
                            </div>
                         </div>
                         <div className="flex items-center gap-2 mb-3">
                            <Badge type={job.type === 'Internship' ? 'info' : 'success'}>{job.type}</Badge>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50 px-2 py-1 rounded">{job.location}</span>
                         </div>
                         <div className="flex items-center justify-between pt-2 border-t border-slate-50/50">
                            <span className="text-xs font-bold text-slate-700">{job.stipend}</span>
                            <span className="text-[10px] text-red-500 font-bold bg-red-50 px-2 py-0.5 rounded-full">Ends {job.deadline}</span>
                         </div>
                      </div>
                    ))}
                 </div>
                 <div className="p-4 bg-slate-50/50 text-center border-t border-slate-100">
                    <button className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center justify-center gap-1 mx-auto transition-colors">
                       View All Openings <ArrowUpRight size={12}/>
                    </button>
                 </div>
              </div>
           </div>
        </div>
      </div>
    );
  }

  // ACTIVE INTERVIEW SESSION UI
  return (
    <div className="h-[calc(100vh-140px)] flex gap-6 animate-fade-in pb-6">
       {/* Main Stage */}
       <div className="flex-1 flex flex-col gap-4 relative">
          {/* Header */}
          <div className="flex items-center justify-between bg-white px-6 py-3 rounded-xl border border-slate-100 shadow-sm">
             <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                <h2 className="font-bold text-slate-800 text-sm">Mock Interview: {activeSession}</h2>
             </div>
             <div className="flex items-center gap-3">
               <div className="text-xs font-mono text-slate-400 bg-slate-50 px-2 py-1 rounded">00:12:45</div>
               <button onClick={() => setActiveSession(null)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors">
                  <X size={18} />
               </button>
             </div>
          </div>

          {/* Video Area */}
          <div className="flex-1 bg-slate-900 rounded-2xl relative overflow-hidden shadow-2xl flex flex-col items-center justify-center group">
             
             {/* Abstract Background */}
             <div className="absolute inset-0 bg-gradient-to-b from-slate-800 to-slate-950"></div>
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

             {/* AI Avatar */}
             <div className="relative z-10 text-center space-y-8">
               <div className="relative mx-auto">
                 {/* Ripple Effect */}
                 <div className="absolute inset-0 bg-brand-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                 <div className="w-40 h-40 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full mx-auto flex items-center justify-center shadow-2xl border border-slate-600 relative z-10">
                   <BrainCircuit size={64} className="text-brand-400" />
                 </div>
                 
                 {/* Audio Visualizer Ring */}
                 <div className="absolute inset-0 -m-4 border-2 border-brand-500/30 rounded-full animate-spin-slow" style={{ animationDuration: '10s' }}></div>
                 <div className="absolute inset-0 -m-8 border border-brand-500/10 rounded-full animate-reverse-spin" style={{ animationDuration: '15s' }}></div>
               </div>
               
               <div className="space-y-2">
                 <h3 className="text-white font-display font-bold text-2xl tracking-tight">AI Interviewer</h3>
                 <div className="flex items-center justify-center gap-2">
                   <div className="flex items-end gap-1 h-6">
                      {[1,2,3,4,5].map(i => (
                        <div key={i} className="w-1 bg-brand-400 rounded-full transition-all duration-75" style={{ height: Math.max(4, Math.random() * 24) + 'px' }}></div>
                      ))}
                   </div>
                   <span className="text-brand-200 text-sm font-medium">Speaking...</span>
                 </div>
               </div>
             </div>

             {/* User Camera Preview (PiP) */}
             <div className="absolute bottom-6 right-6 w-48 h-36 bg-slate-800 rounded-xl border-2 border-slate-700/50 overflow-hidden shadow-2xl">
                <img src="https://picsum.photos/300/200" alt="You" className="w-full h-full object-cover opacity-80" />
                <div className="absolute bottom-2 left-2 flex gap-1">
                   {!micOn && <div className="p-1 bg-red-500 rounded text-white"><MicOff size={10} /></div>}
                </div>
             </div>

             {/* Controls */}
             <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-slate-800/90 backdrop-blur-xl p-2 rounded-2xl border border-white/10 shadow-xl transition-transform translate-y-2 group-hover:translate-y-0">
                <button 
                  onClick={() => setMicOn(!micOn)}
                  className={`p-3.5 rounded-xl transition-all ${micOn ? 'bg-slate-700 text-white hover:bg-slate-600' : 'bg-red-500 text-white hover:bg-red-600'}`}
                >
                  {micOn ? <Mic size={20} /> : <MicOff size={20} />}
                </button>
                <button className="p-3.5 bg-slate-700 text-white hover:bg-slate-600 rounded-xl transition-all">
                   <Volume2 size={20} />
                </button>
                <div className="w-px h-8 bg-white/10 mx-1"></div>
                <Button variant="danger" className="h-12 px-6 rounded-xl font-bold bg-red-500 hover:bg-red-600 border-none flex items-center gap-2" onClick={() => setActiveSession(null)}>
                  <StopCircle size={18} /> End Session
                </Button>
             </div>
          </div>
       </div>

       {/* Transcript / Chat Panel */}
       <div className="w-96 flex flex-col bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <h3 className="font-bold text-slate-800 text-sm">Live Transcript</h3>
            <button className="text-slate-400 hover:text-slate-600"><SettingsIcon size={16} /></button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50/30">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold shadow-sm ${msg.sender === 'ai' ? 'bg-brand-500' : 'bg-slate-700'}`}>
                   {msg.sender === 'ai' ? 'AI' : 'ME'}
                </div>
                <div className={`max-w-[85%] space-y-1 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                   <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm border ${
                     msg.sender === 'user' 
                       ? 'bg-white text-slate-800 rounded-tr-none border-slate-100' 
                       : 'bg-white text-slate-800 rounded-tl-none border-brand-100'
                   }`}>
                     {msg.text}
                   </div>
                   <span className="text-[10px] text-slate-400 px-1">{msg.sender === 'ai' ? '10:42 AM' : '10:43 AM'}</span>
                </div>
              </div>
            ))}
            {/* Typing Indicator */}
            {messages[messages.length-1].sender === 'user' && (
               <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center flex-shrink-0 text-white text-xs font-bold shadow-sm">AI</div>
                  <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none border border-brand-100 shadow-sm flex gap-1 items-center h-10">
                     <span className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-bounce"></span>
                     <span className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                     <span className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  </div>
               </div>
            )}
          </div>

          <div className="p-4 border-t border-slate-100 bg-white">
             <div className="relative">
               <input 
                 type="text" 
                 placeholder="Type to reply manually..." 
                 className="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm bg-slate-50 focus:bg-white transition-all shadow-inner"
                 onKeyDown={(e) => {
                   if (e.key === 'Enter') {
                     const val = e.currentTarget.value;
                     if(!val.trim()) return;
                     setMessages([...messages, { sender: 'user', text: val }]);
                     e.currentTarget.value = '';
                     setTimeout(() => {
                        setMessages(prev => [...prev, { sender: 'ai', text: "Interesting perspective. Could you elaborate on how you'd handle scalability in that scenario?" }]);
                     }, 2000);
                   }
                 }}
               />
               <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors shadow-sm">
                  <ChevronRight size={16} />
               </button>
             </div>
          </div>
       </div>
    </div>
  );
};

const SettingsIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
);

export default Interview;