// https://nextjs.org/docs/basic-features/data-fetching/get-static-props

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import _ from 'lodash';
var showdown = require('showdown');

const postsDirectory = path.join(process.cwd(), 'posts/');

export function getSortedPostsList() {
  // Get file names under /posts
  let fileNames = fs.readdirSync(postsDirectory);
  const validExtensions = ['.md'];
  fileNames = fileNames.filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return validExtensions.includes(ext);
  });
  let posts = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md?$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents, { excerpt: true });

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  posts = _.orderBy(posts, 'date', 'desc');
  return posts;
}

export function getPost(name) {
  // Get file names under /posts
  let file = fs.readFileSync(path.join(postsDirectory, name + '.md'));
  let gm = matter(file);
  let meta = gm.data;
  let converter = new showdown.Converter({ tables: true });
  let content = converter.makeHtml(gm.content);
  return { meta, content };
}
