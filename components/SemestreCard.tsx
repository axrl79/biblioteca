'use client';

import { motion } from 'framer-motion';
import { FaGraduationCap } from 'react-icons/fa';
import { ChevronRight } from 'lucide-react';

interface SemestreCardProps {
  semesterId: string;
  semesterName: string;
  semesterNumber: number;
  color: string;
  onClick: () => void;
}

const SEMESTER_GRADIENTS: Record<number, string> = {
  1: 'from-emerald-500 to-green-600',
  2: 'from-blue-500 to-indigo-600',
  3: 'from-violet-500 to-purple-600',
  4: 'from-amber-500 to-orange-600',
  5: 'from-rose-500 to-pink-600',
  6: 'from-cyan-500 to-teal-600',
  7: 'from-lime-500 to-green-600',
  8: 'from-fuchsia-500 to-purple-600',
  9: 'from-sky-500 to-blue-600',
};

export function SemestreCard({
  semesterName,
  semesterNumber,
  color,
  onClick,
}: SemestreCardProps) {
  const gradient = SEMESTER_GRADIENTS[semesterNumber] || 'from-green-500 to-emerald-600';

  return (
    <motion.button
      onClick={onClick}
      className="group relative w-full text-left rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Top gradient bar */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${gradient}`} />

      <div className="p-4 sm:p-5">
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Icon */}
          <motion.div
            className={`w-11 h-11 sm:w-13 sm:h-13 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-md flex-shrink-0`}
            whileHover={{ rotate: 10 }}
            transition={{ duration: 0.2 }}
          >
            <FaGraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm sm:text-base font-bold text-slate-800 group-hover:text-slate-900 truncate">
              {semesterName}
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
              Semestre {semesterNumber}
            </p>
          </div>

          {/* Arrow */}
          <motion.div
            className="flex-shrink-0 text-slate-400 group-hover:text-slate-600"
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
          >
            <ChevronRight className="w-5 h-5" />
          </motion.div>
        </div>
      </div>

      {/* Discrete branding */}
      <div className="px-4 sm:px-5 pb-2">
        <p className="text-[8px] sm:text-[9px] text-slate-300 text-right tracking-wide">
          Ing. L. Pacosillo T.
        </p>
      </div>

      {/* Hover glow effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
        style={{
          boxShadow: `inset 0 0 0 2px ${color}`,
        }}
      />
    </motion.button>
  );
}
