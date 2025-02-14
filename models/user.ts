export interface User {
  id: string;
  name: string;
  email: string;
}

export type CreateUserRequest = Omit<User, "id">;
