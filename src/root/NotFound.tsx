import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  useEffect(() => {
    document.title = "Page not found";
  }, []);
  return (
    <div className="flex-grow flex-center flex-col gap-3">
      <img src="/assets/not-found1.svg" alt="404" width={620} height={620} />
      <p className="text-sm text-foreground/40">
        You might encounter a page does not exist!
      </p>
      <Link to="/">
        <Button size="lg">Go Back!</Button>
      </Link>
    </div>
  );
}
