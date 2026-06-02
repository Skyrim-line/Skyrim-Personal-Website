import { forwardRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface CVPreviewProps {
  markdown: string;
}

export const CVPreview = forwardRef<HTMLDivElement, CVPreviewProps>(
  ({ markdown }, ref) => {
    return (
      <div
        id="cv-print-area"
        ref={ref}
        className="bg-white text-gray-900 mx-auto px-12 py-10 max-w-[860px] min-h-[1100px] shadow-sm">
        <div className="prose prose-sm prose-gray max-w-none
          prose-h1:text-2xl prose-h1:font-bold prose-h1:mb-1 prose-h1:text-gray-900
          prose-h2:text-base prose-h2:font-semibold prose-h2:uppercase prose-h2:tracking-wider
          prose-h2:text-indigo-600 prose-h2:border-b prose-h2:border-indigo-200 prose-h2:pb-1 prose-h2:mt-5 prose-h2:mb-3
          prose-h3:text-sm prose-h3:font-semibold prose-h3:text-gray-800 prose-h3:mt-3 prose-h3:mb-0.5
          prose-p:text-sm prose-p:text-gray-700 prose-p:leading-relaxed prose-p:my-1
          prose-ul:text-sm prose-ul:text-gray-700 prose-ul:my-1 prose-ul:pl-4
          prose-li:my-0.5
          prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-gray-900
          prose-hr:border-gray-200 prose-hr:my-4">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
        </div>
      </div>
    );
  }
);

CVPreview.displayName = "CVPreview";
