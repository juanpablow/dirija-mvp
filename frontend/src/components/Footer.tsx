import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 md:py-12">
      <div className="container mx-auto container-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">DiriJá</h3>
            <p className="text-sm text-gray-400">
              Conectando motoristas experientes a novos motoristas.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Links Úteis</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/faq" className="hover:text-white transition">
                  Como se Tornar Instrutor
                </Link>
              </li>
              <li>
                <Link
                  href="/#instructor-form"
                  className="hover:text-white transition"
                >
                  Seja um Instrutor
                </Link>
              </li>
              <li>
                <Link
                  href="/coming-soon"
                  className="hover:text-white transition"
                >
                  Encontrar Instrutor
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contato</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="mailto:contato@dirija.app"
                  className="hover:text-white transition"
                >
                  contato@dirija.app
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 DiriJá. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
