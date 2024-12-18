import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="flex-grow flex-center gap-1">
      <Loader2 className="animate-spin" />
      Loading...
    </div>
  );
}
