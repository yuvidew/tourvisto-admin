import { TrendResult } from "@/types/type";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isValidEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const baseUrl = {
  signUp_api : "/api/v1/auth/sign-up",
  signIn_api : "/api/v1/auth/sign-in",
  create_trip : "http://localhost:2000/v1/trip/crate",
  get_trip : "http://localhost:2000/v1/trip/get-all-trips",
  get_trip_id : "http://localhost:2000/v1/trip/get-trip-by-id",
  delete_trip_id : "http://localhost:2000/v1/trip/delete-trip-by-id"
}

export const calculateTrendPercentage = (
  countOfThisMonth: number,
  countOfLastMonth: number
): TrendResult => {
  if (countOfLastMonth === 0) {
    return countOfThisMonth === 0
      ? { trend: "no change", percentage: 0 }
      : { trend: "increment", percentage: 100 };
  }

  const change = countOfThisMonth - countOfLastMonth;
  const percentage = Math.abs((change / countOfLastMonth) * 100);

  if (change > 0) {
    return { trend: "increment", percentage };
  } else if (change < 0) {
    return { trend: "decrement", percentage };
  } else {
    return { trend: "no change", percentage: 0 };
  }
};
