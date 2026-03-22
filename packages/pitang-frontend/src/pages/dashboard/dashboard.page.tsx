import { useCallback, useEffect, useMemo, useState } from "react";

import { fetchProducts } from "@/features/products/api/products.api";
import type { Product } from "@/features/products/model/product.types";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const PAGE_SIZE = 12;
const CHART_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export function DashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchProducts(1, PAGE_SIZE);
      setProducts(response.products);
    } catch {
      setError("Could not load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadProducts();
  }, [loadProducts]);

  const metrics = useMemo(() => {
    if (!products.length) {
      return {
        totalProducts: 0,
        averagePrice: 0,
        totalStock: 0,
        topRating: 0,
      };
    }

    const totalPrice = products.reduce((acc, product) => acc + product.price, 0);
    const totalStock = products.reduce((acc, product) => acc + product.stock, 0);
    const topRating = products.reduce(
      (acc, product) => Math.max(acc, product.rating),
      0,
    );

    return {
      totalProducts: products.length,
      averagePrice: totalPrice / products.length,
      totalStock,
      topRating,
    };
  }, [products]);

  const recentProducts = useMemo(
    () => [...products].sort((a, b) => b.id - a.id).slice(0, 6),
    [products],
  );

  const stockByBrand = useMemo(() => {
    const totals = products.reduce<Record<string, number>>((acc, product) => {
      acc[product.brand] = (acc[product.brand] ?? 0) + product.stock;
      return acc;
    }, {});

    return Object.entries(totals)
      .map(([brand, stock]) => ({ brand, stock }))
      .sort((a, b) => b.stock - a.stock)
      .slice(0, 6);
  }, [products]);

  const productsByCategory = useMemo(() => {
    const totals = products.reduce<Record<string, number>>((acc, product) => {
      acc[product.category] = (acc[product.category] ?? 0) + 1;
      return acc;
    }, {});

    return Object.entries(totals)
      .map(([category, total]) => ({ category, total }))
      .sort((a, b) => b.total - a.total);
  }, [products]);

  if (loading) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
        </div>
        <Skeleton className="h-72" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-1 items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Dashboard unavailable</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={loadProducts}>Try again</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Simulated metrics from product catalog data.
          </p>
        </div>

        <Button variant="outline" onClick={loadProducts}>
          Refresh data
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Products in sample</CardDescription>
            <CardTitle className="text-2xl">{metrics.totalProducts}</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Average price</CardDescription>
            <CardTitle className="text-2xl">
              ${metrics.averagePrice.toFixed(2)}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total stock</CardDescription>
            <CardTitle className="text-2xl">{metrics.totalStock}</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Top rating</CardDescription>
            <CardTitle className="text-2xl">{metrics.topRating.toFixed(1)}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Stock by brand</CardTitle>
            <CardDescription>Top brands from current sample.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stockByBrand}>
                  <XAxis dataKey="brand" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} width={34} />
                  <Tooltip />
                  <Bar dataKey="stock" radius={[6, 6, 0, 0]} fill="hsl(var(--chart-1))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Products by category</CardTitle>
            <CardDescription>Distribution in the loaded catalog slice.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={productsByCategory}
                    dataKey="total"
                    nameKey="category"
                    innerRadius={58}
                    outerRadius={92}
                    paddingAngle={2}
                  >
                    {productsByCategory.map((entry, index) => (
                      <Cell
                        key={entry.category}
                        fill={CHART_COLORS[index % CHART_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent products</CardTitle>
          <CardDescription>Latest items from the API sample.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Stock</TableHead>
                <TableHead className="text-right">Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.title}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="text-right">${product.price}</TableCell>
                  <TableCell className="text-right">{product.stock}</TableCell>
                  <TableCell className="text-right">{product.rating}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
