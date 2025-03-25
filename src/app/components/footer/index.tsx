import { Link } from "@tanstack/react-router";




export default function Footer(){




    return(
        <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Sobre</h3>
              <ul className="space-y-2">
                <li><Link to="." href='#'   className="hover:text-white transition">Nossa História</Link></li>
                <li><Link to="." className="hover:text-white transition">Equipe</Link></li>
                <li><Link to="." className="hover:text-white transition">Carreiras</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Produtos</h3>
              <ul className="space-y-2">
                <li><Link to="." className="hover:text-white transition">Para Investidores</Link></li>
                <li><Link to="." className="hover:text-white transition">Para Empresas</Link></li>
                <li><Link to="." className="hover:text-white transition">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Recursos</h3>
              <ul className="space-y-2">
                <li><Link to="." className="hover:text-white transition">Blog</Link></li>
                <li><Link to="." className="hover:text-white transition">Guias</Link></li>
                <li><Link to="." className="hover:text-white transition">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="." className="hover:text-white transition">Privacidade</Link></li>
                <li><Link to="." className="hover:text-white transition">Termos</Link></li>
                <li><Link to="." className="hover:text-white transition">Segurança</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p>© 2024 Njila  Investimentos. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    )
}