'use client';

import { motion } from 'framer-motion';
import { FolderOpen, Search } from 'lucide-react';

interface EmptyStateProps {
  type?: 'folder' | 'search';
  message?: string;
}

export function EmptyState({ type = 'folder', message }: EmptyStateProps) {
  const isSearch = type === 'search';

  return (
    <motion.div
      className="flex flex-col items-center justify-center py-12 sm:py-16 px-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-100 flex items-center justify-center mb-4"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        {isSearch ? (
          <Search className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400" />
        ) : (
          <FolderOpen className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400" />
        )}
      </motion.div>
      <p className="text-sm sm:text-base font-medium text-slate-500 text-center">
        {message || (isSearch ? 'No se encontraron resultados' : 'Esta carpeta está vacía')}
      </p>
      <p className="text-xs text-slate-400 mt-1 text-center">
        {isSearch ? 'Intenta con otro término de búsqueda' : 'No hay archivos ni carpetas aquí'}
      </p>
    </motion.div>
  );
}
