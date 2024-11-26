import React, { useState, useEffect } from "react";
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../mockApi"; // Importing mock API functions
import {
  FaPlusCircle,
  FaEdit,
  FaUserShield,
  FaTrashAlt,
  FaChevronUp,
  FaChevronDown,
  FaToggleOn,
  FaToggleOff,
  FaSort,
} from "react-icons/fa"; // Import icons
import { useTheme } from "../context/ThemeContext"; // Import theme context

const UserManagement = () => {
  const { theme } = useTheme(); // Access current theme (light/dark)
  const [users, setUsers] = useState([]);
  const [roles] = useState(["Admin", "User", "Guest"]); // Predefined roles
  const [newUser, setNewUser] = useState({ name: "", role: "User", status: "Active" });
  const [editingUser, setEditingUser] = useState(null);
  const [showHierarchy, setShowHierarchy] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
    };
    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    if (!newUser.name.trim()) {
      alert("User name cannot be empty!");
      return;
    }
    const user = await addUser(newUser); // Add new user
    setUsers([...users, user]);
    setNewUser({ name: "", role: "User", status: "Active" });
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  const handleSaveEditUser = async () => {
    const updatedUser = await updateUser(editingUser.id, editingUser); // Save edited user
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setEditingUser(null);
  };

  const handleDeleteUser = async (id) => {
    await deleteUser(id); // Delete user
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleToggleStatus = async (id) => {
    const userToUpdate = users.find((user) => user.id === id);
    const newStatus = userToUpdate.status === "Active" ? "Inactive" : "Active";

    const updatedUser = await updateUser(id, { ...userToUpdate, status: newStatus }); // Toggle status
    setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterRole = (e) => {
    setFilterRole(e.target.value);
  };

  const handleSort = (field) => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newOrder);
    setUsers(
      [...users].sort((a, b) => {
        const aValue = a[field] || "";
        const bValue = b[field] || "";
        return newOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      })
    );
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = !filterRole || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  // Theme-based styles
  const containerStyles = theme === "light" ? "bg-white text-black" : "bg-gray-800 text-black";
  const buttonStyles = theme === "light" ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-blue-400 hover:bg-blue-500 text-white";
  const tableHeaderStyles = theme === "light" ? "bg-gray-100" : "bg-gray-700";
  const tableRowStyles = theme === "light" ? "bg-white hover:bg-gray-100" : "bg-gray-800 hover:bg-gray-700";
  const toggleButtonStyles = theme === "light" ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-400 hover:bg-blue-500";

  return (
    <div className={`p-6 shadow-md rounded-lg ${containerStyles}`}>
      <h1 className="text-2xl font-semibold mb-4 flex items-center">
        <FaUserShield className="mr-2" />
        user Management
      </h1>


      {/* Add/Edit User Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">
          {editingUser ? (
            <>
              <FaEdit className="inline text-yellow-500 mr-2" /> Edit User
            </>
          ) : (
            <>
              <FaPlusCircle className="inline text-green-500 mr-2" /> Add New User
            </>
          )}
        </h3>
        <input
          type="text"
          placeholder="Enter user name"
          value={editingUser ? editingUser.name : newUser.name}
          onChange={(e) =>
            editingUser
              ? setEditingUser({ ...editingUser, name: e.target.value })
              : setNewUser({ ...newUser, name: e.target.value })
          }
          className="border rounded p-2 mr-2 w-full"
        />
        <select
          value={editingUser ? editingUser.role : newUser.role}
          onChange={(e) =>
            editingUser
              ? setEditingUser({ ...editingUser, role: e.target.value })
              : setNewUser({ ...newUser, role: e.target.value })
          }
          className="border rounded p-2 mr-2 w-full"
        >
          {roles.map((role, index) => (
            <option key={index} value={role}>
              {role}
            </option>
          ))}
        </select>
        {editingUser ? (
          <button
            onClick={handleSaveEditUser}
            className={`mt-4 px-4 py-2 rounded ${buttonStyles}`}
          >
            Save Changes
          </button>
        ) : (
          <button
            onClick={handleAddUser}
            className={`mt-4 px-4 py-2 rounded ${buttonStyles}`}
          >Add User
          </button>
        )}
      </div>

      {/* Search, Filter, and Sort Section */}
      <div className="mb-6 flex items-center justify-between">
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={handleSearch}
          className="border rounded p-2 w-1/3"
        />
        <select
          value={filterRole}
          onChange={handleFilterRole}
          className="border rounded p-2"
        >
          <option value="">All Roles</option>
          {roles.map((role, index) => (
            <option key={index} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      {/* Role Hierarchy Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 flex items-center">
          <button  
            onClick={() => setShowHierarchy(!showHierarchy)}
            className="ml-2 text-white-500" 
          > Role Hierarchy 
            {showHierarchy ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </h3>
        {showHierarchy && (
          <ul className="list-disc ml-6">
            <li>
              <strong>Admin:</strong> Full access, including user and permission management.
            </li>
            <li>
              <strong>User:</strong> Limited access to basic system features.
            </li>
            <li>
              <strong>Guest:</strong> Read-only access to specific sections.
            </li>
          </ul>
        )}
      </div>

      {/* User List with Sorting */}
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className={tableHeaderStyles}>
            <th
              className="border px-4 py-2 cursor-pointer"
              onClick={() => handleSort("name")}
            >
              Name <FaSort className="inline ml-1" />
            </th>
            <th
              className="border px-4 py-2 cursor-pointer"
              onClick={() => handleSort("role")}
            >
              Role <FaSort className="inline ml-1" />
            </th>
            <th
              className="border px-4 py-2 cursor-pointer"
              onClick={() => handleSort("status")}
            >
              Status <FaSort className="inline ml-1" />
            </th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className={tableRowStyles}>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.role}</td>
              <td className="border px-4 py-2">
                <span
                  className={`inline-block px-3 py-1 text-sm rounded ${
                    user.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {user.status}
                </span>
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleToggleStatus(user.id)}
                  className={`px-4 py-2 rounded text-white ${toggleButtonStyles} mr-2 flex items-center`}
                >
                  {user.status === "Active" ? (
                    <>
                      <FaToggleOff className="mr-1" /> Deactivate
                    </>
                  ) : (
                    <>
                      <FaToggleOn className="mr-1" /> Activate
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleEditUser(user)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mr-2"
                >
                  <FaEdit className="inline mr-1" /> Edit
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  <FaTrashAlt className="inline mr-1" /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
