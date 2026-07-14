'use client';

import { useState } from 'react';
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
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import Image from 'next/image';

interface IngenieroModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ESPECIALIDADES = [
  'Cimentaciones',
  'Estabilización',
  'Mitigación Geotécnica',
];

const SEMESTERS_INFO = [
  { number: 1, courses: ['Geometría Descriptiva', 'Álgebra y Trigonometría'] },
  { number: 2, courses: ['Cálculo II', 'Física II', 'Química II'] },
  { number: 3, courses: ['Análisis Matemático', 'Estadística', 'Dibujo Técnico'] },
  { number: 4, courses: ['Mecánica de Sólidos', 'Termodinámica', 'Ingeniería Ambiental'] },
  { number: 5, courses: ['Mecánica de Suelos I', 'Hidráulica', 'Tecnología de Concreto'] },
  { number: 6, courses: ['Mecánica de Suelos II', 'Geología Aplicada', 'Estructuras I'] },
  { number: 7, courses: ['Cimentaciones', 'Geotecnia Avanzada', 'Estructuras II'] },
  { number: 8, courses: ['Proyectos de Ingeniería', 'Estabilización de Taludes', 'Seminarios'] },
  { number: 9, courses: ['Trabajo Dirigido', 'Tesis de Grado'] },
];

function IngenieroBio() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Foto del Ingeniero */}
      <div className="flex justify-center">
        <div className="relative w-full max-w-xs">
          <div
            className="absolute inset-0 rounded-2xl blur-2xl opacity-30"
            style={{ background: 'linear-gradient(135deg, #c05621 0%, #d4600a 100%)' }}
          />
          <Image
            src="/ING.png"
            alt="Ing. Luis Pacosillo Ticona"
            width={300}
            height={400}
            className="relative w-full h-auto rounded-2xl shadow-xl object-cover"
            priority
          />
        </div>
      </div>

      {/* Información Personal */}
      <div className="space-y-4 text-center">
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#3d2e22]">
            Ing. Luis Pacosillo Ticona
          </h3>
          <div className="mt-3 inline-flex flex-col items-center rounded-full border border-[#eadbcc] bg-[#fff8f2] px-4 py-2 shadow-sm">
            <span className="text-[#c05621] text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em]">
              Ingeniero Civil
            </span>
            <span className="mt-1 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-[#8a7568]">
              Geología • Geofísica • Geotecnia
            </span>
          </div>
        </div>

        <div className="pt-2 space-y-2 text-[#6b5c50]">
          <p className="text-sm">
            <span className="font-semibold">Docente</span> en Ingeniería Civil de la UMSA
          </p>
          <p className="text-sm">
            Dicta las cátedras de <span className="font-semibold">Mecánica de Suelos</span> y{' '}
            <span className="font-semibold">Geología Aplicada</span>
          </p>
        </div>
      </div>

      {/* Áreas de Especialidad */}
      <div className="space-y-3">
        <h4 className="font-semibold text-[#3d2e22] text-sm uppercase tracking-wider">
          Especialidades
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {ESPECIALIDADES.map((esp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className="p-4 rounded-lg text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(192, 86, 33, 0.08) 0%, rgba(212, 96, 10, 0.08) 100%)',
                borderLeft: `3px solid #c05621`,
              }}
            >
              <p className="text-sm font-medium text-[#3d2e22]">{esp}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Filosofía */}
      <div className="p-5 rounded-xl border-l-4 border-[#c05621] bg-[#faf3eb]">
        <p className="text-sm text-[#6b5c50] italic leading-relaxed">
          "La ingeniería no solo construye estructuras, construye el progreso de nuestra sociedad."
        </p>
      </div>
    </motion.div>
  );
}

function SemestresInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <h3 className="text-xl font-bold text-[#3d2e22] mb-4">Plan de Estudios - 9 Semestres</h3>
      <div className="space-y-3">
        {SEMESTERS_INFO.map((sem, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="p-4 rounded-lg border border-[#ebe0d4]"
            style={{
              background: 'linear-gradient(135deg, #faf3eb 0%, #fdf8f3 100%)',
            }}
          >
            <div className="flex items-start gap-3">
              <div
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{ background: 'linear-gradient(135deg, #c05621 0%, #d4600a 100%)' }}
              >
                {sem.number}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#3d2e22]">
                  {sem.number === 9 ? 'Semestre Final' : `${sem.number}${sem.number === 1 ? 'er' : sem.number === 2 ? 'do' : 'er'} Semestre`}
                </p>
                <p className="text-xs text-[#8a7568] mt-1">
                  {sem.courses.join(' • ')}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export function IngenieroModal({ isOpen, onClose }: IngenieroModalProps) {
  const [activeTab, setActiveTab] = useState<'bio' | 'semesters'>('bio');
  const isMobile = useIsMobile();

  const content = (
    <div className="flex flex-col h-full">
      {/* Tabs */}
      <div className="flex gap-0 border-b border-[#ebe0d4] px-5 sm:px-6 pt-4">
        {(
          [
            { id: 'bio', label: 'Biografía' },
            { id: 'semesters', label: 'Plan de Estudios' },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-[#c05621] text-[#c05621]'
                : 'border-transparent text-[#8a7568] hover:text-[#6b5c50]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <ScrollArea className="flex-1 px-5 sm:px-6 py-4">
        <div className="pr-4">
          {activeTab === 'bio' ? <IngenieroBio /> : <SemestresInfo />}
        </div>
      </ScrollArea>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={onClose}>
        <DrawerContent className="bg-white max-h-[85vh]">
          <DrawerTitle className="sr-only">Ingeniero Luis Pacosillo Ticona</DrawerTitle>
          <DrawerDescription className="sr-only">
            Biografía y plan de estudios del Ingeniero Civil Geotécnico
          </DrawerDescription>
          {content}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden p-0 bg-white border border-[#ebe0d4]">
        <DialogTitle className="sr-only">Ingeniero Luis Pacosillo Ticona</DialogTitle>
        <DialogDescription className="sr-only">
          Biografía y plan de estudios del Ingeniero Civil Geotécnico
        </DialogDescription>
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-50 rounded-lg p-1.5 text-[#6b5c50] hover:bg-[#faf3eb] transition-colors"
        >
          <X className="w-5 h-5" />
          <span className="sr-only">Cerrar</span>
        </button>
        {content}
      </DialogContent>
    </Dialog>
  );
}
