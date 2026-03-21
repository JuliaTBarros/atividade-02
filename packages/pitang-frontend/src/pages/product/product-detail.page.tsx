import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/product/$id")({
  component: ProductDetailPage,
});

export function ProductDetailPage() {
  return <div>Hello from Product Detail!</div>;
}

