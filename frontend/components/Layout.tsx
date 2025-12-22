
import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Code2, Trophy, Swords, Mic, User, Menu, X, GraduationCap, LogOut } from 'lucide-react';

interface LayoutProps {
  onLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();
  const isDashboard = location.pathname === '/';
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/practice', label: 'Practice', icon: Code2 },
    { path: '/contests', label: 'Contests', icon: Trophy },
    { path: '/war-room', label: 'War Room', icon: Swords },
    { path: '/interview', label: 'Interview', icon: Mic },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans flex flex-col text-slate-900">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            
            {/* Left: Logo */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-9 h-9 bg-brand-50 rounded-lg flex items-center justify-center text-brand-600">
                <GraduationCap size={22} />
              </div>
              <h1 className="text-lg font-bold tracking-tight text-slate-900 font-display leading-none hidden md:block">Campus Lab</h1>
            </div>

            {/* Middle: Desktop Nav Links */}
            <div className="hidden md:flex items-center justify-center flex-1 px-8">
               <div className="flex items-center justify-center space-x-2 lg:space-x-6">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        isActive
                          ? 'text-brand-600 bg-brand-50'
                          : 'text-slate-500 hover:text-brand-600 hover:bg-slate-50'
                      }`
                    }
                  >
                    <item.icon size={18} strokeWidth={2} />
                    <span className="hidden lg:inline">{item.label}</span>
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Right: Profile Section */}
            <div className="flex items-center gap-2 shrink-0">
               {/* Profile Link (Icon Only) */}
               <NavLink 
                 to="/profile"
                 className={({ isActive }) => 
                   `hidden md:flex items-center justify-center w-10 h-10 rounded-full transition-all border ${
                     isActive 
                       ? 'bg-brand-50 text-brand-600 border-brand-100' 
                       : 'bg-white text-slate-500 border-slate-200 hover:text-slate-900 hover:border-slate-300'
                   }`
                 }
                 title="Profile"
               >
                 <User size={20} />
               </NavLink>

               <button 
                 onClick={onLogout}
                 className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 text-slate-500 hover:text-red-600 hover:bg-red-50 hover:border-red-100 transition-all"
                 title="Logout"
               >
                 <LogOut size={18} />
               </button>

               {/* Mobile Menu Button */}
               <div className="flex md:hidden">
                 <button
                   onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                   className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                 >
                   {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                 </button>
               </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white absolute w-full shadow-lg z-50 animate-slide-up">
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium ${
                      isActive
                        ? 'bg-brand-50 text-brand-600'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`
                  }
                >
                  <item.icon size={20} />
                  {item.label}
                </NavLink>
              ))}
              <NavLink
                  to="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium ${
                      isActive
                        ? 'bg-brand-50 text-brand-600'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`
                  }
                >
                  <User size={20} />
                  Profile
                </NavLink>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium text-red-600 hover:bg-red-50"
                >
                  <LogOut size={20} />
                  Sign Out
                </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className={`flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 animate-fade-in ${isDashboard ? 'pb-28' : ''}`}>
        <Outlet />
      </main>
    </div>
  );
};
