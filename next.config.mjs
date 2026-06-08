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
      // Merged duplicate checklist blog posts → the canonical checklist guide.
      { source: "/blog/5-things-to-check-before-hiring-temporary-kitchen", destination: "/guides/temporary-kitchen-hire-checklist", permanent: true },
      { source: "/blog/5-things-know-before-hiring-temporary-kitchen", destination: "/guides/temporary-kitchen-hire-checklist", permanent: true },
      // Merged duplicate insurance blog posts → the canonical insurance guides.
      { source: "/blog/how-to-make-insurance-claim-temporary-kitchen", destination: "/guides/insurance-claim-kitchen-walkthrough", permanent: true },
      { source: "/blog/does-home-insurance-cover-temporary-kitchen-hire", destination: "/guides/will-insurance-pay-temporary-kitchen", permanent: true },
      // Merged duplicate indoor-vs-outdoor pages → the canonical guide.
      { source: "/blog/driveway-pod-vs-indoor-kitchen-unit", destination: "/guides/indoor-vs-outdoor-temporary-kitchen", permanent: true },
      { source: "/compare/indoor-vs-outdoor-temporary-kitchen-comparison", destination: "/guides/indoor-vs-outdoor-temporary-kitchen", permanent: true },
    ];
  },
};

export default nextConfig;
