import Link from "next/link";
import Image from "next/image";
import { Plus, Edit2, Trash2, Layers } from "lucide-react";
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
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-slate-900 tracking-tight">
            Manage Engineering Services
          </h1>
          <p className="text-slate-400 text-xs font-medium mt-1">
            {services.length} total services
          </p>
        </div>
        <Link
          href="/admin/services/new"
          className="inline-flex items-center gap-2 bg-black hover:bg-slate-800 text-white font-bold px-5 py-3 rounded-xl text-xs tracking-wider transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>New Service</span>
        </Link>
      </div>

      {/* Services List View */}
      {services.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center text-slate-400">
          <p className="text-base font-bold text-slate-700">No services found</p>
          <p className="text-xs mt-1">Add your first engineering service to get started.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {services.map((svc) => (
            <div
              key={svc.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-4 flex items-center justify-between gap-4 shadow-sm hover:border-slate-300 transition-all group"
            >
              <div className="flex items-center gap-4 min-w-0">
                {/* Thumbnail / Icon */}
                <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-100 flex items-center justify-center">
                  {svc.image ? (
                    <Image
                      src={svc.image}
                      alt={svc.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <Layers className="w-6 h-6 text-slate-400" />
                  )}
                </div>

                {/* Details */}
                <div className="min-w-0">
                  <h3 className="font-bold text-sm md:text-base text-slate-900 truncate tracking-tight group-hover:text-blue-600 transition-colors">
                    {svc.title}
                  </h3>
                  <div className="flex items-center gap-2 text-slate-400 font-mono text-xs mt-0.5 truncate">
                    <span>/services/{svc.slug}</span>
                    <span>·</span>
                    <span className="truncate max-w-xs">{svc.shortDesc || "Engineering Solution"}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <Link
                  href={`/admin/services/${svc.id}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-lg text-xs font-semibold text-slate-700 shadow-2xs transition-all"
                >
                  <Edit2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>Edit</span>
                </Link>
                <button
                  className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete Service"
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
