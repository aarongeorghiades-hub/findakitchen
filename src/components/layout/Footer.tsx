import Link from "next/link";

const footerLinks = {
  "Kitchen Types": [
    { href: "/kitchen-types", label: "All Kitchen Types" },
    { href: "/kitchen-types/modular-cabin-kitchen", label: "Modular Cabin" },
    { href: "/kitchen-types/trailer-kitchen", label: "Trailer Kitchen" },
    { href: "/kitchen-types/container-kitchen", label: "Container Kitchen" },
    { href: "/kitchen-types/driveway-pod-large", label: "Driveway Pod" },
  ],
  Locations: [
    { href: "/temporary-kitchen-hire/london", label: "London" },
    { href: "/temporary-kitchen-hire/manchester", label: "Manchester" },
    { href: "/temporary-kitchen-hire/birmingham", label: "Birmingham" },
    { href: "/temporary-kitchen-hire/edinburgh", label: "Edinburgh" },
    { href: "/temporary-kitchen-hire/bristol", label: "Bristol" },
  ],
  Company: [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/blog", label: "Blog" },
    { href: "/providers", label: "Providers" },
  ],
  Legal: [
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Use" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="container-page py-12 sm:py-16">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-slate-800 mb-3">
                {title}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-primary-700 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-slate-200 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-700">
                <span className="text-sm font-bold text-white">FK</span>
              </div>
              <span className="font-bold text-slate-800">
                Find<span className="text-primary-700">A</span>Kitchen
              </span>
            </div>
            <p className="text-sm text-slate-500 text-center">
              &copy; {new Date().getFullYear()} FindAKitchen.co.uk. Helping you find the right temporary kitchen solution.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
