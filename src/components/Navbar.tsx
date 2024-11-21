"use client";

import Link from "next/link";
import Wrapper from "./Wrapper";
import Button from "./Button";
import { useState } from "react";
import { cn, logout } from "~/libs";
import { SessionData } from "~/constants";
import { ArrowRightIcon, Bars2Icon } from "@heroicons/react/24/solid";

interface NavbarProps {
    session: SessionData;
}

export default function Navbar({ session }: NavbarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="mb-6 text-gray-800">
            <Wrapper className="flex flex-wrap items-center justify-between py-4">
                <div className="invisible text-2xl font-bold">
                    <Link
                        href="/"
                        className="transition-colors hover:text-gray-600"
                    >
                        ห้องสมุด
                    </Link>
                </div>
                <button
                    className="rounded p-2 transition-colors hover:bg-gray-200 lg:hidden"
                    onClick={toggleMenu}
                >
                    <Bars2Icon className="size-6" />
                </button>
                <div
                    className={cn("w-full lg:flex lg:w-auto lg:items-center", {
                        block: isMenuOpen,
                        hidden: !isMenuOpen,
                    })}
                >
                    <div className="mt-4 flex flex-col items-start gap-4 lg:mt-0 lg:flex-row lg:items-center">
                        <Link
                            href="/"
                            className="transition-colors hover:text-gray-600"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            หนังสือ
                        </Link>
                        {session.isManager && (
                            <>
                                <Link
                                    href="/manager/books/"
                                    className="transition-colors hover:text-gray-600"
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                >
                                    จัดการหนังสือ
                                </Link>
                                <Link
                                    href="/manager/members/"
                                    className="transition-colors hover:text-gray-600"
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                >
                                    จัดการสมาชิก
                                </Link>
                            </>
                        )}

                        {!session.isLoggedIn ? (
                            <>
                                <Link
                                    href="/auth/sign-up/"
                                    className="transition-colors hover:text-gray-600"
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                >
                                    สมัครสมาชิก
                                </Link>
                                <Link
                                    href="/auth/sign-in"
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                >
                                    <Button>เข้าสู่ระบบ</Button>
                                </Link>
                            </>
                        ) : (
                            <Button
                                onClick={() => logout()}
                                className="flex items-center gap-2"
                            >
                                ออกจากระบบ
                                <ArrowRightIcon className="size-4" />
                            </Button>
                        )}
                    </div>
                </div>
            </Wrapper>
        </nav>
    );
}
