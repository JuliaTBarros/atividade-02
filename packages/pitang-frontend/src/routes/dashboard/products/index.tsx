import { createFileRoute } from "@tanstack/react-router";
import { ProductsPage } from "@/pages/dashboard/products/products.page";
export const Route = createFileRoute("/dashboard/products/")({
  component: ProductsPage,
});
