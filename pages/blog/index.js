import Link from 'next/link';
import { NavBar } from '../../components/navbar';
import { getSortedPostsList } from '../../lib/posts';
import { Background } from '../../components/homeBackground';
function Home({ posts }) {
  return (
    <>
      <Background></Background>
      <NavBar />
      <div className="overflow-x-auto w-2/3 m-auto py-20">
        <table className="table w-full bg-red-100 rounded-lg">
          <tbody>
            {posts.map((p) => (
              <tr key={p.id}>
                <td className="bg-red-500">{p.date}</td>
                <td>
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

export default Home;

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
