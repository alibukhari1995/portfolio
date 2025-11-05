"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { Button } from "@/components/ui/button";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function CreatePage() {
  const [formData, setFormData] = useState({
    name: "",
    bannerTitle: "",
    bannerImage: null,
    sectionImage: null,
    sectionContent: "",
    imageFirst: false,
  });

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, [field]: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/pages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (res.ok) alert("✅ Page created successfully!");
    else alert("❌ Failed to create page");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">
          Create New Page
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
        
          <div>
            <label className="block text-gray-700 mb-2">Page Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          
          <div>
            <label className="block text-gray-700 mb-2">Banner Title</label>
            <input
              type="text"
              value={formData.bannerTitle}
              onChange={(e) =>
                setFormData({ ...formData, bannerTitle: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          
          <div>
            <label className="block text-gray-700 mb-2">Banner Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "bannerImage")}
              className="w-full border border-gray-300 rounded-lg p-2 bg-white"
            />
            {formData.bannerImage && (
              <img
                src={formData.bannerImage}
                alt="Banner Preview"
                className="mt-3 w-full h-48 object-cover rounded-lg border"
              />
            )}
          </div>

         
          <div>
            <label className="block text-gray-700 mb-2">Section Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "sectionImage")}
              className="w-full border border-gray-300 rounded-lg p-2 bg-white"
            />
            {formData.sectionImage && (
              <img
                src={formData.sectionImage}
                alt="Section Preview"
                className="mt-3 w-full h-48 object-cover rounded-lg border"
              />
            )}
          </div>

 
          <div>
            <label className="block text-gray-700 mb-2">Section Content</label>
            <ReactQuill
              theme="snow"
              value={formData.sectionContent}
              onChange={(val) =>
                setFormData({ ...formData, sectionContent: val })
              }
              className="bg-white rounded-lg"
              modules={{
                toolbar: [
                  [{ header: [1, 2, false] }],
                  ["bold", "italic", "underline", "strike"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["link", "image"],
                  ["clean"],
                ],
              }}
            />
          </div>

         
          <div className="flex items-center space-x-3">
            <label className="text-gray-700">Image First</label>
            <input
              type="checkbox"
              checked={formData.imageFirst}
              onChange={(e) =>
                setFormData({ ...formData, imageFirst: e.target.checked })
              }
              className="w-5 h-5 text-purple-600 border-gray-300 rounded"
            />
          </div>

        
          <Button
            type="submit"
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
          >
            Create Page
          </Button>
        </form>
      </div>
    </div>
  );
}
