import { Header } from '../../src/components/header';
import { getSortedPostsList } from '../lib/posts';
import { Link } from 'react-router-dom';

export function Blog() {
  console.log('hit blog');
  const posts = getSortedPostsList();
  console.log(posts);
  return (
    <>
      <Header />
      <div className="overflow-x-auto w-2/3 m-auto py-20">
        <table className="table w-full">
          <tbody>
            {posts.map((p) => (
              <tr key={p.id}>
                <td>{p.date}</td>
                <td>
                  <Link to={'blog/' + p.id} className="block font-bold">
                    {p.title}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
