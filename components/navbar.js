import Link from 'next/link';
export function NavBar() {
  return (
    <div className="absolute navbar text-gray-100 ">
      <div className="flex-1">
        <Link href="/">
          <a className="btn btn-ghost normal-case text-xl">George Prichard</a>
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          <li>
            <Link href="/blog">Blog</Link>
            <Link href="/backgrounds">Backgrounds</Link>
            <Link href="/games">Games</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
