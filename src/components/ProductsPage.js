import React, { useEffect, useState } from 'react'
import { getProducts } from '../network/ProductService'

export default function ProductsPage() {
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState('')
    const [search, setSearch] = useState('')

    useEffect(() => {
        async function product() {
            try {
                const response = await getProducts({ category, search })
                setProducts(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        product()
    }, [category, search])

    return (
        <div className='loginPage'>
            <div className='headerContainerLogin'>
                <h3>KONOVO</h3>
                <input
                    className='searchProductsInput'
                    type="text"
                    placeholder="Pretraži proizvod..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>


            <div>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Sve kategorije</option>
                    <option value="Laptopovi i oprema">Laptopovi i oprema</option>
                    <option value="Računarske komponente">Računarske komponente</option>
                    <option value="Eksterni punjači, adapteri i baterije">Punjači</option>
                </select>



            </div>

            <div className='cardProductsContainer'>
                {products.map((product, index) => (
                    <div key={index} class="productCard" >
                        <img src={product.imgsrc} alt={product.naziv} width="100" />
                        <div class="card-body">
                            <h5 class="card-title"><strong>{product.naziv}</strong> – {product.price} RSD</h5>
                            <p class="card-text"></p>
                            <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

}
