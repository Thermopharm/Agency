"use client";

import { useEffect, useState } from "react";
import { Trash2, Mail, Phone, Building, Calendar, CheckCircle2, Clock } from "lucide-react";

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
    if (!confirm("Are you sure you want to delete this enquiry lead?")) return;
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
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-[#0a0a0a]">Captured Lead Enquiries</h1>
          <p className="text-gray-500 text-xs mt-1">
            Real-time messages submitted via the website contact forms
          </p>
        </div>
        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider">
          {leads.length} Total Enquiries
        </span>
      </div>

      {loading ? (
        <div className="py-20 text-center text-gray-400 text-sm">Loading enquiries...</div>
      ) : leads.length === 0 ? (
        <div className="py-20 text-center bg-white border border-gray-200 p-8">
          <p className="text-gray-500 text-sm">No enquiries captured yet.</p>
          <p className="text-gray-400 text-xs mt-1">Form submissions from the Contact Us section will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {leads.map((lead) => (
            <div
              key={lead.id}
              className="bg-white border border-gray-200 p-6 flex flex-col md:flex-row justify-between gap-6"
            >
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-[#0a0a0a] text-lg">{lead.name}</h3>
                  <span
                    className={`px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      lead.status === "NEW"
                        ? "bg-blue-600 text-slate-900"
                        : lead.status === "CONTACTED"
                        ? "bg-green-600 text-slate-900"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {lead.status}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">
                    {new Date(lead.createdAt).toLocaleString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <Building className="w-3.5 h-3.5 text-blue-600" />
                    <span>Company: <strong>{lead.company}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-blue-600" />
                    <a href={`mailto:${lead.email}`} className="hover:underline">{lead.email}</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-blue-600" />
                    <a href={`tel:${lead.phone}`} className="hover:underline">{lead.phone}</a>
                  </div>
                </div>

                <div className="bg-[#fafafa] border border-gray-100 p-4 mt-2">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-blue-600 mb-1">
                    Service Requested: {lead.service}
                  </p>
                  <p className="text-xs text-gray-700 whitespace-pre-wrap leading-relaxed">{lead.message}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex md:flex-col justify-end gap-2 flex-shrink-0">
                <select
                  value={lead.status}
                  onChange={(e) => updateStatus(lead.id, e.target.value)}
                  className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider border border-gray-300 bg-white"
                >
                  <option value="NEW">Status: NEW</option>
                  <option value="READ">Status: READ</option>
                  <option value="CONTACTED">Status: CONTACTED</option>
                  <option value="ARCHIVED">Status: ARCHIVED</option>
                </select>

                <button
                  onClick={() => deleteLead(lead.id)}
                  className="p-2 border border-red-200 text-red-600 hover:bg-red-50 flex items-center justify-center transition-colors"
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
