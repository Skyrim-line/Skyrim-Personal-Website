"use client";

import { projects } from "@/data/projects";
import { WobbleCard } from "@/components/ui/wobble-card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";

export default function ProjectsSection() {
  const getCardLayout = (index: number) => {
    // 所有卡片统一宽度，一行两个
    const colors = [
      "bg-gradient-to-br from-purple-800 to-indigo-900", // First project
      "bg-gradient-to-br from-blue-800 to-cyan-900", // Second project
      "bg-gradient-to-br from-emerald-800 to-teal-900", // Third project
      "bg-gradient-to-br from-pink-800 to-rose-900", // Fourth project
    ];

    // 所有卡片都是相同的布局
    return `col-span-1 min-h-[400px] md:min-h-[450px] ${
      colors[index % colors.length]
    }`;
  };

  return (
    <div
      id="projects"
      className="container mx-auto px-2 md:px-4 py-12 min-h-screen">
      <h1 className="!text-3xl sm:!text-4xl md:!text-5xl font-semibold text-center mb-12">
        My Projects
      </h1>
      <div className="grid grid-cols-1 gap-6 max-w-6xl mx-auto w-full">
        {projects.map((project, index) => {
          return (
            <WobbleCard
              key={project.id}
              containerClassName={getCardLayout(index)}
              className="relative">
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex-grow">
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <h2 className="text-left text-balance text-xl md:text-2xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                      {project.title}
                    </h2>
                    <div className="flex gap-2 sm:hidden shrink-0">
                      {project.githubUrl && project.showGithubButton && (
                        <Button
                          variant="default"
                          size="icon"
                          className="cursor-pointer rounded-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(project.githubUrl, "_blank");
                          }}>
                          <Github className="w-4 h-4" />
                        </Button>
                      )}
                      {project.liveUrl && (
                        <Button
                          variant="default"
                          size="icon"
                          className="cursor-pointer bg-white text-gray-900 hover:bg-gray-100 rounded-full "
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(project.liveUrl, "_blank");
                          }}>
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  <p className="text-left text-base/6 text-neutral-200 mb-1 sm:mb-6 max-w-4xl">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6 max-w-full lg:max-w-xs">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs sm:text-sm bg-white/20 backdrop-blur-sm text-white rounded-full border border-white/30">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4 mt-auto justify-center sm:justify-start hidden sm:flex">
                  {project.githubUrl && project.showGithubButton && (
                    <Button
                      variant="default"
                      className="flex items-center gap-2 text-sm sm:text-base cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.githubUrl, "_blank");
                      }}>
                      <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                      GitHub
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button
                      variant="default"
                      className="flex items-center gap-2 text-sm sm:text-base cursor-pointer bg-white text-gray-900 hover:bg-gray-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.liveUrl, "_blank");
                      }}>
                      <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                      Live Demo
                    </Button>
                  )}
                </div>
              </div>
              <img
                src={project.image}
                alt={project.title}
                width={620}
                height={600}
                className="absolute -right-0 sm:-right-2 -bottom-9 object-contain sm:rounded-tl-2xl rounded-br-2xl"
                loading="eager"
                decoding="async"
              />
            </WobbleCard>
          );
        })}
      </div>
    </div>
  );
}
