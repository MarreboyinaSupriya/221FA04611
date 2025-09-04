import React from 'react';
import { Link, Shield, Zap, BarChart3, Globe, Clock, Trash2 } from 'lucide-react';

const About: React.FC = () => {
  const features = [
    {
      icon: <Link className="w-6 h-6" />,
      title: 'Smart URL Shortening',
      description: 'Generate short, memorable URLs instantly or create custom aliases for your brand.'
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Click Analytics',
      description: 'Track every click with detailed statistics and insights about your URL performance.'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Expiry Management',
      description: 'Set custom expiry dates for your URLs and automatic status updates.'
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Custom Domains',
      description: 'Use your own domain name to create branded short URLs that match your business.'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Secure & Reliable',
      description: 'Built with security in mind, ensuring your URLs are safe and always accessible.'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Lightning Fast',
      description: 'Optimized for speed with instant redirects and minimal loading times.'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-3 mb-6">
            <div className="bg-blue-600 p-3 rounded-xl">
              <Link className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900">LinkShrink</h1>
          </div>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A modern, feature-rich URL shortener built for today's web. 
            Transform long URLs into clean, trackable links with advanced analytics and customization options.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Enter Your URL</h3>
              <p className="text-gray-600">Paste your long URL and optionally customize the alias and domain.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Short Link</h3>
              <p className="text-gray-600">Receive a clean, short URL that's easy to share and remember.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Track & Analyze</h3>
              <p className="text-gray-600">Monitor clicks, manage expiry dates, and view detailed analytics.</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg p-8 text-center text-white mt-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-6 opacity-90">
            Join thousands of users who trust LinkShrink for their URL shortening needs.
          </p>
          <div className="text-sm opacity-75">
            Built with React, Node.js, and MongoDB • Open Source • Privacy Focused
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;