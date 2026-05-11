'use client';

import { SemestreCard } from './SemestreCard';
import { FolderModal } from './FolderModal';
import { Input } from '@/components/ui/input';
import { SemesterGridSkeleton } from './SkeletonLoader';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, ShieldCheck, GraduationCap, Users, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

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
      {/* Campaign Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                Campaña 2026
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-[1.1]">
                Transformando la <span className="text-emerald-600">Ingeniería</span> con Experiencia y Juventud
              </h2>
              
              <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
                Comprometido con la excelencia académica y el desarrollo profesional de los ingenieros civiles. Juntos construiremos un futuro sólido.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-8 py-6 h-auto text-base font-bold shadow-lg shadow-emerald-200 group transition-all">
                  Conoce el Proyecto
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <div className="flex -space-x-3 items-center ml-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500 overflow-hidden shadow-sm">
                       <Users className="w-5 h-5 opacity-40" />
                    </div>
                  ))}
                  <span className="pl-5 text-xs font-medium text-slate-500">+500 colegas apoyando</span>
                </div>
              </div>

              {/* Stats/Badges */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="flex flex-col gap-1">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase text-slate-400">Excelencia</span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase text-slate-400">Compromiso</span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                    <Users className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase text-slate-400">Comunidad</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="relative hidden lg:block"
            >
              <div className="relative w-full aspect-square max-w-[450px] mx-auto">
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-teal-500/10 rounded-3xl -rotate-6 scale-95" />
                <div className="absolute inset-0 bg-gradient-to-bl from-emerald-500/20 to-teal-500/10 rounded-3xl rotate-3 scale-95" />
                <div className="relative h-full w-full bg-white rounded-3xl shadow-2xl shadow-emerald-200/50 overflow-hidden border border-slate-100 flex flex-col items-center justify-center p-8 text-center space-y-4">
                  <Image
                    src="/logosombrarr.png"
                    alt="Ing. Luis Pacosillo Ticona"
                    width={180}
                    height={180}
                    className="w-40 h-40 object-contain drop-shadow-xl"
                  />
                  <div>
                    <h3 className="text-2xl font-black text-slate-800">Ing. Luis Pacosillo</h3>
                    <p className="text-emerald-600 font-bold tracking-widest text-xs uppercase mt-1">Líder Civil 2026</p>
                  </div>
                  <div className="w-12 h-1 bg-emerald-500 rounded-full mx-auto" />
                  <p className="text-sm text-slate-500 italic px-4">
                    &quot;La ingeniería no solo construye estructuras, construye el progreso de nuestra sociedad.&quot;
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Background shapes */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-emerald-50 rounded-full blur-3xl opacity-50 -z-10" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-teal-50 rounded-full blur-3xl opacity-50 -z-10" />
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
