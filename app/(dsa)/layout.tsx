import { topics } from "@/data/topics";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function DsaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid md:grid-cols-[220px_1fr] gap-10">
      <aside className="hidden md:block">
        <nav className="sticky top-20">
          <h3 className="font-semibold mb-4">Topics</h3>
          <ul className="space-y-2">
            {topics.map((topic) => (
              <li key={topic.slug}>
                <Link
                  href={`/${topic.slug}`}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "w-full justify-start"
                  )}
                >
                  {topic.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <div>{children}</div>
    </div>
  );
}