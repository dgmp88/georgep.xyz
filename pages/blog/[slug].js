import { NavBar } from '../../components/navbar';
import { React, Component } from 'react';
import { getSortedPostsList, getPost } from '../../lib/posts';
import { Background } from '../../components/homeBackground';

import Prism from 'prismjs';
require('prismjs/components/prism-python');

class PostPage extends Component {
  componentDidMount() {
    Prism.highlightAll();
  }
  render() {
    const { meta, content } = this.props;

    if (meta == undefined) {
      // Fix for build
      return '';
    }
    return (
      <>
        <Background />
        <NavBar />
        <div className="w-2/3 m-auto py-20">
          <div className="prose lg:prose-lg mx-auto px-4 py-8 bg-base-100/75 rounded-lg ">
            <h1>{meta.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
          </div>
        </div>
      </>
    );
  }
}

async function getStaticProps({ params: { slug } }) {
  let { meta, content } = getPost(slug);

  return {
    props: { meta, content },
  };
}

async function getStaticPaths() {
  const paths = getSortedPostsList().map((x) => '/blog/' + x.id);
  return {
    paths: paths,
    fallback: true,
  };
}

export { getStaticProps, getStaticPaths };
export default PostPage;
