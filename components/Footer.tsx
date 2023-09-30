export default function Footer() {
  return (
    <footer className="flex w-full justify-center border-t-2 border-black p-4 text-lg">
      Photo by &nbsp;
      <a
        href="https://unsplash.com/@m15ky?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
        className="hover:underline"
      >
        Mike Tinnion
      </a>
      &nbsp; on &nbsp;
      <a
        href="https://unsplash.com/photos/3ym6i13Y9LU?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
        className="hover:underline"
      >
        Unsplash
      </a>
    </footer>
  );
}
