import bcrypt from "bcryptjs";

import { User } from "../../model/user.entity";
import { userRepository } from "../../api/user/userRepository";
import { Permission } from "../../model/permission.entity";
import {permissionRepository} from "../../api/user/permissionRepository";
import { Role } from "../../model/role.entity";
import { roleRepository } from "../../api/user/roleRepository";
import {Post} from "../../model/post.entity";
import {postRepository} from "../../api/user/postRepository";


import {ServiceResponse,ResponseStatus,} from "../../services/serviceResponse";
import { StatusCodes } from "http-status-codes";
import { generateJwt } from "../../services/jwtService";
import { Login, Token, CreateRolePermissionRequest } from "../auth/auth.interface";
import { calculateUnixTime } from "../../services/caculateDatetime";

export const authService = {
  // Register new user
  register: async (userData: User): Promise<ServiceResponse<User | null>> => {
    try {
      const user = await userRepository.findByEmailAsync(userData.email);
      if (user) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Email already exists",
          null,
          StatusCodes.BAD_REQUEST
        );
      }

      const newUserRole = "user";
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const role = await roleRepository.findByNameAsync(newUserRole);
      const newUser = await userRepository.createUserAsync({
        ...userData,
        password: hashedPassword,
        role: role?.roleName,
      });
      if (!newUser) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Error creating users",
          null,
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      }

      return new ServiceResponse<User>(
        ResponseStatus.Success,
        "User registered successfully!",
        newUser,
        StatusCodes.CREATED
      );
    } catch (ex) {
      const errorMessage = `Error creating usersss: ${(ex as Error).message}`;
      return new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },

  // Login user
  login: async (loginData: Login): Promise<ServiceResponse<Token | null>> => {
    try {
      const user = await userRepository.findByEmailAsync(loginData.email);
      if (!user) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "User not found",
          null,
          StatusCodes.NOT_FOUND
        );
      }
      // Compare hashed password
      const passwordMatch = await bcrypt.compare(
        loginData.password,
        user.password
      ); // Compare entered password with hashed password
      if (!passwordMatch) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Invalid password",
          null,
          StatusCodes.UNAUTHORIZED
        );
      }

      const token: Token = {
        accessToken: generateJwt({ id: user.id, username: user.username }),
        refreshToken: generateJwt({ id: user.id, username: user.username }),
        expiresIn: calculateUnixTime(process.env.JWT_EXPIRES_IN || "1h"),
        tokenType: "Bearer",
      };

      const tokenData = {
        accessToken: token.accessToken,
        accessTokenExpireAt: new Date(token.expiresIn*1000),
        refreshToken: token.refreshToken,
        refreshTokenExpireAt: new Date(token.expiresIn*1000),
      };

      const addToken = await userRepository.addTokenAsync(user.id, tokenData);

      return new ServiceResponse<Token>(
        ResponseStatus.Success,
        "Login successful",
        token,
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Error logging in: ${(ex as Error).message}`;
      return new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },
  getUser: async (userId: string): Promise<ServiceResponse<User | null>> => {
    try {
      console.log("user", userId);
      const user = await userRepository.findByIdAsync(userId);
      console.log("user", user);
      if (!user) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "User not found",
          null,
          StatusCodes.NOT_FOUND
        );
      }

      return new ServiceResponse<User>(
        ResponseStatus.Success,
        "User found",
        user,
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Error getting user1: ${(ex as Error).message}`;
      return new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },
  addPermissiontoDB: async (
    permissionData: Permission
  ): Promise<ServiceResponse<string | null>> => {
    try {
      console.log("start permissionRepo:", permissionData); //permissionData is an array, need to destructure
      const permission = await permissionRepository.addPermissionAsync(
        permissionData
      );
      console.log("End permissionRepo", permission);
      if (!permission) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Error adding permission",
          null,
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      }
      return new ServiceResponse<string>(
        ResponseStatus.Success,
        "Permission added",
        "permission",
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Error adding permission to DB: ${
        (ex as Error).message
      }`;
      return new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },

  addRoletoDB: async (
    roleData: Role
  ): Promise<ServiceResponse<string | null>> => {
    try {
      console.log("role", roleData);
      const role = await roleRepository.addRoleAsync(roleData);
      console.log("role", role);
      if (!role) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Error adding role",
          null,
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      }
      return new ServiceResponse<string>(
        ResponseStatus.Success,
        "Role added",
        "role",
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Error adding role to DB: ${(ex as Error).message}`;
      return new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },

  addAdmintoDB: async (
    adminData: User
  ): Promise<ServiceResponse<User | null>> => {
    try {
      const admin = await userRepository.findByEmailAsync(adminData.email);
      if (admin) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Email already exists",
          null,
          StatusCodes.BAD_REQUEST
        );
      }

      const newAdminRole = "admin";
      const hashedPassword = await bcrypt.hash(adminData.password, 10);
      const role = await roleRepository.findByNameAsync(newAdminRole);
      const newAdmin = await userRepository.createUserAsync({
        ...adminData,
        password: hashedPassword,
        role: role?.roleName,
      });
      if (!newAdmin) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Error creating users",
          null,
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      }

      return new ServiceResponse<User>(
        ResponseStatus.Success,
        "Admin registered successfully!",
        newAdmin,
        StatusCodes.CREATED
      );
    } catch (ex) {
      const errorMessage = `Error creating usersss: ${(ex as Error).message}`;
      return new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },
  createPost: async (
    postData: Post
  ): Promise<ServiceResponse<Post | null>> => {
    try {
      
      const userId = postData.user.id;
      
      const user = await userRepository.findOne({ where: { id: userId } });
      if (!user) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "User not found",
          null,
          StatusCodes.NOT_FOUND
        );
      }


      const post = await postRepository.createPostAsync({
        title: postData.title,
        content: postData.content,
        user: user,
      });
      console.log("end post create", post);
      if (!post) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Error creating post",
          null,
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      }
      return new ServiceResponse<Post>(
        ResponseStatus.Success,
        "Post created",
        post,
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Error creating post: ${(ex as Error).message}`;
      return new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },

  addPermissiontoRole: async (permissionData: any): Promise<ServiceResponse<CreateRolePermissionRequest | null>> => {
  try {
    const role = await roleRepository.findByNameAsync(permissionData.roleName);
    if (!role) {
      return new ServiceResponse(
        ResponseStatus.Failed,
        "Role not found",
        null,
        StatusCodes.NOT_FOUND
      );
    }

    const permissions = await permissionRepository.findByNameAsync(permissionData.permissionName);
    if (!permissions) {
      return new ServiceResponse(
        ResponseStatus.Failed,
        "Permission not found",
        null,
        StatusCodes.NOT_FOUND
      );
    }

    // const rolePermissions = await roleRepository.addPermissionToRoleAsync(role, permissions);
    // if (!rolePermissions) {
    //   return new ServiceResponse(
    //     ResponseStatus.Failed,
    //     "Error adding permission to role",
    //     null,
    //     StatusCodes.INTERNAL_SERVER_ERROR
    //   );
    // }
    const updatedRole = await roleRepository.addPermissionToRoleAsync(
      role,
      permissions
    );
    if (!updatedRole) {
      return new ServiceResponse(
        ResponseStatus.Failed,
        "Error adding permission to role",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }

    // Create the response object matching CreateRolePermissionRequest
    const response: CreateRolePermissionRequest = {
      roleId: updatedRole.id, // Assuming updatedRole contains the role ID
      permissions: updatedRole.permissions.map((permission) => ({
        id: permission.id,
      })), // Map permissions to the expected structure
    };

    return new ServiceResponse<CreateRolePermissionRequest>(
      ResponseStatus.Success,
      "Permission added to role",
      response,
      StatusCodes.OK
    );
  } catch (ex) {
    const errorMessage = `Error adding permission to role: ${(ex as Error).message}`;
    return new ServiceResponse(
      ResponseStatus.Failed,
      errorMessage,
      null,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
},
  updateRoletoUser: async (roleData: any): Promise<ServiceResponse<User | null>> => {
    try {
      const user = await userRepository.findByIdAsync(roleData.userId);
      if (!user) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "User not found",
          null,
          StatusCodes.NOT_FOUND
        );
      }

      const role = await roleRepository.findByNameAsync(roleData.roleName);
      if (!role) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Role not found",
          null,
          StatusCodes.NOT_FOUND
        );
      }

      const updatedUser = await userRepository.updateRoleToUserAsync(user, role);
      if (!updatedUser) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Error adding role to user",
          null,
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      }

      return new ServiceResponse<User>(
        ResponseStatus.Success,
        "Role added to user",
        updatedUser,
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Error adding role to user: ${(ex as Error).message}`;
      return new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },
  deleteUser: async (userId: string): Promise<ServiceResponse<string | null>> => {
    try {
      const user = await userRepository.findByIdAsync(userId);
      if (!user) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "User not found",
          null,
          StatusCodes.NOT_FOUND
        );
      }

      const deletedUser = await userRepository.deleteUserAsync(user.id);
      if (!deletedUser) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Error deleting user",
          null,
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      }

      return new ServiceResponse<string>(
        ResponseStatus.Success,
        "User deleted",
        "user",
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Error deleting user: ${(ex as Error).message}`;
      return new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
};
