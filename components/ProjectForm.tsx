'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiUpload, FiMic, FiFileText, FiX, FiImage } from 'react-icons/fi';
import { UploadButton } from '@uploadthing/react';
import type { OurFileRouter } from '@/app/api/uploadthing/core';

export default function ProjectForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showAIPreview, setShowAIPreview] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    textInput: '',
    photoUrls: [] as string[],
    voiceMemoUrl: '',
  });

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, textInput: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Show AI preview simulation
    setShowAIPreview(true);

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));

    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title || 'Nieuw Project',
          textInput: formData.textInput,
          photoUrls: formData.photoUrls,
          voiceMemoUrl: formData.voiceMemoUrl,
          description: formData.textInput,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create project');
      }

      const data = await response.json();
      
      // Close preview and redirect
      setTimeout(() => {
        setShowAIPreview(false);
        router.push('/dashboard');
        router.refresh();
      }, 2000);
    } catch (error) {
      console.error('Error creating project:', error);
      setIsLoading(false);
      setShowAIPreview(false);
      alert('Er is iets misgegaan. Probeer het opnieuw.');
    }
  };

  const removePhoto = (index: number) => {
    const newPhotos = [...formData.photoUrls];
    newPhotos.splice(index, 1);
    setFormData({ ...formData, photoUrls: newPhotos });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Titel (optioneel)
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-modual-purple focus:border-transparent"
              placeholder="Bijv. Mijn nieuwe bedrijfswebsite"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FiFileText className="inline mr-2" />
              Beschrijf je website wensen
            </label>
            <textarea
              value={formData.textInput}
              onChange={handleTextChange}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-modual-purple focus:border-transparent"
              placeholder="Vertel ons over je ideale website. Wat is het doel? Welke functionaliteiten heb je nodig? Welke stijl spreekt je aan?"
            />
            <p className="mt-2 text-sm text-gray-500">
              Wees zo gedetailleerd mogelijk om de beste resultaten te krijgen
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FiImage className="inline mr-2" />
              Upload foto's of logo's (optioneel)
            </label>
            <div className="space-y-4">
              {formData.photoUrls.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formData.photoUrls.map((url, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={url}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <FiX size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-modual-purple transition-colors">
                <UploadButton<OurFileRouter>
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    if (res) {
                      const newUrls = res.map(file => file.url);
                      setFormData({
                        ...formData,
                        photoUrls: [...formData.photoUrls, ...newUrls],
                      });
                    }
                  }}
                  onUploadError={(error: Error) => {
                    alert(`Upload fout: ${error.message}`);
                  }}
                  appearance={{
                    button: 'bg-gradient-modual text-white px-4 py-2 rounded-lg hover:opacity-90',
                    container: 'w-full',
                  }}
                />
                <p className="mt-2 text-sm text-gray-500">
                  Max 5 afbeeldingen, elk max 4MB
                </p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FiMic className="inline mr-2" />
              Upload een spraakmemo (optioneel)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-modual-purple transition-colors">
              {formData.voiceMemoUrl ? (
                <div className="space-y-2">
                  <audio controls src={formData.voiceMemoUrl} className="w-full" />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, voiceMemoUrl: '' })}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Verwijder opname
                  </button>
                </div>
              ) : (
                <>
                  <UploadButton<OurFileRouter>
                    endpoint="audioUploader"
                    onClientUploadComplete={(res) => {
                      if (res && res[0]) {
                        setFormData({ ...formData, voiceMemoUrl: res[0].url });
                      }
                    }}
                    onUploadError={(error: Error) => {
                      alert(`Upload fout: ${error.message}`);
                    }}
                    appearance={{
                      button: 'bg-gradient-modual text-white px-4 py-2 rounded-lg hover:opacity-90',
                      container: 'w-full',
                    }}
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Max 8MB audio bestand
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="pt-6 border-t">
            <button
              type="submit"
              disabled={isLoading || (!formData.textInput && formData.photoUrls.length === 0 && !formData.voiceMemoUrl)}
              className="w-full bg-gradient-modual text-white py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Bezig met verwerken...' : 'Verstuur Aanvraag'}
            </button>
            <p className="mt-2 text-center text-sm text-gray-500">
              Vul minimaal één van de bovenstaande velden in
            </p>
          </div>
        </div>
      </form>

      {/* AI Preview Modal */}
      {showAIPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full text-center"
          >
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-modual rounded-full mx-auto flex items-center justify-center mb-4 animate-pulse">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold gradient-text mb-2">
                AI Ontwerppreview
              </h3>
              <p className="text-gray-600">
                Onze AI analyseert je wensen en creëert een uniek website ontwerp...
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-modual-purple"></div>
                <span className="text-gray-700">Tekst wordt geanalyseerd...</span>
              </div>
              {formData.photoUrls.length > 0 && (
                <div className="flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-modual-pink"></div>
                  <span className="text-gray-700">Afbeeldingen worden verwerkt...</span>
                </div>
              )}
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-modual-blue"></div>
                <span className="text-gray-700">Ontwerp wordt gegenereerd...</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-medium">
                ✓ Je aanvraag is ontvangen!
              </p>
              <p className="text-green-700 text-sm mt-1">
                We nemen binnenkort contact met je op
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}

