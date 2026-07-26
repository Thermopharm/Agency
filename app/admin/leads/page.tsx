"use client";

import { useEffect, useState } from "react";
import { Trash2, Mail, Phone, Building, Loader2 } from "lucide-react";

interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: string;
  createdAt: string;
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    try {
      const res = await fetch("/api/admin/leads");
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setLeads(leads.map((l) => (l.id === id ? { ...l, status: newStatus } : l)));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const deleteLead = async (id: string) => {
    if (!confirm("Are you sure you want to delete this inquiry lead?")) return;
    try {
      const res = await fetch(`/api/admin/leads/${id}`, { method: "DELETE" });
      if (res.ok) {
        setLeads(leads.filter((l) => l.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-slate-900 tracking-tight">
            Manage Inquiries & Client Leads
          </h1>
          <p className="text-slate-400 text-xs font-medium mt-1">
            {leads.length} total inquiries received
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20 text-slate-400">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      ) : leads.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center text-slate-400">
          <p className="text-base font-bold text-slate-700">No inquiries captured yet</p>
          <p className="text-xs mt-1">Form submissions from the Contact section will appear here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {leads.map((lead) => (
            <div
              key={lead.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 flex flex-col md:flex-row justify-between gap-6 shadow-sm hover:border-slate-300 transition-all"
            >
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-bold text-slate-900 text-base">{lead.name}</h3>
                  <span
                    className={`px-2.5 py-0.5 text-[10px] font-extrabold uppercase rounded-full border ${
                      lead.status === "NEW"
                        ? "bg-blue-50 text-blue-700 border-blue-200"
                        : lead.status === "CONTACTED"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-slate-100 text-slate-600 border-slate-200"
                    }`}
                  >
                    {lead.status}
                  </span>
                  <span className="text-xs text-slate-400 font-mono ml-auto md:ml-0">
                    {new Date(lead.createdAt).toLocaleString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    <span>Company: <strong className="text-slate-900">{lead.company}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <a href={`mailto:${lead.email}`} className="hover:underline text-blue-600 font-medium">{lead.email}</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <a href={`tel:${lead.phone}`} className="hover:underline font-medium">{lead.phone}</a>
                  </div>
                </div>

                <div className="bg-slate-50/80 border border-slate-200/60 rounded-xl p-3.5 mt-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600 mb-1">
                    Service Requested: {lead.service}
                  </p>
                  <p className="text-xs text-slate-700 whitespace-pre-wrap leading-relaxed">{lead.message}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex md:flex-col justify-end gap-2 flex-shrink-0">
                <select
                  value={lead.status}
                  onChange={(e) => updateStatus(lead.id, e.target.value)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="NEW">Status: NEW</option>
                  <option value="READ">Status: READ</option>
                  <option value="CONTACTED">Status: CONTACTED</option>
                  <option value="ARCHIVED">Status: ARCHIVED</option>
                </select>

                <button
                  onClick={() => deleteLead(lead.id)}
                  className="p-2 border border-slate-200 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl flex items-center justify-center transition-colors"
                  title="Delete Lead"
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
