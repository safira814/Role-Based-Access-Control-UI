import React, { useState, useEffect } from "react";
import { getRoles, updateRolePermissions } from "../mockApi"; // Import mock API functions
import { useTheme } from "../context/ThemeContext"; // Import theme context

const PermissionManagement = () => {
  const { theme } = useTheme(); // Access current theme (light/dark)
  const [roles, setRoles] = useState([]);
  const [permissions] = useState(["Read", "Write", "Delete"]); // Predefined permissions
  const [selectedRole, setSelectedRole] = useState(null);

  // Fetch roles from the mock API when the component mounts
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const fetchedRoles = await getRoles(); // Simulate fetching roles from the API
        setRoles(fetchedRoles);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchRoles();
  }, []);

  // Handle selecting a role
  const handleSelectRole = (role) => {
    setSelectedRole(role);
  };

  // Handle toggling a permission for the selected role
  const handleTogglePermission = async (permission) => {
    if (!selectedRole) return;

    const updatedPermissions = selectedRole.permissions.includes(permission)
      ? selectedRole.permissions.filter((perm) => perm !== permission) // Remove permission
      : [...selectedRole.permissions, permission]; // Add permission

    try {
      // Call mock API to update role permissions
      const updatedRole = await updateRolePermissions(selectedRole.id, updatedPermissions);

      // Update the roles state with the new permissions
      const updatedRoles = roles.map((role) =>
        role.id === updatedRole.id ? updatedRole : role
      );
      setRoles(updatedRoles);

      // Update the selected role with its new permissions
      setSelectedRole(updatedRole);
    } catch (error) {
      console.error("Error updating role permissions:", error);
    }
  };

  // Theme-based styles
  const containerStyles = theme === "light" ? "bg-white text-black" : "bg-gray-800 text-white";
  const buttonStyles = theme === "light" ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-700";
  const tableHeaderStyles = theme === "light" ? "bg-gray-100" : "bg-gray-700";
  const tableRowStyles = theme === "light" ? "bg-white hover:bg-gray-100" : "bg-gray-800 hover:bg-gray-700";

  return (
    <div className={`p-6 shadow-md rounded-lg ${containerStyles}`}>
      <h1 className="text-2xl font-semibold mb-6">Permission Management</h1>

      {/* Role Selection */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Select Role</h2>
        <div className="flex gap-4">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => handleSelectRole(role)}
              className={`px-4 py-2 rounded ${
                selectedRole?.id === role.id
                  ? "bg-blue-600 text-white"
                  : buttonStyles
              }`}
            >
              {role.name}
            </button>
          ))}
        </div>
      </div>

      {/* Permission Assignment */}
      {selectedRole && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">
            Manage Permissions for <span className="text-blue-600">{selectedRole.name}</span>
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {permissions.map((permission) => (
              <label
                key={permission}
                className="flex items-center space-x-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedRole.permissions.includes(permission)}
                  onChange={() => handleTogglePermission(permission)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span>{permission}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Role Permission Display */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2">Roles and Their Permissions</h2>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className={tableHeaderStyles}>
              <th className="border px-4 py-2">Role</th>
              <th className="border px-4 py-2">Permissions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.id} className={tableRowStyles}>
                <td className="border px-4 py-2">{role.name}</td>
                <td className="border px-4 py-2">
                  {role.permissions.length > 0 ? (
                    role.permissions.join(", ")
                  ) : (
                    <span className="text-gray-500">No permissions assigned</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PermissionManagement;
