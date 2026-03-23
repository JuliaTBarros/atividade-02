import { createFileRoute } from "@tanstack/react-router";
import { ProductDetailScreen } from "@/features/products/ui/product-detail-screen";

export const Route = createFileRoute("/product/$id")({
  component: ProductDetailRoute,
});

function ProductDetailRoute() {
  const { id } = Route.useParams();

  return <ProductDetailScreen id={id} />;
}

