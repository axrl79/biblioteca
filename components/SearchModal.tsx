'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useState } from 'react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string) => void;
  placeholder?: string;
}

export function SearchModal({ isOpen, onClose, onSearch, placeholder = 'Buscar semestres...' }: SearchModalProps) {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
    setQuery('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
          />

          {/* Search Modal */}
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 right-0 z-50 md:hidden pt-4 px-4"
          >
            <form
              onSubmit={handleSearch}
              className="flex items-center gap-2 glassmorphism rounded-2xl p-3 shadow-lg"
            >
              <FaSearch className="text-slate-400" size={18} />
              <Input
                autoFocus
                placeholder={placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="border-0 bg-transparent focus:ring-0 text-base placeholder:text-slate-400"
              />
              <motion.button
                type="button"
                onClick={onClose}
                whileTap={{ scale: 0.9 }}
                className="text-slate-400 hover:text-slate-600"
              >
                <FaTimes size={18} />
              </motion.button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
