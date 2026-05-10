'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Eye, Download } from 'lucide-react';
import { getFileIcon, formatFileSize } from '@/hooks/useDriveFiles';

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  webViewLink?: string;
  webContentLink?: string;
}

interface FileListProps {
  files: DriveFile[];
  onPreview: (file: DriveFile) => void;
  onDownload: (fileId: string) => void;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.03 },
  },
};

const item = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0 },
};

export function FileList({ files, onPreview, onDownload }: FileListProps) {
  if (files.length === 0) return null;

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-1">
        📄 Archivos ({files.length})
      </p>
      <motion.div
        className="space-y-1"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {files.map((file) => {
          const icon = getFileIcon(file);
          return (
            <motion.div
              key={file.id}
              variants={item}
              className="group flex items-center gap-3 p-2.5 sm:p-3 rounded-xl hover:bg-slate-50 transition-all duration-200 border border-transparent hover:border-slate-200"
            >
              {/* Icon */}
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-slate-100 flex items-center justify-center text-lg flex-shrink-0 group-hover:bg-white group-hover:shadow-sm transition-all">
                {icon}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-[13px] sm:text-sm font-medium text-slate-800 truncate group-hover:text-slate-900">
                  {file.name}
                </p>
                {file.size && (
                  <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
                    {formatFileSize(file.size)}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-1.5 flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPreview(file);
                  }}
                  className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDownload(file.id);
                  }}
                  className="h-8 w-8 p-0 text-orange-500 hover:text-orange-600 hover:bg-orange-50"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
