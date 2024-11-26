import React, { useState, useEffect } from "react";
import {
  FaEdit,
  FaTrashAlt,
  FaPlusCircle,
  FaArrowCircleDown,
  FaUserShield,
  FaUserPlus
} from "react-icons/fa"; // Importing icons
import { useTheme } from "../context/ThemeContext"; // Import theme context hook
import { getRoles, addRole, updateRole, deleteRole } from "../mockApi"; // Import API functions

const RoleManagement = () => {
  const { theme } = useTheme(); // Access the current theme (light/dark)
  const [roles, setRoles] = useState([]); // Initially, the roles will be fetched from the mock API
  const [newRoleName, setNewRoleName] = useState("");
  const [permissions, setPermissions] = useState({
    read: false,
    write: false,
    delete: false,
  });
  const [customAttributes, setCustomAttributes] = useState("");
  const [parentRole, setParentRole] = useState(null); // State for parent role
  const [editRoleId, setEditRoleId] = useState(null);

  // Fetch roles when the component mounts
  useEffect(() => {
    const fetchRoles = async () => {
      const fetchedRoles = await getRoles();
      setRoles(fetchedRoles);
    };
    fetchRoles();
  }, []);

  // Add Role
  const handleAddRole = async () => {
    if (!newRoleName.trim()) {
      alert("Role name cannot be empty!");
      return;
    }

    const newRole = {
      name: newRoleName,
      permissions: { ...permissions },
      customAttributes: customAttributes.trim(),
      parentRole: parentRole, // Save the parent role as well
    };

    const addedRole = await addRole(newRole); // Call the API to add the role
    setRoles([...roles, addedRole]);

    // Reset form fields
    setNewRoleName("");
    setPermissions({ read: false, write: false, delete: false });
    setCustomAttributes("");
    setParentRole(null); // Reset parent role
  };

  // Update Role
  const handleEditRole = async (id) => {
    const updatedRole = {
      name: newRoleName || roles.find((role) => role.id === id)?.name,
      permissions: { ...permissions },
      customAttributes: customAttributes || roles.find((role) => role.id === id)?.customAttributes,
      parentRole: parentRole || roles.find((role) => role.id === id)?.parentRole, // Preserve parent role
    };

    const updatedRoles = await updateRole(id, updatedRole); // Call API to update the role
    setRoles(
      roles.map((role) =>
        role.id === id ? { ...role, ...updatedRoles } : role
      )
    );

    // Reset form fields
    setEditRoleId(null);
    setNewRoleName("");
    setPermissions({ read: false, write: false, delete: false });
    setCustomAttributes("");
    setParentRole(null); // Reset parent role after editing
  };

  // Delete Role
  const handleDeleteRole = async (id) => {
    if (roles.find((role) => role.id === id)?.name === "Guest") {
      alert("The 'Guest' role cannot be deleted.");
      return;
    }

    await deleteRole(id); // Call the API to delete the role
    setRoles(roles.filter((role) => role.id !== id));
  };

  // Theme-based styles
  const containerStyles = theme === "light" ? "bg-white text-black" : "bg-gray-800 text-white";
  const buttonStyles = theme === "light" ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-700 hover:bg-blue-800";
  const headerStyles = theme === "light" ? "bg-gray-100" : "bg-gray-700";
  const tableHeaderStyles = theme === "light" ? "bg-gray-200" : "bg-gray-600";

  return (
    <div className={`p-6 shadow-md rounded-lg ${containerStyles}`}>
      <h1 className="text-2xl font-semibold mb-4 flex items-center">
        <FaUserShield className="mr-2" />
        Role Management
      </h1>

      {/* Add/Edit Role Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 flex items-center">
          {editRoleId ? <FaEdit className="mr-2" /> : <FaPlusCircle className="mr-2" />}
          {editRoleId ? "Edit Role" : "Add New Role"}
        </h3>
        <input
          type="text"
          placeholder="Role name"
          value={newRoleName}
          onChange={(e) => setNewRoleName(e.target.value)}
          className="border rounded p-2 mr-2 w-full"
          disabled={editRoleId && roles.find((role) => role.id === editRoleId)?.name === "Guest"}
        />
        <div className="mt-4">
          <h4 className="text-md font-semibold flex items-center">
            <FaUserPlus className="mr-2" />
            Permissions
          </h4>
          <label className="block">
            <input
              type="checkbox"
              checked={permissions.read}
              onChange={(e) => setPermissions({ ...permissions, read: e.target.checked })}
            />
            <span className="ml-2">Read</span>
          </label>
          <label className="block">
            <input
              type="checkbox"
              checked={permissions.write}
              onChange={(e) => setPermissions({ ...permissions, write: e.target.checked })}
            />
            <span className="ml-2">Write</span>
          </label>
          <label className="block">
            <input
              type="checkbox"
              checked={permissions.delete}
              onChange={(e) => setPermissions({ ...permissions, delete: e.target.checked })}
            />
            <span className="ml-2">Delete</span>
          </label>
        </div>
        <div className="mt-4">
          <h4 className="text-md font-semibold flex items-center">
            <FaArrowCircleDown className="mr-2" />
            Custom Attributes
          </h4>
          <textarea
            placeholder="Add custom attributes (optional)"
            value={customAttributes}
            onChange={(e) => setCustomAttributes(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="mt-4">
          <h4 className="text-md font-semibold flex items-center">
            <FaArrowCircleDown className="mr-2" />
            Parent Role
          </h4>
          <select
            value={parentRole || ""}
            onChange={(e) => setParentRole(e.target.value)}
            className="border rounded p-2 w-full"
          >
            <option value="">None</option>
            {roles
              .filter((role) => role.id !== editRoleId) // Don't allow the role to be its own parent
              .map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
          </select>
        </div>
        <button
          onClick={editRoleId ? () => handleEditRole(editRoleId) : handleAddRole}
          className={`mt-4 text-white px-4 py-2 rounded ${buttonStyles} flex items-center`}
        >
          {editRoleId ? <FaEdit className="mr-2" /> : <FaPlusCircle className="mr-2" />}
          {editRoleId ? "Save Changes" : "Add Role"}
        </button>
      </div>

      {/* Role List */}
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className={tableHeaderStyles}>
            <th className="border px-4 py-2">Role Name</th>
            <th className="border px-4 py-2">Permissions</th>
            <th className="border px-4 py-2">Custom Attributes</th>
            <th className="border px-4 py-2">Parent Role</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td className="border px-4 py-2">{role.name}</td>
              <td className="border px-4 py-2">
                {Object.keys(role.permissions)
                  .filter((key) => role.permissions[key])
                  .join(", ") || "None"}
              </td>
              <td className="border px-4 py-2">{role.customAttributes || "N/A"}</td>
              <td className="border px-4 py-2">
                {role.parentRole ? roles.find((r) => r.id === role.parentRole)?.name : "None"}
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => {
                    setEditRoleId(role.id);
                    setNewRoleName(role.name);
                    setPermissions(role.permissions);
                    setCustomAttributes(role.customAttributes);
                    setParentRole(role.parentRole);
                  }}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mr-2 flex items-center"
                >
                  <FaEdit className="mr-2" /> Edit
                </button>
                <button
                  onClick={() => handleDeleteRole(role.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center"
                >
                  <FaTrashAlt className="mr-2" /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoleManagement;
