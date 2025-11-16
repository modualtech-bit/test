'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import VoiceRecorder from '@/components/VoiceRecorder'

interface Project {
  id: string
  name: string
  description: string
  status: 'draft' | 'processing' | 'completed'
  files: ProjectFile[]
  voiceMemo?: string
  generatedWebsite?: string
  createdAt: string
  updatedAt: string
}

interface ProjectFile {
  id: string
  name: string
  type: string
  url: string
  uploadedAt: string
}

export default function ProjectPage() {
  const router = useRouter()
  const params = useParams()
  const projectId = params?.id as string

  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  useEffect(() => {
    if (projectId) {
      fetchProject()
    }
  }, [projectId])

  const fetchProject = async () => {
    try {
      const response = await fetch(`/api/projects/${projectId}`)
      if (!response.ok) {
        router.push('/dashboard')
        return
      }
      const data = await response.json()
      setProject(data.project)
    } catch (error) {
      console.error('Error fetching project:', error)
      router.push('/dashboard')
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    setUploading(true)

    for (const file of Array.from(files)) {
      const formData = new FormData()
      formData.append('file', file)

      try {
        const response = await fetch(`/api/projects/${projectId}/upload`, {
          method: 'POST',
          body: formData,
        })

        if (response.ok) {
          await fetchProject()
        }
      } catch (error) {
        console.error('Error uploading file:', error)
      }
    }

    setUploading(false)
  }

  const handleVoiceRecording = async (audioBlob: Blob) => {
    const formData = new FormData()
    formData.append('file', audioBlob, 'voice-memo.webm')

    setUploading(true)

    try {
      const response = await fetch(`/api/projects/${projectId}/upload`, {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        await fetchProject()
      }
    } catch (error) {
      console.error('Error uploading voice memo:', error)
    } finally {
      setUploading(false)
    }
  }

  const handleVoiceUpload = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)

    setUploading(true)

    try {
      const response = await fetch(`/api/projects/${projectId}/upload`, {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        await fetchProject()
      }
    } catch (error) {
      console.error('Error uploading voice file:', error)
    } finally {
      setUploading(false)
    }
  }

  const handleGenerateWebsite = async () => {
    setGenerating(true)

    try {
      const response = await fetch(`/api/projects/${projectId}/generate`, {
        method: 'POST',
      })

      if (response.ok) {
        await fetchProject()
        setShowPreview(true)
      }
    } catch (error) {
      console.error('Error generating website:', error)
    } finally {
      setGenerating(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Laden...</p>
        </div>
      </div>
    )
  }

  if (!project) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard">
              <img 
                src="/logo.svg" 
                alt="Modual Logo" 
                className="h-10 w-auto"
              />
            </Link>
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-gray-800 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Terug naar dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Project Header */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{project.name}</h1>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                project.status === 'completed' ? 'bg-green-100 text-green-700' :
                project.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {project.status === 'completed' ? 'Voltooid' :
                 project.status === 'processing' ? 'Verwerken...' :
                 'Concept'}
              </span>
            </div>
          </div>

          {/* Upload Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload je materiaal</h2>
            
            {/* File Upload */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Foto's & Logo's</h3>
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 hover:border-primary-500 rounded-xl p-8 cursor-pointer transition-all group">
                <svg className="w-12 h-12 text-gray-400 group-hover:text-primary-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span className="text-lg font-semibold text-gray-700 mb-2">Klik om bestanden te uploaden</span>
                <span className="text-sm text-gray-500">of sleep bestanden hierheen</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  disabled={uploading}
                />
              </label>

              {/* Uploaded Files */}
              {project.files.length > 0 && (
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {project.files.filter(f => f.type.startsWith('image/')).map((file) => (
                    <div key={file.id} className="relative group">
                      <img
                        src={file.url}
                        alt={file.name}
                        className="w-full h-32 object-cover rounded-lg shadow-md"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity px-2 text-center">
                          {file.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Voice Recording */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Spraakbericht</h3>
              <p className="text-gray-600 mb-4">
                Neem een spraakbericht op of upload een audiobestand om je wensen uit te leggen
              </p>
              <VoiceRecorder 
                onRecordingComplete={handleVoiceRecording}
                onUpload={handleVoiceUpload}
              />
              
              {/* Audio Files */}
              {project.files.filter(f => f.type.startsWith('audio/')).length > 0 && (
                <div className="mt-6 space-y-3">
                  {project.files.filter(f => f.type.startsWith('audio/')).map((file) => (
                    <div key={file.id} className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                      <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                      </svg>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{file.name}</p>
                        <audio src={file.url} controls className="w-full mt-2" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Generate Button */}
            <div className="flex justify-center pt-4">
              <button
                onClick={handleGenerateWebsite}
                disabled={generating || project.files.length === 0}
                className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
              >
                {generating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Website wordt gegenereerd...
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    Genereer mijn website
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Preview Section */}
          {project.generatedWebsite && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Je gegenereerde website</h2>
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="text-primary-600 hover:text-primary-700 font-semibold"
                >
                  {showPreview ? 'Verberg preview' : 'Toon preview'}
                </button>
              </div>

              {showPreview && (
                <div className="border-2 border-gray-200 rounded-xl overflow-hidden">
                  <iframe
                    srcDoc={project.generatedWebsite}
                    className="w-full h-[600px]"
                    title="Website Preview"
                  />
                </div>
              )}

              <div className="mt-6 flex gap-4">
                <button
                  onClick={() => {
                    const blob = new Blob([project.generatedWebsite!], { type: 'text/html' })
                    const url = URL.createObjectURL(blob)
                    const a = document.createElement('a')
                    a.href = url
                    a.download = `${project.name.toLowerCase().replace(/\s+/g, '-')}.html`
                    a.click()
                  }}
                  className="flex-1 bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download HTML
                </button>
                <button
                  onClick={handleGenerateWebsite}
                  className="flex-1 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Opnieuw genereren
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

