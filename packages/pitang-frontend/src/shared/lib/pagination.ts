export type PaginationPageItem = number | "ellipsis";

export function getPaginationItems(
    currentPage: number,
    totalPages: number,
    maxVisible: number = 5,
): PaginationPageItem[] {
    if (totalPages <= 0) {
        return [];
    }

    const page = Math.min(Math.max(currentPage, 1), totalPages);
    const pages: PaginationPageItem[] = [];

    if (totalPages <= maxVisible) {
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }

        return pages;
    }

    if (page <= 3) {
        for (let i = 1; i <= 4; i++) {
            pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
        return pages;
    }

    if (page >= totalPages - 2) {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = totalPages - 3; i <= totalPages; i++) {
            pages.push(i);
        }
        return pages;
    }

    pages.push(1);
    pages.push("ellipsis");
    for (let i = page - 1; i <= page + 1; i++) {
        pages.push(i);
    }
    pages.push("ellipsis");
    pages.push(totalPages);

    return pages;
}

