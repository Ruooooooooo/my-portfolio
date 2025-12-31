import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black text-white border-b border-zinc-800 backdrop-blur-sm bg-black/90">
      <div className="max-w-screen-2xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo Area */}
        <Link to="/" className="text-xl font-bold tracking-tighter hover:text-zinc-300 transition-colors">
          PORTFOLIO
        </Link>

        {/* Links */}
        <div className="flex items-center gap-8 text-sm font-medium">
          <Link to="/" className="hover:text-zinc-300 transition-colors">作品</Link>
          <span className="text-zinc-600">/</span>
          <a href="mailto:your.email@example.com" className="hover:text-zinc-300 transition-colors">联系</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;