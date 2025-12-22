
import React, { useState, useEffect } from 'react';
import { Card, Button, Badge, useToast } from '../components/ui';
import { GameState, WarRoomUser } from '../types';
import { ACTIVE_WARS } from '../services/mockData';
import { Users, Copy, Play, Swords, CheckCircle2, Clock, Plus, LogIn, ArrowRight, Eye, User } from 'lucide-react';

const WarRoom: React.FC = () => {
  const { addToast } = useToast();
  const [gameState, setGameState] = useState<GameState>(GameState.MENU);
  const [roomCode, setRoomCode] = useState('X9K2P1');
  const [inputCode, setInputCode] = useState('');
  const [users, setUsers] = useState<WarRoomUser[]>([
    { id: '1', name: 'You', avatar: 'https://picsum.photos/seed/1/50', status: 'Ready', progress: 0 },
  ]);
  const [timeLeft, setTimeLeft] = useState(600); // 10 mins

  // Simulate users joining in Lobby
  useEffect(() => {
    if (gameState === GameState.LOBBY && users.length < 5) {
      const timer = setTimeout(() => {
        const newUsers: WarRoomUser[] = [
          { id: '2', name: 'CoderX', avatar: 'https://picsum.photos/seed/2/50', status: 'Ready', progress: 0 },
          { id: '3', name: 'ByteMaster', avatar: 'https://picsum.photos/seed/3/50', status: 'Waiting', progress: 0 },
          { id: '4', name: 'JavaGirl', avatar: 'https://picsum.photos/seed/4/50', status: 'Ready', progress: 0 },
        ];
        if (users.length === 1) {
            setUsers([...users, newUsers[0]]);
            addToast('CoderX joined the room', 'info');
        }
        else if (users.length === 2) setUsers([...users, newUsers[1]]);
        else if (users.length === 3) setUsers([...users, newUsers[2]]);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [users, gameState, addToast]);

  // Simulate game progress
  useEffect(() => {
    if (gameState === GameState.PLAYING) {
      const interval = setInterval(() => {
        setTimeLeft(t => t - 1);
        setUsers(prevUsers => prevUsers.map(u => {
          if (u.id === '1') return u; 
          if (u.progress >= 100) return u;
          return { ...u, progress: Math.min(100, u.progress + Math.random() * 5) };
        }));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameState]);

  const handleStart = () => {
    setGameState(GameState.PLAYING);
    addToast('War started! Good luck.', 'success');
  };

  const handleCreateRoom = () => {
    setUsers([{ id: '1', name: 'You', avatar: 'https://picsum.photos/seed/1/50', status: 'Ready', progress: 0 }]);
    setGameState(GameState.LOBBY);
    addToast('Room created successfully', 'success');
  };

  const handleJoinRoom = () => {
    if (inputCode.length === 6) {
       // Mock join
       setUsers([
         { id: '2', name: 'Host', avatar: 'https://picsum.photos/seed/host/50', status: 'Ready', progress: 0 },
         { id: '1', name: 'You', avatar: 'https://picsum.photos/seed/1/50', status: 'Ready', progress: 0 }
       ]);
       setRoomCode(inputCode);
       setGameState(GameState.LOBBY);
       addToast('Joined room successfully', 'success');
    }
  };

  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomCode);
    addToast('Room code copied to clipboard!', 'success');
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // MENU VIEW
  if (gameState === GameState.MENU) {
    return (
      <div className="space-y-8 animate-fade-in pb-12">
        <div className="text-center space-y-4 py-8">
           <div className="inline-flex items-center justify-center p-4 bg-brand-50 rounded-2xl mb-2 text-brand-600 shadow-sm shadow-brand-100">
             <Swords size={40} />
           </div>
           <h1 className="text-4xl font-display font-bold text-slate-900">Campus War Room</h1>
           <p className="text-lg text-slate-500 max-w-xl mx-auto">
             Challenge your batchmates to real-time DSA battles. Prove your skills and dominate the college leaderboard.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <button 
            onClick={handleCreateRoom}
            className="group relative overflow-hidden bg-white p-8 rounded-2xl border-2 border-slate-100 hover:border-brand-500 hover:shadow-xl hover:shadow-brand-500/10 transition-all text-left"
          >
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <Plus size={120} className="text-brand-500" />
             </div>
             <div className="relative z-10 space-y-4">
                <div className="w-14 h-14 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600 group-hover:scale-110 transition-transform">
                  <Plus size={28} />
                </div>
                <div>
                   <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-600 transition-colors">Create Room</h3>
                   <p className="text-slate-500 mt-1 text-sm leading-relaxed">Host a private contest. Set the topic, difficulty, and duration.</p>
                </div>
             </div>
          </button>

          <button 
            onClick={() => setGameState(GameState.JOIN)}
            className="group relative overflow-hidden bg-white p-8 rounded-2xl border-2 border-slate-100 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 transition-all text-left"
          >
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <LogIn size={120} className="text-blue-500" />
             </div>
             <div className="relative z-10 space-y-4">
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                  <LogIn size={28} />
                </div>
                <div>
                   <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Join Room</h3>
                   <p className="text-slate-500 mt-1 text-sm leading-relaxed">Enter a 6-digit code to join an existing lobby created by a friend.</p>
                </div>
             </div>
          </button>
        </div>

        {/* Active Wars List */}
        <div className="max-w-4xl mx-auto pt-8">
           <div className="flex items-center justify-between mb-4 px-2">
             <h3 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
               <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span> Live Battlegrounds
             </h3>
             <span className="text-xs text-slate-400 font-medium">Updating real-time...</span>
           </div>
           
           <div className="grid gap-4">
             {ACTIVE_WARS.map((war) => (
               <div key={war.id} className="bg-white border border-slate-200 p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center gap-4 w-full md:w-auto">
                     <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 border-2 border-white shadow-sm shrink-0">
                        <Swords size={20} />
                     </div>
                     <div>
                       <h4 className="font-bold text-slate-900">{war.topic} <span className="text-slate-300 font-light mx-1">|</span> <span className="text-slate-500 font-medium text-sm">{war.difficulty}</span></h4>
                       <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                          <span className="flex items-center gap-1"><User size={12} /> Host: {war.host}</span>
                          <span className="flex items-center gap-1"><Clock size={12} /> 10m</span>
                       </div>
                     </div>
                  </div>
                  
                  <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                     {/* Avatars */}
                     <div className="flex -space-x-3">
                        {war.participants.map((p) => (
                          <img key={p.id} src={p.avatar} alt={p.name} className="w-8 h-8 rounded-full border-2 border-white" title={p.name} />
                        ))}
                        {Array.from({ length: Math.max(0, war.maxParticipants - war.participants.length) }).map((_, i) => (
                           <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-200 bg-slate-50 flex items-center justify-center text-[10px] text-slate-400">?</div>
                        ))}
                     </div>
                     
                     <div className="flex flex-col items-end gap-1">
                        <Badge type={war.status === 'Lobby' ? 'success' : 'warning'}>{war.status}</Badge>
                        {war.status === 'Lobby' ? (
                           <button className="text-xs font-bold text-brand-600 hover:underline">Request to Join</button>
                        ) : (
                           <button className="text-xs font-bold text-slate-500 hover:text-brand-600 flex items-center gap-1"><Eye size={12}/> Spectate</button>
                        )}
                     </div>
                  </div>
               </div>
             ))}
           </div>
        </div>
      </div>
    );
  }

  // JOIN VIEW
  if (gameState === GameState.JOIN) {
    return (
      <div className="max-w-md mx-auto py-20 animate-fade-in-up">
        <Button variant="ghost" onClick={() => setGameState(GameState.MENU)} className="mb-6 pl-0 hover:bg-transparent hover:text-brand-600">
           ← Back to Menu
        </Button>
        <Card className="p-8 text-center space-y-6">
           <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto text-blue-600">
              <LogIn size={32} />
           </div>
           <div>
             <h2 className="text-2xl font-bold text-slate-900">Join a Room</h2>
             <p className="text-slate-500 text-sm mt-1">Enter the 6-character code shared by your host.</p>
           </div>
           
           <input 
             type="text"
             value={inputCode}
             onChange={(e) => setInputCode(e.target.value.toUpperCase())}
             maxLength={6}
             placeholder="X9K2P1"
             className="w-full text-center text-3xl font-mono font-bold tracking-[0.5em] py-4 border-b-2 border-slate-200 focus:border-brand-500 focus:outline-none bg-transparent placeholder:text-slate-200 transition-colors uppercase"
           />
           
           <Button onClick={handleJoinRoom} disabled={inputCode.length !== 6} className="w-full py-3">
             Enter Lobby
           </Button>
        </Card>
      </div>
    );
  }

  // LOBBY VIEW
  if (gameState === GameState.LOBBY) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 py-10 animate-fade-in-up">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setGameState(GameState.MENU)} className="pl-0 hover:bg-transparent hover:text-brand-600">
             ← Leave Lobby
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {/* Room Info */}
           <Card className="p-8 flex flex-col items-center justify-center space-y-6 text-center border-dashed border-2 border-slate-200 bg-slate-50/30">
              <div className="space-y-3 w-full">
                <p className="text-xs font-bold text-slate-400 tracking-widest uppercase">Room Code</p>
                <div className="flex items-center justify-between gap-3 bg-white border border-slate-200 px-6 py-4 rounded-xl shadow-sm w-full max-w-xs mx-auto">
                  <span className="text-3xl font-mono font-bold tracking-widest text-slate-800">{roomCode}</span>
                  <button onClick={copyRoomCode} className="text-slate-400 hover:text-brand-600 transition-colors"><Copy size={20} /></button>
                </div>
              </div>
              
              <div className="w-full pt-6 border-t border-slate-200">
                <h3 className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-4">Configuration</h3>
                <div className="flex justify-center gap-2 flex-wrap">
                  <Badge type="neutral">Medium</Badge>
                  <Badge type="neutral">Arrays</Badge>
                  <Badge type="neutral">10 min</Badge>
                  <Badge type="neutral">Ranked</Badge>
                </div>
              </div>
           </Card>

           {/* Players Lobby */}
           <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <Users size={18} /> Players ({users.length}/5)
                </h3>
              </div>
              <div className="space-y-3">
                {users.map(user => (
                  <div key={user.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-100 shadow-sm animate-slide-up">
                     <div className="flex items-center gap-3">
                       <img src={user.avatar} className="w-10 h-10 rounded-full border border-slate-100" alt={user.name}/>
                       <span className="font-medium text-slate-900">{user.name}</span>
                       {user.id === '1' && <Badge type="brand">You</Badge>}
                     </div>
                     <Badge type={user.status === 'Ready' ? 'success' : 'warning'}>{user.status}</Badge>
                  </div>
                ))}
                {[...Array(5 - users.length)].map((_, i) => (
                  <div key={i} className="flex items-center justify-center p-4 border-2 border-dashed border-slate-100 rounded-lg text-slate-400 text-sm bg-slate-50/50">
                    Waiting for player...
                  </div>
                ))}
              </div>
              <Button onClick={handleStart} className="w-full mt-6 py-3" disabled={users.length < 2}>
                 <Play size={16} className="mr-2" /> Start War
              </Button>
           </Card>
        </div>
      </div>
    );
  }

  // PLAYING VIEW (Game UI)
  return (
    <div className="h-[calc(100vh-140px)] flex flex-col animate-fade-in">
       {/* Game Header */}
       <div className="flex items-center justify-between bg-white border border-slate-200 p-4 rounded-xl mb-4 shadow-sm">
         <div className="flex items-center gap-4">
           <div className="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg font-mono font-bold text-sm flex items-center gap-2 animate-pulse">
             <span className="w-2 h-2 bg-red-600 rounded-full"></span> LIVE
           </div>
           <div>
              <h2 className="font-bold text-slate-800">Problem: Two Sum</h2>
              <p className="text-xs text-slate-500">Easy • Arrays</p>
           </div>
         </div>
         <div className="flex items-center gap-2 text-2xl font-mono font-bold text-slate-900 tabular-nums bg-slate-100 px-4 py-1 rounded-lg">
           <Clock size={20} className="text-slate-400" />
           {formatTime(timeLeft)}
         </div>
         <Button variant="outline" className="text-red-600 hover:bg-red-50 hover:border-red-200 hover:text-red-700" onClick={() => setGameState(GameState.MENU)}>Surrender</Button>
       </div>

       <div className="flex flex-1 gap-4 min-h-0">
          {/* Main Coding Area */}
          <div className="flex-1 flex flex-col gap-4">
            <Card className="flex-1 p-0 font-mono text-sm relative overflow-hidden flex flex-col">
               <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 text-xs text-slate-500 font-sans">
                  main.cpp
               </div>
               <textarea 
                  className="flex-1 w-full p-4 resize-none focus:outline-none text-slate-800 leading-relaxed"
                  value="// Write your solution here...
#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Start coding...
        
    }
};"
                  readOnly
               />
               <div className="p-4 border-t border-slate-100 bg-white flex justify-end">
                 <Button>Submit Solution</Button>
               </div>
            </Card>
          </div>

          {/* Opponent Progress Sidebar */}
          <Card className="w-72 p-5 flex flex-col gap-4 bg-white border-slate-200 h-full">
             <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-2">Live Standings</h3>
             <div className="space-y-6">
               {users.map(user => (
                 <div key={user.id}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="font-medium text-slate-700">{user.name}</span>
                      <span className="text-slate-500 font-mono">{Math.round(user.progress)}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                       <div 
                         className={`h-2 rounded-full transition-all duration-1000 ${user.progress === 100 ? 'bg-emerald-500' : 'bg-brand-500'}`} 
                         style={{ width: `${user.progress}%` }}
                       ></div>
                    </div>
                    {user.progress === 100 && (
                      <div className="text-xs text-emerald-600 flex items-center gap-1 mt-1.5 font-bold animate-pulse">
                        <CheckCircle2 size={12} /> COMPLETED
                      </div>
                    )}
                 </div>
               ))}
             </div>
          </Card>
       </div>
    </div>
  );
};

export default WarRoom;
