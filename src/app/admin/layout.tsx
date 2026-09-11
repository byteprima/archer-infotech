import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * Every admin route depends on who is asking, so none of them may be
 * prerendered. Declared here rather than on 32 pages, and kept even though
 * getSession() now rethrows Next's bailout: one of the two should be enough,
 * and the failure mode — a statically baked "you are logged out" redirect
 * served to everyone for a year — is bad enough to deserve both.
 */
export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-muted/30">
      {children}
    </div>
  );
}
