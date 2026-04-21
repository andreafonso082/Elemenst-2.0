/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home.tsx';
import Projects from './pages/Projects.tsx';
import ProjectDetail from './pages/ProjectDetail.tsx';
import Galerie from './pages/Galerie.tsx';
import Contact from './pages/Contact.tsx';
import Legal from './pages/Legal.tsx';
import ScrollToTop from './components/ScrollToTop';
import { LanguageProvider } from './context/LanguageContext';
import { HelmetProvider } from 'react-helmet-async';

export default function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="projects" element={<Projects />} />
              <Route path="projects/:id" element={<ProjectDetail />} />
              <Route path="galerie" element={<Galerie />} />
              <Route path="contact" element={<Contact />} />
              <Route path="terms" element={<Legal />} />
              <Route path="privacy" element={<Legal />} />
              <Route path="cookies" element={<Legal />} />
            </Route>
          </Routes>
        </Router>
      </LanguageProvider>
    </HelmetProvider>
  );
}
