/** @type {import('tailwindcss').Config} */
import nativewind from "nativewind/preset";
export const content = [
  "./components/**/*.{js,jsx,ts,tsx}",
  "./app/**/*.{js,jsx,ts,tsx}",
];
export const presets = [nativewind];
export const theme = {
  extend: {},
};
export const plugins = [];
