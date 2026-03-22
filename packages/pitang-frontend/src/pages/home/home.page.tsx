import {Button} from "@/shared/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/shared/ui/card";
import {createFileRoute} from "@tanstack/react-router";
import {Link} from "@tanstack/react-router";
import {ArrowRight, Zap, Package, Users, TrendingUp} from "lucide-react";

export const Route = createFileRoute("/")({
    component: HomePage,
});

export function HomePage() {
    return (
        <div className="dark min-h-screen bg-background text-foreground overflow-hidden">
            {/* ===== HERO SECTION ===== */}
            <section className="relative px-4 py-20 md:py-32 lg:py-40 max-w-7xl mx-auto">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl -z-10 bg-accent/15"/>
                <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl -z-10 bg-primary/15"/>

                <div className="space-y-6 md:space-y-8 text-center">
                    {/* Subtitle badge */}
                    <div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/60 bg-accent text-accent-foreground text-sm font-semibold shadow-sm">
                        <Zap className="w-4 h-4 text-accent-foreground"/>
                        Gerenciamento Moderno de Produtos
                    </div>


                    {/* Main headline */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                        Seu Catálogo de
                        <span className="block bg-linear-to-r from-accent to-primary bg-clip-text text-transparent">
              Produtos em um Lugar
            </span>
                    </h1>

                    {/* Description */}
                    <p className="text-lg md:text-xl text-foreground/90 max-w-2xl mx-auto leading-relaxed">
                        Organize, visualize e gerencie milhares de produtos com uma interface intuitiva e poderosa.
                        Tudo que você precisa para crescer seu negócio está aqui.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <Link to="/dashboard">
                            <Button
                                size="lg"
                                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 group"
                            >
                                Explorar Dashboard
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"/>
                            </Button>
                        </Link>
                        <Link to="/login">
                            <Button
                                size="lg"
                                variant="outline"
                                className="font-semibold px-8 border-primary/50 text-foreground hover:bg-primary/10 focus-visible:ring-primary"
                            >
                                Fazer Login
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ===== FEATURES SECTION ===== */}
            <section className="px-4 py-20 md:py-32 max-w-7xl mx-auto">
                <div className="space-y-12">
                    {/* Section header */}
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                            Tudo que você precisa
                        </h2>
                        <p className="text-foreground/85 text-lg max-w-2xl mx-auto">
                            Recursos poderosos para gerenciar seu catálogo com eficiência
                        </p>
                    </div>

                    {/* Features grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Feature 1: Products */}
                        <Card className="border-border hover:border-accent/50 transition-colors hover:shadow-lg">
                            <CardHeader>
                                <div
                                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-accent/20">
                                    <Package className="w-6 h-6 text-accent"/>
                                </div>
                                <CardTitle>Catálogo Completo</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-foreground/80 leading-relaxed">
                                    Visualize e gerencie milhares de produtos em tempo real com busca avançada
                                </CardDescription>
                            </CardContent>
                        </Card>

                        {/* Feature 2: Analytics */}
                        <Card className="border-border hover:border-primary/50 transition-colors hover:shadow-lg">
                            <CardHeader>
                                <div
                                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-primary/20">
                                    <TrendingUp className="w-6 h-6 text-primary"/>
                                </div>
                                <CardTitle>Insights Detalhados</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-foreground/80 leading-relaxed">
                                    Acompanhe vendas, preços e estoque com dashboards visuais e dados em tempo real
                                </CardDescription>
                            </CardContent>
                        </Card>

                        {/* Feature 3: Team */}
                        <Card className="border-border hover:border-destructive/50 transition-colors hover:shadow-lg">
                            <CardHeader>
                                <div
                                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-destructive/20">
                                    <Users className="w-6 h-6 text-destructive"/>
                                </div>
                                <CardTitle>Colaboração</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-foreground/80 leading-relaxed">
                                    Trabalhe em equipe com permissões granulares e histórico de alterações
                                </CardDescription>
                            </CardContent>
                        </Card>

                        {/* Feature 4: Performance */}
                        <Card className="border-border hover:border-chart-3/50 transition-colors hover:shadow-lg">
                            <CardHeader>
                                <div
                                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-chart-3/20">
                                    <Zap className="w-6 h-6 text-chart-3"/>
                                </div>
                                <CardTitle>Super Rápido</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-foreground/80 leading-relaxed">
                                    Interface otimizada que carrega em segundos com performance incomparável
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* ===== CTA SECTION ===== */}
            <section className="px-4 py-20 max-w-4xl mx-auto">
                <div className="relative overflow-hidden rounded-2xl border border-primary/35 bg-primary/15">
                    {/* Content */}
                    <div className="relative p-8 md:p-12 text-center space-y-6">
                        <h2 className="text-3xl md:text-4xl font-bold">
                            Pronto para começar?
                        </h2>
                        <p className="text-foreground text-lg max-w-xl mx-auto">
                            Acesse seu dashboard agora e comece a gerenciar seus produtos com inteligência
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                            <Link to="/dashboard">
                                <Button
                                    size="lg"
                                    className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8"
                                >
                                    Ir para Dashboard
                                </Button>
                            </Link>
                            <Link to="/login">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="font-semibold px-8 border-primary/50 text-foreground hover:bg-primary/10"
                                >
                                    Fazer Login
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== FOOTER ===== */}
            <footer className="px-4 py-12 border-t border-border mt-20">
                <div
                    className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-foreground/80 text-sm">
                    <p>&copy; 2026 Product Manager. Todos os direitos reservados.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="text-foreground/85 hover:text-foreground hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">Privacidade</a>
                        <a href="#" className="text-foreground/85 hover:text-foreground hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">Termos</a>
                        <a href="#" className="text-foreground/85 hover:text-foreground hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">Contato</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

