import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from '@/routes/routes';
import { Home, Wrench, FolderOpen, Clock, Mail } from '@/components/ui/GlobalIcons';

const searchLinks = [
  { label: "Pocket", href: "home", icon: Home, type: "Section" },
  { label: "Gadgets", href: "skills", icon: Wrench, type: "Section" },
  { label: "Projects", href: "projects", icon: FolderOpen, type: "Section" },
  { label: "Timeline", href: "experience", icon: Clock, type: "Section" },
  { label: "Contact", href: "contact", icon: Mail, type: "Section" },
];

export default function SearchModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === ROUTES.HOME;

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleNavigate = (id: string) => {
    onClose();
    const el = document.getElementById(id);
    if (isHome && el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      sessionStorage.setItem("scrollTarget", id);
      if (!isHome) navigate(ROUTES.HOME);
    }
  };

  const filteredLinks = searchLinks.filter(link =>
    link.label.toLowerCase().includes(query.toLowerCase()) ||
    link.type.toLowerCase().includes(query.toLowerCase()) || link.type.toUpperCase().includes(query.toUpperCase()) || link.label.toUpperCase().includes(query.toUpperCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-[101] flex items-start justify-center pt-[15vh] px-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="w-full max-w-2xl bg-white/80 backdrop-blur-3xl rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,100,148,0.3)] overflow-hidden border border-white/60 pointer-events-auto flex flex-col"
              style={{ maxHeight: '75vh' }}
            >
              {/* Header / Input */}
              <div className="flex items-center px-5 border-b border-slate-200/50 bg-white/50">
                <div className="text-[#0080c8] mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </div>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search pages, projects..."
                  className="flex-1 py-5 bg-transparent outline-none text-slate-800 text-lg placeholder-slate-400 font-medium"
                />
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 transition-colors ml-2 border-b-0"
                >
                  ESC
                </button>
              </div>

              {/* Results */}
              <div className="overflow-y-auto p-3" style={{ maxHeight: '50vh' }}>
                {filteredLinks.length > 0 ? (
                  <div className="space-y-1">
                    {filteredLinks.map((link, idx) => {
                      const Icon = link.icon;
                      return (
                        <button
                          key={idx}
                          onClick={() => handleNavigate(link.href)}
                          className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl hover:bg-white/60 transition-colors text-left group border border-transparent hover:border-white/80 shadow-sm hover:shadow-md"
                        >
                          <div className="p-2.5 rounded-xl bg-slate-100 group-hover:bg-[#0080c8]/10 text-slate-500 group-hover:text-[#0080c8] transition-colors border border-slate-200/50 group-hover:border-[#0080c8]/20">
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <div className="font-bold text-slate-700 group-hover:text-[#005b8f] text-[15px]">{link.label}</div>
                            <div className="text-xs font-semibold text-slate-400 mt-0.5 uppercase tracking-wider">{link.type}</div>
                          </div>
                          <div className="text-slate-300 group-hover:text-[#0080c8] transform group-hover:translate-x-1 transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-16 text-center text-slate-500 flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-4 text-slate-300">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <p className="font-semibold text-slate-600">No results found for "{query}"</p>
                    <p className="text-sm text-slate-400 mt-1">Try searching for sections like 'Projects' or 'Skills'</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-5 py-3.5 bg-slate-100/50 border-t border-slate-200/50 flex items-center justify-between text-xs font-semibold text-slate-500">
                <div className="flex items-center gap-5">
                  <span className="flex items-center gap-1.5"><kbd className="px-1.5 py-0.5 rounded-md bg-white border border-slate-200 shadow-sm font-sans text-[10px]">↑</kbd> <kbd className="px-1.5 py-0.5 rounded-md bg-white border border-slate-200 shadow-sm font-sans text-[10px]">↓</kbd> to navigate</span>
                  <span className="flex items-center gap-1.5"><kbd className="px-2 py-0.5 rounded-md bg-white border border-slate-200 shadow-sm font-sans text-[10px]">Enter</kbd> to select</span>
                </div>
                <span className="flex items-center gap-1.5"><kbd className="px-2 py-0.5 rounded-md bg-white border border-slate-200 shadow-sm font-sans text-[10px]">Esc</kbd> to close</span>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
