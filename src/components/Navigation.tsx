'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [activePage, setActivePage] = useState(pathname === '/' ? 'about' : 'analytics');

  const handleNavigate = (page: string) => {
    setActivePage(page);
    if (page === 'about') {
      router.push('/');
    } else {
      router.push('/analytics');
    }
  };

  return (
    <nav className="fixed top-0 right-0 m-4 z-50 flex space-x-2 bg-card-dark/70 backdrop-blur-md rounded-full p-1 shadow-lg">
      <button
        onClick={() => handleNavigate('about')}
        className={`nav-button ${
          activePage === 'about' ? 'nav-button-active' : 'nav-button-inactive'
        }`}
      >
        About
      </button>
      <button
        onClick={() => handleNavigate('analytics')}
        className={`nav-button ${
          activePage === 'analytics' ? 'nav-button-active' : 'nav-button-inactive'
        }`}
      >
        Analytics
      </button>
    </nav>
  );
}
