"use client";
import Link from "next/link";
import { MdOutlineEditNote } from "react-icons/md";
import { FaSun, FaMoon } from "react-icons/fa";
import { Navbar, NavbarBrand, NavbarItem } from "@nextui-org/react";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import UserMenu from "./UserMenu";
import { usePathname } from "next/navigation";
import classNames from "classnames";

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated, premium } = useAuth();
  const { theme, setTheme } = useTheme();

  console.log("isAuthenticated in Header:", isAuthenticated);
  const pathName = usePathname();
  console.log(pathName);

  const hiddenRoutes = ["/plan", "/login", "/register"];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <Navbar className="w-full h-[3rem] bg-primary-600 absolute top-0 left-0 items-center text-white duration-200"></Navbar>
    );

  console.log(theme);
  return (
    <>
      <Navbar
        className={classNames({
          "w-full h-[3rem] bg-primary-600 absolute top-0 left-0 items-center text-white duration-200":
            true,
          hidden: hiddenRoutes.includes(pathName),
        })}
      >
        <NavbarBrand>
          <Link
            className="uppercase text-3xl font-semibold"
            // href={isAuthenticated ? "/" : "/login"}
            href={"/"}
          >
            posts
          </Link>
        </NavbarBrand>
        <NavbarItem>
          <Link className="flex items-center gap-1" href="/create">
            <MdOutlineEditNote size={20} />
            New Post
          </Link>
        </NavbarItem>
        <NavbarItem>
          {isAuthenticated ? <UserMenu /> : <Link href="/login">Login</Link>}
        </NavbarItem>
        <div className="cursor-pointer">
          {theme === "light" && (
            <FaSun
              className="text-white"
              size={21}
              onClick={() => setTheme("dark")}
            />
          )}
          {theme === "dark" && (
            <FaMoon size={21} onClick={() => setTheme("light")} />
          )}
        </div>
      </Navbar>
      {!premium && isAuthenticated && (
        <Link href={"/upgrade"}>
          <div className="h-[1.7rem] w-full absolute right-0 left-0 top-12 bg-primary-400 flex items-center justify-center text-white">
            <p>Upgrade to Premium </p>
          </div>
        </Link>
      )}
    </>
  );
};

export default Header;
