// packages/pitang-frontend/src/features/users/api/users.api.ts
import type {UsersResponse} from "@/features/users/model/user.types";

const BASE_URL = "https://dummyjson.com";

export async function fetchUsers(page = 1, limit = 10): Promise<UsersResponse> {
    const skip = (page - 1) * limit;
    const response = await fetch(`${BASE_URL}/users?limit=${limit}&skip=${skip}`);

    if (!response.ok) {
        throw new Error("Failed to fetch users");
    }

    return response.json();
}
