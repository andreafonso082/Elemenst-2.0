/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Galerie from './pages/Galerie';
import Contact from './pages/Contact';
import Legal from './pages/Legal';
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
              <Route index element={<HomePage />} />
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
