
import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const Card: React.FC<{ children: React.ReactNode; className?: string; noPadding?: boolean }> = ({ children, className = '', noPadding = false }) => (
  <div className={`bg-white border border-slate-100 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-shadow duration-200 ${noPadding ? '' : 'p-6'} ${className}`}>
    {children}
  </div>
);

export const Badge: React.FC<{ children: React.ReactNode; type?: 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'brand' }> = ({ children, type = 'neutral' }) => {
  const styles = {
    success: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    warning: 'bg-yellow-50 text-yellow-700 border-yellow-100',
    danger: 'bg-red-50 text-red-700 border-red-100',
    info: 'bg-blue-50 text-blue-700 border-blue-100',
    neutral: 'bg-slate-100 text-slate-600 border-slate-200',
    brand: 'bg-orange-50 text-orange-700 border-orange-100',
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-md text-xs font-medium border ${styles[type]}`}>
      {children}
    </span>
  );
};

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' }> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) => {
  const base = "inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";
  const variants = {
    primary: "bg-brand-500 text-white hover:bg-brand-600 focus:ring-brand-500 shadow-sm hover:shadow",
    secondary: "bg-slate-800 text-white hover:bg-slate-900 focus:ring-slate-700 shadow-sm",
    outline: "border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 focus:ring-slate-200",
    ghost: "text-slate-600 hover:bg-brand-50 hover:text-brand-600 focus:ring-brand-200",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 shadow-sm",
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// Toast System
interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

const ToastContext = createContext<{ addToast: (msg: string, type?: 'success'|'error'|'info') => void } | null>(null);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <div 
            key={toast.id} 
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-[0_8px_16px_rgba(0,0,0,0.08)] border animate-slide-up min-w-[300px] backdrop-blur-sm ${
              toast.type === 'success' ? 'bg-white/95 border-emerald-100 text-slate-800' :
              toast.type === 'error' ? 'bg-white/95 border-red-100 text-slate-800' :
              'bg-white/95 border-blue-100 text-slate-800'
            }`}
          >
             {toast.type === 'success' && <div className="bg-emerald-100 rounded-full p-1"><CheckCircle2 size={16} className="text-emerald-600" /></div>}
             {toast.type === 'error' && <div className="bg-red-100 rounded-full p-1"><AlertCircle size={16} className="text-red-600" /></div>}
             {toast.type === 'info' && <div className="bg-blue-100 rounded-full p-1"><Info size={16} className="text-blue-600" /></div>}
             <span className="text-sm font-medium flex-1">{toast.message}</span>
             <button onClick={() => removeToast(toast.id)} className="text-slate-400 hover:text-slate-600 transition-colors"><X size={14}/></button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
};
