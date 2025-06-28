import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Articles from './components/Articles';
import Investments from './components/Investments';
import Books from './components/Books';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/investmenttechniques" element={<Investments />} />
          <Route path="/books" element={<Books />} />
          <Route path="/aboutus" element={<AboutUs />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}