// A component for the home page when no user is signed in

import Link from "next/link";


export default function HomePage() {
  return (
    <main className="flex w-full flex-col items-center">
      {" "}
      {/* Landing Section*/}
      <section className="flex w-full items-center justify-center bg-hero-image bg-cover bg-no-repeat py-12 md:py-28 px-2">
        {" "}
        {/* Hero Section*/}
        <div className="flex flex-col items-center gap-10 bg-white px-8 py-6">
          <h1 className="text-4xl font-bold md:text-8xl">Next Blog 13</h1>
          <p className="text-lg">
            A portfolio showcase site for a potential blogging site powered by
            Next 13
          </p>
          <div className="flex justify-end gap-4">
            <Link href="/login" className="btn-secondary">
              Sign In
            </Link>
            <Link href="/register" className="btn-primary">
              Sign Up
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
