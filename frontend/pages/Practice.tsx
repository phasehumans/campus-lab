
import React, { useState } from 'react';
import { Card, Button, useToast } from '../components/ui';
import { PROBLEMS, CHALLENGES } from '../services/mockData';
import { Search, CheckCircle2, ArrowRight, Zap, Target, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const Practice: React.FC = () => {
  const { addToast } = useToast();
  const [filterDifficulty, setFilterDifficulty] = useState<string>('All');
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  
  const topics = ['All', 'Arrays', 'Strings', 'Hash Table', 'DP', 'Math', 'Sorting', 'Greedy', 'DFS', 'BFS', 'Tree', 'Graph', 'Linked List'];

  const filteredProblems = PROBLEMS.filter(p => {
    const diffMatch = filterDifficulty === 'All' ? true : p.difficulty === filterDifficulty;
    const topicMatch = selectedTopic === 'All' ? true : p.topic === selectedTopic;
    return diffMatch && topicMatch;
  });

  const handleJoinChallenge = (title: string) => {
    addToast(`Joined challenge: ${title}`, 'success');
  };

  return (
    <div className="space-y-10 animate-fade-in pb-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-brand-600 to-orange-500 rounded-2xl p-8 md:p-10 text-white shadow-xl shadow-brand-500/10 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
           <h1 className="text-3xl md:text-4xl font-display font-bold mb-3">Crack the Placement</h1>
           <p className="text-brand-50 text-lg opacity-90 leading-relaxed mb-6">
             Join 2,000+ students mastering Data Structures & Algorithms. Follow our curated paths to ace your dream job interview.
           </p>
           <Button className="bg-white text-brand-600 hover:bg-brand-50 border-none font-bold px-6 shadow-md">
             Start Solving Today
           </Button>
        </div>
        <div className="absolute top-1/2 right-10 -translate-y-1/2 opacity-20 hidden md:block">
           <Target size={180} />
        </div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </div>

      {/* Challenge Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CHALLENGES.map((challenge) => (
          <div key={challenge.id} className="group bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-brand-200 transition-all duration-300 relative overflow-hidden">
             <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${challenge.color}`}>
                   <challenge.icon size={24} />
                </div>
                <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-full uppercase tracking-wider">{challenge.days} Days</span>
             </div>
             <h3 className="font-bold text-slate-900 text-lg mb-1 group-hover:text-brand-600 transition-colors">{challenge.title}</h3>
             <p className="text-slate-500 text-sm mb-6">{challenge.description}</p>
             <div className="flex items-center justify-between mt-auto">
                <span className="text-xs text-slate-400 font-medium">{challenge.participants} joined</span>
                <button 
                  onClick={() => handleJoinChallenge(challenge.title)}
                  className="text-sm font-bold text-brand-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                >
                  Join <ArrowRight size={14} />
                </button>
             </div>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        {/* Filters Header */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
             <h2 className="text-2xl font-bold text-slate-900 font-display self-start md:self-auto">All Problems</h2>
             <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search questions or companies..." 
                  className="pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 w-full text-sm shadow-sm transition-shadow"
                />
              </div>
          </div>

          <div className="flex flex-col gap-4">
             {/* Difficulty Tabs */}
             <div className="flex gap-2 border-b border-slate-200 pb-1">
                {['All', 'Easy', 'Medium', 'Hard'].map(diff => (
                   <button
                     key={diff}
                     onClick={() => setFilterDifficulty(diff)}
                     className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 relative -bottom-1.5 ${
                       filterDifficulty === diff 
                         ? 'border-brand-500 text-brand-600' 
                         : 'border-transparent text-slate-500 hover:text-slate-700'
                     }`}
                   >
                     {diff}
                   </button>
                ))}
             </div>

             {/* Topic Pills */}
             <div className="flex flex-wrap gap-2">
                {topics.map(topic => (
                   <button
                     key={topic}
                     onClick={() => setSelectedTopic(topic)}
                     className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                       selectedTopic === topic
                         ? 'bg-slate-800 text-white shadow-md'
                         : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                     }`}
                   >
                     {topic}
                   </button>
                ))}
             </div>
          </div>
        </div>

        {/* Problems Table */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/80 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 font-medium text-slate-500 w-16">Status</th>
                  <th className="px-6 py-4 font-medium text-slate-500">Title</th>
                  <th className="px-6 py-4 font-medium text-slate-500 w-32">Acceptance</th>
                  <th className="px-6 py-4 font-medium text-slate-500 w-32">Difficulty</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredProblems.map((problem, idx) => {
                   const isSolved = ['1', '2', '9'].includes(problem.id);
                   return (
                    <tr key={problem.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-6 py-4">
                        {isSolved ? (
                           <CheckCircle2 className="text-emerald-500" size={18} />
                        ) : (
                           <div className="w-4 h-4 rounded-full border border-slate-300"></div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <Link to={`/practice/${problem.id}`} className="text-base font-medium text-slate-900 group-hover:text-brand-600 transition-colors block mb-1">
                          {problem.id}. {problem.title}
                        </Link>
                        <div className="flex flex-wrap gap-2">
                           <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md border border-slate-200 font-medium">
                              {problem.topic}
                           </span>
                           {problem.companies?.map(company => (
                              <span key={company} className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md border border-blue-100 font-medium">
                                 {company}
                              </span>
                           ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-500">{problem.acceptance}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-bold px-2 py-1 rounded-full
                          ${problem.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-600' : 
                            problem.difficulty === 'Medium' ? 'bg-amber-50 text-amber-600' : 
                            'bg-red-50 text-red-600'}`}>
                          {problem.difficulty}
                        </span>
                      </td>
                    </tr>
                   );
                })}
              </tbody>
            </table>
          </div>
          
          {/* Simple Footer */}
          <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-center">
             <Button variant="outline" className="text-xs">Load More Problems</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Practice;
