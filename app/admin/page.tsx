'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiFolder, FiCheckCircle, FiClock } from 'react-icons/fi';

interface Project {
  id: string;
  title: string;
  description: string;
  textInput: string;
  status: string;
  createdAt: string;
  user: {
    name: string;
    email: string;
  };
}

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

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

  const updateProjectStatus = async (projectId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/projects/${projectId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchProjects();
      }
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.status === filter);

  const stats = {
    total: projects.length,
    new: projects.filter(p => p.status === 'Nieuw').length,
    inProgress: projects.filter(p => p.status === 'In Behandeling').length,
    completed: projects.filter(p => p.status === 'Voltooid').length,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          <span className="gradient-text">Admin</span> Dashboard
        </h1>
        <p className="text-gray-600 mt-2">Beheer alle projectaanvragen</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Totaal Projecten</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FiFolder className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Nieuw</p>
              <p className="text-3xl font-bold text-blue-600">{stats.new}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FiClock className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">In Behandeling</p>
              <p className="text-3xl font-bold text-yellow-600">{stats.inProgress}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <FiUsers className="text-yellow-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Voltooid</p>
              <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FiCheckCircle className="text-green-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6 flex space-x-2 overflow-x-auto">
        {['all', 'Nieuw', 'In Behandeling', 'Voltooid'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              filter === status
                ? 'bg-gradient-modual text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {status === 'all' ? 'Alle' : status}
          </button>
        ))}
      </div>

      {/* Projects Table */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-modual-purple"></div>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <p className="text-gray-600">Geen projecten gevonden</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Project
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Gebruiker
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Datum
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acties
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">
                          {project.title || 'Naamloos Project'}
                        </div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {project.textInput || project.description || 'Geen beschrijving'}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {project.user.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {project.user.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={project.status}
                        onChange={(e) => updateProjectStatus(project.id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-xs font-medium border-0 cursor-pointer ${
                          project.status === 'Nieuw'
                            ? 'bg-blue-100 text-blue-800'
                            : project.status === 'In Behandeling'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        <option value="Nieuw">Nieuw</option>
                        <option value="In Behandeling">In Behandeling</option>
                        <option value="Voltooid">Voltooid</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(project.createdAt).toLocaleDateString('nl-NL')}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          // View project details
                          alert(`Project details:\n\n${project.textInput || 'Geen beschrijving'}`);
                        }}
                        className="text-modual-purple hover:text-modual-pink text-sm font-medium"
                      >
                        Bekijk Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

