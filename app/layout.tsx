import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Sidebar } from "@/components/Sidebar";
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const outfit = Outfit({ subsets: ["latin"], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: {
    default: "Interview Revision",
    template: "%s | Interview Revision"
  },
  description: "Comprehensive technical interview preparation for Software Engineers. Master Data Structures, Algorithms, System Design, and Career Paths.",
  keywords: ["DSA", "System Design", "Interview Preparation", "Software Engineering", "Java", "Spring Boot", "Microservices", "Career Paths"],
  authors: [{ name: "Interview Revision Team" }],
  creator: "Interview Revision",
  publisher: "Interview Revision",
  metadataBase: new URL('https://interview-revision.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://interview-revision.vercel.app',
    title: 'Interview Revision - Master Your Tech Interview',
    description: 'A pattern-based guide for senior software engineer interviews. Curated learning paths for SDE-1 to Senior Lead roles.',
    siteName: 'Interview Revision',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Interview Revision',
    description: 'Master your technical interview with structured learning paths.',
    creator: '@interviewrevision',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} ${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen bg-background">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out">
              <Header />
              <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
                {children}
              </main>
              <Footer />
            </div>
          </div>
        </ThemeProvider>
        {/* Replace G-XXXXXXXXXX with your actual Google Analytics Measurement ID */}
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  );
}