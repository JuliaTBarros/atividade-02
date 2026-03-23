import {createFileRoute} from "@tanstack/react-router";
import {ProductsScreen} from "@/features/products/ui/products-screen";

export const Route = createFileRoute("/dashboard/products/")({
    component: ProductsScreen,
});
