import { getInitials } from "@/utils";

export default function UserAvatar({
  username,
  onlineIndicator,
}: {
  username: string;
  onlineIndicator?: {
    avail: boolean;
    active: boolean;
  };
}) {
  return (
    <div className="rounded-full h-[2.5rem] w-[2.5rem] flex-center bg-primary text-primary-foreground font-bold relative flex-shrink-0">
      {getInitials(username)}

      {onlineIndicator?.avail && (
        <div
          className={`absolute bottom-0 right-0 rounded-full h-3 w-3 ${
            onlineIndicator.active ? "bg-green-500" : "bg-gray-500"
          }`}
        ></div>
      )}
    </div>
  );
}
