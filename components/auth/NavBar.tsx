import { ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function NavBar() {
    return <nav className="sticky top-0 z-50 backdrop-blur-md border-b border-outline-variant/10 flex justify-between items-center p-4">
        <Link href="/" className="text-xl font-bold text-on-surface tracking-tight hover:opacity-90 transition-opacity">
          Onreco
        </Link>
        <div className="flex gap-2">
            <ShieldCheck />
            <p>Bank-grade Security</p>
        </div>
    </nav>
}