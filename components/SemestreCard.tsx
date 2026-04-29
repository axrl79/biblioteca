'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileExplorer } from './FileExplorer';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGraduationCap, FaFolder } from 'react-icons/fa';

interface SemestreCardProps {
  semesterId: string;
  semesterName: string;
  semesterNumber: number;
  color: string;
}

export function SemestreCard({
  semesterId,
  semesterName,
  semesterNumber,
  color,
}: SemestreCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02, y: -4 }}
    >
      <Card
        className="overflow-visible shadow-lg hover:shadow-2xl transition-all duration-300 border-2 cursor-pointer"
        style={{
          borderColor: color,
          background: expanded ? 'white' : `${color}08`,
        }}
      >
        <motion.div
          className="h-1"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: expanded ? '100%' : '0%' }}
          transition={{ duration: 0.3 }}
        />

        <CardHeader
          className="p-4 sm:p-6 transition-all cursor-pointer"
          style={{
            background: `linear-gradient(135deg, ${color}20, ${color}10)`,
            borderBottom: expanded ? `2px solid ${color}` : 'none',
          }}
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
              <motion.div
                animate={{ rotate: expanded ? 20 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-xl sm:text-2xl flex-shrink-0"
                style={{ color }}
              >
                <FaGraduationCap />
              </motion.div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-base sm:text-lg font-bold truncate" style={{ color }}>
                  {semesterName}
                </CardTitle>
                <p className="text-xs text-slate-500 mt-0.5 sm:mt-1 truncate">
                  Sem {semesterNumber}
                </p>
              </div>
            </div>
            <motion.div
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0"
            >
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 sm:h-10 sm:w-10 hover:bg-white/40 min-h-12 min-w-12"
                style={{ color }}
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded(!expanded);
                }}
              >
                <ChevronDown className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </CardHeader>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <CardContent className="p-3 sm:p-6 lg:p-7 bg-white/50 backdrop-blur-sm">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                >
                  <div className="flex items-center gap-2 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-slate-200">
                    <FaFolder style={{ color }} />
                    <span className="font-semibold text-slate-700 text-sm sm:text-base">Documentos</span>
                  </div>
                  <FileExplorer folderId={semesterId} semesterName={semesterName} />
                </motion.div>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}
