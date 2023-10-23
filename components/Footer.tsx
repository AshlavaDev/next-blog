export default function Footer() {
  return (
    <footer className="flex w-full flex-col items-center border-t-2 border-black p-4 text-lg">
      <p>The Next Blogging Site!</p>
      <p>
        &copy; 2023 Ashley Morgan -{" "}
        <a
          href="https://www.ashleymorganwbdv.com"
          target="_blank"
          className="underline hover:text-red-800"
        >
          Website
        </a>
      </p>
    </footer>
  );
}
