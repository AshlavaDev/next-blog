// A component for the home page when no user is signed in

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex w-full flex-col items-center">
      {/* Landing Section*/}
      <section className="flex w-full items-center justify-center bg-hero-image bg-cover bg-no-repeat px-2 py-12 md:py-28">
        {/* Hero Section*/}
        <div className="flex flex-col items-center gap-10 bg-gray-200 px-8 py-6 dark:bg-gray-950">
          <h1 className="font-heading text-4xl font-bold md:text-8xl">
            Next Blogging
          </h1>
          <p className="text-lg md:text-2xl">
            The Next and Last blogging site you will need!
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
      <section className="flex flex-col items-center gap-4 pt-8">
        <h2 className="font-heading text-2xl font-semibold md:text-4xl">
          About Next Blogging
        </h2>
        <div className="flex flex-col gap-4 md:flex-row">
          <p className="max-w-prose text-lg">
            This is a blogging site that serves as a portfolio piece for Ashley
            Morgan. It was built using Next 13 as a framework. On this site, you
            can sign up and create blogs as well as look at blog of other
            people. An image can be uploaded for each blog, and the blgos can be
            edited after they are published.
          </p>
          <p className="max-w-prose text-lg">
            Thank you for visiting! As a note, when signing up the information
            is saved in a database of users but no emails are sent out. This is
            by design to prevent everyone from being spammed and innundated with
            emails for a portfolio site. This means you can enter anything you
            wish into the email section as long as it is in email format. If you
            wish any information to be removed please contact me through my
            website linked below.
          </p>
        </div>
        <ul>
          <li>
            <a
              href="https://www.ashleymorganwbdv.com"
              target="_blank"
              className="normal-link"
            >
              Ashley Morgan Website
            </a>
          </li>
          <li>
            <a
              href="https://github.com/AshlavaDev/next-blog"
              target="_blank"
              className="normal-link"
            >
              Next Blogging GitHubRepo
            </a>
          </li>
        </ul>
      </section>
    </main>
  );
}
