import matter from 'gray-matter';
import { marked } from 'marked';
import fs from 'fs';
import path from 'path';

/**
 * Vite plugin — imports all .md files from src/posts at build/dev time.
 * Usage in components: import { getAllPosts } from '../utils/posts';
 */
export default function markdownPostsPlugin() {
  const virtualModuleId = 'virtual:posts';
  const resolvedVirtualModuleId = '\0' + virtualModuleId;

  return {
    name: 'vite-plugin-markdown-posts',
    resolveId(id) {
      if (id === virtualModuleId) return resolvedVirtualModuleId;
    },
    load(id) {
      if (id !== resolvedVirtualModuleId) return;

      const postsDir = path.resolve(process.cwd(), 'src/posts');

      if (!fs.existsSync(postsDir)) return 'export const posts = [];';

      const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'));

      const posts = files.map((file) => {
        const filePath = path.join(postsDir, file);
        const raw = fs.readFileSync(filePath, 'utf-8');
        const { data: frontmatter, content } = matter(raw);
        const html = marked(content);
        const slug = file.replace(/\.md$/, '');
        return { slug, frontmatter, html };
      });

      // Sort by date descending
      posts.sort(
        (a, b) =>
          new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
      );

      return `export const posts = ${JSON.stringify(posts)};`;
    },
    configureServer(server) {
      const postsDir = path.resolve(process.cwd(), 'src/posts');
      server.watcher.add(postsDir);
      server.watcher.on('all', (event, filePath) => {
        if (filePath && filePath.endsWith('.md')) {
          const mod = server.moduleGraph.getModuleById(resolvedVirtualModuleId);
          if (mod) {
            server.moduleGraph.invalidateModule(mod);
          }
          server.ws.send({ type: 'full-reload' });
        }
      });
    },
  };
}
