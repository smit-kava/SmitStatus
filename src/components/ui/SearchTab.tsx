import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import SearchModal from './SearchModal'

const SearchTab = () => {
    const [isHovered, setIsHovered] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    // Liquid glass style from Navbar
    const glassStyle: React.CSSProperties = {
        background: [
            "linear-gradient(135deg,",
            "  rgba(255,255,255,0.22) 0%,",
            "  rgba(200,232,255,0.14) 40%,",
            "  rgba(255,255,255,0.10) 100%)",
        ].join(""),
        backdropFilter: "blur(28px) saturate(200%) brightness(1.08)",
        WebkitBackdropFilter: "blur(28px) saturate(200%) brightness(1.08)",
        border: "1px solid rgba(255,255,255,0.45)",
        outline: isHovered ? "1px solid rgba(0,163,255,0.3)" : "1px solid rgba(0,130,200,0.10)",
        outlineOffset: "-2px",
        boxShadow: isHovered
            ? [
                "0 0 0 1px rgba(255,255,255,0.15) inset",
                "0 1px 0 rgba(255,255,255,0.6) inset",
                "0 4px 20px -2px rgba(0,163,255,0.25)",
                "0 8px 32px -6px rgba(0,90,160,0.2)"
            ].join(", ")
            : [
                "0 0 0 1px rgba(255,255,255,0.12) inset",
                "0 1px 0 rgba(255,255,255,0.55) inset",
                "0 -1px 0 rgba(0,80,140,0.08) inset",
                "0 8px 32px -6px rgba(0,90,160,0.18)",
                "0 2px 8px -2px rgba(0,130,200,0.12)",
            ].join(", "),
        transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
    }

    // Global shortcut listener for Ctrl+K
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setIsModalOpen(true);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <>
            <div className="relative w-full">
                <motion.button
                    onClick={() => setIsModalOpen(true)}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    whileTap={{ scale: 0.98 }}
                    className="relative flex items-center w-full rounded-[14px] overflow-hidden text-left"
                    style={glassStyle}
                >
                    {/* Search Icon */}
                    <div className="pl-3 pr-2 py-2 flex items-center justify-center text-[#0080c8]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "drop-shadow(0 2px 4px rgba(0,100,148,0.15))" }}>
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </div>

                    <div className="w-full py-2 bg-transparent text-slate-500/80 font-semibold text-sm">
                        Search...
                    </div>

                    {/* Ctrl+K Badge */}
                    <div className="pr-3 flex items-center justify-center min-w-[70px]">
                        <div
                            className="pointer-events-none flex items-center justify-center px-1.5 py-0.5 rounded-md text-[10px] font-bold text-slate-400/90 border border-slate-300/40 bg-slate-100/30 shadow-sm"
                            style={{ backdropFilter: 'blur(4px)', fontFamily: 'ui-rounded, system-ui, sans-serif' }}
                        >
                            Ctrl + K
                        </div>
                    </div>

                    {/* Water ripple shimmer overlay effect on hover */}
                    {isHovered && (
                        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[14px]">
                            <motion.div
                                className="absolute top-0 h-full w-1/2 opacity-30"
                                style={{
                                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
                                    filter: "blur(6px)",
                                }}
                                animate={{ x: ["-100%", "200%"] }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                            />
                        </div>
                    )}
                </motion.button>
            </div>

            {/* Separate Command Palette Modal Component */}
            <SearchModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    )
}

export default SearchTab
