// Root not-found page for Next.js App Router
export default function RootNotFound() {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center">
          <h1 className="text-4xl font-bold">404</h1>
          <p className="mt-4 text-lg">Page not found</p>
        </div>
      </body>
    </html>
  );
}

