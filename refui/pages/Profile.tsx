
import React from 'react';
import { Card, Button, Badge } from '../components/ui';
import { USER_STATS, RECENT_SUBMISSIONS, BADGES } from '../services/mockData';
import { MapPin, Link as LinkIcon, Building2, CheckCircle2, Clock } from 'lucide-react';

const Profile: React.FC = () => {
  // Generate heatmap data
  const generateHeatmapData = () => {
    const data = [];
    for (let i = 0; i < 52; i++) { // 52 weeks
      const week = [];
      for (let j = 0; j < 7; j++) { // 7 days
        // Randomly assign contribution levels: 0-4
        const level = Math.random() > 0.7 ? Math.floor(Math.random() * 5) : 0;
        week.push(level);
      }
      data.push(week);
    }
    return data;
  };

  const heatmapData = generateHeatmapData();

  const getContributionColor = (level: number) => {
    switch(level) {
      case 1: return 'bg-brand-200';
      case 2: return 'bg-brand-300';
      case 3: return 'bg-brand-400';
      case 4: return 'bg-brand-600';
      default: return 'bg-slate-100';
    }
  };

  return (
    <div className="max-w-7xl mx-auto animate-fade-in flex flex-col md:flex-row gap-8 pb-12 items-start">
      
      {/* LEFT COLUMN: User Sidebar */}
      <div className="w-full md:w-1/4 space-y-6 md:-mt-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
           {/* Avatar */}
           <div className="flex flex-col items-center">
             <div className="relative group mb-4">
                <img 
                  src="https://picsum.photos/300/300" 
                  alt="Profile" 
                  className="w-28 h-28 rounded-2xl border-4 border-slate-50 shadow-md object-cover" 
                />
             </div>

             {/* Name & Bio */}
             <div className="text-center w-full">
               <h1 className="text-xl font-bold text-slate-900">Alex Student</h1>
               <p className="text-sm text-slate-500 font-medium mb-4">@alex_codes_25</p>
               
               <p className="text-sm text-slate-600 leading-relaxed mb-6 px-2">
                 CS Undergrad @ Campus Lab. Passionate about Systems and AI. 🚀
               </p>

               <Button className="w-full bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-200 mb-6 font-medium shadow-none">Edit Profile</Button>
               
               <div className="space-y-3 text-sm text-slate-600 text-left pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-3 text-slate-700">
                     <Building2 size={16} className="text-slate-400" />
                     <div>
                        <span className="font-semibold block text-slate-900">Batch 2025</span>
                        <span className="text-xs text-slate-500">Computer Science Dept</span>
                     </div>
                  </div>
                  <div className="flex items-center gap-3">
                     <MapPin size={16} className="text-slate-400" />
                     <span>New Delhi, India</span>
                  </div>
                  <div className="flex items-center gap-3">
                     <LinkIcon size={16} className="text-slate-400" />
                     <a href="#" className="hover:text-brand-600 hover:underline">alex.dev</a>
                  </div>
               </div>

               {/* Badges Section */}
               <div className="pt-6 mt-4 border-t border-slate-100 w-full text-left">
                  <h3 className="font-bold text-slate-900 text-sm mb-3">Badges</h3>
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    {BADGES.map(badge => (
                      <div key={badge.id} className="group relative">
                        <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-2xl border border-slate-100 shadow-sm group-hover:bg-brand-50 group-hover:border-brand-100 transition-colors cursor-help">
                           {badge.icon}
                        </div>
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity z-10">
                          {badge.name}
                        </div>
                      </div>
                    ))}
                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 border border-dashed border-slate-200 text-xs text-center p-1 hover:bg-slate-100 transition-colors cursor-pointer">
                       +3
                    </div>
                  </div>
               </div>
             </div>
           </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Content */}
      <div className="flex-1 space-y-6 w-full">
         
         {/* 1. Solved Problems Stats */}
         <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-sm font-medium text-slate-500 mb-6 uppercase tracking-wider flex items-center gap-2">
               <CheckCircle2 size={16} /> Solved Problems
            </h3>
            <div className="flex flex-col md:flex-row gap-10 items-center">
                {/* Circle Chart */}
                <div className="relative w-40 h-40 flex items-center justify-center shrink-0">
                     <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                        <path className="text-slate-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="2.5" />
                        <path className="text-brand-500" strokeDasharray={`${(USER_STATS.problemsSolved / USER_STATS.totalProblems) * 100}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                     </svg>
                     <div className="absolute text-center">
                        <div className="text-3xl font-display font-bold text-slate-900">{USER_STATS.problemsSolved}</div>
                        <div className="text-xs text-slate-400 font-medium">Solved</div>
                     </div>
                </div>

                {/* Breakdown Progress Bars */}
                <div className="flex-1 w-full space-y-5">
                     {/* Easy */}
                     <div>
                        <div className="flex justify-between text-xs mb-2">
                           <span className="text-slate-600 font-medium bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">Easy</span>
                           <span className="text-slate-900 font-bold">{USER_STATS.solvedBreakdown.easy} <span className="text-slate-400 font-normal">/ {USER_STATS.solvedBreakdown.totalEasy}</span></span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                           <div className="bg-emerald-400 h-full rounded-full transition-all duration-1000" style={{ width: `${(USER_STATS.solvedBreakdown.easy / USER_STATS.solvedBreakdown.totalEasy) * 100}%` }}></div>
                        </div>
                     </div>
                     {/* Medium */}
                     <div>
                        <div className="flex justify-between text-xs mb-2">
                           <span className="text-slate-600 font-medium bg-amber-50 text-amber-700 px-2 py-0.5 rounded">Medium</span>
                           <span className="text-slate-900 font-bold">{USER_STATS.solvedBreakdown.medium} <span className="text-slate-400 font-normal">/ {USER_STATS.solvedBreakdown.totalMedium}</span></span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                           <div className="bg-amber-400 h-full rounded-full transition-all duration-1000" style={{ width: `${(USER_STATS.solvedBreakdown.medium / USER_STATS.solvedBreakdown.totalMedium) * 100}%` }}></div>
                        </div>
                     </div>
                     {/* Hard */}
                     <div>
                        <div className="flex justify-between text-xs mb-2">
                           <span className="text-slate-600 font-medium bg-red-50 text-red-700 px-2 py-0.5 rounded">Hard</span>
                           <span className="text-slate-900 font-bold">{USER_STATS.solvedBreakdown.hard} <span className="text-slate-400 font-normal">/ {USER_STATS.solvedBreakdown.totalHard}</span></span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                           <div className="bg-red-400 h-full rounded-full transition-all duration-1000" style={{ width: `${(USER_STATS.solvedBreakdown.hard / USER_STATS.solvedBreakdown.totalHard) * 100}%` }}></div>
                        </div>
                     </div>
                </div>
            </div>
         </div>

         {/* 2. Submission Heatmap */}
         <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
               <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <Clock size={16} /> Submission Heatmap
               </h3>
               <div className="text-xs text-slate-400">2,405 submissions in the last year</div>
            </div>
            
            <div className="w-full overflow-x-auto pb-2">
               <div className="flex gap-1 min-w-max">
                  {heatmapData.map((week, wIdx) => (
                     <div key={wIdx} className="flex flex-col gap-1">
                        {week.map((level, dIdx) => (
                           <div 
                             key={dIdx} 
                             className={`w-3 h-3 rounded-sm ${getContributionColor(level)}`} 
                             title={`Submissions: ${level * 3}`} // Fake tooltip logic
                           ></div>
                        ))}
                     </div>
                  ))}
               </div>
            </div>
            <div className="flex items-center justify-end mt-2 text-xs text-slate-500 gap-2">
                <span>Less</span>
                <div className="flex gap-1">
                    <div className="w-3 h-3 bg-slate-100 rounded-sm"></div>
                    <div className="w-3 h-3 bg-brand-200 rounded-sm"></div>
                    <div className="w-3 h-3 bg-brand-400 rounded-sm"></div>
                    <div className="w-3 h-3 bg-brand-600 rounded-sm"></div>
                </div>
                <span>More</span>
            </div>
         </div>

         {/* 3. Recent Submissions */}
         <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <h3 className="font-bold text-slate-800 text-sm">Recent Submissions</h3>
                <Button variant="ghost" className="h-8 text-xs">View All</Button>
            </div>
            <div className="divide-y divide-slate-50">
               {RECENT_SUBMISSIONS.map((sub, idx) => (
                   <div key={idx} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
                       <div>
                           <div className="font-semibold text-slate-900 text-sm group-hover:text-brand-600 transition-colors">{sub.title}</div>
                           <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                              <span>{sub.time}</span>
                           </div>
                       </div>
                       <div className="flex items-center gap-3">
                           <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">{sub.language}</span>
                           <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${sub.status === 'Accepted' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                              {sub.status}
                           </span>
                       </div>
                   </div>
               ))}
            </div>
         </div>

      </div>
    </div>
  );
};

export default Profile;
