import { Badge } from "@/components/ui/badge";
import EulerAI from "@/assets/eulerai.jpg";

export default function ProjectCard() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-xl shadow-md bg-white dark:bg-zinc-900">
      {/* 左侧内容 */}
      <div className="flex-1">
        <h2 className="text-2xl font-semibold mb-2">CorpComment</h2>
        <p className="text-zinc-600 dark:text-zinc-300 mb-4">
          I worked as a full-stack developer on this startup project for 2
          years.
          <br />
          Users can give public feedback to companies.
        </p>

        <div className="flex flex-wrap gap-2">
          {["React", "Next.js", "MongoDB", "Tailwind", "Prisma"].map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech.toUpperCase()}
            </Badge>
          ))}
        </div>
      </div>

      {/* 右侧截图 */}
      <div className="flex-1 max-w-md rounded-lg overflow-hidden shadow-lg">
        <img
          src={EulerAI}
          alt="CorpComment screenshot"
          width={500}
          height={300}
          className="object-cover rounded-lg"
        />
      </div>
    </div>
  );
}
