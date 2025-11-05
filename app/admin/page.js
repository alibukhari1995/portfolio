export default function AdminHome() {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">Welcome to the Admin Dashboard</h1>
  
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl shadow hover:shadow-md transition">
            <h2 className="text-xl font-semibold mb-2">Create Page</h2>
            <p className="text-gray-600">Build a new page with banners and sections.</p>
          </div>
  
          <div className="p-6 bg-white rounded-2xl shadow hover:shadow-md transition">
            <h2 className="text-xl font-semibold mb-2">Edit Page</h2>
            <p className="text-gray-600">Update existing pages or their sections.</p>
          </div>
  
          <div className="p-6 bg-white rounded-2xl shadow hover:shadow-md transition">
            <h2 className="text-xl font-semibold mb-2">Manage Components</h2>
            <p className="text-gray-600">Add or remove custom content blocks.</p>
          </div>
        </div>
      </div>
    );
  }
  