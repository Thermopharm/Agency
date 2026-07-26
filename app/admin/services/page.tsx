import Link from "next/link";
import { Plus, Edit, Trash2, ArrowLeft, Layers } from "lucide-react";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  let services: any[] = [];
  try {
    services = await db.service.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (e) {
    console.error("Failed to load services from DB:", e);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-900 transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </Link>
          <h1 className="font-display text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Layers className="w-8 h-8 text-blue-600" />
            Manage Services
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Create, edit, or delete engineering services displayed on the public site.
          </p>
        </div>
        <Link
          href="/admin/services/new"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:shadow-lg hover:shadow-blue-500/20 text-slate-900 font-semibold px-5 py-3 rounded-xl text-sm transition-all"
        >
          <Plus className="w-4 h-4" /> Add Service
        </Link>
      </div>

      <div className="bg-white rounded-3xl border border-gray-150 shadow-sm overflow-hidden">
        {services.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <p className="text-lg font-semibold">No services found</p>
            <p className="text-sm mt-1">Add your first engineering service to get started.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Slug</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Created At</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
                {services.map((svc) => (
                  <tr key={svc.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-900">{svc.title}</td>
                    <td className="px-6 py-4">
                      <code className="bg-gray-100 px-2 py-0.5 rounded text-xs">{svc.slug}</code>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          svc.status === "PUBLISHED"
                            ? "bg-green-100 text-green-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {svc.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {new Date(svc.createdAt).toLocaleDateString("en-IN")}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Link
                        href={`/admin/services/${svc.id}`}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-gray-200 hover:border-blue-600 hover:text-blue-600 transition-colors"
                        title="Edit Service"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-gray-200 hover:border-red-600 hover:text-red-600 transition-colors"
                        title="Delete Service"
                        // Trigger delete action using native form or client handler
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
