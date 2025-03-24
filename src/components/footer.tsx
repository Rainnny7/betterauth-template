import Link from "next/link";
import { ReactElement } from "react";

const Footer = (): ReactElement => (
    <footer className="absolute inset-x-0 bottom-0 px-5 sm:px-0 sm:mx-[calc(10%+1rem)] h-14 flex gap-1 items-center text-sm text-muted-foreground bg-[#0E0E11] border-t sm:border-none border-dotted border-grid-line">
        Made with <span className="animate-pulse">❤️</span> by{" "}
        <Link
            className="text-primary hover:opacity-75 transition-opacity transform-gpu"
            href="https://github.com/Rainnny7"
            target="_blank"
            draggable={false}
        >
            Rainnny7
        </Link>
    </footer>
);
export default Footer;
