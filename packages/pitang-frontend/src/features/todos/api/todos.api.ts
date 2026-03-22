import type {TodosResponse} from "@/features/todos/model/todo.types";

const BASE_URL = "https://dummyjson.com";

export async function fetchTodos(
    page: number = 1,
    limit: number = 10,
): Promise<TodosResponse> {
    const skip = (page - 1) * limit;
    const response = await fetch(`${BASE_URL}/todos?limit=${limit}&skip=${skip}`);

    if (!response.ok) {
        throw new Error("Failed to fetch todos");
    }

    return response.json();
}
