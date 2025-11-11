"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Edit3, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EditPage() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const res = await fetch("/api/pages");
      const data = await res.json();
      if (data.success) {
        setPages(data.pages);
      }
    } catch (error) {
      console.error("Error fetching pages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (pageId) => {
    router.push(`/admin/edit/${pageId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-10 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Edit Pages</h1>

        {pages.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <p className="text-gray-500">No pages found. Create one first!</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Page Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Slug
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Banner Title
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Created
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {pages.map((page) => (
                  <tr
                    key={page._id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 text-gray-800 font-medium">
                      {page.name}
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      /{page.slug}
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      {page.bannerTitle || "-"}
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      {new Date(page.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Button
                        onClick={() => handleEdit(page._id)}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 mx-auto"
                      >
                        <Edit3 size={16} />
                        Edit
                      </Button>
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