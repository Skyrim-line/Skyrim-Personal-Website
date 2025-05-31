export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Personal Portfolio",
    description:
      "A modern, responsive personal portfolio website built with React, TypeScript, and Tailwind CSS.",
    image: "/projects/portfolio.jpg",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    githubUrl: "https://github.com/yourusername/portfolio",
    liveUrl: "https://yourportfolio.com",
  },
  {
    id: "2",
    title: "E-commerce Platform",
    description:
      "A full-stack e-commerce platform with user authentication, product management, and payment integration.",
    image: "/projects/ecommerce.jpg",
    technologies: ["Next.js", "MongoDB", "Stripe", "Tailwind CSS"],
    githubUrl: "https://github.com/yourusername/ecommerce",
    liveUrl: "https://your-ecommerce.com",
  },
  {
    id: "3",
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates and team features.",
    image: "/projects/taskmanager.jpg",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
    githubUrl: "https://github.com/yourusername/task-manager",
    liveUrl: "https://your-taskmanager.com",
  },
];
