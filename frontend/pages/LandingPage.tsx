
import React, { useState } from 'react';
import { Button } from '../components/ui';
import { GraduationCap, ArrowRight, Code2, Swords, Mic, CheckCircle2, Star, Twitter, Github, Linkedin, Mail, Trophy, BookOpen, Award, Users, BrainCircuit, Quote, Facebook, Instagram, X } from 'lucide-react';

interface LandingPageProps {
  onLogin: () => void;
}

const AuthModal = ({ onClose, onLogin }: { onClose: () => void; onLogin: () => void }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 animate-slide-up transform transition-all scale-100">
      <button 
        onClick={onClose} 
        className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-600 rounded-full hover:bg-stone-100 transition-colors"
      >
        <X size={20} />
      </button>
      
      <div className="text-center mb-8">
        <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center text-brand-600 mx-auto mb-4">
           <GraduationCap size={24} />
        </div>
        <h2 className="text-2xl font-display font-bold text-stone-900">Welcome to Campus Lab</h2>
        <p className="text-stone-500 text-sm mt-2">Join the community of top campus coders.</p>
      </div>

      <div className="space-y-4">
        <button 
          onClick={onLogin} 
          className="w-full flex items-center justify-center gap-3 bg-white border border-stone-200 text-stone-700 font-medium h-12 rounded-xl hover:bg-stone-50 hover:border-stone-300 transition-all group"
        >
          <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-stone-200"></div>
          <span className="flex-shrink-0 mx-4 text-stone-400 text-xs uppercase font-bold tracking-wider">Or continue with</span>
          <div className="flex-grow border-t border-stone-200"></div>
        </div>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          <div>
            <input 
              type="email" 
              placeholder="Email address" 
              className="w-full h-12 px-4 rounded-xl border border-stone-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all bg-stone-50 focus:bg-white"
            />
          </div>
          <Button type="submit" className="w-full h-12 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-lg shadow-brand-500/20">
            Continue with Email
          </Button>
        </form>
      </div>

      <p className="text-center text-xs text-stone-400 mt-6 leading-relaxed px-4">
        By clicking continue, you agree to our <a href="#" className="underline hover:text-stone-600">Terms of Service</a> and <a href="#" className="underline hover:text-stone-600">Privacy Policy</a>.
      </p>
    </div>
  </div>
);

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans text-stone-900 selection:bg-brand-100 selection:text-brand-900 flex flex-col">
      
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} onLogin={onLogin} />}

      {/* Sticky Navbar */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-stone-100 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white">
               <GraduationCap size={20} strokeWidth={2.5} />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-stone-900">Campus Lab</span>
          </div>
          
          <div className="flex items-center gap-3">
             <Button 
               onClick={() => setShowAuthModal(true)} 
               className="rounded-lg px-6 bg-brand-600 hover:bg-brand-700 text-white border-none shadow-lg shadow-brand-500/20 text-sm font-semibold h-10 transition-all hover:scale-105 active:scale-95"
             >
               Get Started
             </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 overflow-hidden">
        {/* Warm gradient background */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-50/60 via-white to-white"></div>
        
        <div className="max-w-7xl mx-auto px-6">
           <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              <div className="flex-1 text-center lg:text-left space-y-8 animate-fade-in">
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs font-bold tracking-wide uppercase shadow-sm">
                    <Star size={12} className="fill-brand-700" />
                    New: AI Interview Prep
                 </div>
                 <h1 className="text-5xl lg:text-7xl font-display font-bold leading-[1.1] tracking-tight text-stone-900">
                    Master Coding. <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-amber-500">Crack Placements.</span>
                 </h1>
                 <p className="text-lg text-stone-500 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                    The ultimate platform for campus coders. Join 50,000+ students mastering Data Structures, competing in wars, and getting hired.
                 </p>
                 <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                    <Button 
                      onClick={() => setShowAuthModal(true)} 
                      className="h-12 px-8 text-base font-bold rounded-xl bg-brand-600 hover:bg-brand-700 text-white shadow-xl shadow-brand-500/20 hover:-translate-y-1 transition-all w-full sm:w-auto"
                    >
                       Start Practicing
                    </Button>
                    <Button 
                      onClick={() => setShowAuthModal(true)} 
                      variant="outline" 
                      className="h-12 px-8 text-base font-semibold rounded-xl text-stone-600 hover:text-stone-900 bg-white border-stone-200 hover:border-stone-300 hover:bg-stone-50 w-full sm:w-auto transition-all"
                    >
                       Explore Contests
                    </Button>
                 </div>
                 <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-sm text-stone-400 font-medium">
                    <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brand-500" /> 500+ Problems</span>
                    <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brand-500" /> Real-time Battles</span>
                 </div>
              </div>
              
              <div className="flex-1 w-full max-w-lg lg:max-w-none relative animate-slide-up hidden md:block">
                 <div className="relative z-10 bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden transform transition-transform hover:scale-[1.01] duration-500">
                    <div className="bg-stone-50 px-4 py-3 border-b border-stone-200 flex items-center gap-2">
                       <div className="flex gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-red-400"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                          <div className="w-3 h-3 rounded-full bg-green-400"></div>
                       </div>
                       <div className="ml-4 text-xs font-mono text-stone-400">two_sum.cpp</div>
                    </div>
                    <div className="p-6 space-y-4">
                       <div className="space-y-2">
                          <div className="w-1/3 h-4 bg-stone-100 rounded animate-pulse"></div>
                          <div className="w-2/3 h-4 bg-stone-100 rounded animate-pulse"></div>
                       </div>
                       <div className="p-4 bg-stone-900 rounded-lg font-mono text-sm text-stone-300 shadow-inner">
                          <span className="text-amber-400">class</span> <span className="text-brand-400">Solution</span> {'{'}<br/>
                          &nbsp;&nbsp;<span className="text-amber-400">public</span> <span className="text-orange-300">vector&lt;int&gt;</span> twoSum(<span className="text-orange-300">vector&lt;int&gt;</span>& nums) {'{'}<br/>
                          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-stone-500">// Your optimized code</span><br/>
                          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-amber-400">return</span> result;<br/>
                          &nbsp;&nbsp;{'}'}<br/>
                          {'}'}
                       </div>
                       <div className="flex justify-between items-center pt-2">
                          <div className="flex gap-2">
                             <div className="px-2 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded border border-emerald-100">Passed</div>
                             <div className="px-2 py-1 bg-stone-100 text-stone-500 text-xs font-bold rounded border border-stone-200">0ms</div>
                          </div>
                          <Button className="bg-brand-600 text-white h-8 text-xs hover:bg-brand-700">Submit</Button>
                       </div>
                    </div>
                 </div>
                 {/* Decorative elements - Warm Tones */}
                 <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-500/10 rounded-full blur-3xl animate-pulse"></div>
                 <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
              </div>
           </div>
        </div>
      </section>

      {/* Partnered Universities Section */}
      <section className="py-10 border-b border-stone-100 bg-white">
        <div className="max-w-7xl mx-auto px-6">
           <div className="relative mb-8">
              <h3 className="text-lg font-handwriting text-stone-500 -rotate-2 absolute -top-10 left-4 flex items-end gap-2">
                 Partnered Universities
                 <svg className="w-8 h-8 text-stone-300 rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                 </svg>
              </h3>
           </div>
           
           <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500 pt-6">
              {/* Mock Logos using text/icons for simplicity */}
              <div className="flex items-center gap-2 font-bold text-xl text-stone-800">
                 <div className="w-8 h-8 bg-stone-900 text-white flex items-center justify-center rounded">N</div> NMIMS
              </div>
              <div className="flex items-center gap-2 font-bold text-xl text-stone-800">
                 <div className="w-8 h-8 bg-red-700 text-white flex items-center justify-center rounded-full">K</div> KL University
              </div>
              <div className="flex items-center gap-2 font-bold text-xl text-stone-800">
                 <div className="w-8 h-8 bg-blue-900 text-white flex items-center justify-center rounded-t-xl">M</div> MIT-WPU
              </div>
              <div className="flex items-center gap-2 font-bold text-xl text-stone-800">
                 <div className="w-8 h-8 bg-orange-600 text-white flex items-center justify-center rounded">C</div> CIET
              </div>
              <div className="flex items-center gap-2 font-bold text-xl text-stone-800">
                 <div className="w-8 h-8 bg-emerald-700 text-white flex items-center justify-center rounded-full">S</div> SRM
              </div>
           </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-24 px-6 bg-white">
         <div className="max-w-7xl mx-auto">
             <div className="relative mb-16">
                 <h2 className="text-lg font-handwriting text-brand-600 absolute -top-12 left-0 -rotate-3 flex items-center gap-3">
                   Key features & Benefits
                   <svg className="w-12 h-12 text-stone-200 rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                   </svg>
                 </h2>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                {[
                  { title: "AI Mentor Assistance", desc: "Real-time doubt-solving for students.", icon: BrainCircuit },
                  { title: "Faculty Training & Workshop", desc: "Upskill educators in modern programming.", icon: Users },
                  { title: "Custom Coding Curriculum", desc: "Integrate Campus Lab courses into your syllabus.", icon: BookOpen },
                  { title: "Coding Contests & Hackathons", desc: "Host exclusive competitions.", icon: Trophy },
                  { title: "Industry Recognised Certificate", desc: "Boost student employability.", icon: Award },
                  { title: "Personalized Learning Paths", desc: "Hands-on practice with guided learning paths.", icon: Code2 },
                ].map((feature, idx) => (
                  <div key={idx} className="flex gap-6 group">
                     <div className="w-14 h-14 rounded-2xl bg-orange-50 text-brand-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <feature.icon size={28} />
                     </div>
                     <div>
                        <h3 className="text-lg font-bold text-stone-900 mb-2">{feature.title}</h3>
                        <p className="text-stone-500 leading-relaxed">{feature.desc}</p>
                     </div>
                  </div>
                ))}
             </div>
         </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6 bg-stone-50 relative overflow-hidden">
         {/* Background decoration */}
         <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
         
         <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
               <span className="text-brand-600 font-medium text-sm tracking-wider uppercase">Testimonials</span>
               <h2 className="text-3xl md:text-4xl font-display font-bold text-stone-900 mt-2 flex items-center justify-center gap-4">
                  <span className="hidden md:block w-12 h-px bg-stone-300"></span>
                  What Our Students Say
                  <span className="hidden md:block w-12 h-px bg-stone-300"></span>
               </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {[
                 {
                   name: "Ishu Rajora",
                   role: "IET Lucknow",
                   text: "Campus Lab transformed my thinking. It improved my problem-solving, introduced new algorithms, and taught me to optimize.",
                   image: "https://picsum.photos/seed/ishu/100"
                 },
                 {
                   name: "Sanat Kumar",
                   role: "Capgemini",
                   text: "I've been practicing here since 2020. It helped me get comfortable with competitive programming while staying motivated.",
                   image: "https://picsum.photos/seed/sanat/100"
                 },
                 {
                   name: "Aman Tripathi",
                   role: "IIIT Bhagalpur",
                   text: "Sparked my love for CP through contests. From 1v1s to achieving 5 stars, it's been my foundation.",
                   image: "https://picsum.photos/seed/aman/100"
                 },
                 {
                   name: "Aman Sonkar",
                   role: "Dell",
                   text: "Boosted my confidence by improving logic and time management. The contests taught me patience and resilience.",
                   image: "https://picsum.photos/seed/sonkar/100"
                 }
               ].map((t, i) => (
                 <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 hover:shadow-lg transition-all duration-300 flex flex-col h-full">
                    <Quote className="text-brand-200 mb-6 rotate-180" size={40} />
                    <p className="text-stone-600 text-sm leading-relaxed flex-1 mb-6">
                       "{t.text}"
                    </p>
                    <div className="flex items-center gap-3 mt-auto pt-6 border-t border-stone-50">
                       <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                       <div>
                          <div className="font-bold text-stone-900 text-sm">{t.name}</div>
                          <div className="text-xs text-stone-400 font-medium">{t.role}</div>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
         <div className="max-w-5xl mx-auto bg-gradient-to-br from-brand-600 to-orange-700 rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-brand-900/20">
             <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
             {/* Warm Glow */}
             <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
             <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-900/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
             
             <div className="relative z-10 animate-fade-in">
                <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Ready to climb the rank list?</h2>
                <p className="text-lg text-orange-100 max-w-2xl mx-auto mb-10">
                   Start your journey today. Join contests, solve problems, and get hired by top tech companies.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                   <Button 
                     onClick={() => setShowAuthModal(true)} 
                     className="h-14 px-10 text-lg font-bold bg-white text-brand-600 hover:bg-orange-50 border-none shadow-xl hover:scale-105 transition-all"
                   >
                      Create Free Account
                   </Button>
                   <Button 
                     onClick={() => setShowAuthModal(true)} 
                     variant="outline" 
                     className="h-14 px-10 text-lg font-medium bg-brand-700/50 text-white border-brand-500 hover:bg-brand-700 hover:border-brand-400 transition-all backdrop-blur-sm"
                   >
                      View Leaderboard
                   </Button>
                </div>
             </div>
         </div>
      </section>

      {/* New Clean Footer */}
      <footer className="bg-white pt-20 pb-10 border-t border-stone-100 mt-auto">
        <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                
                {/* Brand Column */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white">
                            <GraduationCap size={20} strokeWidth={2.5} />
                        </div>
                        <span className="font-display font-bold text-xl tracking-tight text-stone-900">Campus Lab</span>
                    </div>
                    <p className="text-sm leading-relaxed text-stone-500">
                        Building the next generation of software engineers through competitive programming and community learning.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="p-2 rounded-full bg-stone-50 text-stone-500 hover:bg-brand-50 hover:text-brand-600 transition-all"><Twitter size={18} /></a>
                        <a href="#" className="p-2 rounded-full bg-stone-50 text-stone-500 hover:bg-brand-50 hover:text-brand-600 transition-all"><Github size={18} /></a>
                        <a href="#" className="p-2 rounded-full bg-stone-50 text-stone-500 hover:bg-brand-50 hover:text-brand-600 transition-all"><Linkedin size={18} /></a>
                        <a href="#" className="p-2 rounded-full bg-stone-50 text-stone-500 hover:bg-brand-50 hover:text-brand-600 transition-all"><Instagram size={18} /></a>
                    </div>
                </div>

                {/* Navigation Links */}
                <div>
                    <h4 className="font-bold text-stone-900 mb-6">Product</h4>
                    <ul className="space-y-3 text-sm">
                        <li><a href="#" className="text-stone-500 hover:text-brand-600 transition-colors">Problems</a></li>
                        <li><a href="#" className="text-stone-500 hover:text-brand-600 transition-colors">Contests</a></li>
                        <li><a href="#" className="text-stone-500 hover:text-brand-600 transition-colors">War Room</a></li>
                        <li><a href="#" className="text-stone-500 hover:text-brand-600 transition-colors">Online IDE</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-stone-900 mb-6">Resources</h4>
                    <ul className="space-y-3 text-sm">
                        <li><a href="#" className="text-stone-500 hover:text-brand-600 transition-colors">Community Hub</a></li>
                        <li><a href="#" className="text-stone-500 hover:text-brand-600 transition-colors">Documentation</a></li>
                        <li><a href="#" className="text-stone-500 hover:text-brand-600 transition-colors">Student Ambassadors</a></li>
                        <li><a href="#" className="text-stone-500 hover:text-brand-600 transition-colors">Success Stories</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-stone-900 mb-6">Stay Updated</h4>
                    <p className="text-xs text-stone-500 mb-4">Get the latest contest alerts and tutorials.</p>
                    <div className="flex flex-col gap-3">
                        <div className="relative">
                           <input 
                             type="email" 
                             placeholder="Enter your email" 
                             className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all" 
                           />
                        </div>
                        <Button className="w-full bg-stone-900 hover:bg-stone-800 text-white border-none py-2.5">
                           Subscribe
                        </Button>
                    </div>
                </div>
            </div>

            <div className="border-t border-stone-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-stone-500">
                <div>&copy; 2024 Campus Lab Inc. All rights reserved.</div>
                <div className="flex items-center gap-8">
                    <a href="#" className="hover:text-brand-600 transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-brand-600 transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-brand-600 transition-colors">Cookie Settings</a>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
