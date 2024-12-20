import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { welcomeNavigation } from "@/utils";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Menu } from "lucide-react";

export default function WelcomeHeader() {
  const { pathname } = useLocation();
  return (
    <header className="sticky top-0 px-10 py-5 border-b flex-between items-center bg-background z-50">
      <div className="flex-1 flex gap-3 items-center">
        <img src="/assets/chitchatlogo.png" alt="" width={50} height={50} />
        <h1 className="text-md font-semibold">ChitChat!</h1>
      </div>

      <nav className="max-sm:hidden">
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

      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="ghost" className="sm:hidden">
            <Menu />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="flex flex-col gap-3 px-3 py-5">
            {welcomeNavigation.map((nav, i) => {
              const isCurrent = pathname === nav.route;
              return (
                <Link
                  to={nav.route}
                  key={i}
                  className={`${
                    isCurrent && "bg-primary text-primary-foreground"
                  } p-3 rounded-lg hover:bg-primary hover:text-primary-foreground font-medium`}
                >
                  {nav.label}
                </Link>
              );
            })}
          </div>
        </DrawerContent>
      </Drawer>
    </header>
  );
}
