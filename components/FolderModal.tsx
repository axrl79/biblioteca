'use client';

import { useState, useCallback, useEffect } from 'react';
import { useDriveFiles, isFolder } from '@/hooks/useDriveFiles';
import { useIsMobile } from '@/hooks/use-mobile';
import { Breadcrumbs, type BreadcrumbItem } from './Breadcrumbs';
import { FolderGrid } from './FolderGrid';
import { FileList } from './FileList';
import { EmptyState } from './EmptyState';
import { ContentSkeleton } from './SkeletonLoader';
import { FilePreview } from './FilePreview';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, FolderOpen } from 'lucide-react';

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  webViewLink?: string;
  webContentLink?: string;
}

interface FolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  semesterId: string;
  semesterName: string;
  semesterColor: string;
}

function FolderContent({
  folderId,
  semesterName,
  semesterColor,
  breadcrumbs,
  onNavigateFolder,
  onNavigateBreadcrumb,
  onClose,
}: {
  folderId: string;
  semesterName: string;
  semesterColor: string;
  breadcrumbs: BreadcrumbItem[];
  onNavigateFolder: (folder: DriveFile) => void;
  onNavigateBreadcrumb: (index: number) => void;
  onClose: () => void;
}) {
  const { files, loading, error } = useDriveFiles(folderId);
  const [searchTerm, setSearchTerm] = useState('');
  const [previewFile, setPreviewFile] = useState<DriveFile | null>(null);

  const folders = files.filter((f) => isFolder(f));
  const documents = files.filter((f) => !isFolder(f));

  const filteredFolders = searchTerm
    ? folders.filter((f) => f.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : folders;
  const filteredDocuments = searchTerm
    ? documents.filter((f) => f.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : documents;

  const handleDownload = async (fileId: string) => {
    try {
      const response = await fetch(`/api/drive/download?fileId=${encodeURIComponent(fileId)}`);
      const data = await response.json();
      if (data.downloadUrl) {
        window.open(data.downloadUrl, '_blank');
      }
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const handlePreview = (file: DriveFile) => {
    setPreviewFile(file);
  };

  return (
    <>
      <div className="flex flex-col h-full max-h-[85vh] sm:max-h-[80vh]">
        {/* Header */}
        <div
          className="flex-shrink-0 border-b-2 px-4 sm:px-6 pt-2 pb-3 sm:py-4"
          style={{ borderColor: semesterColor }}
        >
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <div
                className="p-2 rounded-lg flex-shrink-0"
                style={{ backgroundColor: `${semesterColor}20`, color: semesterColor }}
              >
                <FolderOpen className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h2 className="font-bold text-base sm:text-lg text-slate-800 truncate">
                {semesterName}
              </h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 sm:h-9 sm:w-9 hover:bg-red-50 hover:text-red-600 flex-shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Breadcrumbs */}
          {breadcrumbs.length > 0 && (
            <Breadcrumbs items={breadcrumbs} onNavigate={onNavigateBreadcrumb} />
          )}
        </div>

        {/* Search */}
        <div className="flex-shrink-0 px-4 sm:px-6 py-3 border-b border-slate-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Buscar en esta carpeta..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 h-9 sm:h-10 text-sm border-slate-200 rounded-xl focus:border-green-400 focus:ring-green-200/50"
            />
          </div>
        </div>

        {/* Content */}
        <ScrollArea className="flex-1 overflow-auto">
          <div className="px-4 sm:px-6 py-4 space-y-5">
            {loading ? (
              <ContentSkeleton />
            ) : error ? (
              <motion.div
                className="p-4 rounded-xl bg-red-50 border border-red-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-sm text-red-600">⚠️ Error: {error}</p>
              </motion.div>
            ) : filteredFolders.length === 0 && filteredDocuments.length === 0 ? (
              <EmptyState type={searchTerm ? 'search' : 'folder'} />
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={folderId}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  <FolderGrid folders={filteredFolders} onFolderClick={onNavigateFolder} />
                  <FileList
                    files={filteredDocuments}
                    onPreview={handlePreview}
                    onDownload={handleDownload}
                  />
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="flex-shrink-0 border-t border-slate-200 px-4 sm:px-6 py-3 bg-slate-50/80 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500">
              {!loading && (
                <>
                  {folders.length > 0 && (
                    <span>📁 {folders.length} carpeta{folders.length !== 1 ? 's' : ''}</span>
                  )}
                  {folders.length > 0 && documents.length > 0 && <span> · </span>}
                  {documents.length > 0 && (
                    <span>📄 {documents.length} archivo{documents.length !== 1 ? 's' : ''}</span>
                  )}
                  {folders.length === 0 && documents.length === 0 && <span>Carpeta vacía</span>}
                </>
              )}
            </p>
            <p className="text-[9px] text-slate-300 tracking-wide">
              Ing. L. Pacosillo T.
            </p>
          </div>
        </div>
      </div>

      {/* File Preview Modal */}
      {previewFile && (
        <FilePreview
          fileId={previewFile.id}
          fileName={previewFile.name}
          mimeType={previewFile.mimeType}
          isOpen={!!previewFile}
          onClose={() => setPreviewFile(null)}
        />
      )}
    </>
  );
}

export function FolderModal({
  isOpen,
  onClose,
  semesterId,
  semesterName,
  semesterColor,
}: FolderModalProps) {
  const isMobile = useIsMobile();
  const [folderStack, setFolderStack] = useState<BreadcrumbItem[]>([]);
  const currentFolderId = folderStack.length > 0 ? folderStack[folderStack.length - 1].id : semesterId;

  // Reset stack when modal opens with a new semester
  useEffect(() => {
    if (isOpen) {
      setFolderStack([]);
    }
  }, [isOpen, semesterId]);

  const handleNavigateFolder = useCallback((folder: DriveFile) => {
    setFolderStack((prev) => [...prev, { id: folder.id, name: folder.name }]);
  }, []);

  const handleNavigateBreadcrumb = useCallback((index: number) => {
    // index 0 = root (semesterId), so we clear the stack
    if (index === 0) {
      setFolderStack([]);
    } else {
      setFolderStack((prev) => prev.slice(0, index));
    }
  }, []);

  const content = (
    <FolderContent
      folderId={currentFolderId}
      semesterName={semesterName}
      semesterColor={semesterColor}
      breadcrumbs={folderStack}
      onNavigateFolder={handleNavigateFolder}
      onNavigateBreadcrumb={handleNavigateBreadcrumb}
      onClose={onClose}
    />
  );

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DrawerContent className="max-h-[92vh]">
          <DrawerTitle className="sr-only">{semesterName}</DrawerTitle>
          <DrawerDescription className="sr-only">
            Explorador de archivos de {semesterName}
          </DrawerDescription>
          {content}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-2xl lg:max-w-3xl p-0 gap-0 rounded-2xl overflow-hidden"
      >
        <DialogTitle className="sr-only">{semesterName}</DialogTitle>
        <DialogDescription className="sr-only">
          Explorador de archivos de {semesterName}
        </DialogDescription>
        {content}
      </DialogContent>
    </Dialog>
  );
}
