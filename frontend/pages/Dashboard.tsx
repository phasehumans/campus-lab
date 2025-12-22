
import React from 'react';
import { Card, Button, Badge } from '../components/ui';
import { PROBLEMS, CONTESTS } from '../services/mockData';
import { ArrowRight, Clock, CheckCircle2, MoreHorizontal, Calendar as CalendarIcon, Zap, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const contributionData = [
    [1, 2, 0, 4, 2, 1, 3],
    [2, 3, 1, 0, 2, 4, 2],
    [3, 1, 2, 3, 1, 0, 1]
  ];

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Welcome Section */}
      <div className="flex justify-between items-end">
        <div>
           <div className="text-sm font-medium text-brand-600 mb-1 flex items-center gap-1">
             <Zap size={14} fill="currentColor" /> Good Morning, Alex
           </div>
           <h1 className="text-3xl font-display font-bold text-slate-900">Ready to code today?</h1>
           <p className="text-slate-500 mt-1">You have 2 assignments pending from Data Structures.</p>
        </div>
        <div className="hidden md:block">
           <Button variant="outline" className="gap-2">
             <CalendarIcon size={16} /> View Academic Calendar
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Streak & Activity Card */}
        <Card className="col-span-1 md:col-span-2 relative overflow-hidden group">
          <div className="flex justify-between items-start mb-6">
             <div className="flex gap-4 items-center">
               <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-2xl">
                 🔥
               </div>
               <div>
                 <h3 className="font-bold text-slate-900">Daily Streak</h3>
                 <p className="text-sm text-slate-500">You're on a 14-day streak!</p>
               </div>
             </div>
             <Button variant="ghost" className="h-8 w-8 p-0 rounded-full"><MoreHorizontal size={18} /></Button>
          </div>
          
          <div className="space-y-2">
             <div className="flex justify-between text-xs text-slate-400 px-1">
                {weekDays.map((d, i) => <span key={i}>{d}</span>)}
             </div>
             <div className="grid grid-cols-7 gap-2">
               {contributionData[0].map((val, i) => (
                 <div 
                   key={i} 
                   className={`h-8 rounded-lg transition-all duration-300 hover:scale-105 ${
                     val === 0 ? 'bg-slate-100' : 
                     val < 2 ? 'bg-brand-200' : 
                     val < 4 ? 'bg-brand-400' : 'bg-brand-600'
                   }`}
                   title={`${val} submissions`}
                 ></div>
               ))}
             </div>
          </div>
        </Card>

        {/* Rank Card */}
        <Card className="flex flex-col justify-between bg-gradient-to-br from-slate-900 to-slate-800 text-white border-none shadow-xl">
           <div>
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 bg-white/10 backdrop-blur rounded-lg flex items-center justify-center text-xl">
                 🏆
              </div>
              <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded text-white">CSE Dept</span>
            </div>
            <h3 className="text-slate-300 font-medium mb-1">Class Rank</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold font-display">#12</span>
              <span className="text-slate-400 text-sm">/ 64</span>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="flex justify-between text-sm">
               <span className="text-slate-400">Rating</span>
               <span className="font-bold text-brand-300">1650</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recommended Problems */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
              📌 Picked for you
            </h2>
            <Link to="/practice" className="text-slate-500 text-sm hover:text-brand-600 transition-colors flex items-center gap-1">
              All Problems <ArrowRight size={14} />
            </Link>
          </div>
          
          <div className="grid gap-3">
            {PROBLEMS.slice(0, 3).map((problem, idx) => (
              <div key={problem.id} className="group bg-white border border-slate-100 p-4 rounded-xl hover:shadow-md hover:border-brand-100 transition-all duration-200 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                     problem.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-600' : 
                     problem.difficulty === 'Medium' ? 'bg-yellow-50 text-yellow-600' : 'bg-red-50 text-red-600'
                  }`}>
                    {problem.title.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 group-hover:text-brand-600 transition-colors">{problem.title}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-slate-400">{problem.topic}</span>
                      <span className="text-[10px] text-slate-300">•</span>
                      <span className="text-xs text-slate-400">Acceptance: {problem.acceptance}</span>
                    </div>
                  </div>
                </div>
                <Link to={`/practice/${problem.id}`}>
                  <Button variant="outline" className="h-9 px-4 text-xs group-hover:bg-brand-50 group-hover:text-brand-600 group-hover:border-brand-200">
                    Solve
                  </Button>
                </Link>
              </div>
            ))}
          </div>
          
          {/* New Feature Banner */}
          <div className="bg-brand-50 rounded-xl p-6 border border-brand-100 flex items-center justify-between">
             <div>
               <h3 className="font-bold text-brand-800">Mock Interviews are live!</h3>
               <p className="text-sm text-brand-600 mt-1">Practice with our new AI interviewer customized for placements.</p>
             </div>
             <Link to="/interview">
               <Button className="bg-brand-600 hover:bg-brand-700 text-white border-none">Try Now</Button>
             </Link>
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-6">
           
           {/* Daily Quote Widget */}
           <Card className="bg-slate-900 text-white border-none relative overflow-hidden">
             <Quote className="absolute top-4 right-4 text-white/10" size={60} />
             <div className="relative z-10">
               <div className="text-xs font-bold text-brand-300 uppercase tracking-widest mb-3">Daily Wisdom</div>
               <p className="text-lg font-display italic leading-relaxed text-slate-200 mb-4">
                 "Talk is cheap. Show me the code."
               </p>
               <div className="flex items-center gap-2 text-sm font-medium text-slate-400">
                  <span className="w-6 h-0.5 bg-slate-600"></span>
                  Linus Torvalds
               </div>
             </div>
           </Card>

           {/* Contests */}
           <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold text-slate-900 font-display">🗓️ Schedule</h2>
            </div>
            <Card noPadding className="overflow-hidden">
               <div className="bg-slate-50/50 p-4 border-b border-slate-100">
                 <h3 className="text-sm font-semibold text-slate-700">Upcoming Contests</h3>
               </div>
               <div className="divide-y divide-slate-100">
                 {CONTESTS.slice(0, 2).map(contest => (
                   <div key={contest.id} className="p-4 hover:bg-slate-50 transition-colors">
                      <div className="flex justify-between items-start mb-1">
                         <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${contest.status === 'Upcoming' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                           {contest.status}
                         </span>
                         <span className="text-xs text-slate-400">{contest.duration}</span>
                      </div>
                      <h4 className="font-medium text-slate-900 text-sm mb-1">{contest.title}</h4>
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <Clock size={12} /> {contest.date}
                      </div>
                   </div>
                 ))}
               </div>
               <div className="p-3 bg-slate-50/30 text-center">
                 <Link to="/contests" className="text-xs font-medium text-brand-600 hover:underline">View All Events</Link>
               </div>
            </Card>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
