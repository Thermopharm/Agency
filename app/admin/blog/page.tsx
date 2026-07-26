import Link from "next/link";
import Image from "next/image";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { getAllBlogPosts } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <div className="space-y-6">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-slate-900 tracking-tight">
            Manage Articles & Journal
          </h1>
          <p className="text-slate-400 text-xs font-medium mt-1">
            {posts.length} total articles
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 bg-black hover:bg-slate-800 text-white font-bold px-5 py-3 rounded-xl text-xs tracking-wider transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>New Article</span>
        </Link>
      </div>

      {/* Blog Posts List */}
      {posts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center text-slate-400">
          <p className="text-base font-bold text-slate-700">No blog posts found</p>
          <p className="text-xs mt-1">Add your first engineering article to get started.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.id || post.slug}
              className="bg-white rounded-2xl border border-slate-200/80 p-4 flex items-center justify-between gap-4 shadow-sm hover:border-slate-300 transition-all group"
            >
              <div className="flex items-center gap-4 min-w-0">
                {/* Thumbnail */}
                <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-100">
                  {post.image ? (
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400 font-bold text-xs">
                      BLOG
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="min-w-0">
                  <h3 className="font-bold text-sm md:text-base text-slate-900 truncate tracking-tight group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-2 text-slate-400 font-mono text-xs mt-0.5 truncate">
                    <span>/blog/{post.slug}</span>
                    <span>·</span>
                    <span>{post.category || "Engineering"}</span>
                    {post.date && (
                      <>
                        <span>·</span>
                        <span>{post.date}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <Link
                  href={`/admin/blog/${post.slug || post.id}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-lg text-xs font-semibold text-slate-700 shadow-2xs transition-all"
                >
                  <Edit2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>Edit</span>
                </Link>
                <button
                  className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete Post"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
