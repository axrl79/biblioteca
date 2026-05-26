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
      className="flex flex-col items-center justify-center py-14 sm:py-20 px-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div
        className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mb-5"
        style={{ background: '#f5ebe1' }}
      >
        {isSearch ? (
          <Search className="w-7 h-7 sm:w-9 sm:h-9 text-[#b5a89c]" />
        ) : (
          <FolderOpen className="w-7 h-7 sm:w-9 sm:h-9 text-[#b5a89c]" />
        )}
      </div>
      <p className="text-sm sm:text-base font-medium text-[#6b5c50] text-center">
        {message || (isSearch ? 'No se encontraron resultados' : 'Esta carpeta está vacía')}
      </p>
      <p className="text-xs text-[#b5a89c] mt-2 text-center max-w-xs">
        {isSearch ? 'Intenta con otro término de búsqueda' : 'No hay archivos ni carpetas aquí por el momento'}
      </p>
    </motion.div>
  );
}
