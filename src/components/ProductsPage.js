import React, { useEffect, useState } from 'react'
import { getProducts } from '../network/ProductService'
import { Link, useNavigate } from 'react-router-dom'

export default function ProductsPage() {
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState('')
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/login')
            return
        }
        async function product() {
            try {
                const response = await getProducts({ category, search })
                setProducts(response.data)
                setLoading(false)
            } catch (error) {
                console.log(error)
                setLoading(false)
                if (error.response?.status === 401) {
                    localStorage.removeItem('token')
                    navigate('/login')
                }
            }
        }
        product()
    }, [category, search])

    const onLogout = (e) => {
        e.preventDefault()

        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <div className='loginPage'>
            <div className='headerContainerLogin'>
                <div>
                    <h3>KONOVO</h3>
                </div>
                <div>
                    <input
                        className='searchProductsInput'
                        type="text"
                        placeholder="Pretraži proizvod..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className='logoutButton' onClick={onLogout}>Odjavi se</button>
                </div>
            </div>

            <div className='mainContainer'>
                <div className='categoryDropdown'>
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


                                <Link
                                    to={`/products/${product.sku}`}
                                    className="productCard"
                                    key={index}

                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                >
                                    <img src={product.imgsrc} alt={product.naziv} width="100" />
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            <strong>{product.naziv}</strong>
                                        </h5>
                                        <p className="card-text">{product.price.toFixed(2)} RSD</p>
                                    </div>
                                </Link>
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
