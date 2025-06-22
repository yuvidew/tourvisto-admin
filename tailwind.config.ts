import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
        fontFamily: {
            sans: ["var(--font-poppins)", "sans-serif"], // override default sans
            poppins: ["var(--font-poppins)", "sans-serif"], // custom name if you want
        },
        },
    },
    plugins: [],
};
export default config;
