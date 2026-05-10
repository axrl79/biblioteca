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

const FOLDER_COLORS = [
  { bg: 'bg-emerald-50', border: 'border-emerald-200', icon: 'text-emerald-600', hover: 'hover:border-emerald-400 hover:shadow-emerald-100' },
  { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'text-blue-600', hover: 'hover:border-blue-400 hover:shadow-blue-100' },
  { bg: 'bg-violet-50', border: 'border-violet-200', icon: 'text-violet-600', hover: 'hover:border-violet-400 hover:shadow-violet-100' },
  { bg: 'bg-amber-50', border: 'border-amber-200', icon: 'text-amber-600', hover: 'hover:border-amber-400 hover:shadow-amber-100' },
  { bg: 'bg-rose-50', border: 'border-rose-200', icon: 'text-rose-600', hover: 'hover:border-rose-400 hover:shadow-rose-100' },
  { bg: 'bg-cyan-50', border: 'border-cyan-200', icon: 'text-cyan-600', hover: 'hover:border-cyan-400 hover:shadow-cyan-100' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1 },
};

export function FolderGrid({ folders, onFolderClick }: FolderGridProps) {
  if (folders.length === 0) return null;

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-1">
        📁 Carpetas ({folders.length})
      </p>
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {folders.map((folder, index) => {
          const color = FOLDER_COLORS[index % FOLDER_COLORS.length];
          return (
            <motion.button
              key={folder.id}
              variants={item}
              onClick={() => onFolderClick(folder)}
              className={`group relative flex flex-col items-start gap-2.5 p-3.5 sm:p-4 rounded-xl border ${color.bg} ${color.border} ${color.hover} transition-all duration-200 text-left hover:shadow-md active:scale-[0.97]`}
              whileTap={{ scale: 0.97 }}
            >
              <div className={`p-2 rounded-lg bg-white/80 shadow-sm ${color.icon}`}>
                <Folder className="w-5 h-5" />
              </div>
              <p className="text-[13px] sm:text-sm font-semibold text-slate-800 leading-tight line-clamp-2 w-full">
                {folder.name}
              </p>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}
