import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Zap, Package, Users, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/")({
  component: HomePage,
});

export function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* ===== HERO SECTION ===== */}
      <section className="relative px-4 py-20 md:py-32 lg:py-40 max-w-7xl mx-auto">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl -z-10" />

        <div className="space-y-6 md:space-y-8 text-center">
          {/* Subtitle badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-200 text-sm font-medium">
            <Zap className="w-4 h-4" />
            Gerenciamento Moderno de Produtos
          </div>

          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Seu Catálogo de
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Produtos em um Lugar
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Organize, visualize e gerencie milhares de produtos com uma interface intuitiva e poderosa. 
            Tudo que você precisa para crescer seu negócio está aqui.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/dashboard">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 font-semibold group"
              >
                Explorar Dashboard
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/login">
              <Button 
                size="lg" 
                variant="outline"
                className="border-slate-600 text-white hover:bg-slate-800/50 px-8 font-semibold"
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
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Recursos poderosos para gerenciar seu catálogo com eficiência
            </p>
          </div>

          {/* Features grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1: Products */}
            <Card className="bg-slate-800/50 border-slate-700 hover:border-blue-500/50 transition-colors hover:shadow-lg hover:shadow-blue-500/10">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
                  <Package className="w-6 h-6 text-blue-400" />
                </div>
                <CardTitle className="text-white">Catálogo Completo</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-400">
                  Visualize e gerencie milhares de produtos em tempo real com busca avançada
                </CardDescription>
              </CardContent>
            </Card>

            {/* Feature 2: Analytics */}
            <Card className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-colors hover:shadow-lg hover:shadow-purple-500/10">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-purple-400" />
                </div>
                <CardTitle className="text-white">Insights Detalhados</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-400">
                  Acompanhe vendas, preços e estoque com dashboards visuais e dados em tempo real
                </CardDescription>
              </CardContent>
            </Card>

            {/* Feature 3: Team */}
            <Card className="bg-slate-800/50 border-slate-700 hover:border-pink-500/50 transition-colors hover:shadow-lg hover:shadow-pink-500/10">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-pink-500/20 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-pink-400" />
                </div>
                <CardTitle className="text-white">Colaboração</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-400">
                  Trabalhe em equipe com permissões granulares e histórico de alterações
                </CardDescription>
              </CardContent>
            </Card>

            {/* Feature 4: Performance */}
            <Card className="bg-slate-800/50 border-slate-700 hover:border-green-500/50 transition-colors hover:shadow-lg hover:shadow-green-500/10">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-green-400" />
                </div>
                <CardTitle className="text-white">Super Rápido</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-400">
                  Interface otimizada que carrega em segundos com performance incomparável
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="px-4 py-20 max-w-4xl mx-auto">
        <div className="relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl" />
          <div className="absolute inset-0 border border-blue-500/30 rounded-2xl" />
          
          {/* Content */}
          <div className="relative p-8 md:p-12 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Pronto para começar?
            </h2>
            <p className="text-slate-300 text-lg max-w-xl mx-auto">
              Acesse seu dashboard agora e comece a gerenciar seus produtos com inteligência
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/dashboard">
                <Button 
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-slate-100 font-semibold px-8"
                >
                  Ir para Dashboard
                </Button>
              </Link>
              <Link to="/login">
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 font-semibold px-8"
                >
                  Fazer Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="px-4 py-12 border-t border-slate-700/50 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm">
          <p>&copy; 2026 Product Manager. Todos os direitos reservados.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos</a>
            <a href="#" className="hover:text-white transition-colors">Contato</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

