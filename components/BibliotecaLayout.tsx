'use client';

import { SemestreCard } from './SemestreCard';
import { FolderModal } from './FolderModal';
import { Input } from '@/components/ui/input';
import { SemesterGridSkeleton } from './SkeletonLoader';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowRight } from 'lucide-react';
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
      {/* About this space + Profile — organic, knowledge-driven */}
      <section className="relative overflow-hidden pt-6 pb-10 sm:pt-10 sm:pb-14 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="relative z-10 grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            {/* Left: Platform purpose + subtle vision (3 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-3 space-y-5"
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xs sm:text-sm text-slate-400 font-medium"
              >
                Un espacio abierto para la comunidad
              </motion.p>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 leading-[1.15]">
                Compartir e intercambiar{' '}
                <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                  conocimiento
                </span>
                {' '}en Ingeniería Civil
              </h2>

              <p className="text-sm sm:text-base text-slate-500 max-w-xl leading-relaxed">
                Este espacio está creado para compartir e intercambiar conocimiento en Ingeniería Civil,
                tanto para estudiantes como para profesionales que buscan mantenerse actualizados.
                Recursos, bibliografía y material de apoyo técnico al alcance de todos.
              </p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="pt-1"
              >
                <a
                  href="#semestres"
                  className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors group"
                >
                  Explorar recursos por semestre
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            </motion.div>

            {/* Right: Professional profile card (2 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="lg:col-span-2"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100/30 to-teal-50/20 rounded-2xl -rotate-2 scale-[0.98]" />
                <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg shadow-slate-200/50 overflow-hidden border border-slate-100/80">
                  {/* Top accent bar */}
                  <div className="h-1 bg-gradient-to-r from-emerald-500 to-teal-400" />

                  <div className="p-6 sm:p-7 space-y-4">
                    {/* Avatar + name */}
                    <div className="flex items-center gap-4">
                      <Image
                        src="/logosombrarr.png"
                        alt="Ing. Luis Pacosillo Ticona"
                        width={72}
                        height={72}
                        className="w-16 h-16 sm:w-[72px] sm:h-[72px] object-contain rounded-xl bg-slate-50 p-1"
                      />
                      <div>
                        <h3 className="text-lg font-bold text-slate-700">Ing. Luis Pacosillo Ticona</h3>
                        <p className="text-emerald-600/80 font-medium text-xs mt-0.5">Ingeniero Civil Geotécnico</p>
                      </div>
                    </div>

                    <div className="w-full h-px bg-slate-100" />

                    {/* Bio */}
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                      Docente en Ingeniería Civil de la <span className="font-semibold text-slate-600">UMSA</span>.
                      Dicta las cátedras de <span className="font-medium text-slate-600">Mecánica de Suelos</span> y{' '}
                      <span className="font-medium text-slate-600">Geología Aplicada</span>.
                    </p>

                    {/* Specialties — subtle tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {['Cimentaciones', 'Estabilización', 'Mitigación Geotécnica'].map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-[10px] font-medium rounded-full bg-emerald-50 text-emerald-600/80 border border-emerald-100/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Quote */}
                    <div className="relative pl-3 border-l-2 border-emerald-200/50 mt-2">
                      <p className="text-[11px] text-slate-400 italic leading-relaxed">
                        &quot;La ingeniería no solo construye estructuras, construye el progreso de nuestra sociedad.&quot;
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Soft background accents */}
        <div className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 w-[500px] h-[500px] bg-emerald-50/60 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 w-[350px] h-[350px] bg-teal-50/40 rounded-full blur-3xl -z-10" />
      </section>

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
            <div className="flex-1 max-w-md">
              <h4 className="text-sm font-bold text-slate-800 mb-2">Nuestra Visión</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Trabajamos por una facultad moderna, con recursos digitales accesibles para todos.
                El Blog del Ingeniero es solo el comienzo de la transformación digital que propone el
                <span className="font-bold text-emerald-600"> Ing. Luis Pacosillo Ticona</span>.
              </p>
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
