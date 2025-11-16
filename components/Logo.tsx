'use client';

import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function Logo({ className = '', width = 200, height = 60 }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center ${className}`}>
      <Image
        src="/logo.png"
        alt="Modual Logo"
        width={width}
        height={height}
        className="object-contain"
        priority
      />
    </Link>
  );
}

