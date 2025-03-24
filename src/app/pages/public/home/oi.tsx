import { authService } from "@/services/authService";
import { Link } from "@tanstack/react-router";
import {
  Building2,
  TrendingUp,
  Shield,
  Users,
  ArrowRight,
  BarChart as ChartBar,
  FileText,
  BadgeCheck,
} from "lucide-react";
import { motion } from "framer-motion"; // Para animações

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-28 text-center">
          <motion.h1
            className="text-5xl sm:text-6xl font-extrabold tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Invista no Futuro de Angola
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-gray-200 mt-4 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            A primeira plataforma digital para investimento em PMEs angolanas. 
            Conectamos empresas promissoras a investidores visionários.
          </motion.p>
          <div className="mt-8 flex gap-4 justify-center">
            <Link
              to="/marketeplace"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center gap-2"
            >
              Começar a Investir <ArrowRight size={20} />
            </Link>
            <Link
              to="/list-company"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              Listar Empresa
            </Link>
          </div>
        </div>

        {/* Stats - Agora animados */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { value: "150+", label: "Empresas Listadas" },
            { value: "$2.5M", label: "Capital Investido" },
            { value: "5000+", label: "Investidores Ativos" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="text-4xl font-bold text-blue-600">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </header>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Como Funciona</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Building2 />, title: "Para Empresas", desc: "Liste sua empresa e atraia investidores." },
              { icon: <TrendingUp />, title: "Para Investidores", desc: "Descubra oportunidades de investimento." },
              { icon: <Shield />, title: "Segurança", desc: "Processos verificados e proteção ao investidor." },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center">
        <motion.h2
          className="text-4xl font-extrabold mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Comece a Investir no Futuro de Angola
        </motion.h2>
        <motion.p
          className="text-blue-100 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          Junte-se a milhares de investidores que já estão transformando o mercado.
        </motion.p>
        {!authService.isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Link
              to="/signup"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-100 transition-all duration-300 transform hover:scale-105"
            >
              Criar Conta Grátis
            </Link>
          </motion.div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 text-center">
        <p>© {new Date().getFullYear()} Plataforma de Investimentos Angola. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default Home;
