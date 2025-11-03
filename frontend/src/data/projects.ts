export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  showGithubButton?: boolean;
}

import EulerAI from "../assets/eulerai.jpg";
import ICPC from "../assets/icpc.jpg";
import BigBrain from "../assets/bigbrain.jpg";
import NovaGraph from "../assets/novagraph.jpg";
import TheVineHk from "../assets/thevinehk.jpg";

export const projects: Project[] = [
  {
    id: "1",
    title: "EulerAI Website",
    description:
      "Designed and developed the complete UI/UX for EulerAI's company landing page, creating a modern and professional platform from concept to implementation.",
    image: EulerAI,
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    githubUrl: "https://github.com/eulerai-au",
    liveUrl: "https://www.eulerai.au/",
    showGithubButton: true,
  },
  {
    id: "2",
    title: "TheVineHk",
    description:
      "Designed and developed the complete UI/UX for TheVineHK, a Hong Kong-based educational resource center. Created a comprehensive platform featuring their STEAM programs, Executive Function training, and support services with a modern bilingual interface.",
    image: TheVineHk,
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    githubUrl: "https://github.com/TheVineHk",
    liveUrl: "https://www.thevinehk.com/",
    showGithubButton: false,
  },
  {
    id: "3",
    title: "ICPC Team Builder Platform",
    description:
      "An intelligent team matching platform for ICPC contestants, helping participants find compatible teammates based on skills, experience, and competition goals.",
    image: ICPC,
    technologies: ["Next.js", "TypeScript", "Algorithm", "Team Matching"],
    githubUrl: "https://github.com/Skyrim-line/ICPC-TEAM-BUILDER",
    liveUrl: "https://icpcteambuilder.com/public/home",
    showGithubButton: true,
  },
  {
    id: "4",
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
    githubUrl: "https://github.com/Skyrim-line/NovaGraph",
    liveUrl: "https://skyrim-line.github.io/Novagraph-Deploy/",
    showGithubButton: false,
  },
  {
    id: "5",
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
    githubUrl: "https://github.com/Skyrim-line/bigbrain-deploy",
    liveUrl: "https://www.bigbraingame.dev/login",
    showGithubButton: true,
  },
];
