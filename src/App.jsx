import Header from './components/Header';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Beams from './components/ui/Beams'; // Adjust import path as needed

function Contents() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/notfound' element={<NotFound />} />
      <Route path='*' element={<Navigate to='/notfound' replace />} />
    </Routes>
  );
}

function AppContent() {
  const location = useLocation();
  const isNotFoundPage = location.pathname === '/notfound';

  return (
    <>
      <Header />
      {!isNotFoundPage && (
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          zIndex: -1,
          pointerEvents: 'none'
        }}>
          <Beams
            beamWidth={1}
            beamHeight={30}
            beamNumber={30}
            lightColor='#ffffff'
            speed={1.1}
            noiseIntensity={1.75}
            scale={0.2}
            rotation={30}
          />
        </div>
      )}
      <Contents />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;