import { useEffect , useState } from "react";

/**
 * Custom hook to check if a media query matches the current viewport.
 *
 * @param {string} query - A valid CSS media query string (e.g. '(min-width: 768px)').
 * @returns {boolean} - Returns `true` if the query matches, otherwise `false`.
 */

export const useMediaQuery = (query : string) : boolean => {
    const [matches , setMatches] = useState<boolean>(false);

    useEffect(() => {
        if(typeof window === "undefined") return ;

        const mediaQuery = window.matchMedia(query);

        const updateMatch = () => setMatches(mediaQuery.matches);
        updateMatch();

        mediaQuery.addEventListener("change" , updateMatch);

        return () => mediaQuery.removeEventListener("change" , updateMatch)
    } , [query])

    return matches
}