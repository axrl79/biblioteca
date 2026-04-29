'use client';

import { useState } from 'react';
import { useDriveFiles, isFolder, getFileIcon, formatFileSize } from '@/hooks/useDriveFiles';
import { FilePreview } from './FilePreview';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronDown, Download, Eye, Folder, FolderOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FileExplorerProps {
  folderId: string;
  semesterName: string;
}

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  webViewLink?: string;
  webContentLink?: string;
}

function FileItem({
  file,
  onPreview,
  onDownload,
  level = 0,
  variant = 'list',
}: {
  file: DriveFile;
  onPreview: (file: DriveFile) => void;
  onDownload: (fileId: string) => void;
  level?: number;
  variant?: 'list' | 'card';
}) {
  const [expanded, setExpanded] = useState(false);
  const { files: children, loading } = useDriveFiles(
    isFolder(file) && expanded ? file.id : null
  );

  const folder = isFolder(file);
  const icon = getFileIcon(file);
  const hasChildren = folder && children.length > 0;

  const bgStyles = {
    0: 'hover:bg-green-50',
    1: 'hover:bg-blue-50',
    2: 'hover:bg-purple-50',
  };

  const borderStyles = {
    0: 'border-l-4 border-green-300',
    1: 'border-l-4 border-blue-300',
    2: 'border-l-4 border-purple-300',
  };

  const borderColor = Object.values(borderStyles)[Math.min(level, 2)] || borderStyles[0];

  if (variant === 'card' && !folder) {
    return (
      <motion.div
        className="w-full h-full"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <div className="h-full min-h-[150px] rounded-xl border border-slate-200 bg-white/90 shadow-sm hover:shadow-lg transition-all duration-200 p-4 flex flex-col gap-3 overflow-visible">
          <div className="flex items-start gap-3">
            <div className="text-2xl sm:text-3xl">{icon}</div>
            <div className="min-w-0 flex-1">
              <p className="text-sm sm:text-base font-semibold text-slate-800 truncate">
                {file.name}
              </p>
              {file.size && (
                <p className="text-xs text-muted-foreground mt-1">
                  {formatFileSize(file.size)}
                </p>
              )}
            </div>
          </div>

          <div className="mt-auto flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                onPreview(file);
              }}
              className="flex-1 h-9 text-xs border-green-300 hover:bg-green-50 hover:text-green-700"
            >
              <Eye className="h-3.5 w-3.5 mr-1" />
              Ver
            </Button>
            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onDownload(file.id);
              }}
              style={{ backgroundColor: 'var(--color-orange)' }}
              className="flex-1 h-9 text-xs text-white hover:opacity-90"
            >
              <Download className="h-3.5 w-3.5 mr-1" />
              Descargar
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="space-y-0 w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className={`flex flex-wrap items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg ${Object.values(bgStyles)[Math.min(level, 2)] || bgStyles[0]} group transition-all duration-200 cursor-pointer border border-transparent hover:border-green-200`}
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => folder && setExpanded(!expanded)}
      >
        {/* Chevron - siempre reservar espacio */}
        <div className="flex-shrink-0 w-5">
          {folder && (
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(!expanded);
              }}
              className="flex-shrink-0 p-0 inline-flex items-center justify-center"
              animate={{ rotate: expanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight className="h-5 w-5 text-green-600 font-bold" />
            </motion.button>
          )}
        </div>

        {/* Icon */}
        <motion.span 
          className="text-lg sm:text-xl flex-shrink-0"
          whileHover={{ scale: 1.2 }}
          transition={{ duration: 0.2 }}
        >
          {folder ? (expanded ? <FolderOpen className="w-5 h-5" /> : <Folder className="w-5 h-5" />) : icon}
        </motion.span>

        {/* Name and size */}
        <div className="flex-1 min-w-0 basis-full sm:basis-auto">
          <p
            className={`text-xs sm:text-sm font-${folder ? 'semibold' : 'medium'} text-dark-gray group-hover:font-bold transition-all break-words whitespace-normal line-clamp-3`}
            title={file.name}
          >
            {file.name}
          </p>
          <div className="flex gap-2 items-center">
            {file.size && !folder && (
              <p className="text-[10px] sm:text-xs text-muted-foreground">
                {formatFileSize(file.size)}
              </p>
            )}
            {folder && children.length > 0 && (
              <p className="text-[10px] sm:text-xs text-green-600 font-medium">
                {children.length} elemento{children.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>
        </div>

        {/* Actions - always visible to avoid clipping */}
        {!folder && (
          <motion.div 
            className="flex gap-1 sm:gap-2 opacity-100 transition-opacity flex-shrink-0 w-full sm:w-auto sm:ml-auto"
            initial={{ x: 10 }}
            whileHover={{ x: 0 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  onPreview(file);
                }}
                className="h-8 sm:h-9 px-2 sm:px-2.5 text-xs border-green-300 hover:bg-green-50 hover:text-green-700"
              >
                <Eye className="h-3.5 w-3.5 sm:mr-1" />
                <span className="hidden sm:inline">Ver</span>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onDownload(file.id);
                }}
                style={{ backgroundColor: 'var(--color-orange)' }}
                className="h-8 sm:h-9 px-2 sm:px-2.5 text-xs text-white hover:opacity-90"
              >
                <Download className="h-3.5 w-3.5 sm:mr-1" />
                <span className="hidden sm:inline">Descargar</span>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </motion.div>

      {/* Subcarpetas/Contenido */}
      <AnimatePresence>
        {folder && expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className={`ml-2 ${borderColor} pl-2 sm:pl-3 py-1 sm:py-2 space-y-1`}>
              {loading ? (
                <motion.div 
                  className="p-3 sm:p-4 text-sm text-muted-foreground text-center"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="inline-block">Cargando carpetas y archivos...</span>
                </motion.div>
              ) : children.length > 0 ? (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.05,
                      },
                    },
                  }}
                  className="space-y-1"
                >
                  {/* Mostrar carpetas primero */}
                  {children.filter(f => isFolder(f)).map((child) => (
                    <motion.div
                      key={child.id}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 },
                      }}
                    >
                      <FileItem
                        file={child}
                        onPreview={onPreview}
                        onDownload={onDownload}
                        level={level + 1}
                      />
                    </motion.div>
                  ))}
                  {/* Luego mostrar archivos */}
                  {children.filter(f => !isFolder(f)).map((child) => (
                    <motion.div
                      key={child.id}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 },
                      }}
                    >
                      <FileItem
                        file={child}
                        onPreview={onPreview}
                        onDownload={onDownload}
                        level={level + 1}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="p-3 text-sm text-muted-foreground text-center italic">
                  Carpeta vacía
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FileExplorer({ folderId, semesterName }: FileExplorerProps) {
  const { files, loading, error } = useDriveFiles(folderId);
  const [selectedFile, setSelectedFile] = useState<DriveFile | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleDownload = async (fileId: string) => {
    try {
      const response = await fetch(
        `/api/drive/download?fileId=${encodeURIComponent(fileId)}`
      );
      const data = await response.json();
      if (data.downloadUrl) {
        window.open(data.downloadUrl, '_blank');
      }
    } catch (error) {
      console.error('[v0] Error downloading file:', error);
    }
  };

  const handlePreview = (file: DriveFile) => {
    setSelectedFile(file);
    setShowPreview(true);
  };

  // Separar carpetas y archivos
  const folders = files.filter(f => isFolder(f));
  const documents = files.filter(f => !isFolder(f));

  return (
    <motion.div 
      className="w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header del Semestre */}
      <motion.div 
        className="mb-6 p-4 sm:p-5 rounded-lg border-2 bg-gradient-to-r"
        style={{ 
          borderColor: 'var(--color-green-2)', 
          backgroundImage: `linear-gradient(135deg, var(--color-green-5)20, var(--color-green-4)20)`
        }}
        whileHover={{ scale: 1.02 }}
      >
        <h3 className="font-bold text-dark-gray text-base sm:text-lg">{semesterName}</h3>
        <div className="flex flex-col sm:flex-row gap-2 text-xs text-slate-600 mt-2 font-medium">
          <span>📁 {folders.length} carpeta{folders.length !== 1 ? 's' : ''}</span>
          <span>📄 {documents.length} archivo{documents.length !== 1 ? 's' : ''}</span>
        </div>
      </motion.div>

      {/* Error Message */}
      {error && (
        <motion.div 
          className="p-4 rounded-lg bg-red-50 border-2 border-red-200 mb-4"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <p className="text-sm text-red-600">⚠️ Error: {error}</p>
        </motion.div>
      )}

      {/* Loading State */}
      {loading ? (
        <motion.div 
          className="p-8 sm:p-12 text-center"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="inline-block">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-8 h-8 border-3 border-green-300 border-t-green-700 rounded-full mb-3"
            />
            <p className="text-muted-foreground text-sm">Cargando archivos y carpetas...</p>
          </div>
        </motion.div>
      ) : files.length > 0 ? (
        <motion.div 
          className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Sección de Carpetas */}
          {folders.length > 0 && (
            <div className="md:col-span-1">
              <h4 className="text-xs sm:text-sm font-semibold text-green-700 mb-2 px-4 uppercase tracking-wide">
                📁 Carpetas ({folders.length})
              </h4>
              <motion.div 
                className="space-y-1"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.03,
                    },
                  },
                }}
              >
                {folders.map((file) => (
                  <motion.div
                    key={file.id}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                  >
                    <FileItem
                      file={file}
                      onPreview={handlePreview}
                      onDownload={handleDownload}
                      level={0}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}

          {/* Sección de Archivos */}
          {documents.length > 0 && (
            <div className="md:col-span-1">
              <h4 className="text-xs sm:text-sm font-semibold text-blue-700 mb-2 px-4 uppercase tracking-wide">
                📄 Archivos ({documents.length})
              </h4>
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 auto-rows-fr items-stretch"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.03,
                    },
                  },
                }}
              >
                {documents.map((file) => (
                  <motion.div
                    key={file.id}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                  >
                    <FileItem
                      file={file}
                      onPreview={handlePreview}
                      onDownload={handleDownload}
                      level={0}
                      variant="card"
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}
        </motion.div>
      ) : (
        <motion.div 
          className="p-8 sm:p-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-muted-foreground text-sm">
            📂 No hay archivos en esta carpeta
          </p>
        </motion.div>
      )}

      {/* Preview Modal */}
      <AnimatePresence>
        {selectedFile && (
          <FilePreview
            fileId={selectedFile.id}
            fileName={selectedFile.name}
            mimeType={selectedFile.mimeType}
            isOpen={showPreview}
            onClose={() => {
              setShowPreview(false);
              setSelectedFile(null);
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
