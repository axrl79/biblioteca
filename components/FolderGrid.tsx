'use client';

import { motion } from 'framer-motion';
import { Folder } from 'lucide-react';

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  webViewLink?: string;
  webContentLink?: string;
}

interface FolderGridProps {
  folders: DriveFile[];
  onFolderClick: (folder: DriveFile) => void;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1 },
};

export function FolderGrid({ folders, onFolderClick }: FolderGridProps) {
  if (folders.length === 0) return null;

  return (
    <div className="space-y-3">
      <p className="text-[11px] font-medium text-[#8a7568] uppercase tracking-[0.15em] px-1">
        Carpetas · {folders.length}
      </p>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {folders.map((folder) => (
          <motion.button
            key={folder.id}
            variants={item}
            onClick={() => onFolderClick(folder)}
            className="group relative flex items-center gap-3 p-3.5 sm:p-4 rounded-xl text-left transition-all duration-200 active:scale-[0.97]"
            style={{
              background: '#fffaf5',
              border: '1px solid rgba(235, 224, 212, 0.6)',
              boxShadow: '0 1px 4px rgba(61, 46, 34, 0.04)',
            }}
            whileTap={{ scale: 0.97 }}
            whileHover={{
              boxShadow: '0 4px 16px -4px rgba(61, 46, 34, 0.10)',
            }}
          >
            <div
              className="p-2 rounded-lg flex-shrink-0"
              style={{ background: '#f5ebe1', color: '#c05621' }}
            >
              <Folder className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <p className="text-[13px] sm:text-sm font-medium text-[#3d2e22] leading-tight line-clamp-2 w-full">
              {folder.name}
            </p>
            <svg className="w-4 h-4 flex-shrink-0 text-[#b5a89c] group-hover:text-[#8a7568] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
