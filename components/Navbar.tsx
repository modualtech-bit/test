'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import Logo from './Logo';
import { FiMenu, FiX, FiUser, FiLogOut } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo width={150} height={45} />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-gray-700 hover:text-modual-purple transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/nieuw-project"
                  className="text-gray-700 hover:text-modual-purple transition-colors"
                >
                  Nieuw Project
                </Link>
                {(session.user as any)?.role === 'admin' && (
                  <Link
                    href="/admin"
                    className="text-gray-700 hover:text-modual-purple transition-colors"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="flex items-center space-x-2 bg-gradient-modual text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                >
                  <FiLogOut />
                  <span>Uitloggen</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/inloggen"
                  className="text-gray-700 hover:text-modual-purple transition-colors"
                >
                  Inloggen
                </Link>
                <Link
                  href="/auth/registreren"
                  className="bg-gradient-modual text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Registreren
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="px-4 py-4 space-y-3">
              {session ? (
                <>
                  <Link
                    href="/dashboard"
                    className="block text-gray-700 hover:text-modual-purple transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/nieuw-project"
                    className="block text-gray-700 hover:text-modual-purple transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Nieuw Project
                  </Link>
                  {(session.user as any)?.role === 'admin' && (
                    <Link
                      href="/admin"
                      className="block text-gray-700 hover:text-modual-purple transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      signOut({ callbackUrl: '/' });
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left bg-gradient-modual text-white px-4 py-2 rounded-lg"
                  >
                    Uitloggen
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/inloggen"
                    className="block text-gray-700 hover:text-modual-purple transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Inloggen
                  </Link>
                  <Link
                    href="/auth/registreren"
                    className="block bg-gradient-modual text-white px-4 py-2 rounded-lg text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Registreren
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

