"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Card from "../../components/Card";
import Button from "../../components/Button";
import { useAuth } from "../../context/AuthContext";
import { FiCheckCircle, FiXCircle, FiEye, FiSearch } from "react-icons/fi";

// Mock users with airline verification data
const users = [
  { 
    _id: "1", 
    name: "Alex Johnson", 
    email: "alex@airline.com", 
    role: "user", 
    status: "approved", 
    airline: "Delta Airlines", 
    position: "Flight Attendant",
    verificationDocuments: ["doc1.pdf"],
    createdAt: "2023-05-01T12:00:00Z"
  },
  { 
    _id: "2", 
    name: "Jamie Lee", 
    email: "jamie@airline.com", 
    role: "host", 
    status: "pending", 
    airline: "United Airlines", 
    position: "Pilot",
    verificationDocuments: ["doc2.pdf"],
    createdAt: "2023-05-02T14:30:00Z"
  },
  { 
    _id: "3", 
    name: "Morgan Smith", 
    email: "morgan@airline.com", 
    role: "admin", 
    status: "approved", 
    airline: "American Airlines", 
    position: "Captain",
    verificationDocuments: ["doc3.pdf"],
    createdAt: "2023-05-03T09:15:00Z"
  },
  { 
    _id: "4", 
    name: "Taylor Kim", 
    email: "taylor@airline.com", 
    role: "user", 
    status: "rejected", 
    airline: "Southwest Airlines", 
    position: "Flight Engineer",
    verificationDocuments: ["doc4.pdf"],
    createdAt: "2023-05-04T16:45:00Z"
  },
];

