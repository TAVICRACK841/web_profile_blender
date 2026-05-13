import React from 'react';
import { 
  SiMysql, 
  SiTailwindcss, 
  SiAstro, 
  SiCplusplus, 
  SiArduino,
  SiDart
} from 'react-icons/si';
import { 
  FaJava, 
  FaHtml5, 
  FaCss3Alt, 
  FaPython, 
  FaReact,
  FaJs
} from 'react-icons/fa';

const skills = [
  { name: 'MySQL', icon: <SiMysql color="#4479A1" /> },
  { name: 'Python', icon: <FaPython color="#3776AB" /> },
  { name: 'HTML', icon: <FaHtml5 color="#E34F26" /> },
  { name: 'CSS', icon: <FaCss3Alt color="#1572B6" /> },
  { name: 'Tailwind', icon: <SiTailwindcss color="#06B6D4" /> },
  { name: 'Astro', icon: <SiAstro color="#FF5D01" /> },
  { name: 'JavaScript', icon: <FaJs color="#F7DF1E" /> },
  { name: 'React', icon: <FaReact color="#61DAFB" /> },
  { name: 'C++', icon: <SiCplusplus color="#00599C" /> },
  { name: 'Arduino', icon: <SiArduino color="#00979D" /> },
  { name: 'Java', icon: <FaJava color="#007396" /> },
  { name: 'Dart', icon: <SiDart color="#0175C2" /> },
];

export default function Skills() {
  return (
    <section id="skills" className="skills-section">
      <h2 className="section-title">Mis Habilidades</h2>
      <div className="skills-grid">
        {skills.map((skill, index) => (
          <div key={index} className="skill-card">
            <div className="skill-icon">
              {skill.icon}
            </div>
            <span className="skill-name">{skill.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
