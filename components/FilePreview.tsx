'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Download, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface FilePreviewProps {
  fileId: string;
  fileName: string;
  mimeType: string;
  isOpen: boolean;
  onClose: () => void;
}

export function FilePreview({
  fileId,
  fileName,
  mimeType,
  isOpen,
  onClose,
}: FilePreviewProps) {
  const [previewData, setPreviewData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string>('');

  useEffect(() => {
    if (!isOpen || !fileId) return;

    const loadPreview = async () => {
      setLoading(true);
      try {
        // Obtener datos de previsualización
        const previewResponse = await fetch(
          `/api/drive/preview?fileId=${encodeURIComponent(fileId)}`
        );
        const preview = await previewResponse.json();
        setPreviewData(preview);

        // Obtener URL de descarga
        const downloadResponse = await fetch(
          `/api/drive/download?fileId=${encodeURIComponent(fileId)}`
        );
        const download = await downloadResponse.json();
        setDownloadUrl(download.downloadUrl || '');
      } catch (error) {
        console.error('[v0] Error loading preview:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPreview();
  }, [isOpen, fileId]);

  const handleDownload = () => {
    if (downloadUrl) {
      window.open(downloadUrl, '_blank');
    }
  };

  const canShowPreview =
    mimeType === 'application/pdf' ||
    mimeType.startsWith('image/') ||
    mimeType.includes('google-apps');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        aria-describedby="file-preview-description"
        className="w-full max-w-5xl max-h-[92vh] md:max-h-[88vh] p-0 flex flex-col bg-white rounded-none md:rounded-2xl overflow-hidden shadow-2xl md:fixed md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 fixed inset-0 md:inset-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-row items-center justify-between p-3 sm:p-6 border-b-2 bg-gradient-to-r from-slate-50 to-slate-100 sticky top-0 z-50"
          style={{ borderColor: 'var(--color-green-1)' }}
        >
          <DialogHeader className="flex-1 min-w-0">
            <DialogTitle className="truncate font-bold text-sm sm:text-lg text-slate-800">
              {fileName}
            </DialogTitle>
            <DialogDescription id="file-preview-description" className="sr-only">
              Vista previa del archivo y acciones para descargar o cerrar.
            </DialogDescription>
          </DialogHeader>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 sm:h-10 sm:w-10 hover:bg-red-100 min-h-12 min-w-12"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </motion.div>
        </motion.div>

        <motion.div 
          className="flex-1 overflow-auto p-3 sm:p-6 bg-slate-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {loading ? (
            <motion.div 
              className="flex items-center justify-center h-96"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="text-center">
                <Spinner />
                <p className="mt-4 text-slate-600 font-medium">Cargando vista previa...</p>
              </div>
            </motion.div>
          ) : canShowPreview && previewData?.previewUrl ? (
            <motion.div 
              className="w-full h-full flex flex-col"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {mimeType === 'application/pdf' ? (
                <motion.iframe
                  src={previewData.previewUrl}
                  className="w-full h-[55vh] md:h-[60vh] border-2 border-green-200 rounded-lg shadow-md"
                  title={fileName}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                />
              ) : mimeType.startsWith('image/') ? (
                <motion.img
                  src={previewData.previewUrl}
                  alt={fileName}
                  className="max-w-full max-h-[65vh] mx-auto rounded-lg shadow-lg object-contain"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                />
              ) : (
                <motion.iframe
                  src={previewData.previewUrl}
                  className="w-full h-[55vh] md:h-[60vh] border-2 border-green-200 rounded-lg shadow-md"
                  title={fileName}
                  allowFullScreen
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                />
              )}
            </motion.div>
          ) : (
            <motion.div 
              className="flex flex-col items-center justify-center h-96 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-muted-foreground text-lg">
                📄 Este archivo no se puede previsualizar en el navegador.
              </p>
              <p className="text-sm text-muted-foreground">Tipo: {mimeType}</p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button onClick={handleDownload} className="mt-4 bg-green-600 hover:bg-green-700">
                  <Download className="h-4 w-4 mr-2" />
                  Descargar archivo
                </Button>
              </motion.div>
            </motion.div>
          )}
        </motion.div>

        <motion.div 
          className="flex justify-end gap-2 sm:gap-3 p-3 sm:p-6 border-t-2 bg-white sticky bottom-0 flex-wrap"
          style={{ borderColor: 'var(--color-green-1)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1 sm:flex-none">
            <Button 
              variant="outline" 
              onClick={onClose} 
              className="border-2 border-slate-300 w-full sm:w-auto min-h-12"
            >
              Cerrar
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1 sm:flex-none">
            <Button
              onClick={handleDownload}
              style={{ backgroundColor: 'var(--color-orange)' }}
              className="text-white font-semibold w-full sm:w-auto min-h-12"
            >
              <Download className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Descargar</span>
              <span className="sm:hidden">Bajar</span>
            </Button>
          </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
