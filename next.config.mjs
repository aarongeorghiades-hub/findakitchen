/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Retired thin provider-stub guide pages. The named /providers/<slug>
      // detail pages no longer exist (the directory is now anonymised), so these
      // go straight to the /providers index — single hop, no redirect chains.
      { source: "/guides/premier-catering", destination: "/providers", permanent: true },
      { source: "/guides/the-instant-kitchen-company", destination: "/providers", permanent: true },
      { source: "/guides/temporary-kitchens-com", destination: "/providers", permanent: true },
      { source: "/guides/jongor", destination: "/providers", permanent: true },
      { source: "/guides/big-kahuna", destination: "/providers", permanent: true },
      { source: "/guides/rolling-stock", destination: "/providers", permanent: true },
      { source: "/guides/kitchen-pod-hire", destination: "/providers", permanent: true },
      { source: "/guides/the-temporary-kitchen-company", destination: "/providers", permanent: true },
      { source: "/guides/courtesy-kitchens-and-bathrooms", destination: "/providers", permanent: true },
      { source: "/guides/kitchenpod", destination: "/providers", permanent: true },
      // Merged duplicate checklist blog posts → the canonical checklist guide.
      { source: "/blog/5-things-to-check-before-hiring-temporary-kitchen", destination: "/guides/temporary-kitchen-hire-checklist", permanent: true },
      { source: "/blog/5-things-know-before-hiring-temporary-kitchen", destination: "/guides/temporary-kitchen-hire-checklist", permanent: true },
      // Merged duplicate insurance blog posts → the canonical insurance guides.
      { source: "/blog/how-to-make-insurance-claim-temporary-kitchen", destination: "/guides/insurance-claim-kitchen-walkthrough", permanent: true },
      { source: "/blog/does-home-insurance-cover-temporary-kitchen-hire", destination: "/guides/will-insurance-pay-temporary-kitchen", permanent: true },
      // Merged duplicate indoor-vs-outdoor pages → the canonical guide.
      { source: "/blog/driveway-pod-vs-indoor-kitchen-unit", destination: "/guides/indoor-vs-outdoor-temporary-kitchen", permanent: true },
      { source: "/compare/indoor-vs-outdoor-temporary-kitchen-comparison", destination: "/guides/indoor-vs-outdoor-temporary-kitchen", permanent: true },
      // Merged duplicate cost / renovation-timeline / gas-vs-electric blog posts → canonical survivors.
      { source: "/blog/how-much-does-temporary-kitchen-hire-cost", destination: "/guides/temporary-kitchen-hire-cost", permanent: true },
      { source: "/blog/how-long-does-kitchen-renovation-take", destination: "/guides/kitchen-renovation-timeline-planning", permanent: true },
      { source: "/blog/electric-vs-gas-temporary-kitchens", destination: "/compare/gas-vs-electric-temporary-kitchen", permanent: true },
      // Deduplicated near-twin provider profiles → canonical provider slug.
      // The named detail route is live again, so these merged/duplicate slugs
      // (their own rows are inactive) must 301 to the canonical living page
      // rather than 404.
      { source: "/providers/courtesy-kitchens-bathrooms", destination: "/providers/courtesy-kitchens-and-bathrooms", permanent: true },
      { source: "/providers/premier-catering-commercial-kitchen-company", destination: "/providers/premier-catering", permanent: true },
      { source: "/providers/instant-kitchen-company", destination: "/providers/the-instant-kitchen-company", permanent: true },
      { source: "/providers/kitchen-pod-hire-ni", destination: "/providers/kitchen-pod-hire", permanent: true },
      // Retired trade-partner content. The programme is dead: the /trade-partners
      // page was deleted, and the blog post that pitched a builder/installer
      // referral arrangement has now gone with it. Both 301 to the homepage.
      { source: "/trade-partners", destination: "/", statusCode: 301 },
      { source: "/blog/how-builders-can-offer-temporary-kitchens", destination: "/", statusCode: 301 },
    ];
  },
};

export default nextConfig;
