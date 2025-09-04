import React, { useState } from 'react';
import Header from './components/Header';
import Toast from './components/Toast';
import RedirectHandler from './components/RedirectHandler';
import Home from './pages/Home';
import Statistics from './pages/Statistics';
import About from './pages/About';
import { useToast } from './hooks/useToast';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'statistics' | 'about'>('home');
  const { toasts, removeToast, showSuccess, showError, showInfo } = useToast();

  // Check if current URL is a short code redirect
  const currentPath = window.location.pathname;
  const shortCode = currentPath.slice(1); // Remove leading slash
  
  // If there's a path and it's not a known page, treat it as a short code
  if (shortCode && !['statistics', 'about'].includes(shortCode)) {
    return <RedirectHandler shortCode={shortCode} />;
  }

  const handleShowToast = (type: 'success' | 'error' | 'info', message: string) => {
    switch (type) {
      case 'success':
        showSuccess(message);
        break;
      case 'error':
        showError(message);
        break;
      case 'info':
        showInfo(message);
        break;
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onShowToast={handleShowToast} />;
      case 'statistics':
        return <Statistics onShowToast={handleShowToast} />;
      case 'about':
        return <About />;
      default:
        return <Home onShowToast={handleShowToast} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage={currentPage} onPageChange={setCurrentPage} />
      {renderCurrentPage()}
      <Toast toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

export default App;