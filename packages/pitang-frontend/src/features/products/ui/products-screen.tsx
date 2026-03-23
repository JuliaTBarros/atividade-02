import { useEffect, useRef, useState } from "react";
import { GridIcon, ListIcon } from "lucide-react";

import { fetchProductById, fetchProducts } from "@/features/products/api/products.api";
import type { Product } from "@/features/products/model/product.types";

import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/ui/pagination";
import { getPaginationItems } from "@/shared/lib/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/shared/ui/sheet";

export function ProductsScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 12;
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);
  const requestIdRef = useRef(0);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      try {
        const data = await fetchProducts(page, limit);
        setProducts(data.products);
        setTotal(data.total);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    }

    void loadProducts();
  }, [page]);

  const totalPages = Math.ceil(total / limit);

  async function handleViewDetails(productId: number) {
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;

    setIsDetailOpen(true);
    setSelectedProductId(productId);
    setDetailLoading(true);
    setDetailError(null);
    setSelectedProduct(null);

    try {
      const data = await fetchProductById(productId);
      if (requestIdRef.current !== requestId) {
        return;
      }
      setSelectedProduct(data);
    } catch {
      if (requestIdRef.current !== requestId) {
        return;
      }
      setDetailError("Could not load product details.");
    } finally {
      if (requestIdRef.current === requestId) {
        setDetailLoading(false);
      }
    }
  }

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products</h1>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("grid")}
          >
            <GridIcon className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "table" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("table")}
          >
            <ListIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <CardHeader className="p-4">
                <CardTitle className="line-clamp-1 text-sm">{product.title}</CardTitle>
                <CardDescription className="line-clamp-2 text-xs">
                  {product.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold">${product.price}</span>
                  <span className="text-sm text-muted-foreground">{product.stock} in stock</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  <span className="rounded bg-secondary px-2 py-1 text-xs">{product.category}</span>
                  <span className="rounded bg-secondary px-2 py-1 text-xs">{product.brand}</span>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button
                  variant="outline"
                  className="w-full"
                  size="sm"
                  disabled={detailLoading && selectedProductId === product.id}
                  onClick={() => void handleViewDetails(product.id)}
                >
                  {detailLoading && selectedProductId === product.id ? "Loading..." : "View Details"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead className="text-right">Rating</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-12 w-12 rounded object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium">{product.title}</TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell className="text-right">${product.price}</TableCell>
                <TableCell className="text-right">{product.stock}</TableCell>
                <TableCell className="text-right">{product.rating}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={detailLoading && selectedProductId === product.id}
                    onClick={() => void handleViewDetails(product.id)}
                  >
                    {detailLoading && selectedProductId === product.id ? "Loading..." : "View Details"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

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
                <PaginationEllipsis />
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

      <Sheet open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-xl">
          <SheetHeader>
            <SheetTitle>{selectedProduct?.title ?? "Product details"}</SheetTitle>
          </SheetHeader>

          {detailLoading && <div className="px-4 pb-4">Loading details...</div>}

          {!detailLoading && detailError && (
            <div className="space-y-3 px-4 pb-4">
              <p className="text-destructive">{detailError}</p>
              {selectedProductId !== null && (
                <Button variant="outline" size="sm" onClick={() => void handleViewDetails(selectedProductId)}>
                  Retry
                </Button>
              )}
            </div>
          )}

          {!detailLoading && !detailError && selectedProduct && (
            <div className="space-y-4 px-4 pb-4">
              <img
                src={selectedProduct.thumbnail}
                alt={selectedProduct.title}
                className="h-56 w-full rounded object-cover"
              />

              <p className="text-sm text-muted-foreground">{selectedProduct.description}</p>

              <div className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
                <p>
                  <span className="font-semibold">Category:</span> {selectedProduct.category}
                </p>
                <p>
                  <span className="font-semibold">Brand:</span> {selectedProduct.brand}
                </p>
                <p>
                  <span className="font-semibold">Price:</span> ${selectedProduct.price}
                </p>
                <p>
                  <span className="font-semibold">Discount:</span> {selectedProduct.discountPercentage}%
                </p>
                <p>
                  <span className="font-semibold">Stock:</span> {selectedProduct.stock}
                </p>
                <p>
                  <span className="font-semibold">Rating:</span> {selectedProduct.rating}
                </p>
                <p>
                  <span className="font-semibold">SKU:</span> {selectedProduct.sku}
                </p>
                <p>
                  <span className="font-semibold">Weight:</span> {selectedProduct.weight}
                </p>
                <p className="sm:col-span-2">
                  <span className="font-semibold">Dimensions:</span> {selectedProduct.dimensions.width} x{" "}
                  {selectedProduct.dimensions.height} x {selectedProduct.dimensions.depth}
                </p>
                <p className="sm:col-span-2">
                  <span className="font-semibold">Warranty:</span> {selectedProduct.warrantyInformation}
                </p>
                <p className="sm:col-span-2">
                  <span className="font-semibold">Shipping:</span> {selectedProduct.shippingInformation}
                </p>
                <p className="sm:col-span-2">
                  <span className="font-semibold">Return policy:</span> {selectedProduct.returnPolicy}
                </p>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

