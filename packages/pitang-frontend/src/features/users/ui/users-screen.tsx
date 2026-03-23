import {useEffect, useState} from "react";

import {fetchUsers} from "@/features/users/api/users.api";
import type {User} from "@/features/users/model/user.types";
import {getPaginationItems} from "@/shared/lib/pagination";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/shared/ui/pagination";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/shared/ui/table";

export function UsersScreen() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const limit = 10;

    useEffect(() => {
        async function loadUsers() {
            setLoading(true);
            try {
                const data = await fetchUsers(page, limit);
                setUsers(data.users);
                setTotal(data.total);
            } catch (error) {
                console.error("Failed to fetch users:", error);
            } finally {
                setLoading(false);
            }
        }

        void loadUsers();
    }, [page]);

    const totalPages = Math.ceil(total / limit);

    if (loading) return <div className="p-4">Loading users...</div>;

    return (
        <div className="flex flex-col gap-4 p-4">
            <h1 className="text-2xl font-bold">Users</h1>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Avatar</TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Username</TableHead>
                        <TableHead>Telefone</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>
                                <img
                                    src={user.image}
                                    alt={user.firstName}
                                    className="h-10 w-10 rounded-full object-cover"
                                />
                            </TableCell>
                            <TableCell>
                                {user.firstName} {user.lastName}
                            </TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.phone}</TableCell>
                        </TableRow>
                    ))}
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

