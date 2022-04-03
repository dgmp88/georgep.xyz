import Link from 'next/link';
export function Header() {
  return (
    <div className="navbar">
      <div className="flex-1 text-black">
        <Link href="/">
          <a className="btn btn-ghost normal-case text-xl">George Prichard</a>
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          <li>
            <Link href="/blog">Blog</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
