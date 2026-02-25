'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
}

interface NavigationProps {
  logo?: React.ReactNode;
  logoText?: string;
  navItems: NavItem[];
  ctaButton?: {
    text: string;
    onClick?: () => void;
    href?: string;
  };
  onLogoClick?: () => void;
  className?: string;
}

export const Navigation: React.FC<NavigationProps> = ({
  logo,
  logoText = 'AWS Cost Optimizer',
  navItems,
  ctaButton,
  onLogoClick,
  className = '',
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={`sticky top-0 z-sticky bg-bg-secondary border-b border-border-light backdrop-blur-glass ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer" onClick={onLogoClick}>
            {logo && <div className="w-8 h-8">{logo}</div>}
            <span className="text-xl font-bold text-text-primary hidden sm:inline">{logoText}</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-fast ${
                  item.isActive ? 'text-primary border-b-2 border-primary pb-1' : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA Button */}
          {ctaButton && (
            <div className="hidden md:block">
              {ctaButton.href ? (
                <Link
                  href={ctaButton.href}
                  className="px-6 py-2 bg-primary hover:bg-primary-dark text-text-inverse rounded-base font-medium transition-all duration-fast"
                >
                  {ctaButton.text}
                </Link>
              ) : (
                <button
                  onClick={ctaButton.onClick}
                  className="px-6 py-2 bg-primary hover:bg-primary-dark text-text-inverse rounded-base font-medium transition-all duration-fast"
                >
                  {ctaButton.text}
                </button>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-base text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors duration-fast"
            aria-label="Toggle menu"
          >
            <svg
              className={`w-6 h-6 transition-transform duration-normal ${isMobileMenuOpen ? 'rotate-90' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-border-light pt-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-2 rounded-base text-sm font-medium transition-colors duration-fast ${
                  item.isActive
                    ? 'text-primary bg-glass-light'
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary'
                }`}
              >
                {item.label}
              </Link>
            ))}
            {ctaButton && (
              <div className="px-4 pt-2">
                {ctaButton.href ? (
                  <Link
                    href={ctaButton.href}
                    className="block w-full text-center px-4 py-2 bg-primary hover:bg-primary-dark text-text-inverse rounded-base font-medium transition-all duration-fast"
                  >
                    {ctaButton.text}
                  </Link>
                ) : (
                  <button
                    onClick={ctaButton.onClick}
                    className="w-full px-4 py-2 bg-primary hover:bg-primary-dark text-text-inverse rounded-base font-medium transition-all duration-fast"
                  >
                    {ctaButton.text}
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

Navigation.displayName = 'Navigation';
