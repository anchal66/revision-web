import { DsaPageClient } from './DsaPageClient';

export default function DsaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DsaPageClient>{children}</DsaPageClient>;
}