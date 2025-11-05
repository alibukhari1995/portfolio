import Sidebar from "./components/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 min-h-screen w-full bg-gray-50 p-8">
        {children}
      </main>
    </div>
  );
}