export default function AdminPage() {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  
  // Redirect to login if not authenticated or not admin
  useEffect(() => {
    if (!loading && (!isAuthenticated || (user && user.role !== 'admin'))) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, loading, router, user]);
  
  // Function to handle user approval
  const handleApproveUser = (userId: string) => {
    // In a real implementation, this would call an API endpoint
    console.log(`Approving user with ID: ${userId}`);
    // For now, we'll just update the local state
    const updatedUsers = users.map(u => {
      if (u._id === userId) {
        return { ...u, status: 'approved' };
      }
      return u;
    });
    // In a real implementation, you would update the state with the API response
    alert(`User ${selectedUser?.name} has been approved`);
    setShowVerificationModal(false);
  };
  
  // Function to handle user rejection
  const handleRejectUser = (userId: string) => {
    // In a real implementation, this would call an API endpoint
    console.log(`Rejecting user with ID: ${userId}`);
    // For now, we'll just update the local state
    const updatedUsers = users.map(u => {
      if (u._id === userId) {
        return { ...u, status: 'rejected' };
      }
      return u;
    });
    // In a real implementation, you would update the state with the API response
    alert(`User ${selectedUser?.name} has been rejected`);
    setShowVerificationModal(false);
  };
  
  // Function to open the verification modal
  const openVerificationModal = (user: any) => {
    setSelectedUser(user);
    setShowVerificationModal(true);
  };

  const filteredUsers = users.filter(user => {
    const q = search.toLowerCase();
    return (
      user.name.toLowerCase().includes(q) ||
      user.email.toLowerCase().includes(q) ||
      user.role.toLowerCase().includes(q) ||
      user.status.toLowerCase().includes(q) ||
      (user.airline && user.airline.toLowerCase().includes(q)) ||
      (user.position && user.position.toLowerCase().includes(q))
    );
  });
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!user || user.role !== 'admin') {
    return null; // Will redirect in useEffect
  }

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
      {showVerificationModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl w-full flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-2 flex items-center">
              <span role="img" aria-label="verify" className="mr-2">🔍</span> 
              User Verification Review
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">User Information</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-500">Name</p>
                    <p className="text-base font-medium text-gray-900">{selectedUser.name}</p>
                  </div>
                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="text-base text-gray-900">{selectedUser.email}</p>
                  </div>
                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-500">Role</p>
                    <p className="text-base text-gray-900 capitalize">{selectedUser.role}</p>
                  </div>
                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-500">Airline</p>
                    <p className="text-base text-gray-900">{selectedUser.airline || 'Not specified'}</p>
                  </div>
                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-500">Position</p>
                    <p className="text-base text-gray-900">{selectedUser.position || 'Not specified'}</p>
                  </div>
                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-500">Status</p>
                    <p className={`text-base font-medium ${selectedUser.status === 'approved' ? 'text-green-600' : selectedUser.status === 'pending' ? 'text-yellow-600' : 'text-red-600'} capitalize`}>
                      {selectedUser.status}
                    </p>
                  </div>
                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-500">Registered On</p>
                    <p className="text-base text-gray-900">
                      {new Date(selectedUser.createdAt).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Verification Documents</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  {selectedUser.verificationDocuments && selectedUser.verificationDocuments.length > 0 ? (
                    <div>
                      <div className="mb-4">
                        <p className="text-sm text-gray-500 mb-2">The following documents were submitted for verification:</p>
                        <ul className="list-disc pl-5 text-sm text-gray-700">
                          {selectedUser.verificationDocuments.map((doc: string, idx: number) => (
                            <li key={idx} className="mb-2">
                              <div className="flex items-center">
                                <span className="mr-2">{doc}</span>
                                <button className="text-blue-600 hover:text-blue-800 text-xs flex items-center">
                                  <FiEye className="mr-1" /> View
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="mt-6 bg-blue-50 p-3 rounded-md">
                        <p className="text-sm text-blue-800 font-medium mb-2">Verification Instructions</p>
                        <ol className="list-decimal pl-5 text-xs text-blue-700">
                          <li className="mb-1">Check that the document shows the user's full name</li>
                          <li className="mb-1">Verify the airline name matches what the user provided</li>
                          <li className="mb-1">Confirm the document is current and not expired</li>
                          <li className="mb-1">Ensure the position/role is clearly indicated</li>
                        </ol>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No verification documents have been submitted.</p>
                  )}
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Decision</h3>
                  <div className="flex flex-col space-y-3">
                    <button 
                      onClick={() => handleApproveUser(selectedUser._id)}
                      className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      <FiCheckCircle className="mr-2" /> Approve User
                    </button>
                    <button 
                      onClick={() => handleRejectUser(selectedUser._id)}
                      className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <FiXCircle className="mr-2" /> Reject Verification
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 border-t pt-4 flex justify-end">
              <Button variant="secondary" onClick={() => setShowVerificationModal(false)}>Close</Button>
            </div>
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
                <th className="py-2 px-4 text-left text-xs text-gray-500 uppercase">Airline</th>
                <th className="py-2 px-4 text-left text-xs text-gray-500 uppercase">Status</th>
                <th className="py-2 px-4 text-left text-xs text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, idx) => (
                <tr key={idx} className="border-t hover:bg-gray-50">
                  <td className="py-2 px-4 font-medium text-blue-900">{user.name}</td>
                  <td className="py-2 px-4 text-gray-700">{user.email}</td>
                  <td className="py-2 px-4 text-gray-700 capitalize">{user.role}</td>
                  <td className="py-2 px-4 text-gray-700">{user.airline || '-'}</td>
                  <td className={`py-2 px-4 text-xs font-semibold ${user.status === "approved" ? "text-green-600" : user.status === "pending" ? "text-yellow-600" : "text-red-600"}`}>
                    <span className="capitalize">{user.status}</span>
                  </td>
                  <td className="py-2 px-4 text-gray-700">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => openVerificationModal(user)}
                        className="text-blue-600 hover:text-blue-800 text-xs flex items-center"
                      >
                        <FiSearch className="mr-1" />
                        Review
                      </button>
                      {user.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => handleApproveUser(user._id)}
                            className="text-green-600 hover:text-green-800 text-xs flex items-center"
                          >
                            <FiCheckCircle className="mr-1" />
                            Approve
                          </button>
                          <button 
                            onClick={() => handleRejectUser(user._id)}
                            className="text-red-600 hover:text-red-800 text-xs flex items-center"
                          >
                            <FiXCircle className="mr-1" />
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
