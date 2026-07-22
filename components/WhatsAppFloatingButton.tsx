'use client';

import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

interface WhatsAppFloatingButtonProps {
  phoneNumber: string;
  message?: string;
}

function normalizePhoneNumber(phoneNumber: string) {
  return phoneNumber.replace(/[^\d]/g, '');
}

export function WhatsAppFloatingButton({
  phoneNumber,
  message = 'Hola',
}: WhatsAppFloatingButtonProps) {
  const cleanPhoneNumber = normalizePhoneNumber(phoneNumber);
  const whatsappUrl = `https://wa.me/${cleanPhoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chatear por WhatsApp"
      initial={{ opacity: 0, scale: 0.2 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.7,
        ease: [0.175, 0.885, 0.32, 1.275], // bouncy spring-like
        delay: 0.5,
      }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.85 }}
      className="fixed bottom-6 right-6 z-50"
    >
      {/* Multiple glowing rings with staggered animation */}
      <motion.span
        className="absolute inset-0 -m-1 rounded-full bg-[#25D366]/30"
        animate={{
          scale: [1, 1.8, 1],
          opacity: [0.6, 0, 0.6],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.span
        className="absolute inset-0 -m-2 rounded-full bg-[#25D366]/20"
        animate={{
          scale: [1, 2.2, 1],
          opacity: [0.4, 0, 0.4],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.3,
        }}
      />
      <motion.span
        className="absolute inset-0 -m-3 rounded-full bg-[#25D366]/10"
        animate={{
          scale: [1, 2.6, 1],
          opacity: [0.3, 0, 0.3],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.6,
        }}
      />

      {/* Main button with gradient, intense shadow, and inner glow */}
      <div
        className="relative flex h-14 w-14 items-center justify-center rounded-full"
        style={{
          background: 'linear-gradient(145deg, #28e070 0%, #1bb24a 100%)',
          boxShadow:
            '0 0 25px -5px rgba(37,211,102,0.8), 0 10px 30px -10px rgba(0,0,0,0.3), inset 0 -2px 4px rgba(0,0,0,0.15), inset 0 2px 4px rgba(255,255,255,0.3)',
        }}
      >
        {/* Icon with continuous bouncy wobble */}
        <motion.div
          animate={{
            y: [0, -4, 0, -2, 0],
            rotate: [0, 4, 0, -4, 0],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: 'easeInOut',
            repeatDelay: 1,
          }}
          className="flex items-center justify-center"
        >
          <FaWhatsapp className="h-7 w-7 text-white drop-shadow-lg" />
        </motion.div>

        {/* Tiny active dot that pulses */}
        <motion.span
          className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-white shadow-md"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="block h-2.5 w-2.5 rounded-full bg-[#ff3b30]" />
        </motion.span>
      </div>
    </motion.a>
  );
}