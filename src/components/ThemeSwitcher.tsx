import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Check } from 'lucide-react';

const themes = [
  {
    id: 'blue',
    name: 'Doraemon Blue',
    primary: '#006494',
    dark: '#00334e',
    light: '#00a0e9',
    bg: '#f4faff',
    yellow: '#fcd400'
  },
  {
    id: 'emerald',
    name: 'Emerald Green',
    primary: '#047857',
    dark: '#064e3b',
    light: '#10b981',
    bg: '#f0fdf4',
    yellow: '#fbbf24'
  },
  {
    id: 'violet',
    name: 'Cosmic Violet',
    primary: '#6d28d9',
    dark: '#4c1d95',
    light: '#8b5cf6',
    bg: '#f5f3ff',
    yellow: '#fcd34d'
  },
  {
    id: 'rose',
    name: 'Rose Red',
    primary: '#be123c',
    dark: '#881337',
    light: '#f43f5e',
    bg: '#fff1f2',
    yellow: '#fca5a5'
  },
  {
    id: 'orange',
    name: 'Sunset Orange',
    primary: '#c2410c',
    dark: '#7c2d12',
    light: '#f97316',
    bg: '#fff7ed',
    yellow: '#fdba74'
  }
];

export default function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState('blue');

  useEffect(() => {
    const savedTheme = localStorage.getItem('app-theme') || 'blue';
    const theme = themes.find(t => t.id === savedTheme) || themes[0];
    applyTheme(theme, false);
  }, []);

  const applyTheme = (theme: typeof themes[0], save = true) => {
    setActiveTheme(theme.id);
    if (save) {
      localStorage.setItem('app-theme', theme.id);
    }
    
    const root = document.documentElement;
    root.style.setProperty('--color-doraemon-blue', theme.primary);
    root.style.setProperty('--color-primary', theme.primary);
    root.style.setProperty('--color-doraemon-darkBlue', theme.dark);
    root.style.setProperty('--color-primary-container', theme.light);
    root.style.setProperty('--color-background', theme.bg);
    root.style.setProperty('--color-doraemon-bg', theme.bg);
    root.style.setProperty('--color-doraemon-yellow', theme.yellow);
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ rotate: 90 }}
        transition={{ duration: 0.3 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/60 hover:bg-white shadow-sm border border-gray-100 text-gray-700 transition-colors focus:outline-none"
        aria-label="Theme Settings"
      >
        <Settings className="w-5 h-5" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-50 origin-top-right"
            >
              <h3 className="text-sm font-bold text-gray-700 mb-3 px-1">Theme Colors</h3>
              <div className="flex flex-col gap-2">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => {
                      applyTheme(theme);
                      setIsOpen(false);
                    }}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl transition-colors ${
                      activeTheme === theme.id ? 'bg-gray-50 font-bold' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-5 h-5 rounded-full shadow-inner border border-black/10"
                        style={{ backgroundColor: theme.primary }}
                      />
                      <span className="text-sm text-gray-700">{theme.name}</span>
                    </div>
                    {activeTheme === theme.id && (
                      <Check className="w-4 h-4" style={{ color: theme.primary }} />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
