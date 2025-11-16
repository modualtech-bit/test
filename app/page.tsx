'use client';

import Link from 'next/link'
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import Logo from '@/components/Logo';
import Footer from '@/components/Footer';

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex flex-col">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <Logo width={150} height={45} />
          <div className="flex items-center space-x-4">
            {session ? (
              <Link 
                href="/dashboard" 
                className="bg-gradient-modual text-white px-6 py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link 
                  href="/auth/inloggen" 
                  className="text-gray-700 hover:text-modual-purple font-medium transition-colors"
                >
                  Inloggen
                </Link>
                <Link 
                  href="/auth/registreren" 
                  className="bg-gradient-modual text-white px-6 py-2.5 rounded-lg font-medium hover:opacity-90 transition-all transform hover:scale-105"
                >
                  Gratis beginnen
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-20 flex-1">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="gradient-text">Bouw je droomwebsite</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto"
          >
            Met Modual creëer je eenvoudig een professionele website. Upload je foto's, 
            vertel ons je wensen, en laat onze AI en ontwikkelaars de rest doen.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link 
              href="/auth/registreren" 
              className="bg-gradient-modual text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Start nu gratis
            </Link>
            <Link 
              href="#features" 
              className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-modual-purple hover:text-modual-purple transition-all duration-300"
            >
              Bekijk functies
            </Link>
          </motion.div>

          {/* Features Grid */}
          <div id="features" className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Upload je materiaal</h3>
              <p className="text-gray-600">
                Upload eenvoudig je foto's, logo's en andere bestanden. Alles wat je nodig hebt op één plek.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Spreek je wensen in</h3>
              <p className="text-gray-600">
                Neem een spraakbericht op of typ je ideeën. Vertel ons hoe je website eruit moet zien.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">AI genereert je site</h3>
              <p className="text-gray-600">
                Onze slimme AI creëert een professioneel ontwerp op basis van jouw input. Klaar in minuten!
              </p>
            </div>
          </div>

          {/* How it works */}
          <div className="mt-32">
            <h2 className="text-4xl font-bold mb-12 text-gray-800">Hoe werkt het?</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="relative">
                <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold text-primary-600 mx-auto mb-4">
                  1
                </div>
                <h4 className="font-semibold text-lg mb-2">Maak een account</h4>
                <p className="text-gray-600">Registreer je gratis in enkele seconden</p>
              </div>
              <div className="relative">
                <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold text-primary-600 mx-auto mb-4">
                  2
                </div>
                <h4 className="font-semibold text-lg mb-2">Start een project</h4>
                <p className="text-gray-600">Geef je project een naam en begin</p>
              </div>
              <div className="relative">
                <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold text-primary-600 mx-auto mb-4">
                  3
                </div>
                <h4 className="font-semibold text-lg mb-2">Deel je visie</h4>
                <p className="text-gray-600">Upload bestanden en vertel je wensen</p>
              </div>
              <div className="relative">
                <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold text-primary-600 mx-auto mb-4">
                  4
                </div>
                <h4 className="font-semibold text-lg mb-2">Klaar!</h4>
                <p className="text-gray-600">Je website is gegenereerd en klaar</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

