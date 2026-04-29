import { BibliotecaLayout } from '@/components/BibliotecaLayout';

// Configuración de los 9 semestres
const SEMESTERS = [
  { id: process.env.SEMESTER_1_ID || '', name: '1er Semestre', number: 1 },
  { id: process.env.SEMESTER_2_ID || '', name: '2do Semestre', number: 2 },
  { id: process.env.SEMESTER_3_ID || '', name: '3er Semestre', number: 3 },
  { id: process.env.SEMESTER_4_ID || '', name: '4to Semestre', number: 4 },
  { id: process.env.SEMESTER_5_ID || '', name: '5to Semestre', number: 5 },
  { id: process.env.SEMESTER_6_ID || '', name: '6to Semestre', number: 6 },
  { id: process.env.SEMESTER_7_ID || '', name: '7mo Semestre', number: 7 },
  { id: process.env.SEMESTER_8_ID || '', name: '8vo Semestre', number: 8 },
  { id: process.env.SEMESTER_9_ID || '', name: '9no Semestre', number: 9 },
];

export default function Home() {
  const rootFolderId = process.env.DRIVE_FOLDER_ID || '';

  if (!rootFolderId) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-background flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="rounded-xl border-2 border-red-300 bg-white shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 border-b-2 border-red-300">
              <h1 className="text-2xl font-bold text-red-600 mb-2">
                ⚙️ Configuración Requerida
              </h1>
              <p className="text-red-700 text-sm">
                Falta completar la instalación de la Biblioteca Virtual
              </p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <p className="text-sm font-semibold text-slate-700 mb-2">Pasos necesarios:</p>
                <ol className="text-xs space-y-2 text-slate-600">
                  <li>✓ <span className="line-through">Variables de Google Drive</span> (completado)</li>
                  <li>→ <span className="font-semibold">Agregar IDs de semestres</span> (falta esto)</li>
                </ol>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-xs text-blue-900 font-mono">
                  Variables faltantes: SEMESTER_1_ID hasta SEMESTER_9_ID
                </p>
              </div>
              <p className="text-xs text-slate-600">
                📖 Lee el archivo <code className="bg-slate-100 px-2 py-1 rounded">BIBLIOTECA_SETUP.md</code> para instrucciones detalladas
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <BibliotecaLayout
      rootFolderId={rootFolderId}
      semesters={SEMESTERS.filter((s) => s.id)} // Filtra semestres sin ID configurado
    />
  );
}
