'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Sparkles, Zap, Users, Rocket, DollarSign } from 'lucide-react';

const navItems = [
  { id: 'avantages', label: 'Avantages', icon: Sparkles },
  { id: 'fonctionnalites', label: 'Fonctionnalités', icon: Zap },
  { id: 'cas-usage', label: 'Cas d\'usage', icon: Users },
  { id: 'comment-ca-marche', label: 'Comment ça marche', icon: Rocket },
  { id: 'tarifs', label: 'Tarifs', icon: DollarSign },
];

export function ThaisNavigation() {
  const [activeSection, setActiveSection] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show navigation after scrolling 300px
      setIsVisible(window.scrollY > 300);

      // Update active section based on scroll position
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Offset for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  if (!isVisible) return null;

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-primary to-emerald-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">TF</span>
            </div>
            <span className="text-sm font-bold text-gray-800">
              TriggerFlow <span className="text-brand-primary">× Thaïs</span>
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`
                    relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                    ${
                      isActive
                        ? 'text-brand-primary bg-brand-primary/10'
                        : 'text-gray-600 hover:text-brand-primary hover:bg-gray-50'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-brand-primary/10 rounded-lg -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* CTA Button */}
          <a
            href="https://app.lemcal.com/@trigger-flow/tf-thais"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-primary to-emerald-600 text-white text-sm font-semibold rounded-lg hover:shadow-lg transition-all"
          >
            <Rocket className="w-4 h-4" />
            Réserver une démo
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
