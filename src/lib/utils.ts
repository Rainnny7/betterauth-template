import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

/**
 * Check if the given email is valid.
 *
 * @param email the email to check
 * @returns whether the email is valid
 */
export const isValidEmail = (email: string) => EMAIL_REGEX.test(email);
