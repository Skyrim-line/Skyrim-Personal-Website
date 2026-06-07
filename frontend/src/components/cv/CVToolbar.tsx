import { Button } from "@/components/ui/button";
import { Download, Share2, Eye, Pencil, Save } from "lucide-react";
import { toast } from "sonner";

interface CVToolbarProps {
  canEdit: boolean;
  mode: "edit" | "preview";
  onModeChange: (mode: "edit" | "preview") => void;
  onDownloadPDF: () => void;
  onSave?: () => Promise<void>;
  isSaving?: boolean;
  markdown: string;
}

export function CVToolbar({
  canEdit,
  mode,
  onModeChange,
  onDownloadPDF,
  onSave,
  isSaving = false,
  markdown,
}: CVToolbarProps) {
  const handleShare = async () => {
    try {
      const encoded = btoa(encodeURIComponent(markdown));
      const url =
        window.location.origin +
        window.location.pathname +
        "#/cv?md=" +
        encoded;
      await navigator.clipboard.writeText(url);
      toast.success("Share link copied to clipboard!");
    } catch {
      toast.error("Failed to copy link.");
    }
  };

  return (
    <div className="flex items-center justify-end py-2 gap-2">
      {canEdit && (
        <div className="flex items-center rounded-md border bg-gray-50 dark:bg-gray-800 p-0.5 gap-0.5">
          <Button
            variant={mode === "edit" ? "default" : "ghost"}
            size="sm"
            onClick={() => onModeChange("edit")}
            className="h-7 px-3 text-xs gap-1.5">
            <Pencil className="w-3.5 h-3.5" />
            Edit
          </Button>
          <Button
            variant={mode === "preview" ? "default" : "ghost"}
            size="sm"
            onClick={() => onModeChange("preview")}
            className="h-7 px-3 text-xs gap-1.5">
            <Eye className="w-3.5 h-3.5" />
            Preview
          </Button>
        </div>
      )}

      <Button
        variant="outline"
        size="sm"
        onClick={handleShare}
        className="h-8 px-3 text-xs gap-1.5">
        <Share2 className="w-3.5 h-3.5" />
        Share
      </Button>

      {canEdit && onSave && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => void onSave()}
          disabled={isSaving}
          className="h-8 px-3 text-xs gap-1.5">
          <Save className="w-3.5 h-3.5" />
          {isSaving ? "Saving..." : "Save"}
        </Button>
      )}

      <Button
        size="sm"
        onClick={onDownloadPDF}
        className="h-8 px-3 text-xs gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white">
        <Download className="w-3.5 h-3.5" />
        PDF
      </Button>
    </div>
  );
}
