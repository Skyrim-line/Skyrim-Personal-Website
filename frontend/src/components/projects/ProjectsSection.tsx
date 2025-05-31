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
import { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);

  const handleCardClick = useCallback((project: (typeof projects)[0]) => {
    setSelectedProject(project);
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
        My Projects
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer will-change-transform"
            onClick={() => handleCardClick(project)}>
            <CardHeader>
              <div className="aspect-video relative overflow-hidden rounded-t-lg">
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover w-full h-full"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <CardTitle className="mt-4 text-xl font-bold text-gray-800 dark:text-white">
                {project.title}
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                {project.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex gap-4">
              {project.githubUrl && (
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(project.githubUrl, "_blank");
                  }}>
                  <Github className="w-4 h-4" />
                  GitHub
                </Button>
              )}
              {project.liveUrl && (
                <Button
                  variant="default"
                  className="flex items-center gap-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(project.liveUrl, "_blank");
                  }}>
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog
        open={!!selectedProject}
        onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-3xl">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-gray-800 dark:text-white">
                  {selectedProject.title}
                </DialogTitle>
                <DialogDescription className="text-gray-600 dark:text-gray-400">
                  {selectedProject.description}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-6 space-y-6">
                <div className="aspect-video relative overflow-hidden rounded-lg">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="object-cover w-full h-full"
                    loading="eager"
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  {selectedProject.githubUrl && (
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                      onClick={() =>
                        window.open(selectedProject.githubUrl, "_blank")
                      }>
                      <Github className="w-4 h-4" />
                      View on GitHub
                    </Button>
                  )}
                  {selectedProject.liveUrl && (
                    <Button
                      variant="default"
                      className="flex items-center gap-2"
                      onClick={() =>
                        window.open(selectedProject.liveUrl, "_blank")
                      }>
                      <ExternalLink className="w-4 h-4" />
                      Visit Live Demo
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
