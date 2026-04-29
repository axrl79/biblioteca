'use client';

import { useDriveFiles } from '@/hooks/useDriveFiles';
import { SemestreCard } from './SemestreCard';
import { Input } from '@/components/ui/input';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaBook, FaSearch } from 'react-icons/fa';
import { MobileNav } from './MobileNav';
import { SearchModal } from './SearchModal';

interface Semestre {
  id: string;
  name: string;
  number: number;
}

interface BibliotecaLayoutProps {
  rootFolderId: string;
  semesters: Semestre[];
}

const COLORS = [
  'var(--color-green-1)',
  'var(--color-green-2)',
  'var(--color-green-3)',
  'var(--color-green-4)',
  'var(--color-green-5)',
];

export function BibliotecaLayout({ rootFolderId, semesters }: BibliotecaLayoutProps) {
  const { loading, error } = useDriveFiles(null); // Just to verify connection
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'favorites' | 'settings'>('home');
  const [showSearchModal, setShowSearchModal] = useState(false);

  const filteredSemesters = useMemo(() => {
    return semesters.filter((sem) =>
      sem.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [semesters, searchTerm]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-background">
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="sticky top-0 z-20 backdrop-blur-md bg-white/80 border-b-4 shadow-lg"
        style={{ borderColor: 'var(--color-green-1)' }}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-4 flex-1">
              <motion.div
                animate={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-3xl sm:text-4xl flex-shrink-0"
                style={{ color: 'var(--color-green-1)' }}
              >
                <FaBook />
              </motion.div>
              <div className="min-w-0 flex-1">
                <h1 className="text-xl sm:text-4xl font-bold bg-gradient-to-r from-green-700 to-orange-500 bg-clip-text text-transparent truncate">
                  Biblioteca Virtual
                </h1>
                <p className="text-slate-600 text-xs sm:text-sm hidden sm:block">
                  Documentos de Ingeniería Civil - 9 Semestres
                </p>
              </div>
            </div>

            {/* Mobile Search Button */}
            <motion.button
              onClick={() => setShowSearchModal(true)}
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-3 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <FaSearch className="text-slate-600" size={20} />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Search Modal */}
      <SearchModal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
        onSearch={(query) => setSearchTerm(query)}
        placeholder="Buscar semestres..."
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-12 pb-24 md:pb-12">
        {/* Desktop Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden md:block mb-12"
        >
          <div className="relative">
            <FaSearch 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"
              size={18}
            />
            <Input
              placeholder="Buscar semestre o documento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 py-6 border-2 rounded-xl transition-all duration-300 hover:border-green-400 focus:border-green-600 focus:ring-4 focus:ring-green-200/50 text-base"
              style={{
                borderColor: searchTerm ? 'var(--color-green-1)' : 'var(--color-green-3)',
              }}
            />
          </div>
        </motion.div>

        {/* Error State */}
        {error && (
          <div className="p-4 rounded-lg bg-red-50 border-2 border-red-200 mb-8">
            <p className="text-sm text-red-600">
              Error al conectar con Google Drive: {error}
            </p>
          </div>
        )}

        {/* Semesters Grid */}
        {loading ? (
          <motion.div 
            className="text-center py-16 sm:py-24"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="inline-block">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="w-12 h-12 border-4 border-green-300 border-t-green-700 rounded-full mx-auto mb-4"
              />
              <p className="text-muted-foreground text-base sm:text-lg font-medium">Cargando bibliotecas...</p>
            </div>
          </motion.div>
        ) : filteredSemesters.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {filteredSemesters.map((semester, index) => (
              <motion.div
                key={semester.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: 'easeOut',
                }}
              >
                <SemestreCard
                  semesterId={semester.id}
                  semesterName={semester.name}
                  semesterNumber={semester.number}
                  color={COLORS[index % COLORS.length]}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            className="text-center py-16 sm:py-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-muted-foreground text-base sm:text-lg">
              No se encontraron semestres
            </p>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="hidden md:block mt-20 py-12 border-t-4 backdrop-blur-md bg-gradient-to-r from-slate-900 to-slate-800"
        style={{ borderColor: 'var(--color-green-1)' }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-white"
            >
              <p className="text-lg font-semibold">Biblioteca Virtual</p>
              <p className="text-sm text-slate-400">9 Semestres Completos</p>
            </motion.div>
            <div className="text-white">
              <p className="text-lg font-semibold">Google Drive Sync</p>
              <p className="text-sm text-slate-400">Actualización en Tiempo Real</p>
            </div>
            <div className="text-white">
              <p className="text-lg font-semibold">Ingeniería Civil</p>
              <p className="text-sm text-slate-400">Documentos Organizados</p>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-6 text-center text-slate-400 text-sm">
            <p>Todos los documentos están sincronizados con Google Drive</p>
          </div>
        </div>
      </motion.footer>

      {/* Mobile Navigation Bar */}
      <MobileNav activeTab={activeTab} onTabChange={setActiveTab} />
    </main>
  );
}
