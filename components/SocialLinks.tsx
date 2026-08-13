type SocialLink = {
  label: string;
  href: string;
  path: string; // SVG path data, 24x24 viewBox
};

// Placeholder hrefs — swap in the real handles when ready.
const links: SocialLink[] = [
  {
    label: "Instagram",
    href: "#",
    path: "M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465a4.9 4.9 0 0 1 1.771 1.153 4.9 4.9 0 0 1 1.153 1.771c.248.637.415 1.363.465 2.428.05 1.066.06 1.405.06 4.122s-.01 3.056-.06 4.122c-.05 1.065-.217 1.79-.465 2.428a4.9 4.9 0 0 1-1.153 1.771 4.9 4.9 0 0 1-1.771 1.153c-.637.248-1.363.415-2.428.465-1.066.05-1.405.06-4.122.06s-3.056-.01-4.122-.06c-1.065-.05-1.79-.217-2.428-.465a4.9 4.9 0 0 1-1.771-1.153 4.9 4.9 0 0 1-1.153-1.771c-.248-.637-.415-1.363-.465-2.428C2.01 15.056 2 14.717 2 12s.01-3.056.06-4.122c.05-1.065.217-1.79.465-2.428A4.9 4.9 0 0 1 3.678 3.68 4.9 4.9 0 0 1 5.45 2.525c.637-.248 1.363-.415 2.428-.465C8.944 2.01 9.283 2 12 2Zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.25a3.25 3.25 0 1 1 0-6.5 3.25 3.25 0 0 1 0 6.5ZM17.5 6.75a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z",
  },
  {
    label: "YouTube",
    href: "#",
    path: "M21.6 7.2s-.21-1.49-.86-2.14c-.82-.86-1.74-.86-2.16-.91C15.6 4 12 4 12 4h-.01s-3.59 0-6.57.15c-.42.05-1.34.05-2.16.91C2.6 5.71 2.4 7.2 2.4 7.2S2.2 8.94 2.2 10.68v1.63c0 1.74.2 3.48.2 3.48s.2 1.49.85 2.14c.82.86 1.9.83 2.38.92 1.73.17 7.37.22 7.37.22s3.6-.01 6.58-.16c.42-.05 1.34-.05 2.16-.91.65-.65.86-2.14.86-2.14s.2-1.74.2-3.48v-1.63c0-1.74-.2-3.48-.2-3.48ZM9.94 14.6V8.9l5.4 2.86-5.4 2.85Z",
  },
  {
    label: "X",
    href: "#",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231ZM17.083 19.77h1.833L7.084 4.126H5.117Z",
  },
];

export function SocialLinks() {
  return (
    <div className="flex items-center gap-1.5">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          aria-label={link.label}
          className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-black/30 text-paper/80 backdrop-blur-md transition-colors hover:bg-black/45 hover:text-amber"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
            <path d={link.path} />
          </svg>
        </a>
      ))}
    </div>
  );
}
