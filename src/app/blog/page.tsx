import { BlogPosts } from "@/components/posts";
import { MacWindow } from "@/components/mac-window";

export const metadata = {
  title: "Blog",
  description: "Read my blog posts.",
};

export default function BlogPage() {
  return (
    <section className="py-12">
      <MacWindow title="~/blog">
        <h1 className="font-semibold text-2xl mb-2 tracking-tight">Blog</h1>
        <p className="text-neutral-500 dark:text-neutral-400 mb-8 text-sm">
          Thoughts on blockchain, software engineering, and the web.
        </p>
        <BlogPosts />
      </MacWindow>
    </section>
  );
}
