"use client";

import { useEffect, useState, useCallback } from "react";

type Source = {
  id: string;
  name: string;
  url: string;
  rss_url: string | null;
  language: "my" | "en" | "mixed";
  is_active: boolean;
  last_scraped_at: string | null;
  scrape_error: string | null;
};

type SourceForm = {
  name: string;
  url: string;
  rss_url: string;
  language: "my" | "en" | "mixed";
};

const emptyForm: SourceForm = {
  name: "",
  url: "",
  rss_url: "",
  language: "en",
};

export default function AdminSourcesPage() {
  const [sources, setSources] = useState<Source[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSource, setEditingSource] = useState<Source | null>(null);
  const [form, setForm] = useState<SourceForm>(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchSources = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/sources");
      if (!res.ok) throw new Error("Failed to fetch sources");
      const data = await res.json();
      setSources(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSources();
  }, [fetchSources]);

  const handleToggleActive = async (source: Source) => {
    try {
      setError(null);
      const res = await fetch(`/api/sources/${source.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active: !source.is_active }),
      });
      if (!res.ok) throw new Error("Failed to update source");
      const updated = await res.json();
      setSources((prev) =>
        prev.map((s) => (s.id === source.id ? updated : s))
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    }
  };

  const handleDelete = async (source: Source) => {
    if (!confirm(`Delete "${source.name}"? This cannot be undone.`)) return;
    try {
      setError(null);
      const res = await fetch(`/api/sources/${source.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete source");
      setSources((prev) => prev.filter((s) => s.id !== source.id));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    }
  };

  const openAddModal = () => {
    setEditingSource(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEditModal = (source: Source) => {
    setEditingSource(source);
    setForm({
      name: source.name,
      url: source.url,
      rss_url: source.rss_url ?? "",
      language: source.language,
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingSource(null);
    setForm(emptyForm);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const payload = {
        ...form,
        rss_url: form.rss_url || null,
      };

      if (editingSource) {
        const res = await fetch(`/api/sources/${editingSource.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to update source");
        const updated = await res.json();
        setSources((prev) =>
          prev.map((s) => (s.id === editingSource.id ? updated : s))
        );
      } else {
        const res = await fetch("/api/sources", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const body = await res.json().catch(() => null);
          throw new Error(body?.error || "Failed to create source");
        }
        const created = await res.json();
        setSources((prev) => [...prev, created]);
      }

      closeModal();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setSaving(false);
    }
  };

  const languageLabel = (lang: string) => {
    if (lang === "my") return "Myanmar";
    if (lang === "en") return "English";
    return "Mixed";
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Manage Sources
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Add, edit, or remove news sources for scraping
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
        >
          + Add Source
        </button>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-800 dark:bg-red-900/50 dark:text-red-200">
          {error}
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        {loading ? (
          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-4">
                <div className="h-4 w-40 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                <div className="h-4 w-56 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                <div className="h-4 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                <div className="h-4 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                <div className="h-6 w-10 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800" />
              </div>
            ))}
          </div>
        ) : sources.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No sources found. Click &quot;Add Source&quot; to create one.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-800/50">
                  <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400">
                    Name
                  </th>
                  <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400">
                    URL
                  </th>
                  <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400">
                    RSS URL
                  </th>
                  <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400">
                    Language
                  </th>
                  <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400">
                    Active
                  </th>
                  <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400">
                    Last Scraped
                  </th>
                  <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {sources.map((source) => (
                  <tr
                    key={source.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {source.name}
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {source.url}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                      {source.rss_url ? (
                        <a
                          href={source.rss_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {source.rss_url}
                        </a>
                      ) : (
                        <span className="text-gray-400 dark:text-gray-600">
                          —
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                        {languageLabel(source.language)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleActive(source)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${
                          source.is_active
                            ? "bg-blue-600"
                            : "bg-gray-300 dark:bg-gray-700"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            source.is_active ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                      {source.last_scraped_at ? (
                        <div>
                          <div>
                            {new Date(
                              source.last_scraped_at
                            ).toLocaleDateString()}
                          </div>
                          {source.scrape_error && (
                            <div className="mt-0.5 text-xs text-red-500 dark:text-red-400">
                              {source.scrape_error}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400 dark:text-gray-600">
                          Never
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(source)}
                          className="rounded-md px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(source)}
                          className="rounded-md px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={closeModal}
          />
          <div className="relative z-10 w-full max-w-lg rounded-xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-800 dark:bg-gray-900">
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              {editingSource ? "Edit Source" : "Add Source"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
                  placeholder="e.g. Myanmar Tech News"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.url}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, url: e.target.value }))
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  RSS URL
                </label>
                <input
                  type="text"
                  value={form.rss_url}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, rss_url: e.target.value }))
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
                  placeholder="https://example.com/rss (optional)"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Language <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.language}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      language: e.target.value as "my" | "en" | "mixed",
                    }))
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                >
                  <option value="en">English</option>
                  <option value="my">Myanmar</option>
                  <option value="mixed">Mixed</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-offset-gray-900"
                >
                  {saving
                    ? "Saving..."
                    : editingSource
                      ? "Save Changes"
                      : "Create Source"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
