'use client';

import Logo from './Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Logo width={120} height={36} />
            <p className="mt-4 text-gray-600 text-sm">
              Creëer eenvoudig je eigen website met Modual
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-gray-600 hover:text-modual-purple transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/dashboard" className="text-gray-600 hover:text-modual-purple transition-colors">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="/auth/registreren" className="text-gray-600 hover:text-modual-purple transition-colors">
                  Registreren
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
            <p className="text-sm text-gray-600">
              Email: info@modual.nl
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
          <p>&copy; {currentYear} Modual. Alle rechten voorbehouden.</p>
        </div>
      </div>
    </footer>
  );
}

