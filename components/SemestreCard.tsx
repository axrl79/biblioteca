'use client';

import { motion } from 'framer-motion';
import { BookOpen, FolderOpen, Layers, GraduationCap } from 'lucide-react';

interface SemestreCardProps {
  semesterId: string;
  semesterName: string;
  semesterNumber: number;
  color: string;
  onClick: () => void;
}

// Pick a different icon based on number to add visual variety
function getSemesterIcon(number: number) {
  if (number <= 3) return GraduationCap;
  if (number <= 6) return BookOpen;
  if (number <= 9) return Layers;
  return FolderOpen;
}

export function SemestreCard({
  semesterName,
  semesterNumber,
  color,
  onClick,
}: SemestreCardProps) {
  const Icon = getSemesterIcon(semesterNumber);
  const isSpecial = semesterNumber > 9;

  return (
    <motion.button
      onClick={onClick}
      className="group relative w-full text-left rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: '#fffaf5',
        border: '1px solid rgba(235, 224, 212, 0.6)',
        boxShadow: '0 2px 8px -2px rgba(61, 46, 34, 0.06)',
      }}
      whileHover={{
        y: -3,
        boxShadow: '0 12px 40px -8px rgba(61, 46, 34, 0.12), 0 4px 12px -4px rgba(61, 46, 34, 0.05)',
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Left accent bar — vertical, subtle */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 opacity-70 group-hover:opacity-100 transition-opacity"
        style={{ backgroundColor: color }}
      />

      <div className="p-4 sm:p-5 pl-5 sm:pl-6">
        <div className="flex items-center gap-3.5">
          {/* Icon — softly tinted bg */}
          <div
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
            style={{
              backgroundColor: `${color}12`,
              color: color,
            }}
          >
            <Icon className="w-5 h-5" strokeWidth={1.8} />
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm sm:text-[15px] font-semibold text-[#2d1f14] group-hover:text-[#1a1108] truncate leading-tight">
              {semesterName}
            </h3>
            <p className="text-[11px] text-[#8a7568] mt-1">
              {isSpecial ? 'Recursos adicionales' : `Semestre ${semesterNumber} · Material de estudio`}
            </p>
          </div>

          {/* Arrow indicator */}
          <div className="flex-shrink-0 text-[#b5a89c] group-hover:text-[#8a7568] transition-all duration-300 group-hover:translate-x-0.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </motion.button>
  );
}
