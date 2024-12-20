import { socials } from "@/constants";

export default function Footer() {
  return (
    <footer className="px-10 py-5 flex-between items-center max-md:flex-col gap-5 font-extralight text-sm text-foreground/50 w-full max-w-screen-2xl mx-auto">
      <section className="flex items-center gap-3">
        <img src="/assets/chitchatlogo.png" alt="" width={30} height={30} />
        <h1 className="font-medium">ChitChat!</h1>
      </section>
      <h3>&copy; {new Date().getFullYear()} All rights reserved.</h3>

      <section className="space-y-3">
        <ul className="flex space-x-5">
          {socials.map((i) => (
            <li key={i.label}>
              <img
                src={i.logo}
                alt={i.label}
                width={24}
                height={24}
                className="invert brightness-0"
              />
            </li>
          ))}
        </ul>
        <h5 className="text-center text-xs">@aboutdevmark</h5>
      </section>
    </footer>
  );
}
