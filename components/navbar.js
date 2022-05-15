import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export function NavBar() {
  return (
    <div className="absolute navbar text-gray-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex="0" className="btn btn-ghost lg:hidden">
            <FontAwesomeIcon icon={faBars} />
          </label>
          <ul
            tabIndex="0"
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-black/75  rounded-box"
          >
            <ul className="menu menu-horizontal p-0">
              <li>
                <Link href="/blog">Blog</Link>
              </li>
              <li>
                <Link href="/backgrounds">Backgrounds</Link>
              </li>
              <li>
                <Link href="/games">Games</Link>
              </li>
              <li>
                <Link href="/cv.pdf">CV</Link>
              </li>
            </ul>
          </ul>
        </div>
        <Link href="/">
          <a className="btn btn-ghost normal-case text-xl">George Prichard</a>
        </Link>
      </div>
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          <li>
            <Link href="/blog">Blog</Link>
          </li>
          <li>
            <Link href="/backgrounds">Backgrounds</Link>
          </li>
          <li>
            <Link href="/games">Games</Link>
          </li>
          <li>
            <Link href="/cv.pdf">CV</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
