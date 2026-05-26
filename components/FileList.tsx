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
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0 },
};

export function FileList({ files, onPreview, onDownload }: FileListProps) {
  if (files.length === 0) return null;

  return (
    <div className="space-y-3">
      <p className="text-[11px] font-medium text-[#8a7568] uppercase tracking-[0.15em] px-1">
        Archivos · {files.length}
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
              className="group flex items-center gap-3 p-3 sm:p-3.5 rounded-xl transition-all duration-200 border border-transparent hover:border-[#ebe0d4] hover:bg-[#fffaf5]"
            >
              {/* Icon */}
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0 transition-all"
                style={{ background: '#f5ebe1' }}
              >
                {icon}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-[13px] sm:text-sm font-medium text-[#3d2e22] truncate group-hover:text-[#1a1108]">
                  {file.name}
                </p>
                {file.size && (
                  <p className="text-[11px] text-[#b5a89c] mt-0.5">
                    {formatFileSize(file.size)}
                  </p>
                )}
              </div>

              {/* Actions — always visible on mobile */}
              <div className="flex gap-1 flex-shrink-0">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPreview(file);
                  }}
                  className="h-9 w-9 p-0 rounded-lg text-[#c05621] hover:text-[#a0440a] hover:bg-[#f5ebe1] transition-colors"
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
                  className="h-9 w-9 p-0 rounded-lg text-[#8a6e42] hover:text-[#6b5530] hover:bg-[#f5ebe1] transition-colors"
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
