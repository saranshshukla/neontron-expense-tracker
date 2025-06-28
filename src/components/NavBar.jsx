// src/components/NavBar.jsx

import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { List, X } from 'phosphor-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NavBar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const navItems = ['Home', 'Articles', 'Investment Techniques', 'Books', 'About Us'];

  return (
    <header className="fixed w-full bg-black bg-opacity-50 backdrop-blur z-50 shadow-lg">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="text-2xl font-bold neon-glow hover:text-white transition-colors">
          Tron Finance
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => {
            const path = item === 'Home' ? '/' : `/${item.toLowerCase().replace(/ /g, '')}`;
            const isActive = location.pathname === path;

            return (
              <Link
                key={item}
                to={path}
                className={`hover:neon-glow transition-transform hover:scale-105 ${isActive ? 'underline text-white' : ''}`}
              >
                {item}
              </Link>
            );
          })}
        </div>

        {/* Mobile Hamburger */}
        <button onClick={() => setOpen(true)} className="md:hidden">
          <List size={32} weight="light" />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            ></motion.div>

            {/* Mobile Menu */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-64 bg-[#111] p-6 flex flex-col shadow-2xl z-50"
            >
              <button onClick={() => setOpen(false)} className="self-end mb-4">
                <X size={32} weight="light" />
              </button>

              <div className="mt-4 flex flex-col space-y-6">
                {navItems.map((item) => {
                  const path = item === 'Home' ? '/' : `/${item.toLowerCase().replace(/ /g, '')}`;
                  const isActive = location.pathname === path;

                  return (
                    <Link
                      key={item}
                      onClick={() => setOpen(false)}
                      to={path}
                      className={`text-xl hover:neon-glow transition-transform hover:scale-105 ${isActive ? 'underline text-white' : ''}`}
                    >
                      {item}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
