import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="flex flex-col items-center w-full"> {/* Landing Section*/}
        <section className="flex items-center justify-center py-12 md:py-28 bg-hero-image bg-cover bg-no-repeat w-full"> {/* Hero Section*/}
          <div className="flex flex-col items-center gap-10 py-6 px-8 bg-white">
            <h1 className="text-4xl md:text-8xl font-bold">Next Blog 13</h1>
            <p className="text-lg">A portfolio showcase site for a potential blogging site powered by Next 13</p>
            <div className="flex gap-4 justify-end">
              <Link href="/login" className="btn-secondary">Sign In</Link>
              <Link href="/register" className="btn-primary">Sign Up</Link>
            </div>
          </div>
        </section>
        <section className="pt-8">
          <h2 className="text-2xl text-center">Recent Posts</h2>
        </section>
      </div>
    </main>
  );
}
