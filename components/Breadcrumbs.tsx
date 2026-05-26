'use client';

import { motion } from 'framer-motion';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  id: string;
  name: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate: (index: number) => void;
}

export function Breadcrumbs({ items, onNavigate }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-1 text-sm overflow-x-auto scrollbar-hide py-1.5">
      <motion.button
        onClick={() => onNavigate(0)}
        className="flex items-center gap-1.5 text-[#c05621] hover:text-[#a0440a] font-medium flex-shrink-0 px-2 py-1.5 rounded-lg hover:bg-[#f5ebe1] transition-colors min-h-[36px]"
        whileTap={{ scale: 0.95 }}
      >
        <Home className="w-3.5 h-3.5" />
        <span className="hidden sm:inline text-[13px]">Inicio</span>
      </motion.button>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <motion.div
            key={item.id}
            className="flex items-center gap-1 flex-shrink-0"
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
          >
            <ChevronRight className="w-3.5 h-3.5 text-[#b5a89c] flex-shrink-0" />
            {isLast ? (
              <span className="font-semibold text-[#3d2e22] truncate max-w-[120px] sm:max-w-[200px] text-[13px]">
                {item.name}
              </span>
            ) : (
              <button
                onClick={() => onNavigate(index + 1)}
                className="text-[#c05621] hover:text-[#a0440a] font-medium truncate max-w-[100px] sm:max-w-[150px] px-2 py-1.5 rounded-lg hover:bg-[#f5ebe1] transition-colors text-[13px] min-h-[36px]"
              >
                {item.name}
              </button>
            )}
          </motion.div>
        );
      })}
    </nav>
  );
}
