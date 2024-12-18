export default function SidebarChatsEmpty() {
  return (
    <div className="flex-center flex-col px-5 text-center py-10 space-y-2">
      <img
        src="/assets/icons/interface-design.svg"
        alt="no chats"
        width={70}
        height={70}
      />
      <p>No chats yet.</p>
      <p className="text-xs text-gray-400 font-light text-balance">
        Start creating conversation by searching user and inviting them into
        conversation above.
      </p>
    </div>
  );
}
