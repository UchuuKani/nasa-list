/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["apod.nasa.gov"],
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};
