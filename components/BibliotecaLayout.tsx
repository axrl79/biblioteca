'use client';

import { SemestreCard } from './SemestreCard';
import { FolderModal } from './FolderModal';
import { IngenieroModal } from './IngenieroModal';
import { Input } from '@/components/ui/input';
import { SemesterGridSkeleton } from './SkeletonLoader';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerTitle, DrawerDescription } from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowRight, BookOpen, GraduationCap, Users, X } from 'lucide-react';
import Image from 'next/image';

interface Semestre {
  id: string;
  name: string;
  number: number;
  isContainer?: boolean;
}

interface BibliotecaLayoutProps {
  rootFolderId: string;
  semesters: Semestre[];
  semesterDetails: Semestre[];
}

// Warm, earthy color palette — feels hand-picked, not generated
const WARM_COLORS = [
  '#c05621', // burnt sienna
  '#b7791f', // golden brown
  '#9c6644', // warm wood
  '#a0522d', // sienna
  '#8b6f47', // wheat dark
  '#c67538', // terracotta
  '#966b3d', // caramel
  '#ab7840', // bronze
  '#bf6930', // rust
  '#7c694a', // warm olive
  '#a86932', // toffee
  '#8a6e42', // oak
  '#b0603a', // clay
];

export function BibliotecaLayout({ semesters, semesterDetails }: BibliotecaLayoutProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSemester, setSelectedSemester] = useState<Semestre | null>(null);
  const [ingenieroModalOpen, setIngenieroModalOpen] = useState(false);
  const [showSemestersView, setShowSemestersView] = useState(false);
  const [selectedSemesterFromView, setSelectedSemesterFromView] = useState<Semestre | null>(null);
  const isMobile = useIsMobile();

  const filteredSemesters = useMemo(() => {
    return semesters.filter((sem) =>
      sem.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [semesters, searchTerm]);

  return (
    <main className="min-h-screen" style={{ background: 'linear-gradient(180deg, #fdf8f3 0%, #faf3eb 50%, #fdf8f3 100%)' }}>
      {/* Header — warm glass with natural feel */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="sticky top-0 z-20 border-b"
        style={{
          background: 'rgba(253, 248, 243, 0.88)',
          backdropFilter: 'blur(20px) saturate(1.3)',
          WebkitBackdropFilter: 'blur(20px) saturate(1.3)',
          borderColor: 'rgba(235, 224, 212, 0.5)',
        }}
      >
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-4">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Image
                src="/logosombrarr.png"
                alt="El Blog del Ingeniero"
                width={48}
                height={48}
                className="w-11 h-11 sm:w-12 sm:h-12 object-contain"
                priority
              />
            </div>

            {/* Title — serif for warmth */}
            <div className="flex-1 min-w-0">
              <h1 className="font-heading text-xl sm:text-2xl font-semibold text-[#3d2e22] truncate tracking-tight">
                El Blog del Ingeniero
              </h1>
              <p className="text-[#8a7568] text-[11px] sm:text-xs mt-0.5 tracking-wide">
                Ing. Luis Pacosillo Ticona
              </p>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section — editorial, warm, like a real publication */}
      <section className="relative px-5 sm:px-8 pt-8 sm:pt-14 pb-10 sm:pb-16 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            {/* Left: Editorial intro (7 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7 space-y-6"
            >
              {/* Warm subtitle — like a magazine subheading */}
              <p className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#c05621] font-medium">
                Un espacio para la comunidad
              </p>

              <h2 className="font-heading text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-[#2d1f14] leading-[1.15] tracking-tight">
                Compartir e intercambiar{' '}
                <span className="text-[#c05621]">conocimiento</span>{' '}
                en Ingeniería Civil
              </h2>

              <p className="text-[15px] sm:text-base text-[#6b5c50] max-w-lg leading-[1.75]">
                Este espacio está creado para compartir e intercambiar conocimiento en Ingeniería Civil,
                tanto para estudiantes como para profesionales que buscan mantenerse actualizados.
                Recursos, bibliografía y material de apoyo técnico al alcance de todos.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
                <a
                  href="#categorias"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3 text-sm font-medium text-white rounded-full transition-all duration-300 hover:shadow-lg active:scale-[0.97]"
                  style={{ background: 'linear-gradient(135deg, #c05621 0%, #d4600a 100%)' }}
                >
                  Explorar recursos
                  <ArrowRight className="w-4 h-4" />
                </a>
                <div className="flex items-center gap-6 px-2 sm:px-4">
                  <div className="text-center">
                    <p className="text-xl font-semibold text-[#3d2e22]">1</p>
                    <p className="text-[10px] text-[#8a7568] uppercase tracking-wider mt-0.5">Carpeta</p>
                  </div>
                  <div className="w-px h-8 bg-[#ebe0d4]" />
                  <div className="text-center">
                    <p className="text-xl font-semibold text-[#3d2e22]">4</p>
                    <p className="text-[10px] text-[#8a7568] uppercase tracking-wider mt-0.5">Extras</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Profile card (5 cols) — like a printed business card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5"
            >
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  background: '#fffaf5',
                  border: '1px solid rgba(235, 224, 212, 0.7)',
                  boxShadow: '0 8px 40px -12px rgba(61, 46, 34, 0.10), 0 2px 8px -4px rgba(61, 46, 34, 0.04)',
                }}
              >
                {/* Top accent — thin and elegant */}
                <div className="h-0.5" style={{ background: 'linear-gradient(90deg, #c05621, #e8853a, #f0a564)' }} />

                <div className="p-5 sm:p-6 space-y-4">
                  {/* Avatar + name */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-[#f5ebe1] p-0 flex-shrink-0">
                      <Image
                        src="/ING.png"
                        alt="Ing. Luis Pacosillo Ticona"
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-[#2d1f14]">
                        Ing. Luis Pacosillo Ticona
                      </h3>
                      <div className="mt-2 inline-flex flex-col rounded-full border border-[#eadbcc] bg-[#fff8f2] px-3 py-1.5 shadow-sm">
                        <span className="text-[#c05621] text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em]">
                          Ingeniero Civil
                        </span>
                        <span className="mt-0.5 text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.2em] text-[#8a7568]">
                          Geología • Geofísica • Geotecnia
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="w-full h-px bg-[#ebe0d4]" />

                  {/* Bio */}
                  <p className="text-[13px] sm:text-sm text-[#6b5c50] leading-relaxed">
                    Docente en Ingeniería Civil de la{' '}
                    <span className="font-semibold text-[#3d2e22]">UMSA</span>.
                    Dicta las cátedras de{' '}
                    <span className="font-medium text-[#3d2e22]">Mecánica de Suelos</span> y{' '}
                    <span className="font-medium text-[#3d2e22]">Geología Aplicada</span>.
                  </p>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2">
                    {['Cimentaciones', 'Estabilización', 'Mitigación Geotécnica'].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 text-[11px] font-medium rounded-full"
                        style={{
                          background: '#f5ebe1',
                          color: '#8a6e42',
                          border: '1px solid rgba(235, 224, 212, 0.6)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Quote */}
                  <div className="relative pl-4 mt-3" style={{ borderLeft: '2px solid #ebe0d4' }}>
                    <p className="text-[12px] text-[#8a7568] italic leading-relaxed">
                      &quot;La ingeniería no solo construye estructuras, construye el progreso de nuestra sociedad.&quot;
                    </p>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIngenieroModalOpen(true)}
                      className="w-full px-4 py-2.5 text-xs font-semibold rounded-lg transition-all duration-300 text-white"
                      style={{
                        background: 'linear-gradient(135deg, #c05621 0%, #d4600a 100%)',
                        boxShadow: '0 4px 15px -2px rgba(192, 86, 33, 0.2)',
                      }}
                    >
                      Ver perfil completo
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Background shapes — soft, organic blobs (not circles) */}
        <div
          className="absolute -top-20 right-0 w-[450px] h-[450px] -z-10 opacity-40"
          style={{
            background: 'radial-gradient(ellipse at 60% 40%, #fae0c2 0%, transparent 70%)',
            borderRadius: '60% 40% 50% 50% / 50% 60% 40% 50%',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute bottom-0 -left-20 w-[350px] h-[350px] -z-10 opacity-30"
          style={{
            background: 'radial-gradient(ellipse at 40% 60%, #f5c491 0%, transparent 70%)',
            borderRadius: '40% 60% 55% 45% / 55% 40% 60% 45%',
            filter: 'blur(60px)',
          }}
        />
      </section>

      {/* Search + Grid Section */}
      <div id="categorias" className="max-w-5xl mx-auto px-5 sm:px-8 pb-8 sm:pb-16">
        {/* Search bar — warm and inviting */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-8 sm:mb-10"
        >
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a7568]" />
            <Input
              placeholder="Buscar semestre o categoría..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-11 h-12 text-sm rounded-xl border-[#ebe0d4] bg-[#fffaf5] text-[#3d2e22] placeholder:text-[#b5a89c] focus:border-[#d4600a] focus:ring-1 focus:ring-[#d4600a]/20 transition-all shadow-organic-sm"
            />
          </div>
        </motion.div>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-6 sm:mb-8 flex items-end justify-between"
        >
          <div>
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#c05621] font-medium mb-1.5">
              Explorar
            </p>
            <h2 className="font-heading text-xl sm:text-2xl font-semibold text-[#2d1f14]">
              Categorías disponibles
            </h2>
          </div>
          <p className="text-xs text-[#8a7568] hidden sm:block">
            {semesters.length} categorías
          </p>
        </motion.div>

        {/* Semesters Grid */}
        {filteredSemesters.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {filteredSemesters.map((semester, index) => (
              <motion.div
                key={semester.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <SemestreCard
                  semesterId={semester.id}
                  semesterName={semester.name}
                  semesterNumber={semester.number}
                  color={WARM_COLORS[index % WARM_COLORS.length]}
                  onClick={() => {
                    if (semester.isContainer || semester.id === 'SEMESTERS') {
                      setShowSemestersView(true);
                    } else {
                      setSelectedSemester(semester);
                    }
                  }}
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
            <p className="text-[#8a7568] text-sm">
              No se encontraron categorías para &quot;{searchTerm}&quot;
            </p>
          </motion.div>
        ) : (
          <SemesterGridSkeleton />
        )}
      </div>

      {/* Footer — clean and warm */}
      <footer
        className="py-10 sm:py-12 border-t"
        style={{ background: '#faf3eb', borderColor: '#ebe0d4' }}
      >
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Image
                src="/logosombrarr.png"
                alt="Logo"
                width={32}
                height={32}
                className="w-8 h-8 object-contain opacity-70"
              />
              <div>
                <p className="font-heading text-sm font-semibold text-[#3d2e22]">El Blog del Ingeniero</p>
                <p className="text-[10px] text-[#8a7568] mt-0.5 tracking-wide">
                  Ing. Luis Pacosillo Ticona
                </p>
              </div>
            </div>

            <div className="max-w-sm">
              <p className="text-xs text-[#6b5c50] leading-relaxed">
                El Blog del Ingeniero es un espacio digital para la comunidad académica. Buscamos
                compartir conocimiento y recursos accesibles que aporten al fortalecimiento de una
                facultad moderna e innovadora.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#ebe0d4] text-center">
            <p className="text-[10px] text-[#b5a89c] tracking-wide">
              © {new Date().getFullYear()} Ing. Luis Pacosillo Ticona — Todos los derechos reservados
            </p>
          </div>
        </div>
      </footer>

      {/* Semestres View Modal */}
      {isMobile ? (
        <Drawer open={showSemestersView} onOpenChange={setShowSemestersView}>
          <DrawerContent className="flex h-[85vh] max-h-[85vh] flex-col overflow-hidden bg-white">
            <DrawerTitle className="px-6 pt-4">Semestres</DrawerTitle>
            <DrawerDescription className="px-6 text-xs">
              Selecciona un semestre para explorar su contenido
            </DrawerDescription>
            <ScrollArea className="flex-1 min-h-0 px-6 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-4 pb-4">
                {semesterDetails.map((semester, idx) => (
                  <motion.button
                    key={semester.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    onClick={() => {
                      setShowSemestersView(false);
                      setSelectedSemesterFromView(semester);
                    }}
                    className="p-4 rounded-lg border border-[#ebe0d4] text-left hover:border-[#d4600a] transition-all"
                    style={{
                      background: 'linear-gradient(135deg, #faf3eb 0%, #fdf8f3 100%)',
                    }}
                  >
                    <p className="font-semibold text-[#3d2e22] text-sm">{semester.name}</p>
                    <p className="text-xs text-[#8a7568] mt-1">Semestre {semester.number}</p>
                  </motion.button>
                ))}
              </div>
            </ScrollArea>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={showSemestersView} onOpenChange={setShowSemestersView}>
          <DialogContent className="flex h-[85vh] max-h-[85vh] flex-col overflow-hidden p-0 bg-white border border-[#ebe0d4]">
            <DialogTitle className="sr-only">Semestres</DialogTitle>
            <DialogDescription className="sr-only">
              Selecciona un semestre para explorar su contenido
            </DialogDescription>
            <button
              onClick={() => setShowSemestersView(false)}
              className="absolute right-4 top-4 z-50 rounded-lg p-1.5 text-[#6b5c50] hover:bg-[#faf3eb] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="px-6 pt-6 pb-4 border-b border-[#ebe0d4]">
              <h2 className="text-2xl font-bold text-[#3d2e22]">Selecciona un Semestre</h2>
              <p className="text-sm text-[#8a7568] mt-1">9 semestres disponibles en la carrera</p>
            </div>
            <ScrollArea className="flex-1 min-h-0 px-6 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pr-4 pb-4">
                {semesterDetails.map((semester, idx) => (
                  <motion.button
                    key={semester.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    onClick={() => {
                      setShowSemestersView(false);
                      setSelectedSemesterFromView(semester);
                    }}
                    className="p-4 rounded-lg border border-[#ebe0d4] text-left hover:border-[#d4600a] hover:bg-[#faf3eb] transition-all group cursor-pointer"
                    style={{
                      background: 'linear-gradient(135deg, #fdf8f3 0%, #fffaf5 100%)',
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-[#3d2e22] text-sm">{semester.name}</p>
                        <p className="text-xs text-[#8a7568] mt-1">Semestre {semester.number}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#c05621] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </motion.button>
                ))}
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      )}

      {/* Folder Modal */}
      {selectedSemester && (
        <FolderModal
          isOpen={!!selectedSemester}
          onClose={() => setSelectedSemester(null)}
          semesterId={selectedSemester.id}
          semesterName={selectedSemester.name}
          semesterColor={WARM_COLORS[(selectedSemester.number - 1) % WARM_COLORS.length]}
        />
      )}

      {/* Folder Modal from Semestres View */}
      {selectedSemesterFromView && (
        <FolderModal
          isOpen={!!selectedSemesterFromView}
          onClose={() => setSelectedSemesterFromView(null)}
          semesterId={selectedSemesterFromView.id}
          semesterName={selectedSemesterFromView.name}
          semesterColor={WARM_COLORS[(selectedSemesterFromView.number - 1) % WARM_COLORS.length]}
        />
      )}

      {/* Ingeniero Modal */}
      <IngenieroModal isOpen={ingenieroModalOpen} onClose={() => setIngenieroModalOpen(false)} />
    </main>
  );
}
