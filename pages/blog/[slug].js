import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';

import { FourKWeeks } from '../../components/4k/4k.js';
import { Header } from '../../components/header';
import { React, Component } from 'react';
import { getSortedPostsList, getPost } from '../../lib/posts';

import Prism from 'prismjs';
require('prismjs/components/prism-python');

const components = { FourKWeeks };
class PostPage extends Component {
  componentDidMount() {
    Prism.highlightAll();
  }
  render() {
    const { data, content } = this.props;
    return (
      <>
        <Header />
        <div className="prose lg:prose-lg mx-auto px-4 py-8">
          <h1>{data.title}</h1>
          <MDXRemote {...content} components={components} />
        </div>
      </>
    );
  }
}

async function getStaticProps({ params: { slug } }) {
  let { data, content } = getPost(slug);
  content = await serialize(content);
  return {
    props: { data, content },
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
