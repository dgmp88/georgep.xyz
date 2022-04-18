import { Header } from '../../components/header';
import { React, Component } from 'react';
import { getSortedPostsList, getPost } from '../../lib/posts';

import Prism from 'prismjs';
require('prismjs/components/prism-python');

class PostPage extends Component {
  componentDidMount() {
    Prism.highlightAll();
  }
  render() {
    const { meta, content } = this.props;
    return (
      <>
        <Header />
        <div className="prose lg:prose-lg mx-auto px-4 py-8">
          <h1>{meta.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: content }}></div>
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
