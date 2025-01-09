"use client";

import Link from "next/link";
import Wrapper from "./Wrapper";
import Button from "./Button";
import { useState } from "react";
import { cn, logout } from "~/libs";
import { SessionData } from "~/constants";
import { 
   ArrowRightOnRectangleIcon, 
   UserPlusIcon,
   Bars2Icon,
   ArrowLeftOnRectangleIcon
} from "@heroicons/react/24/solid";

interface NavbarProps {
  session: SessionData;
}

export default function Navbar({ session }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
  };

  return (
      <nav className="relative bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-100">
          <Wrapper className="flex flex-wrap items-center justify-between py-4">
              <Link
                  href="/"
                  className="text-2xl font-bold text-gray-800 hover:text-amber-600 transition-colors"
              >
                  SDN Library
              </Link>
              
              <button
                  className="rounded-lg p-2 text-gray-600 hover:bg-amber-50 hover:text-amber-600 transition-colors lg:hidden"
                  onClick={toggleMenu}
              >
                  <Bars2Icon className="size-6" />
              </button>

              <div
                  className={cn(
                      "w-full lg:flex lg:w-auto lg:items-center",
                      {
                          block: isMenuOpen,
                          hidden: !isMenuOpen,
                      }
                  )}
              >
                  <div className="mt-4 flex flex-col items-start gap-4 lg:mt-0 lg:flex-row lg:items-center">
                      <Link
                          href="/"
                          className="text-gray-600 hover:text-amber-600 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                      >
                          หนังสือ
                      </Link>

                      {session.isManager && (
                          <>
                              <Link
                                  href="/manager/books/"
                                  className="text-gray-600 hover:text-amber-600 transition-colors"
                                  onClick={() => setIsMenuOpen(false)}
                              >
                                  จัดการหนังสือ
                              </Link>
                              <Link
                                  href="/manager/members/"
                                  className="text-gray-600 hover:text-amber-600 transition-colors"
                                  onClick={() => setIsMenuOpen(false)}
                              >
                                  จัดการสมาชิก
                              </Link>
                          </>
                      )}

                      {!session.isLoggedIn ? (
                          <>
                              <Link
                                  href="/auth/sign-up/"
                                  onClick={() => setIsMenuOpen(false)}
                              >
                                  <Button
                                      className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white"
                                  >
                                      <UserPlusIcon className="size-5" />
                                      สมัครสมาชิก
                                  </Button>
                              </Link>
                              <Link
                                  href="/auth/sign-in"
                                  onClick={() => setIsMenuOpen(false)}
                              >
                                  <Button
                                      className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white"
                                  >
                                      <ArrowRightOnRectangleIcon className="size-5" />
                                      เข้าสู่ระบบ
                                  </Button>
                              </Link>
                          </>
                      ) : (
                          <Button
                              onClick={() => logout()}
                              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white"
                          >
                              <ArrowLeftOnRectangleIcon className="size-5" />
                              ออกจากระบบ
                          </Button>
                      )}
                  </div>
              </div>
          </Wrapper>
      </nav>
  );
}