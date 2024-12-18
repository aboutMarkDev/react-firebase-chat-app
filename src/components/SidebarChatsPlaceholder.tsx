import { Skeleton } from "./ui/skeleton";

export default function SidebarChatsPlaceholder() {
  return Array.from({ length: 5 }).map((_, i) => (
    <div className="px-5 py-2 flex items-center gap-3" key={i}>
      <Skeleton className="h-[2.5rem] w-[2.5rem] rounded-full" />
      <div className="space-y-1 flex-1 overflow-hidden">
        <Skeleton className="md:h-[0.75rem] h-[0.85rem] w-full" />
        <Skeleton className="md:h-[0.75rem] h-[0.85rem] w-[90%]" />
      </div>
    </div>
  ));
}
