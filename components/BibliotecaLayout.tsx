'use client';

import { SemestreCard } from './SemestreCard';
import { FolderModal } from './FolderModal';
import { Input } from '@/components/ui/input';
import { SemesterGridSkeleton } from './SkeletonLoader';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import Image from 'next/image';

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
  '#059669', // emerald-600
  '#4f46e5', // indigo-600
  '#7c3aed', // violet-600
  '#d97706', // amber-600
  '#e11d48', // rose-600
  '#0891b2', // cyan-600
  '#65a30d', // lime-600
  '#c026d3', // fuchsia-600
  '#0284c7', // sky-600
];

export function BibliotecaLayout({ semesters }: BibliotecaLayoutProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSemester, setSelectedSemester] = useState<Semestre | null>(null);

  const filteredSemesters = useMemo(() => {
    return semesters.filter((sem) =>
      sem.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [semesters, searchTerm]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="sticky top-0 z-20 backdrop-blur-xl bg-white/85 border-b border-slate-200/80 shadow-sm"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Logo */}
            <motion.div
              className="flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src="/logosombrarr.png"
                alt="El Blog del Ingeniero"
                width={56}
                height={56}
                className="w-12 h-12 sm:w-14 sm:h-14 object-contain rounded-xl"
                priority
              />
            </motion.div>

            {/* Title */}
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-emerald-700 via-green-600 to-teal-600 bg-clip-text text-transparent truncate">
                El Blog del Ingeniero
              </h1>
              <p className="text-slate-400 text-[10px] sm:text-xs mt-0.5 font-medium tracking-wide">
                Ing. Luis Pacosillo Ticona
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-3"
          >
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Buscar semestre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-10 sm:h-11 text-sm border-slate-200 rounded-xl bg-slate-50/80 focus:bg-white focus:border-green-400 focus:ring-green-200/50 transition-all"
              />
            </div>
          </motion.div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-5 sm:mb-8"
        >
          <h2 className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider">
            Selecciona un semestre
          </h2>
        </motion.div>

        {/* Semesters Grid */}
        {filteredSemesters.length > 0 ? (
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {filteredSemesters.map((semester, index) => (
              <motion.div
                key={semester.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.06,
                  ease: 'easeOut',
                }}
              >
                <SemestreCard
                  semesterId={semester.id}
                  semesterName={semester.name}
                  semesterNumber={semester.number}
                  color={COLORS[index % COLORS.length]}
                  onClick={() => setSelectedSemester(semester)}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : searchTerm ? (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-slate-400 text-sm">
              No se encontraron semestres para &quot;{searchTerm}&quot;
            </p>
          </motion.div>
        ) : (
          <SemesterGridSkeleton />
        )}
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mt-12 py-8 border-t border-slate-200 bg-slate-50"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <Image
                src="/logosombrarr.png"
                alt="Logo"
                width={32}
                height={32}
                className="w-8 h-8 object-contain opacity-60"
              />
              <div>
                <p className="text-sm font-semibold text-slate-700">El Blog del Ingeniero</p>
                <p className="text-[10px] text-slate-400 mt-0.5 tracking-wide">
                  Ing. Luis Pacosillo Ticona
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="text-center">
                <p className="text-lg font-bold text-green-700">{semesters.length}</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">Semestres</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-blue-700">∞</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">Archivos</p>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-200 text-center">
            <p className="text-[10px] text-slate-400 tracking-wide">
              © {new Date().getFullYear()} Ing. Luis Pacosillo Ticona — Todos los derechos reservados
            </p>
          </div>
        </div>
      </motion.footer>

      {/* Folder Modal */}
      {selectedSemester && (
        <FolderModal
          isOpen={!!selectedSemester}
          onClose={() => setSelectedSemester(null)}
          semesterId={selectedSemester.id}
          semesterName={selectedSemester.name}
          semesterColor={COLORS[(selectedSemester.number - 1) % COLORS.length]}
        />
      )}
    </main>
  );
}
