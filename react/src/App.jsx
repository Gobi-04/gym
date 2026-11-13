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
        <MemberDashboard />
        <Footer />
      </main>
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<LandingPage />} />
    </Routes>
  );
}


export default App;