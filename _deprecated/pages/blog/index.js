import Link from 'next/link';

import { getSortedPostsList } from '../../lib/posts';
import { NavBar } from '../../components/navbar';
import { Background } from '../../components/homeBackground';

export default function Home({ posts }) {
  return (
    <>
      <Background></Background>
      <NavBar />
      <div className="w-2/3 m-auto py-20">
        <table className="table w-full rounded-lg bg-base-100/75">
          <tbody>
            {posts.map((p) => (
              <tr key={p.id}>
                <td className="bg-inherit">{p.date}</td>
                <td className="bg-inherit">
                  <Link href={'blog/' + p.id}>
                    <a className="block font-bold">{p.title}</a>
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

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getStaticProps() {
  const posts = getSortedPostsList();
  return {
    props: {
      posts,
    },
  };
}
