import { useEffect, useState } from "react";
import { AlertCircleIcon } from "lucide-react";

import { fetchProductById } from "@/features/products/api/products.api";
import type { Product } from "@/features/products/model/product.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";

type ProductDetailScreenProps = {
  id: string;
};

export function ProductDetailScreen({ id }: ProductDetailScreenProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const parsedId = Number(id);

    if (!Number.isFinite(parsedId)) {
      setError("Invalid product id.");
      setLoading(false);
      return;
    }

    async function loadProduct() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchProductById(parsedId);
        setProduct(response);
      } catch {
        setError("Could not load product details.");
      } finally {
        setLoading(false);
      }
    }

    void loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="p-4">
        <Skeleton className="h-60 w-full" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="p-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircleIcon className="size-4" />
              Product unavailable
            </CardTitle>
          </CardHeader>
          <CardContent>{error ?? "Product not found."}</CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>{product.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-muted-foreground">{product.description}</p>
          <p>
            <span className="font-semibold">Category:</span> {product.category}
          </p>
          <p>
            <span className="font-semibold">Brand:</span> {product.brand}
          </p>
          <p>
            <span className="font-semibold">Price:</span> ${product.price}
          </p>
          <p>
            <span className="font-semibold">Stock:</span> {product.stock}
          </p>
          <p>
            <span className="font-semibold">Rating:</span> {product.rating}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

