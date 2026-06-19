import { BlogPosts } from "@/components/posts";
import BlogPostsFilter from "@/components/blog-posts-filter";
import { getBlogPosts } from "@/app/blog/utils";

export const metadata = {
  title: "Blog",
  description: "Read my blog posts.",
};

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <section className="py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)] mb-3">
          Blog
        </h1>
        <p className="text-[var(--text-secondary)] leading-relaxed max-w-2xl">
          Writing about blockchain infrastructure, light clients, Web3
          development, and the things I&apos;m building and learning. Some of
          these posts are deeply technical; others are just interesting things
          I came across.
        </p>
      </div>
      <BlogPostsFilter posts={posts} />
    </section>
  );
}
