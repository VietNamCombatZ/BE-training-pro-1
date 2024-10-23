interface Login {
    email: string;
    password: string;
}
interface Token {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    tokenType: string;
}

interface CreateRolePermissionRequest {
  roleId: string;
  permissions: { id: string }[]; // Array of permissions by ID
}

  
export type { Login, Token,CreateRolePermissionRequest };
  