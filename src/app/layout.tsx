import "./globals.css";
import Navbar from "~/components/Navbar";
import Toast from "~/components/Toast";
import { ReactNode } from "react";
import { anuphan } from "~/fonts";
import { getSession } from "~/libs";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        template: "%s | SDN Ebook",
        default: "SDN Ebook",
    },
};

interface LayoutProps {
    children: ReactNode;
}

export default async function layout({ children }: LayoutProps) {
    const session = await getSession();

    return (
        <html lang="en">
            <body className={anuphan.className}>
                <Toast />
                <Navbar session={JSON.parse(JSON.stringify(session))} />
                {children}
            </body>
        </html>
    );
}
