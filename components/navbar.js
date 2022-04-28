import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export function NavBar() {
  return (
    <div class="absolute navbar text-gray-100">
      <div class="navbar-start">
        <div class="dropdown">
          <label tabindex="0" class="btn btn-ghost lg:hidden">
            <FontAwesomeIcon icon={faBars} />
          </label>
          <ul
            tabindex="0"
            class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-black/75  rounded-box"
          >
            <ul class="menu menu-horizontal p-0">
              <li>
                <Link href="/blog">Blog</Link>
              </li>
              <li>
                <Link href="/backgrounds">Backgrounds</Link>
              </li>
              <li>
                <Link href="/games">Games</Link>
              </li>
            </ul>
          </ul>
        </div>
        <Link href="/">
          <a className="btn btn-ghost normal-case text-xl">George Prichard</a>
        </Link>
      </div>
      <div class="navbar-end hidden lg:flex">
        <ul class="menu menu-horizontal p-0">
          <li>
            <Link href="/blog">Blog</Link>
          </li>
          <li>
            <Link href="/backgrounds">Backgrounds</Link>
          </li>
          <li>
            <Link href="/games">Games</Link>
          </li>
        </ul>
      </div>
      {/* <div class="navbar-end">
        <a class="btn">Get started</a>
      </div> */}
    </div>
    // <div className="absolute navbar text-gray-100 ">
    //   <div className="flex-1">
    //     <Link href="/">
    //       <a className="btn btn-ghost normal-case text-xl">George Prichard</a>
    //     </Link>
    //   </div>
    //   <div className="flex-none">
    //     <ul className="menu menu-horizontal p-0">
    // <li>
    //   <Link href="/blog">Blog</Link>
    //   <Link href="/backgrounds">Backgrounds</Link>
    //   <Link href="/games">Games</Link>
    // </li>
    //     </ul>
    //   </div>
    // </div>
  );
}
