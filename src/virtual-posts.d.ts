// Type declarations for Vite virtual modules
declare module 'virtual:posts' {
  export interface PostFrontmatter {
    title: string;
    date: string;
    author: string;
    tags: string[];
    excerpt: string;
    cover: string;
    readTime: string;
  }

  export interface Post {
    slug: string;
    frontmatter: PostFrontmatter;
    html: string;
  }

  export const posts: Post[];
}
