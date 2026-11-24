import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Coaches from './components/Coaches';
import Membership from './components/Membership';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Payment from './components/Payment';
import MemberDashboard from './components/MemberDashboard';
import FitnessOnboarding from './components/FitnessOnboarding';
import AdminPortal from './components/AdminPortal';
import { Route, Routes, useSearchParams } from 'react-router-dom';
import './App.css';

function LoginPage() {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('mode') === 'signup' ? 'signup' : 'login';

  return <Payment initialTab={initialTab} />;
}

function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Coaches />
        <Membership />
        <Reviews />
        <Contact />
        <Footer />
      </main>
    </>
  );
}

function App() {
  const isAdminPort = window.location.port === '5174';

  if (isAdminPort) {
    return (
      <Routes>
        <Route path="/login" element={<AdminPortal defaultTab="login" />} />
        <Route path="/dashboard" element={<AdminPortal defaultTab="dashboard" />} />
        <Route path="*" element={<AdminPortal />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/onboarding" element={<FitnessOnboarding />} />
      <Route path="/dashboard" element={<MemberDashboard />} />
      <Route path="/admin" element={<AdminPortal />} />
      <Route path="/admin/login" element={<AdminPortal defaultTab="login" />} />
      <Route path="/admin/dashboard" element={<AdminPortal defaultTab="dashboard" />} />
      <Route path="*" element={<LandingPage />} />
    </Routes>
  );
}


export default App;