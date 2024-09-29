import { collection, getDocs, getFirestore } from 'firebase/firestore'
import { Menu, ShoppingCart, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { app } from '../../../config/firebaseConfig'

export default function PlantShop() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);

  const db = getFirestore(app)
  const productCollectionRef = collection(db, 'products')

  useEffect(() => {
    const getProducts = async () => {
      const data = await getDocs(productCollectionRef)
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getProducts()
  }, [productCollectionRef])

  return (
    <div className="min-h-screen bg-green-50">
      <nav className="bg-green-600 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">DF-Plantas</h1>
          <div className="flex items-center">
            <button
              type="button"
              className="text-white lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className={`lg:flex ${isMenuOpen ? 'block' : 'hidden'} mt-4 lg:mt-0`}>
              <a href="#l" className="block lg:inline-block text-white hover:text-green-200 mt-2 lg:mt-0 lg:ml-4">Início</a>
              <a href="#l" className="block lg:inline-block text-white hover:text-green-200 mt-2 lg:mt-0 lg:ml-4">Produtos</a>
              <a href="#l" className="block lg:inline-block text-white hover:text-green-200 mt-2 lg:mt-0 lg:ml-4">Sobre</a>
              <a href="#l" className="block lg:inline-block text-white hover:text-green-200 mt-2 lg:mt-0 lg:ml-4">Contato</a>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto mt-8 p-4">
        <h2 className="text-3xl font-bold mb-6 text-green-800">Nossas Plantas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          <ul>
            {products.map((product) => (
              <li key={product.id}>
                {/* <img src={plant.image} alt={plant.name} className="w-full h-48 object-cover" /> */}
                <h3 className="text-green-700 text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-green-600 font-bold">{product.category}</p>
                <p className="text-green-600 font-bold">{product.price}</p>
                <button 
                  type="button" 
                  className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
                >
                  Comprar
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <footer className="bg-green-800 text-white mt-12 py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Plant Shop - The Largest in the Country. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}