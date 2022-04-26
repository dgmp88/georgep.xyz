import { Link } from 'react-router-dom';
export function Header() {
  return (
    <div className="absolute z-1">
      <div className="navbar">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            George Prichard
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal p-0">
            <li>
              <Link to="/blog">Blog</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
