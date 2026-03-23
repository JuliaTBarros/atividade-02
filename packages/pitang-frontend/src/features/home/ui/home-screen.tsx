import {Link} from "@tanstack/react-router";
import {ArrowRight, Package, TrendingUp, Users, Zap} from "lucide-react";

import {Button} from "@/shared/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/shared/ui/card";

export function HomeScreen() {
    return (
        <div className="min-h-screen overflow-hidden bg-background text-foreground">
            <section className="relative mx-auto max-w-7xl px-4 py-20 md:py-32 lg:py-40">
                <div className="absolute top-0 right-0 -z-10 h-96 w-96 rounded-full bg-accent/15 blur-3xl"/>
                <div className="absolute bottom-0 left-0 -z-10 h-96 w-96 rounded-full bg-primary/15 blur-3xl"/>

                <div className="space-y-6 text-center md:space-y-8">
                    <div
                        className="inline-flex items-center gap-2 rounded-full border border-accent/60 bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground shadow-sm">
                        <Zap className="h-4 w-4 text-accent-foreground"/>
                        Gerenciamento Moderno de Produtos
                    </div>

                    <h1 className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
                        Seu Catalogo de
                        <span className="block bg-linear-to-r from-accent to-primary bg-clip-text text-transparent">
              Produtos em um Lugar
            </span>
                    </h1>

                    <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                        Organize, visualize e gerencie milhares de produtos com uma interface intuitiva e poderosa.
                        Tudo que voce precisa para crescer seu negocio esta aqui.
                    </p>

                    <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
                        <Link to="/dashboard">
                            <Button
                                size="lg"
                                className="group bg-primary px-8 font-semibold text-primary-foreground hover:bg-primary/90"
                            >
                                Explorar Dashboard
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"/>
                            </Button>
                        </Link>
                        <Link to="/login">
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-primary/50 px-8 font-semibold text-foreground hover:bg-primary/10 focus-visible:ring-primary"
                            >
                                Fazer Login
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-20 md:py-32">
                <div className="space-y-12">
                    <div className="space-y-4 text-center">
                        <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">Tudo que voce precisa</h2>
                        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                            Recursos poderosos para gerenciar seu catalogo com eficiencia
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        <Card className="border-border transition-colors hover:border-accent/50 hover:shadow-lg">
                            <CardHeader>
                                <div
                                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/20">
                                    <Package className="h-6 w-6 text-accent"/>
                                </div>
                                <CardTitle>Catalogo Completo</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="leading-relaxed text-muted-foreground">
                                    Visualize e gerencie milhares de produtos em tempo real com busca avancada
                                </CardDescription>
                            </CardContent>
                        </Card>

                        <Card className="border-border transition-colors hover:border-primary/50 hover:shadow-lg">
                            <CardHeader>
                                <div
                                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
                                    <TrendingUp className="h-6 w-6 text-primary"/>
                                </div>
                                <CardTitle>Insights Detalhados</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="leading-relaxed text-muted-foreground">
                                    Acompanhe vendas, precos e estoque com dashboards visuais e dados em tempo real
                                </CardDescription>
                            </CardContent>
                        </Card>

                        <Card className="border-border transition-colors hover:border-destructive/50 hover:shadow-lg">
                            <CardHeader>
                                <div
                                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/20">
                                    <Users className="h-6 w-6 text-destructive"/>
                                </div>
                                <CardTitle>Colaboracao</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="leading-relaxed text-muted-foreground">
                                    Trabalhe em equipe com permissoes granulares e historico de alteracoes
                                </CardDescription>
                            </CardContent>
                        </Card>

                        <Card className="border-border transition-colors hover:border-chart-3/50 hover:shadow-lg">
                            <CardHeader>
                                <div
                                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-chart-3/20">
                                    <Zap className="h-6 w-6 text-chart-3"/>
                                </div>
                                <CardTitle>Super Rapido</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="leading-relaxed text-muted-foreground">
                                    Interface otimizada que carrega em segundos com performance incomparavel
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-4xl px-4 py-20">
                <div className="relative overflow-hidden rounded-2xl border border-primary/35 bg-primary/15">
                    <div className="relative space-y-6 p-8 text-center md:p-12">
                        <h2 className="text-3xl font-bold md:text-4xl">Pronto para comecar?</h2>
                        <p className="mx-auto max-w-xl text-lg text-foreground">
                            Acesse seu dashboard agora e comece a gerenciar seus produtos com inteligencia
                        </p>
                        <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
                            <Link to="/dashboard">
                                <Button size="lg"
                                        className="bg-primary px-8 font-semibold text-primary-foreground hover:bg-primary/90">
                                    Ir para Dashboard
                                </Button>
                            </Link>
                            <Link to="/login">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-primary/50 px-8 font-semibold text-foreground hover:bg-primary/10"
                                >
                                    Fazer Login
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="mt-20 border-t border-border px-4 py-12">
                <div
                    className="mx-auto flex max-w-7xl flex-col items-center justify-between text-sm text-muted-foreground md:flex-row">
                    <p>&copy; 2026 Product Manager. Todos os direitos reservados.</p>
                    <div className="mt-4 flex gap-6 md:mt-0">
                        <a
                            href="/About#privacy"
                            className="rounded-sm text-muted-foreground transition-colors hover:text-foreground hover:underline hover:underline-offset-4 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                        >
                            Privacidade
                        </a>
                        <a
                            href="/About#terms"
                            className="rounded-sm text-muted-foreground transition-colors hover:text-foreground hover:underline hover:underline-offset-4 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                        >
                            Termos
                        </a>
                        <a
                            href="/About#contact"
                            className="rounded-sm text-muted-foreground transition-colors hover:text-foreground hover:underline hover:underline-offset-4 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                        >
                            Contato
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

