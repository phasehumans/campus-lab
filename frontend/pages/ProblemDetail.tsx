
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Button, Badge, useToast } from '../components/ui';
import { MOCK_PROBLEM_DETAIL } from '../services/mockData';
import { Play, Send, ChevronLeft, Settings, RotateCcw, ThumbsUp, Star, Share2 } from 'lucide-react';

const ProblemDetail: React.FC = () => {
  const { id } = useParams();
  const { addToast } = useToast();
  const problem = MOCK_PROBLEM_DETAIL;
  const [language, setLanguage] = useState('cpp');
  const [code, setCode] = useState(`// Write your C++ code here\n#include <iostream>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Your Logic Here\n        \n    }\n};`);
  const [activeTab, setActiveTab] = useState<'desc' | 'solutions' | 'submissions'>('desc');
  const [output, setOutput] = useState<string | null>(null);

  const handleRun = () => {
    addToast('Compiling code...', 'info');
    setTimeout(() => {
      setOutput('Compiling...\nRunning test case 1...\n\nOutput: [0, 1]\nExpected: [0, 1]\n\n✅ Accepted');
      addToast('Test cases passed successfully', 'success');
    }, 1000);
  };

  const handleSubmit = () => {
    addToast('Submitting solution...', 'info');
    setTimeout(() => {
      addToast('Solution Accepted! +50 Points', 'success');
    }, 1500);
  };

  const lineCount = code.split('\n').length;
  const lineNumbers = Array.from({ length: Math.max(lineCount, 15) }, (_, i) => i + 1);

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col gap-4 animate-fade-in">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-4">
          <Link to="/practice">
             <Button variant="ghost" className="p-2 h-auto"><ChevronLeft size={20} /></Button>
          </Link>
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
              {problem.id}. {problem.title} 
              <Badge type={problem.difficulty === 'Easy' ? 'success' : 'warning'}>{problem.difficulty}</Badge>
            </h2>
          </div>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="h-9 w-9 p-0 rounded-full text-slate-400 hover:text-brand-600"><ThumbsUp size={16} /></Button>
           <Button variant="outline" className="h-9 w-9 p-0 rounded-full text-slate-400 hover:text-yellow-400"><Star size={16} /></Button>
           <Button variant="outline" className="h-9 w-9 p-0 rounded-full text-slate-400 hover:text-blue-500"><Share2 size={16} /></Button>
        </div>
      </div>

      <div className="flex-1 flex gap-4 min-h-0">
        {/* Left Panel: Description */}
        <Card className="w-1/2 flex flex-col min-h-0 overflow-hidden" noPadding>
          <div className="flex border-b border-slate-100 bg-slate-50/50">
            <button 
              onClick={() => setActiveTab('desc')}
              className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'desc' ? 'border-brand-500 text-brand-600 bg-white' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
            >
              Description
            </button>
            <button 
               onClick={() => setActiveTab('solutions')}
               className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'solutions' ? 'border-brand-500 text-brand-600 bg-white' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
            >
              Editorial
            </button>
             <button 
               onClick={() => setActiveTab('submissions')}
               className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'submissions' ? 'border-brand-500 text-brand-600 bg-white' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
            >
              Submissions
            </button>
          </div>
          
          <div className="p-6 overflow-y-auto flex-1 bg-white">
             <div className="prose prose-slate max-w-none text-sm text-slate-700 leading-relaxed">
               <p className="whitespace-pre-line mb-8">{problem.description}</p>
               
               <h3 className="font-bold text-slate-900 mt-6 mb-3 text-base">Examples</h3>
               <div className="space-y-4">
                 {problem.examples?.map((ex, idx) => (
                   <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                     <p className="font-mono text-xs mb-2"><span className="font-semibold text-slate-900">Input:</span> {ex.input}</p>
                     <p className="font-mono text-xs mb-2"><span className="font-semibold text-slate-900">Output:</span> {ex.output}</p>
                     {ex.explanation && <p className="text-xs text-slate-500 mt-2 italic"><span className="font-semibold not-italic">Explanation:</span> {ex.explanation}</p>}
                   </div>
                 ))}
               </div>

               <h3 className="font-bold text-slate-900 mt-8 mb-3 text-base">Constraints</h3>
               <ul className="list-disc pl-5 space-y-2 text-slate-600 marker:text-slate-400">
                 <li><code>2 &le; nums.length &le; 10^4</code></li>
                 <li><code>-10^9 &le; nums[i] &le; 10^9</code></li>
                 <li><code>-10^9 &le; target &le; 10^9</code></li>
               </ul>
             </div>
          </div>
        </Card>

        {/* Right Panel: Code & Output */}
        <div className="w-1/2 flex flex-col gap-4 min-h-0">
          <Card className="flex-1 flex flex-col min-h-0 overflow-hidden border-slate-200 shadow-none" noPadding>
             <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100 bg-slate-50/50">
               <div className="flex items-center gap-2">
                 <select 
                   value={language} 
                   onChange={(e) => setLanguage(e.target.value)}
                   className="text-xs font-medium border border-slate-200 rounded-md px-2 py-1.5 bg-white focus:outline-none focus:ring-1 focus:ring-brand-500 text-slate-700"
                 >
                   <option value="cpp">C++ (GCC 9.2.0)</option>
                   <option value="java">Java (OpenJDK 13)</option>
                   <option value="python">Python 3.8</option>
                   <option value="javascript">JavaScript (Node.js)</option>
                 </select>
               </div>
               <div className="flex items-center gap-1">
                 <button className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"><RotateCcw size={14} /></button>
                 <button className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"><Settings size={14} /></button>
               </div>
             </div>
             
             {/* Editor Area with Line Numbers */}
             <div className="flex-1 relative flex text-sm font-mono overflow-hidden bg-white">
                {/* Line Numbers */}
                <div className="bg-slate-50 text-slate-300 text-right py-4 pr-3 pl-2 select-none border-r border-slate-100 leading-6 min-w-[3rem]">
                   {lineNumbers.map(n => <div key={n} className="px-1">{n}</div>)}
                </div>
                {/* Textarea */}
                <textarea 
                  className="flex-1 p-4 bg-white resize-none focus:outline-none text-slate-800 leading-6 w-full h-full"
                  spellCheck={false}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  style={{ tabSize: 2 }}
                />
             </div>

             <div className="p-4 border-t border-slate-100 bg-white flex items-center justify-end gap-3">
                <Button variant="ghost" onClick={handleRun} className="bg-slate-100">
                  <Play size={16} className="mr-2" /> Run
                </Button>
                <Button variant="primary" onClick={handleSubmit} className="px-6">
                  <Send size={16} className="mr-2" /> Submit
                </Button>
             </div>
          </Card>

          {output && (
             <Card className="h-1/3 flex flex-col min-h-0 overflow-hidden animate-slide-up shadow-lg" noPadding>
               <div className="px-4 py-2 border-b border-slate-100 bg-slate-50 font-bold text-xs text-slate-500 uppercase tracking-wider flex justify-between items-center">
                 <span>Execution Result</span>
                 <button onClick={() => setOutput(null)} className="text-slate-400 hover:text-slate-600">Close</button>
               </div>
               <div className="p-4 font-mono text-sm whitespace-pre-wrap overflow-y-auto text-slate-700 bg-white">
                 {output}
               </div>
             </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProblemDetail;
