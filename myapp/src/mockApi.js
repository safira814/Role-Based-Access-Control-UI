// Simulate delay for mock API calls
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API for users
let mockUsers = [
  { id: 1, name: 'John Doe', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', role: 'User', status: 'Inactive' },
];

// Mock API for roles
let mockRoles = [
  { id: 1, name: 'Admin', permissions: ['Read', 'Write', 'Delete'] },
  { id: 2, name: 'User', permissions: ['Read'] },
  { id: 3, name: 'Guest', permissions: [] },
];

// Users-related API calls

// Fetch all users
export const getUsers = async () => {
  await delay(500); // Simulate network delay
  return mockUsers;
};

// Add a new user
export const addUser = async (user) => {
  await delay(500); // Simulate network delay
  const newUser = { ...user, id: Date.now() }; // Generate a unique ID based on current time
  mockUsers = [...mockUsers, newUser];
  return newUser;
};

// Update an existing user
export const updateUser = async (id, updatedUser) => {
  await delay(500); // Simulate network delay
  mockUsers = mockUsers.map(user =>
    user.id === id ? { ...user, ...updatedUser } : user
  );
  return updatedUser;
};

// Delete a user by ID
export const deleteUser = async (id) => {
  await delay(500); // Simulate network delay
  mockUsers = mockUsers.filter(user => user.id !== id);
  return id;
};

// Roles-related API calls

// Fetch all roles
export const getRoles = async () => {
  await delay(500); // Simulate network delay
  return mockRoles;
};

// Add a new role
export const addRole = async (role) => {
  await delay(500); // Simulate network delay
  const newRole = { ...role, id: Date.now() }; // Generate a unique ID based on current time
  mockRoles = [...mockRoles, newRole];
  return newRole;
};

// Update a role's details (e.g., permissions)
export const updateRole = async (id, updatedRole) => {
  await delay(500); // Simulate network delay
  mockRoles = mockRoles.map(role =>
    role.id === id ? { ...role, ...updatedRole } : role
  );
  return updatedRole;
};

// Delete a role by ID
export const deleteRole = async (id) => {
  await delay(500); // Simulate network delay
  mockRoles = mockRoles.filter(role => role.id !== id);
  return id;
};

// Update a role's permissions
export const updateRolePermissions = async (roleId, updatedPermissions) => {
  await delay(500); // Simulate network delay
  mockRoles = mockRoles.map(role =>
    role.id === roleId ? { ...role, permissions: updatedPermissions } : role
  );
  return { id: roleId, permissions: updatedPermissions };
};
