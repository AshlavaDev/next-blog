export default function Footer() {
  return (
    <footer className="flex w-full flex-col items-center border-t-2 border-gray-950 dark:border-gray-200 p-4 text-lg">
      <p>The Next Blogging Site!</p>
      <p>
        &copy; 2023 Ashley Morgan -{" "}
        <a
          href="https://www.ashleymorganwbdv.com"
          target="_blank"
          className="normal-link"
        >
          Website
        </a>
      </p>
    </footer>
  );
}
