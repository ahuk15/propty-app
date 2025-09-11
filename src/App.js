import React, { useState, useEffect } from 'react';
import { Download, Play, Check, Home, Zap, Calculator, TrendingUp, Database, Shield, FileText, Chrome, Mail, Phone, MapPin, Clock, Menu, X, Star, ArrowRight, DollarSign, PieChart, BarChart3, AlertTriangle, ThumbsUp, Target } from 'lucide-react';

// Supabase Configuration
const SUPABASE_URL = 'https://xsizfgtbjnybmcxiyeba.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhzaXpmZ3Riam55Ym1jeGl5ZWJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0MzY5MzcsImV4cCI6MjA2OTAxMjkzN30.0XFbRYjnaB3lMIekCdL81-Ar7Inb8fer0rQlu4tJCjY';

// Utility function for Supabase calls
const supabaseRequest = async (endpoint, data, method = 'POST') => {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP Error: ${response.status} - ${errorText}`);
    }

    return response;
  } catch (error) {
    console.error('Supabase Error:', error);
    throw error;
  }
};

// Function to save club member to Supabase
const saveClubMemberToSupabase = async (memberData) => {
  const clubData = {
    first_name: memberData.firstName,
    last_name: memberData.lastName,
    email: memberData.email,
    phone: memberData.phone || null,
    role: memberData.role,
    newsletter: memberData.newsletter,
    ip_address: null,
    user_agent: navigator.userAgent
  };

  return await supabaseRequest('club_propty_members', clubData);
};

// Simple Landing Page Component
const ProptyApp = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <img
                src="https://github.com/ahuk15/propty/blob/main/(No%20background)%20Propty%20-%20Name%20+%20Logo%20(500x200px).png?raw=true"
                alt="Propty"
                className="h-16"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {[
                { label: 'Features', id: 'features' },
                { label: 'Manual Entry', id: 'manual' },
                { label: 'Chrome Extension', id: 'extension' },
                { label: 'Pricing', id: 'pricing' },
                { label: 'Contact', id: 'contact' }
              ].map(({ label, id }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                >
                  {label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('contact')}
                className="bg-gradient-to-r from-blue-600 to-orange-500 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105"
              >
                Join Propty Club
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-3">
              <div className="flex flex-col space-y-2">
                {[
                  { label: 'Features', id: 'features' },
                  { label: 'Manual Entry', id: 'manual' },
                  { label: 'Chrome Extension', id: 'extension' },
                  { label: 'Pricing', id: 'pricing' },
                  { label: 'Contact', id: 'contact' }
                ].map(({ label, id }) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className="text-gray-700 hover:text-blue-600 font-medium text-left"
                  >
                    {label}
                  </button>
                ))}
                <button
                  onClick={() => scrollToSection('contact')}
                  className="bg-gradient-to-r from-blue-600 to-orange-500 text-white px-6 py-2 rounded-full font-semibold text-center"
                >
                  Join Propty Club
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Your Intelligent
                <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent"> Real Estate </span>
                Co-Pilot
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Analyze the profitability of any real estate listing in seconds.
                Fees, cash flow, returns: Propty calculates everything and enlightens you on the property's potential.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                <FileText className="w-5 h-5 mr-2" />
                Profitability Calculator Form
              </button>
              <button className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                <Download className="w-5 h-5 mr-2" />
                Download Extension
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center space-x-6 pt-4">
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-gray-600 font-medium">5.0 on Chrome Store</span>
              </div>
              <div className="text-gray-600">
                <span className="font-bold text-blue-600">10k+</span> analyses performed
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Propty?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A complete suite of intelligent tools to optimize your real estate investments
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8" />,
                title: 'Instant Analysis',
                description: 'Propty extracts, analyzes and calculates profitability in seconds from real estate data of your listings from Idealista, Fotocasa and other major platforms.',
                color: 'from-yellow-400 to-orange-500'
              },
              {
                icon: <Calculator className="w-8 h-8" />,
                title: 'Complete Financial Calculations',
                description: 'Closing costs, credit, taxes, gross and net returns, cash flow... All essential indicators are at your disposal.',
                color: 'from-green-400 to-blue-500'
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: 'Smart Propty Score',
                description: 'Our proprietary algorithm evaluates and scores each property out of 100 by analyzing its profitability and potential.',
                color: 'from-purple-400 to-pink-500'
              },
              {
                icon: <Database className="w-8 h-8" />,
                title: 'Real-Time Market Data',
                description: 'Price per sq ft, average rents, property taxes, closing costs... Our market data is constantly updated.',
                color: 'from-blue-400 to-cyan-500'
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: 'Complete Privacy',
                description: 'All your analyses remain private. GDPR compliance guaranteed.',
                color: 'from-green-400 to-emerald-500'
              },
              {
                icon: <FileText className="w-8 h-8" />,
                title: 'PDF Reports',
                description: 'Export your analyses as professional PDFs to help you negotiate your bank loans and find the right accounting and financial partners.',
                color: 'from-red-400 to-orange-500'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-white mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">
              Join the Propty Club
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-8">
              Join the exclusive community of real estate investors who use Propty
              to find the best opportunities and maximize their profitability.
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-orange-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-200 hover:scale-105">
              Get Started Today
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <img
                src="https://github.com/ahuk15/propty/blob/main/Plain%20logo%20-%20500x500px%20(no%20background).png?raw=true"
                alt="Propty"
                className="h-8 w-8"
              />
            </div>
            <p className="text-gray-400 mb-4">
              The intelligent real estate co-pilot that transforms your investments.
            </p>
            <p className="text-gray-400">
              &copy; 2025 Propty. All rights reserved. Made with ❤️ for real estate investors.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProptyApp;