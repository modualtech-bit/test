'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiPlus, FiClock, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

interface Project {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data.projects || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Nieuw':
        return <FiClock className="text-blue-500" />;
      case 'In Behandeling':
        return <FiAlertCircle className="text-yellow-500" />;
      case 'Voltooid':
        return <FiCheckCircle className="text-green-500" />;
      default:
        return <FiClock className="text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Nieuw':
        return 'bg-blue-100 text-blue-800';
      case 'In Behandeling':
        return 'bg-yellow-100 text-yellow-800';
      case 'Voltooid':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welkom terug, <span className="gradient-text">{session?.user?.name}</span>!
        </h1>
        <p className="text-gray-600 mt-2">Beheer je website projecten</p>
      </div>

      <div className="mb-8">
        <Link
          href="/dashboard/nieuw-project"
          className="inline-flex items-center space-x-2 bg-gradient-modual text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
        >
          <FiPlus />
          <span>Nieuw Project Starten</span>
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-modual-purple"></div>
        </div>
      ) : projects.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiPlus size={32} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Geen projecten gevonden
          </h3>
          <p className="text-gray-600 mb-6">
            Begin met het creëren van je eerste website project
          </p>
          <Link
            href="/dashboard/nieuw-project"
            className="inline-flex items-center space-x-2 bg-gradient-modual text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            <FiPlus />
            <span>Start je Eerste Project</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex-1">
                  {project.title || 'Naamloos Project'}
                </h3>
                {getStatusIcon(project.status)}
              </div>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {project.description || 'Geen beschrijving'}
              </p>

              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(project.createdAt).toLocaleDateString('nl-NL')}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
