import { addDoc, collection, getFirestore } from 'firebase/firestore'
import { useState } from "react";
import { app } from '../../config/firebaseConfig'
import Background from "../components/Background";
import Title from "../components/Title";

function RegisterProduct() {
  const [name, setName] = useState()
  const [price, setPrice] = useState()
  const [category, setCategory] = useState()

  const db = getFirestore(app)
  const productCollectionRef = collection(db, 'products')

  async function createProduct() {
    const product = await addDoc(productCollectionRef, {
      name,
      price,
      category
    })
    console.log(product);
  }

  return (
    <div className='h-screen flex flex-col items-center bg-background'>
      <Background />
      <form>
        <Title>Cadastre suas Plantas</Title>

        <div className="my-5 flex flex-col">
          <label className="text-white mr-1" htmlFor="name">Nome:</label>
          <input className="text-black rounded-lg p-1" placeholder="Tulipas" type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="my-5 flex flex-col">
          <label className="text-white mr-2" htmlFor="price">Preço:</label>
          <input className="text-black rounded-lg p-1" placeholder="15" type="price" name="price" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div className="my-5 flex flex-col">
          <label className="text-white mr-4" htmlFor="Category">Categoria:</label>
          <input className="text-black rounded-lg p-1" placeholder="Plantas com Flores" type="text" name="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>
        <button className="w-full text-2xl rounded-lg" type="button" onClick={createProduct}>Cadastrar</button>
      </form>
    </div>
  );
}

export default RegisterProduct;
