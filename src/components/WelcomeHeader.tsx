import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const welcomeNavigation = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Features",
    route: "/features",
  },
  {
    label: "About",
    route: "/about",
  },
];

export default function WelcomeHeader() {
  return (
    <header className="sticky top-0 px-10 py-5 border-b flex-between items-center backdrop-blur">
      <div className="flex gap-3 items-center">
        <img src="/assets/chatlogo.png" alt="" width={50} height={50} />
        <h1 className="text-md font-semibold">ChitChat!</h1>
      </div>

      <nav>
        <ul className="flex">
          {welcomeNavigation.map((nav, i) => (
            <li key={i}>
              <Link to={nav.route}>
                <Button variant="link">{nav.label}</Button>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
