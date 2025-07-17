export default {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  trailingComma: "es5",
  bracketSpacing: true,
  arrowParens: "always",
  endOfLine: "lf",
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
  importOrderParserPlugins: ["typescript", "jsx"],
  importOrderTypeScriptVersion: "5.0.0",
};
