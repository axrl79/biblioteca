'use client';

import { motion } from 'framer-motion';
import { FaHome, FaSearch, FaHeart, FaCog } from 'react-icons/fa';
import { useState } from 'react';

interface MobileNavProps {
  activeTab: 'home' | 'search' | 'favorites' | 'settings';
  onTabChange: (tab: 'home' | 'search' | 'favorites' | 'settings') => void;
}

export function MobileNav({ activeTab, onTabChange }: MobileNavProps) {
  const tabs = [
    { id: 'home', label: 'Inicio', icon: FaHome },
    { id: 'search', label: 'Buscar', icon: FaSearch },
    { id: 'favorites', label: 'Favoritos', icon: FaHeart },
    { id: 'settings', label: 'Ajustes', icon: FaCog },
  ];

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden glassmorphism border-t border-slate-200 safe-area-inset-bottom"
    >
      <div className="flex items-center justify-around h-20 px-2 backdrop-blur-xl bg-white/70 border-t-2" style={{ borderColor: 'var(--color-green-1)' }}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id as any)}
              className="relative flex flex-col items-center justify-center flex-1 h-full gap-1 group"
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{
                  scale: isActive ? 1.2 : 1,
                  color: isActive ? 'var(--color-green-1)' : '#6b7280',
                }}
                transition={{ duration: 0.2 }}
                className="text-lg"
              >
                <Icon />
              </motion.div>

              <span
                className={`text-[10px] font-semibold transition-colors duration-200 ${
                  isActive ? 'text-green-700' : 'text-slate-600'
                }`}
              >
                {tab.label}
              </span>

              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full"
                  style={{ backgroundColor: 'var(--color-green-1)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
