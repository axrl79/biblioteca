'use client';

import { motion } from 'framer-motion';
import { FaHome, FaSearch, FaHeart, FaCog } from 'react-icons/fa';

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
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
      style={{
        background: 'rgba(253, 248, 243, 0.92)',
        backdropFilter: 'blur(20px) saturate(1.3)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.3)',
        borderTop: '1px solid rgba(235, 224, 212, 0.6)',
        paddingBottom: 'max(0px, env(safe-area-inset-bottom))',
      }}
    >
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id as any)}
              className="relative flex flex-col items-center justify-center flex-1 h-full gap-1 min-h-[48px]"
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                animate={{
                  scale: isActive ? 1.1 : 1,
                  color: isActive ? '#c05621' : '#8a7568',
                }}
                transition={{ duration: 0.2 }}
                className="text-base"
              >
                <Icon />
              </motion.div>

              <span
                className="text-[10px] font-medium transition-colors duration-200"
                style={{ color: isActive ? '#c05621' : '#8a7568' }}
              >
                {tab.label}
              </span>

              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 w-5 h-0.5 rounded-full"
                  style={{ backgroundColor: '#c05621' }}
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
