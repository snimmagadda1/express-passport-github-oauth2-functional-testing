import { type User } from "../models/user";

class UserService {
  private users: Map<string, User>;

  constructor() {
    this.users = new Map<string, User>();
  }

  findById(id: string): User | undefined {
    return this.users.get(id);
  }

  save(user: User): void {
    this.users.set(user.id, user);
  }

  delete(id: string): boolean {
    return this.users.delete(id);
  }

  findOrCreate(profile: any): User {
    console.log("GOT USER", JSON.stringify(profile));
    const existingUser = this.findById(profile.id);
    if (existingUser) {
      return existingUser;
    }

    // Create new user from GitHub profile
    const newUser: User = {
      id: profile.id,
      name: profile.displayName || profile.username,
      email: profile._json?.email || "",
    };

    this.save(newUser);
    return newUser;
  }
}

// Export a singleton instance
export const userService = new UserService();
