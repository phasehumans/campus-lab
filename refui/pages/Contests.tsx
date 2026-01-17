import React from 'react';
import { Card, Button, Badge } from '../components/ui';
import { CONTESTS, LEADERBOARD_DATA } from '../services/mockData';
import { Trophy, Calendar, Users, Timer, Sparkles } from 'lucide-react';

const Contests: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-brand-600 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden shadow-xl shadow-brand-500/20">
        <div className="relative z-10 max-w-2xl">
           <div className="flex items-center gap-2 mb-4 bg-white/20 w-fit px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm border border-white/10">
              <Sparkles size={12} /> Official College Event
           </div>
           <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Campus Wars</h1>
           <p className="text-brand-50 text-lg mb-8 leading-relaxed">
             Battle it out with students from other branches. Solve problems, climb the department ranks, and earn the title of Campus Hero.
           </p>
           <div className="flex gap-4">
              <Button className="bg-white text-brand-600 hover:bg-brand-50 border-none px-6 h-12 text-base font-bold shadow-lg">
                Register for Next War
              </Button>
              <Button className="bg-brand-700 text-white hover:bg-brand-800 border-none px-6 h-12 text-base font-medium">
                View Rules
              </Button>
           </div>
        </div>
        
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-400 opacity-20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4"></div>
        <Trophy className="absolute right-10 bottom-10 text-brand-800 opacity-20 rotate-12" size={240} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
             <h2 className="text-xl font-bold text-slate-900 font-display">Upcoming Events</h2>
             <div className="flex gap-2">
               <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium cursor-pointer hover:bg-slate-200">All</span>
               <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-500 text-xs font-medium cursor-pointer hover:border-brand-300">My Branch</span>
             </div>
          </div>
          
          <div className="space-y-4">
             {CONTESTS.map(contest => (
               <Card key={contest.id} className="p-0 overflow-hidden flex flex-col md:flex-row border-l-4 border-l-brand-500">
                  <div className="p-6 flex-1">
                    <div className="flex items-center gap-3 mb-3">
                       <h3 className="text-lg font-bold text-slate-900">{contest.title}</h3>
                       <Badge type={contest.status === 'Upcoming' ? 'info' : 'neutral'}>{contest.status}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-6 text-sm text-slate-500">
                       <span className="flex items-center gap-2"><Calendar size={16} className="text-slate-400" /> {contest.date}</span>
                       <span className="flex items-center gap-2"><Timer size={16} className="text-slate-400" /> {contest.duration}</span>
                       <span className="flex items-center gap-2"><Users size={16} className="text-slate-400" /> {contest.participants} Registered</span>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-6 flex items-center justify-center md:border-l border-slate-100">
                    <Button variant={contest.status === 'Upcoming' ? 'primary' : 'outline'} className="w-full md:w-auto min-w-[120px]">
                      {contest.status === 'Upcoming' ? 'Register' : 'Standings'}
                    </Button>
                  </div>
               </Card>
             ))}
          </div>
        </div>

        <div className="space-y-6">
           <div className="flex items-center justify-between">
             <h2 className="text-xl font-bold text-slate-900 font-display">Dept. Leaderboard</h2>
           </div>
           <Card className="overflow-hidden p-0">
             <div className="bg-brand-50/50 p-4 border-b border-brand-100">
                <p className="text-xs font-medium text-brand-600 uppercase tracking-wider">Top Performers - Oct</p>
             </div>
             <table className="w-full text-left text-sm">
               <tbody className="divide-y divide-slate-50">
                 {LEADERBOARD_DATA.map((user, idx) => (
                   <tr key={user.name} className="hover:bg-slate-50 transition-colors">
                     <td className="px-4 py-4 w-12">
                       <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-sm
                         ${idx === 0 ? 'bg-yellow-400 text-white' : 
                           idx === 1 ? 'bg-slate-300 text-white' : 
                           idx === 2 ? 'bg-orange-300 text-white' : 'bg-slate-100 text-slate-500'}`}>
                         {user.rank}
                       </div>
                     </td>
                     <td className="px-2 py-4">
                       <div className="font-semibold text-slate-900">{user.name}</div>
                       <div className="text-xs text-slate-400">Score: {user.score}</div>
                     </td>
                     <td className="px-4 py-4 text-right">
                       <div className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded inline-block">
                         {user.time}
                       </div>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
             <div className="p-3 text-center border-t border-slate-100">
               <button className="text-xs font-bold text-brand-600 hover:underline">View Full Ranking</button>
             </div>
           </Card>
        </div>
      </div>
    </div>
  );
};

export default Contests;