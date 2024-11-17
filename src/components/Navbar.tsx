"use client";

import { useStore } from "@/zustand/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import data from "../../public/main.json";
import { Article } from "@/types";
const navbarItemStyle =
  "text-black dark:text-white text-base md:text-xs lg:text-base  relative w-fit block after:block after:content-[''] after:absolute after:h-[1.5px] after:bg-black dark:after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setNews } = useStore();
  return (
    <div
      className={
        "bg-white dark:bg-black absolute w-full top-0 z-50 md:text-sm lg:text-md"
      }
    >
      <div className=" w-full font-bold px-4 py-2 flex justify-between items-center">
        {/* Hamburger Menu for Mobile */}
        <div className="min-[780px]:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-black dark:text-white focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2 6h20M2 12h10M2 18h20"
                />
              )}
            </svg>
          </button>
        </div>
        {/* Logo */}
        <div className="hidden min-[780px]:block text-xl md:text-base lg:text-2xl text-black dark:text-white">
          <Link href="/">T F N</Link>
        </div>

        {/* Menu Items */}
        <div className="hidden min-[780px]:flex md:space-x-2 lg:space-x-4 items-center">
          <Link
            href="/"
            className={` ${navbarItemStyle}`}
            onClick={() => setNews(data.slice(0, 20) as Article[])}
          >
            Home
          </Link>
          <Link
            href="/category/world"
            className={`${navbarItemStyle}`}
            onClick={() =>
              setNews(
                data.filter(
                  (content) => content.category === "world"
                ) as Article[]
              )
            }
          >
            World
          </Link>

          <Link
            href="/category/sports"
            className={`${navbarItemStyle}`}
            onClick={() =>
              setNews(
                data.filter(
                  (content) => content.category === "sports"
                ) as Article[]
              )
            }
          >
            Sports
          </Link>
          <Link
            href="/category/business"
            className={`${navbarItemStyle}`}
            onClick={() =>
              setNews(
                data.filter(
                  (content) => content.category === "business"
                ) as Article[]
              )
            }
          >
            Business
          </Link>
          <Link
            href="/category/technology"
            className={` ${navbarItemStyle}`}
            onClick={() =>
              setNews(
                data.filter(
                  (content) => content.category === "technology"
                ) as Article[]
              )
            }
          >
            Technology
          </Link>
          <Link
            href="/category/entertainment"
            className={` ${navbarItemStyle}`}
            onClick={() =>
              setNews(
                data.filter(
                  (content) => content.category === "entertainment"
                ) as Article[]
              )
            }
          >
            Entertainment
          </Link>
          <Link
            href="/category/other"
            className={` ${navbarItemStyle}`}
            onClick={() =>
              setNews(
                data.filter(
                  (content) => content.category === "other"
                ) as Article[]
              )
            }
          >
            Other
          </Link>

          {/* Call-to-Action Button */}
          {/* <Link
            href="#cta"
            className=" bg-white dark:bg-black text-base md:text-xs lg:text-base  border-black dark:border-white  border-solid border-2 text-black dark:text-white px-4 py-2 mt-2 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition duration-300"
          >
            Login
          </Link>
          <Link
            href="#cta"
            className=" bg-white dark:bg-black text-base md:text-xs lg:text-base border-black dark:border-white  border-solid border-2 text-black dark:text-white px-4 py-2 mt-2 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition duration-300"
          >
            Register
          </Link> */}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`min-[780px]:hidden ${
          isOpen ? "block" : "hidden"
        } bg-white dark:bg-black shadow-lg font-bold`}
      >
        {/* Mobile CTA Button */}
        {/* <div className="flex w-[60%] mx-auto  justify-around space-y-2 mb-2">
          <Link
            href="#cta"
            className=" bg-white dark:bg-black  border-black dark:border-white  border-solid border-2 text-black dark:text-white px-4 py-2 mt-2 rounded hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition duration-300"
          >
            Login
          </Link>
          <Link
            href="#cta"
            className=" bg-white dark:bg-black border-black dark:border-white  border-solid border-2 text-black dark:text-white px-4 py-2 mt-2 rounded hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition duration-300"
          >
            Register
          </Link>
        </div> */}
        <Link
          href="/"
          className={`mx-auto py-2  ${navbarItemStyle}`}
          onClick={() => setNews(data.slice(0, 20) as Article[])}
        >
          Home
        </Link>
        <Link
          href="/category/world"
          className={`mx-auto py-2  ${navbarItemStyle}`}
          onClick={() =>
            setNews(
              data.filter(
                (content) => content.category === "world"
              ) as Article[]
            )
          }
        >
          World
        </Link>

        <Link
          href="/category/sports"
          className={`mx-auto py-2  ${navbarItemStyle}`}
          onClick={() =>
            setNews(
              data.filter(
                (content) => content.category === "sports"
              ) as Article[]
            )
          }
        >
          Sports
        </Link>
        <Link
          href="/category/business"
          className={`mx-auto py-2  ${navbarItemStyle}`}
          onClick={() =>
            setNews(
              data.filter(
                (content) => content.category === "business"
              ) as Article[]
            )
          }
        >
          Business
        </Link>
        <Link
          href="/category/technology"
          className={`mx-auto py-2  ${navbarItemStyle}`}
          onClick={() =>
            setNews(
              data.filter(
                (content) => content.category === "technology"
              ) as Article[]
            )
          }
        >
          Technology
        </Link>
        <Link
          href="/category/entertainment"
          className={`mx-auto py-2  ${navbarItemStyle}`}
          onClick={() =>
            setNews(
              data.filter(
                (content) => content.category === "entertainment"
              ) as Article[]
            )
          }
        >
          Entertainment
        </Link>
        <Link
          href="/category/other"
          className={`mx-auto py-2  ${navbarItemStyle}`}
          onClick={() =>
            setNews(
              data.filter(
                (content) => content.category === "other"
              ) as Article[]
            )
          }
        >
          Other
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
