import { addDoc, collection, doc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { db, storage } from '../../config/firebaseConfig'
import Background from "../components/Background";
import Title from "../components/Title";

function RegisterProduct() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [image, setImage] = useState('')
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [confirmDivVisible, setConfirmDivVisible] = useState(false)
  const [confirmationData, setConfirmationData] = useState({})
  const [registeredProduct, setRegisteredProduct] = useState(null)

  const navigate = useNavigate()

  const confirmProducts = (event) => {
    event.preventDefault()

    const formData = {
      name,
      price,
      category,
      imageName: image ? image.name : ''
    }
    setConfirmationData(formData)
    setConfirmDivVisible(true)
    console.log(formData);
  }

  const handleUpload = () => {
    if (!image) return alert('Por favor, selecione uma imagem')
    if (!image.type.includes('image')) return alert('Só é permitido imagens')
    if (image.size > 1024 * 1024 * 2) {
      alert(`A imagem não pode ser maior do que 2MB. Imagem selecionada tem: ${(file.size / 1024 / 1024).toFixed(3)} +  MB`)
      return
    }

    const imgName = createUniqueFileName(image)
    const storageRef = ref(storage, `${category}/${imgName}`)
    const uploadTask = uploadBytesResumable(storageRef, image)

    setUploading(true)

    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setProgress(progress)
      },
      error => {
        alert(error)
        setUploading(false)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          createProduct(url)
        })
      }
    )
  }

  const createUniqueFileName = (file) => {
    const uniqueID = doc(collection(db, 'products')).id
    return `${uniqueID} - ${file.name}`
  }

  async function createProduct(imageURL) {
    try {
      let productCollectionRef

      if (category === 'plants') {
        productCollectionRef = collection(db, 'plants')
      } else if (category === 'vases') {
        productCollectionRef = collection(db, 'vases')
      } else {
        productCollectionRef = collection(db, 'other_products')
      }

      const product = await addDoc(productCollectionRef, {
        name,
        price,
        category,
        image: imageURL
      })

      setRegisteredProduct(product);
      resetInputs()
      setUploading(false)
      setConfirmDivVisible(false)
    } catch (error) {
      alert(error)
    }
  }

  function resetInputs() {
    setName('')
    setPrice('')
    setCategory('')
    setImage('')

    setTimeout(() => {
      setRegisteredProduct(null)
    }, 4000);
  }

  return (
    <div className='h-screen p-4 bg-secondaryBackground flex flex-col overflow-y-auto md:items-center'>
      <Background />
      <Title>Cadastre suas Plantas</Title>

      <form className='pb-2 flex flex-col relative' onSubmit={(e) => confirmProducts(e)}>
        <label className='text-white ml-4' htmlFor="name">Nome:</label>
        <input className='input-c ml-4' placeholder="Tulipas" type="text" name="name" value={name} required onChange={(e) => setName(e.target.value)} />

        <label className='text-white ml-4' htmlFor="price">Preço:</label>
        <input className='input-c ml-4' placeholder="15" type="number" name="price" value={price} required onChange={(e) => setPrice(e.target.value)} />

        <label className='text-white ml-4' htmlFor="Category">Categoria:</label>
        <select
          className='input-c ml-4'
          name="Category"
          value={category}
          required
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Selecione a categoria</option>
          <option value="plants">Plantas</option>
          <option value="vases">Vasos</option>
          <option value="other_products">Outros Produtos</option>
        </select>

        <label className='text-white ml-4' htmlFor="Image">Imagem:</label>
        <input className='input-c ml-4 cursor-pointer' type="file" name='Image' accept='image/' required onChange={(e) => setImage(e.target.files[0])} />


        {!uploading ? '' : <progress className='progress-custom w-96' value={progress} max="100" />}
        {registeredProduct &&
          <p className='p mb-0 text-center'>{registeredProduct.name} registrado com sucesso!</p>
        }

        <button className='btn-primary' type="submit">Cadastrar</button>
      </form>

      {confirmDivVisible && (
        <div className='p-4 rounded-lg bg-primaryBackground fixed top-72' id="confirmDiv">
          <h3 className='h3-c'>Verificar Dados do Produto</h3>
          <p>Nome: {confirmationData.name}</p>
          <p>Preço: R$ {confirmationData.price}</p>
          <p>Categoria: {confirmationData.category}</p>
          <p>Imagem: {confirmationData.imageName}</p>
          <button className='btn-third mx-4 mt-2 text-xs' type="button" id="confirm-btn" onClick={(e) => handleUpload(e)}>
            Confirmar Dados
          </button>
          <button className='btn-third mx-4 text-xs' type="button" id="cancel-btn" onClick={() => setConfirmDivVisible(false)}>
            Cancelar
          </button>
        </div>
      )}


      <button className='btn-third' type="button" onClick={() => navigate("/loja")}>Ir para a loja</button>
    </div>
  );
}

export default RegisterProduct;
