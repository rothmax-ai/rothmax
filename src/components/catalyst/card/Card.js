"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import clsx from "clsx";
export function Card({ className, children, ...props }) {
    return (_jsx("div", { ...props, className: clsx("rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:bg-zinc-900 dark:border-zinc-800", className), children: children }));
}
