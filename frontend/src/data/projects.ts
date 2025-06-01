export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

import EulerAI from "../assets/eulerai.jpg";
import ICPC from "../assets/icpc.jpg";
import BigBrain from "../assets/bigbrain.jpg";
import NovaGraph from "../assets/novagraph.jpg";

export const projects: Project[] = [
  {
    id: "1",
    title: "EulerAI Website",
    description: "EulerAI Company landing page",
    image: EulerAI,
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    githubUrl: "https://github.com/yourusername/portfolio",
    liveUrl: "https://yourportfolio.com",
  },
  {
    id: "2",
    title: "ICPC Team Builder Platform",
    description:
      "An intelligent team matching platform for ICPC contestants, helping participants find compatible teammates based on skills, experience, and competition goals.",
    image: ICPC,
    technologies: ["Next.js", "TypeScript", "Algorithm", "Team Matching"],
    githubUrl: "https://github.com/yourusername/ecommerce",
    liveUrl: "https://your-ecommerce.com",
  },
  {
    id: "3",
    title: "NovaGraph Visualizer",
    description:
      "A powerful database relationship visualization tool built with WebAssembly (WASM) for high-performance graph rendering and interactive data exploration.",
    image: NovaGraph,
    technologies: [
      "React",
      "TypeScript",
      "WebAssembly",
      "C++",
      "Graph Visualization",
    ],
    githubUrl: "https://github.com/yourusername/task-manager",
    liveUrl: "https://your-taskmanager.com",
  },
  {
    id: "4",
    title: "BigBrain Game Platform",
    description:
      "A full-stack platform for creating and managing interactive quiz games, featuring real-time result analytics and user performance tracking.",
    image: BigBrain,
    technologies: [
      "React",
      "Node.js",
      "Redis",
      "Real-time Analytics",
      "Game Design",
    ],
    githubUrl: "https://github.com/yourusername/bigbrain",
    liveUrl: "https://your-bigbrain.com",
  },
];
