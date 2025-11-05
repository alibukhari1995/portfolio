"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PlusSquare,
  Edit3,
  Trash2,
  Boxes,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/create", label: "Create Page", icon: PlusSquare },
    { href: "/admin/edit", label: "Edit Page", icon: Edit3 },
    { href: "/admin/delete", label: "Delete Page", icon: Trash2 },
    { href: "/admin/components", label: "Manage Components", icon: Boxes },
  ];

  return (
    <div className="h-screen w-64 bg-[#1E1E2F] text-white flex flex-col fixed left-0 top-0">
      <div className="p-4 text-2xl font-bold border-b border-gray-700">
        Admin Panel
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition ${
                active
                  ? "bg-purple-600"
                  : "hover:bg-gray-700 hover:text-white text-gray-300"
              }`}
            >
              <Icon size={20} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 text-sm border-t border-gray-700 text-gray-400">
        © 2025 Admin System
      </div>
    </div>
  );
}
