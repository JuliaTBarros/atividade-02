import {useCallback, useEffect, useMemo, useState} from "react";

import {fetchAllProducts} from "@/features/products/api/products.api";
import type {Product} from "@/features/products/model/product.types";
import {Button} from "@/shared/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/shared/ui/card";
import {Skeleton} from "@/shared/ui/skeleton";
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
    CartesianGrid,
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const DASHBOARD_SOURCE_URL = "https://dummyjson.com/products";
const INVALID_BRAND_VALUES = new Set(["undefined", "unbranded"]);
const TOP_BRAND_COUNT = 5;
const TOP_CATEGORY_COUNT = 4;
const OTHER_CATEGORY_LABEL = "outros";
const CHART_COLORS = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
];

const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
});

export function DashboardPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadProducts = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const allProducts = await fetchAllProducts();
            setProducts(allProducts);
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
            const brand = product.brand?.trim();

            if (!brand || INVALID_BRAND_VALUES.has(brand.toLowerCase())) {
                return acc;
            }

            acc[brand] = (acc[brand] ?? 0) + product.stock;
            return acc;
        }, {});

        return Object.entries(totals)
            .map(([brand, stock]) => ({brand, stock}))
            .sort((a, b) => b.stock - a.stock)
            .slice(0, TOP_BRAND_COUNT);
    }, [products]);

    const productsByCategory = useMemo(() => {
        const totals = products.reduce<Record<string, number>>((acc, product) => {
            acc[product.category] = (acc[product.category] ?? 0) + 1;
            return acc;
        }, {});

        const sortedCategories = Object.entries(totals)
            .map(([category, total]) => ({category, total}))
            .sort((a, b) => b.total - a.total);

        const topCategories = sortedCategories.slice(0, TOP_CATEGORY_COUNT);
        const othersTotal = sortedCategories
            .slice(TOP_CATEGORY_COUNT)
            .reduce((acc, item) => acc + item.total, 0);

        return [...topCategories, {category: OTHER_CATEGORY_LABEL, total: othersTotal}];
    }, [products]);

    const stockByBrandWithColors = useMemo(
        () =>
            stockByBrand.map((item, index) => ({
                ...item,
                color: CHART_COLORS[index % CHART_COLORS.length],
            })),
        [stockByBrand],
    );

    const productsByCategoryWithColors = useMemo(
        () =>
            productsByCategory.map((item, index) => ({
                ...item,
                color: CHART_COLORS[index % CHART_COLORS.length],
            })),
        [productsByCategory],
    );

    if (loading) {
        return (
            <div className="flex flex-1 flex-col gap-4 p-4" role="status" aria-live="polite">
                <span className="sr-only">Loading dashboard data.</span>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <Skeleton className="h-28"/>
                    <Skeleton className="h-28"/>
                    <Skeleton className="h-28"/>
                    <Skeleton className="h-28"/>
                </div>
                <Skeleton className="h-72"/>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-1 items-center justify-center p-4" role="alert">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Dashboard unavailable</CardTitle>
                        <CardDescription>{error}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button
                            onClick={loadProducts}
                            className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                            Try again
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <main className="flex flex-1 flex-col gap-4 p-4" aria-labelledby="dashboard-title">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                    <h1 id="dashboard-title" className="text-2xl font-bold tracking-tight text-foreground">
                        Dashboard
                    </h1>
                    <p className="text-sm leading-6 text-muted-foreground">
                        Metrics loaded from DummyJSON product API.
                    </p>
                    <p className="text-xs leading-5 text-muted-foreground">
                        Source: {DASHBOARD_SOURCE_URL} | Loaded: {products.length} products
                    </p>
                </div>

                <Button
                    variant="outline"
                    onClick={loadProducts}
                    aria-label="Refresh dashboard data"
                    className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                    Refresh data
                </Button>
            </div>

            <section aria-label="Key metrics" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <Card role="article" aria-label="Products in catalog">
                    <CardHeader className="pb-2">
                        <CardDescription className="text-muted-foreground">Products in catalog</CardDescription>
                        <CardTitle className="text-2xl tabular-nums">{metrics.totalProducts}</CardTitle>
                    </CardHeader>
                </Card>

                <Card role="article" aria-label="Average product price">
                    <CardHeader className="pb-2">
                        <CardDescription className="text-muted-foreground">Average price</CardDescription>
                        <CardTitle className="text-2xl tabular-nums">
                            {currencyFormatter.format(metrics.averagePrice)}
                        </CardTitle>
                    </CardHeader>
                </Card>

                <Card role="article" aria-label="Total stock available">
                    <CardHeader className="pb-2">
                        <CardDescription className="text-muted-foreground">Total stock</CardDescription>
                        <CardTitle className="text-2xl tabular-nums">{metrics.totalStock}</CardTitle>
                    </CardHeader>
                </Card>

                <Card role="article" aria-label="Top rating in catalog">
                    <CardHeader className="pb-2">
                        <CardDescription className="text-muted-foreground">Top rating in catalog</CardDescription>
                        <CardTitle className="text-2xl tabular-nums">{metrics.topRating.toFixed(1)}</CardTitle>
                    </CardHeader>
                </Card>
            </section>

            <section className="grid gap-4 lg:grid-cols-2" aria-label="Visual analytics">
                <Card>
                    <CardHeader>
                        <CardTitle id="stock-by-brand-title">Stock by brand</CardTitle>
                        <CardDescription>Top 5 brands from full catalog.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <figure aria-labelledby="stock-by-brand-title">
                            <div className="h-72 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={stockByBrandWithColors}
                                              margin={{top: 12, right: 4, left: 0, bottom: 0}}>
                                        <CartesianGrid stroke="var(--border)" vertical={false}/>
                                        <XAxis
                                            dataKey="brand"
                                            tickLine={false}
                                            axisLine={false}
                                            tick={{fill: "var(--muted-foreground)", fontSize: 12}}
                                        />
                                        <YAxis
                                            tickLine={false}
                                            axisLine={false}
                                            width={40}
                                            tick={{fill: "var(--muted-foreground)", fontSize: 12}}
                                        />
                                        <Tooltip
                                            cursor={{fill: "var(--muted)"}}
                                            contentStyle={{
                                                backgroundColor: "var(--popover)",
                                                borderColor: "var(--border)",
                                                borderRadius: "8px",
                                                color: "var(--popover-foreground)",
                                            }}
                                            labelStyle={{color: "var(--popover-foreground)"}}
                                        />
                                        <Bar
                                            dataKey="stock"
                                            radius={[6, 6, 0, 0]}
                                            fill="var(--chart-1)"
                                            stroke="var(--card)"
                                            strokeWidth={1}
                                        >
                                            {stockByBrandWithColors.map((entry) => (
                                                <Cell
                                                    key={entry.brand}
                                                    fill={entry.color}
                                                    stroke="var(--card)"
                                                    strokeWidth={1}
                                                />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </figure>
                        <ul className="mt-3 grid gap-1 text-sm sm:grid-cols-2" aria-label="Stock by brand legend">
                            {stockByBrandWithColors.map((entry) => (
                                <li key={`${entry.brand}-legend`} className="flex items-center gap-2">
                                    <span
                                        className="h-2.5 w-2.5 rounded-full"
                                        style={{backgroundColor: entry.color}}
                                        aria-hidden="true"
                                    />
                                    <span>{entry.brand}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle id="products-by-category-title">Products by category</CardTitle>
                        <CardDescription>Top 4 categories and one "outros" group.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <figure aria-labelledby="products-by-category-title">
                            <div className="h-72 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={productsByCategoryWithColors}
                                            dataKey="total"
                                            nameKey="category"
                                            innerRadius={58}
                                            outerRadius={92}
                                            paddingAngle={2}
                                            stroke="var(--card)"
                                            strokeWidth={1}
                                        >
                                            {productsByCategoryWithColors.map((entry) => (
                                                <Cell key={entry.category} fill={entry.color}/>
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: "var(--popover)",
                                                borderColor: "var(--border)",
                                                borderRadius: "8px",
                                                color: "var(--popover-foreground)",
                                            }}
                                            labelStyle={{color: "var(--popover-foreground)"}}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>

                        </figure>
                        <ul className="mt-3 grid gap-1 text-sm sm:grid-cols-2" aria-label="Products by category legend">
                            {productsByCategoryWithColors.map((entry) => (
                                <li
                                    key={`${entry.category}-legend`}
                                    className="flex items-center gap-2"
                                >
                                    <span
                                        className="h-2.5 w-2.5 rounded-full"
                                        style={{backgroundColor: entry.color}}
                                        aria-hidden="true"
                                    />
                    <span>{entry.category}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </section>

            <section aria-labelledby="recent-products-title">
                <Card>
                    <CardHeader>
                        <CardTitle id="recent-products-title">Recent products</CardTitle>
                        <CardDescription>Latest items from the full API catalog.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table aria-label="Recent products table">
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
                                        <TableRow key={product.id} className="hover:bg-muted/60">
                                            <TableCell className="font-medium">{product.title}</TableCell>
                                            <TableCell>{product.category}</TableCell>
                                            <TableCell className="text-right tabular-nums">
                                                {currencyFormatter.format(product.price)}
                                            </TableCell>
                                            <TableCell className="text-right tabular-nums">{product.stock}</TableCell>
                                            <TableCell
                                                className="text-right tabular-nums">{product.rating.toFixed(1)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </section>
        </main>
    );
}
