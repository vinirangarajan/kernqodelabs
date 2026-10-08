import { useState, useCallback } from 'react';
import './index.css';
import { useTheme } from './hooks/useTheme';
import { useNetworkStatus } from './hooks/useNetworkStatus';

import Loader from './components/Loader/Loader';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import ErrorPage from './components/ErrorPage/ErrorPage';

import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Services from './components/Services/Services';
import Products from './components/Products/Products';
import MyProjectKit from './components/MyProjectKit/MyProjectKit';
import Reviews from './components/Reviews/Reviews';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import FloatingConnectors from './components/FloatingConnectors/FloatingConnectors';
import Blog from './components/Blog/Blog';

function App() {
  const { theme, toggleTheme } = useTheme();
  const { isOnline } = useNetworkStatus();
  const [loaded, setLoaded] = useState(false);

  const handleLoaderComplete = useCallback(() => setLoaded(true), []);

  // Show loader on first visit
  if (!loaded) {
    return <Loader onComplete={handleLoaderComplete} />;
  }

  // Offline banner / full page when no connection detected
  if (!isOnline) {
    return <ErrorPage type="offline" onRetry={() => window.location.reload()} />;
  }

  return (
    <ErrorBoundary>
      <div className="app">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <main>
          <Hero />
          <About />
          <Services />
          <Products />
          <MyProjectKit />
          <Reviews />
          <Blog />
          <Contact />
        </main>
        <Footer />
        <FloatingConnectors />
      </div>
    </ErrorBoundary>
  );
}

export default App;
