import React, { useEffect, useState } from 'react'
import { getProducts } from '../network/ProductService'

export default function ProductsPage() {
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState('')
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        async function product() {
            try {
                const response = await getProducts({ category, search })
                setProducts(response.data)
                setLoading(false)
            } catch (error) {
                console.log(error)
                setLoading(false)
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

            <div className='mainContainer'>
                <div>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Sve kategorije</option>
                        <option value="Laptopovi i oprema">Laptopovi i oprema</option>
                        <option value="Računarske komponente">Računarske komponente</option>
                        <option value="Eksterni punjači, adapteri i baterije">Punjači</option>
                    </select>
                </div>

                {loading ? (
                    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (<>
                    {products.length > 0 ? (
                        <div className='cardProductsContainer'>
                            {products.map((product, index) => (
                                <div key={index} className="productCard">
                                    <img src={product.imgsrc} alt={product.naziv} width="100" />
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            <strong>{product.naziv}</strong>
                                        </h5>
                                        <p className="card-text">{product.price.toFixed(2)} RSD</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className='noProducts'
                        >Nema proizvoda.
                        </div>
                    )}
                </>
                )}
            </div>
        </div>
    )

}
