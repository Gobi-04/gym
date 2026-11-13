import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Coaches from './components/Coaches';
import Membership from './components/Membership';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Payment from './components/Payment';
// import GymSignUp from '.components/GymSignUp';
// import Loginpage from './components/Loginpage';
import './App.css';

function App() {
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
         <Payment />
        
        <Footer />
       
      
      </main>
      
    </>
  );
}


export default App;