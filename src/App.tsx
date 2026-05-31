import Nav from "./components/Nav";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Education from "./components/sections/Education";
import Experience from "./components/sections/Experience";
import Projects from "./components/sections/Projects";
import Skills from "./components/sections/Skills";
import Certifications from "./components/sections/Certifications";
import Contact from "./components/sections/Contact";
import Cursor from "./components/Cursor";

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-x-hidden">
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Education />
        <Experience />
        <Projects />
        <Skills />
        <Certifications />
        <Contact />
      </main>
    </div>
  );
}
