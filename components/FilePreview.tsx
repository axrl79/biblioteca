'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useIsMobile } from '@/hooks/use-mobile';
import { Download, X, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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

interface FilePreviewProps {
  fileId: string;
  fileName: string;
  mimeType: string;
  isOpen: boolean;
  onClose: () => void;
}

function PreviewContent({
  fileId,
  fileName,
  mimeType,
  onClose,
}: Omit<FilePreviewProps, 'isOpen'>) {
  const [previewData, setPreviewData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string>('');

  useEffect(() => {
    if (!fileId) return;

    const loadPreview = async () => {
      setLoading(true);
      try {
        const [previewResponse, downloadResponse] = await Promise.all([
          fetch(`/api/drive/preview?fileId=${encodeURIComponent(fileId)}`),
          fetch(`/api/drive/download?fileId=${encodeURIComponent(fileId)}`),
        ]);
        const preview = await previewResponse.json();
        const download = await downloadResponse.json();
        setPreviewData(preview);
        setDownloadUrl(download.downloadUrl || '');
      } catch (error) {
        console.error('Error loading preview:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPreview();
  }, [fileId]);

  const handleDownload = () => {
    if (downloadUrl) {
      window.open(downloadUrl, '_blank');
    }
  };

  const isOfficeFile = mimeType.includes('officedocument') || mimeType.includes('msword') || mimeType.includes('ms-excel') || mimeType.includes('ms-powerpoint');

  const canShowPreview =
    mimeType === 'application/pdf' ||
    mimeType.startsWith('image/') ||
    mimeType.includes('google-apps') ||
    isOfficeFile;

  return (
    <div className="flex flex-col h-full max-h-[90vh] sm:max-h-[85vh]">
      {/* Header */}
      <div className="flex-shrink-0 flex items-center justify-between gap-3 px-4 sm:px-6 py-3 sm:py-4 border-b-2" style={{ borderColor: 'var(--color-green-1)' }}>
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-sm sm:text-base text-slate-800 truncate">
            {fileName}
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">{mimeType.split('/').pop()}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8 hover:bg-red-50 hover:text-red-600 flex-shrink-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto bg-slate-50 p-3 sm:p-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-72 sm:h-96 gap-4">
            <Skeleton className="w-full h-full rounded-xl" />
          </div>
        ) : canShowPreview && previewData?.previewUrl ? (
          <motion.div
            className="w-full h-full"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
          >
            {mimeType === 'application/pdf' ? (
              <iframe
                src={previewData.previewUrl}
                className="w-full h-[60vh] sm:h-[65vh] border border-slate-200 rounded-xl shadow-sm"
                title={fileName}
              />
            ) : mimeType.startsWith('image/') ? (
              <img
                src={previewData.previewUrl}
                alt={fileName}
                className="max-w-full max-h-[65vh] mx-auto rounded-xl shadow-sm object-contain"
                onError={(e) => {
                  console.error('Image failed to load:', previewData.previewUrl);
                  e.currentTarget.src = 'https://placehold.co/600x400?text=Error+al+cargar+imagen';
                }}
              />
            ) : (
              <iframe
                src={previewData.previewUrl}
                className="w-full h-[60vh] sm:h-[65vh] border border-slate-200 rounded-xl shadow-sm"
                title={fileName}
                allowFullScreen
              />
            )}
          </motion.div>
        ) : (
          <motion.div
            className="flex flex-col items-center justify-center h-72 sm:h-96 gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-3xl">
              📄
            </div>
            <p className="text-sm text-slate-500 text-center">
              Este archivo no se puede previsualizar
            </p>
            <Button onClick={handleDownload} className="bg-green-600 hover:bg-green-700 text-white">
              <Download className="h-4 w-4 mr-2" />
              Descargar archivo
            </Button>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 flex items-center justify-between gap-2 px-4 sm:px-6 py-3 border-t border-slate-200 bg-white">
        <p className="text-[9px] text-slate-300 tracking-wide hidden sm:block">
          Ing. L. Pacosillo T.
        </p>
        <div className="flex items-center gap-2 ml-auto">
          <Button
            variant="outline"
            onClick={onClose}
            className="h-9 sm:h-10 text-sm"
          >
            Cerrar
          </Button>
          {downloadUrl && (
            <Button
              onClick={handleDownload}
              className="h-9 sm:h-10 text-sm bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
            >
              <Download className="h-4 w-4 mr-1.5" />
              Descargar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export function FilePreview({
  fileId,
  fileName,
  mimeType,
  isOpen,
  onClose,
}: FilePreviewProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DrawerContent className="max-h-[95vh]">
          <DrawerTitle className="sr-only">{fileName}</DrawerTitle>
          <DrawerDescription className="sr-only">
            Vista previa de {fileName}
          </DrawerDescription>
          <PreviewContent
            fileId={fileId}
            fileName={fileName}
            mimeType={mimeType}
            onClose={onClose}
          />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-3xl lg:max-w-4xl p-0 gap-0 rounded-2xl overflow-hidden"
      >
        <DialogTitle className="sr-only">{fileName}</DialogTitle>
        <DialogDescription className="sr-only">
          Vista previa de {fileName}
        </DialogDescription>
        <PreviewContent
          fileId={fileId}
          fileName={fileName}
          mimeType={mimeType}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}
