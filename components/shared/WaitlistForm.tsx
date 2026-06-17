"use client";

import { useState } from "react";

type WaitlistFormProps = {
    variant?: "pill" | "stacked";
};

const FORM_ACTION = "https://app.proforms.top/f/pr75f25414";
const THANK_YOU_URL = "/thank-you";

export default function WaitlistForm({
    variant = "pill",
}: WaitlistFormProps) {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");

    if (variant === "stacked") {
        return (
            <div id="waitlist-form" className="w-full max-w-md mx-auto relative">
                <form
                    action={FORM_ACTION}
                    method="POST"
                    className="flex flex-col gap-3"
                >
                    <input
                        type="hidden"
                        name="_redirect"
                        value={THANK_YOU_URL}
                    />
                    <input
                        type="text"
                        name="name"
                        id="stacked-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your first name"
                        required
                        className="w-full bg-surface/60 backdrop-blur rounded-lg px-5 py-3.5 border border-outline-variant/30 text-on-surface placeholder:text-outline focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/40 transition-colors"
                    />
                    <input
                        type="email"
                        name="email"
                        id="stacked-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@company.com"
                        required
                        className="w-full bg-surface/60 backdrop-blur rounded-lg px-5 py-3.5 border border-outline-variant/30 text-on-surface placeholder:text-outline focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/40 transition-colors"
                    />
                    <button
                        type="submit"
                        className="w-full btn-primary text-on-primary-container px-7 py-3.5 rounded-lg font-semibold hover:opacity-90 transition-opacity cursor-pointer"
                    >
                        Join the Waitlist
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div id="waitlist-form" className="w-full max-w-md mx-auto relative">
            <form
                action={FORM_ACTION}
                method="POST"
                className="flex items-center bg-glass rounded-full p-1.5 border border-outline-variant/30 focus-within:border-primary/60 focus-within:ring-1 focus-within:ring-primary/40 transition-all"
            >
                <input type="hidden" name="_redirect" value={THANK_YOU_URL} />
                <input
                    type="email"
                    name="email"
                    id="pill-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    required
                    className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-on-surface placeholder:text-outline px-4 py-2.5"
                />
                <button
                    type="submit"
                    className="btn-primary text-on-primary-container px-6 py-2.5 rounded-full font-semibold whitespace-nowrap hover:opacity-90 transition-opacity cursor-pointer text-sm"
                >
                    Join the Waitlist
                </button>
            </form>
        </div>
    );
}
