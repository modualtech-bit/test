'use client';

import ProjectForm from '@/components/ProjectForm';
import { FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';

export default function NewProjectPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center text-modual-purple hover:text-modual-pink transition-colors mb-4"
        >
          <FiArrowLeft className="mr-2" />
          Terug naar Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">
          Start een Nieuw <span className="gradient-text">Website Project</span>
        </h1>
        <p className="text-gray-600 mt-2">
          Deel je ideeën met ons via tekst, foto's of een spraakmemo
        </p>
      </div>

      <ProjectForm />
    </div>
  );
}

