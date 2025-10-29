// Since we have a `[locale]` segment that contains all our pages,
// this root layout is not actually used for rendering pages.
// It exists to satisfy Next.js's requirement for a root layout.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
