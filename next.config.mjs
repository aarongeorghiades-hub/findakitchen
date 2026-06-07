/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Retired thin provider-stub guide pages → their real provider profiles.
      { source: "/guides/premier-catering", destination: "/providers/premier-catering", permanent: true },
      { source: "/guides/the-instant-kitchen-company", destination: "/providers/the-instant-kitchen-company", permanent: true },
      { source: "/guides/temporary-kitchens-com", destination: "/providers/temporary-kitchens-com", permanent: true },
      { source: "/guides/jongor", destination: "/providers/jongor-hire", permanent: true },
      { source: "/guides/big-kahuna", destination: "/providers/big-kahuna", permanent: true },
      { source: "/guides/rolling-stock", destination: "/providers/rolling-stock", permanent: true },
      { source: "/guides/kitchen-pod-hire", destination: "/providers/kitchen-pod-hire", permanent: true },
      { source: "/guides/the-temporary-kitchen-company", destination: "/providers/the-temporary-kitchen-company", permanent: true },
      { source: "/guides/courtesy-kitchens-and-bathrooms", destination: "/providers/courtesy-kitchens-and-bathrooms", permanent: true },
      { source: "/guides/kitchenpod", destination: "/providers/kitchenpod-pod-solutions-group", permanent: true },
    ];
  },
};

export default nextConfig;
