'use client';

import { topics } from "@/data/topics";
import Link from "next/link";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export function DsaNav() {
  const params = useParams();

  return (
    <nav className="p-4">
      <h3 className="font-semibold mb-4">Topics</h3>
      <ul className="space-y-2">
        {topics.map((topic) => {
          const isActive = topic.slug === params.slug;
          return (
            <li key={topic.slug}>
              <Link
                href={`/${topic.slug}`}
                className={cn(
                  buttonVariants({ variant: isActive ? "secondary" : "ghost" }),
                  "w-full justify-start"
                )}
              >
                {topic.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}