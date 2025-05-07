"use client";
import { useState } from "react";
import Card from "../../components/Card";
import Button from "../../components/Button";

const users = [
  { name: "Alex Johnson", email: "alex@airline.com", role: "User", status: "Active" },
  { name: "Jamie Lee", email: "jamie@airline.com", role: "Host", status: "Pending" },
  { name: "Morgan Smith", email: "morgan@airline.com", role: "Admin", status: "Active" },
  { name: "Taylor Kim", email: "taylor@airline.com", role: "User", status: "Suspended" },
];

export default function AdminPage() {
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);

  const filteredUsers = users.filter(user => {
    const q = search.toLowerCase();
    return (
      user.name.toLowerCase().includes(q) ||
      user.email.toLowerCase().includes(q) ||
      user.role.toLowerCase().includes(q) ||
      user.status.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex flex-col gap-8 pb-20 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="w-full bg-blue-600 text-white py-10 px-4 rounded-b-3xl shadow-md flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 flex items-center gap-3">
          <span role="img" aria-label="admin">🛡️</span> Admin Dashboard
        </h1>
        <p className="text-lg max-w-2xl text-center">
          Manage users, hosts, and view analytics for the Crew Lounge platform.
        </p>
      </section>

      {/* Search and Actions */}
      <div className="w-full flex flex-col gap-3 px-4 mt-[-2rem]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex-1 flex items-center bg-white rounded shadow px-3 py-2">
            <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input
              type="text"
              placeholder="Search users, emails, or roles"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="flex-1 outline-none bg-transparent text-gray-700"
            />
          </div>
          <div className="flex gap-2 items-center justify-end">
            <button
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 px-2 py-1 rounded transition"
              onClick={() => setSearch("")}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 19v-6m0 0V5m0 8l-3-3m3 3l3-3"/></svg>
              Refresh
            </button>
            <Button variant="primary" className="text-xs px-3 py-1" onClick={() => setShowAddUser(true)}>+ Add User</Button>
            <button
              className="flex items-center gap-1 text-xs text-gray-600 border border-gray-300 px-2 py-1 rounded hover:bg-gray-100"
              onClick={() => setShowFilters(true)}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 16V8"/></svg>
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full flex flex-col gap-4">
            <h2 className="text-lg font-semibold mb-2">Filters (Demo)</h2>
            <p className="text-gray-500 text-sm">Filter options would go here.</p>
            <Button variant="secondary" onClick={() => setShowFilters(false)}>Close</Button>
          </div>
        </div>
      )}
      {showAddUser && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full flex flex-col gap-4">
            <h2 className="text-lg font-semibold mb-2">Add User (Demo)</h2>
            <p className="text-gray-500 text-sm">User creation form would go here.</p>
            <Button variant="secondary" onClick={() => setShowAddUser(false)}>Close</Button>
          </div>
        </div>
      )}

      {/* Users Table/Grid */}
      <section className="px-4">
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr>
                <th className="py-2 px-4 text-left text-xs text-gray-500 uppercase">Name</th>
                <th className="py-2 px-4 text-left text-xs text-gray-500 uppercase">Email</th>
                <th className="py-2 px-4 text-left text-xs text-gray-500 uppercase">Role</th>
                <th className="py-2 px-4 text-left text-xs text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, idx) => (
                <tr key={idx} className="border-t">
                  <td className="py-2 px-4 font-medium text-blue-900">{user.name}</td>
                  <td className="py-2 px-4 text-gray-700">{user.email}</td>
                  <td className="py-2 px-4 text-gray-700">{user.role}</td>
                  <td className={`py-2 px-4 text-xs font-semibold ${user.status === "Active" ? "text-green-600" : user.status === "Pending" ? "text-yellow-600" : "text-red-600"}`}>{user.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
