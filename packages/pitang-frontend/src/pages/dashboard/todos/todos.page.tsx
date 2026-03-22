import {useEffect, useState} from "react";

import {fetchTodos} from "@/features/todos/api/todos.api";
import type {Todo} from "@/features/todos/model/todo.types";
import {getPaginationItems} from "@/shared/lib/pagination";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/shared/ui/pagination";

export function TodosPage() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    const limit = 10;

    useEffect(() => {
        async function loadTodos() {
            setLoading(true);
            try {
                const data = await fetchTodos(page, limit);
                setTodos(data.todos);
                setTotal(data.total);
            } catch (error) {
                console.error("Failed to fetch todos:", error);
            } finally {
                setLoading(false);
            }
        }

        void loadTodos();
    }, [page]);

    const totalPages = Math.max(1, Math.ceil(total / limit));

    if (loading) return <div className="p-4">Loading todos...</div>;

    return (
        <div className="flex flex-col gap-4 p-4">
            <h1 className="text-2xl font-bold">Todos</h1>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Tarefa</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>User ID</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {todos.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center text-muted-foreground">
                                Nenhuma tarefa encontrada.
                            </TableCell>
                        </TableRow>
                    ) : (
                        todos.map((todo) => (
                            <TableRow key={todo.id}>
                                <TableCell>{todo.id}</TableCell>
                                <TableCell>{todo.todo}</TableCell>
                                <TableCell>
                  <span
                      className={
                          todo.completed
                              ? "text-green-600 dark:text-green-400"
                              : "text-orange-600 dark:text-orange-400"
                      }
                  >
                    {todo.completed ? "Concluída" : "Pendente"}
                  </span>
                                </TableCell>
                                <TableCell>{todo.userId}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                    </PaginationItem>

                    {getPaginationItems(page, totalPages).map((pageNum, idx) =>
                        pageNum === "ellipsis" ? (
                            <PaginationItem key={`ellipsis-${idx}`}>
                                <PaginationEllipsis/>
                            </PaginationItem>
                        ) : (
                            <PaginationItem key={pageNum}>
                                <PaginationLink
                                    onClick={() => setPage(pageNum)}
                                    isActive={page === pageNum}
                                    className="cursor-pointer"
                                >
                                    {pageNum}
                                </PaginationLink>
                            </PaginationItem>
                        ),
                    )}

                    <PaginationItem>
                        <PaginationNext
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            className={page === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
