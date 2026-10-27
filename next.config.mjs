import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admin.espairo.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);