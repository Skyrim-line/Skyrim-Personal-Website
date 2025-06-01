import { projects } from "@/data/projects";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";

export default function ProjectsSection() {
  return (
    <div
      id="projects"
      className="container mx-auto px-2 md:px-4 py-12 min-h-screen">
      <h1 className="!text-3xl sm:!text-4xl md:!text-5xl font-semibold text-center mb-12">
        My Projects
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="flex flex-col h-full hover:shadow-xl transition-all duration-300 cursor-pointer will-change-transform">
            <CardHeader>
              <div className="aspect-video relative overflow-hidden rounded-lg group">
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover w-full h-full rounded-lg group-hover:object-contain transition-all duration-300 md:blur-sm md:group-hover:blur-none md:scale-105 md:group-hover:scale-100"
                  loading="eager"
                  decoding="async"
                />
              </div>
              <CardTitle className="mt-4 text-xl sm:text-2xl font-bold">
                {project.title}
              </CardTitle>
              <CardDescription className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
                {project.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs sm:text-sm bg-gray-100 text-gray-700 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex gap-4">
              {project.githubUrl && (
                <Button
                  variant="outline"
                  className="flex items-center gap-2 text-sm sm:text-base"
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
                  className="flex items-center gap-2 text-sm sm:text-base"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(project.liveUrl, "_blank");
                  }}>
                  <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                  Live Demo
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
