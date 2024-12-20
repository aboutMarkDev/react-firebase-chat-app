import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { welcomeNavigation } from "@/utils";

export default function WelcomeHeader() {
  const { pathname } = useLocation();
  return (
    <header className="sticky top-0 px-10 py-5 border-b flex-between items-center bg-background z-50">
      <div className="flex gap-3 items-center">
        <img src="/assets/chitchatlogo.png" alt="" width={50} height={50} />
        <h1 className="text-md font-semibold">ChitChat!</h1>
      </div>

      <nav>
        <ul className="flex">
          {welcomeNavigation.map((nav, i) => {
            const isCurrent = pathname === nav.route;

            return (
              <li key={i}>
                <Link to={nav.route}>
                  <Button
                    variant="link"
                    className={`${isCurrent && "underline"}`}
                  >
                    {nav.label}
                  </Button>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
