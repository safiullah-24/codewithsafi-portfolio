import type { Metadata } from "next";
import "./globals.css";
import "./v4.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://codewithsafi-portfolio.vercel.app"),
  title: "Safi Ullah — CodeWithSafi",
  description:
    "Safi Ullah / CodeWithSafi. Software engineer, computer science student, and creator of PolyBridge and the Poly language direction. Explore my stack, projects, and original R&D.",
  openGraph: {
    title: "CodeWithSafi — Safi Ullah",
    description:
      "Curiosity, compiled. Engineering practice, interactive projects, and PolyBridge / Poly — original language interoperability R&D.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "CodeWithSafi — Safi Ullah",
    description:
      "Software engineering, AI, and language interoperability. The work and original R&D of Safi Ullah / CodeWithSafi.",
  },
  icons: {
    icon: [{ url: "/brand/favicon.png", type: "image/png", sizes: "64x64" }],
    shortcut: "/brand/favicon.png",
    apple: "/brand/apple-touch-icon.png",
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Safi Ullah",
    alternateName: "CodeWithSafi",
    url: "https://codewithsafi-portfolio.vercel.app",
    jobTitle: "Software Engineer",
    description:
      "Software engineer and computer science student. Creator of the PolyBridge concept and Poly language direction, in active architecture and prototyping.",
    sameAs: [
      "https://github.com/safiullah-24",
      "https://www.linkedin.com/in/safiullah124/",
    ],
  };
  return (
    <html lang="en" className="dark">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
        />
        {children}
      </body>
    </html>
  );
}
