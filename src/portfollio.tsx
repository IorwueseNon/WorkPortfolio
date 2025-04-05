import React, { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaExternalLinkAlt, FaSun, FaMoon } from "react-icons/fa";
import { motion } from "framer-motion";

interface Project {
  name: string;
  description: string;
  link: string;
}

const Portfolio: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch("https://api.github.com/users/IorwueseNon/repos")
      .then((response) => response.json())
      .then((data) => {
        const filteredProjects = data.map((repo: any) => ({
          name: repo.name,
          description: repo.description || "No description available.",
          link: repo.html_url,
        }));
        setProjects(filteredProjects);
      })
      .catch((error) => console.error("Error fetching GitHub repositories:", error));
  }, []);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} p-6 transition-all`} style={{
      backgroundImage: "url('/background.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-extrabold animate-pulse text-blue-300">My Portfolio</h1>
        <button 
          onClick={() => setDarkMode(!darkMode)} 
          className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition"
        >
          {darkMode ? <FaSun size={24} /> : <FaMoon size={24} />}
        </button>
      </header>
      
      <section className="text-center mb-8">
        <motion.p className="text-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          Software Engineer | UI/UX Enthusiast | Open Source Contributor
        </motion.p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="https://github.com/IorwueseNon" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
            <FaGithub size={32} />
          </a>
          <a href="https://www.linkedin.com/in/harry-nongomin-a89533356/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
            <FaLinkedin size={32} />
          </a>
          <a href="mailto:nongominharry@gmail.com" className="hover:text-blue-500">
            <FaEnvelope size={32} />
          </a>
        </div>
      </section>

      <section className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 text-blue-300 underline">About Me</h2>
        <motion.img 
          src="/profile.jpg" 
          alt="Your Profile" 
          className="w-40 h-40 mx-auto rounded-full border-4 border-blue-300 shadow-lg"
          initial={{ scale: 0.8, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          transition={{ duration: 1 }}
        />
        <p className="mt-4 text-lg text-black-200 max-w-2xl mx-auto">
          Hi! I'm Nongomin Harry, a passionate software engineer with a love for building elegant and efficient applications. 
          I enjoy working with modern web technologies, UI/UX design, and contributing to open source projects.
        </p>
      </section>

      <section className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center underline decoration-blue-300">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <motion.div 
                key={index} 
                className="bg-gray-800 p-5 rounded-xl shadow-lg hover:shadow-xl transition transform hover:scale-105 border border-blue-300"
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-2xl font-semibold mb-2 text-blue-200">{project.name}</h3>
                <p className="text-sm text-blue-300 mb-4">{project.description}</p>
                <a 
                  href={project.link} 
                  className="text-blue-300 flex items-center space-x-2 hover:text-blue-400 transition"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <span>View on GitHub</span> <FaExternalLinkAlt size={16} />
                </a>
              </motion.div>
            ))
          ) : (
            <motion.p className="text-center text-blue-300" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
              Loading projects...
            </motion.p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
