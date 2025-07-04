import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProductById } from '../network/ProductService'

export default function ProductDetailPage() {
    const { sku } = useParams()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        setLoading(true)
        const fetchProduct = async () => {
            try {
                console.log("sku", sku)
                const response = await getProductById(sku);
                setProduct(response.data);
                setLoading(false)
            } catch (err) {
                if (err.response?.status === 404) {
                    setError('Proizvod nije pronađen.');
                    setLoading(false)
                } else {
                    setError('Greška prilikom učitavanja.');
                    setLoading(false)
                }
            }
        };
        console.log('Current product state:', product);

        fetchProduct();
    }, [sku]);

    return (
        <>
            <div className='headerContainerLogin'>
                <h3>KONOVO</h3>
            </div>
            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className='mainContainerDetailPage'>
                    <div className="productDetailsContent">
                        <div className="productImage">
                            <img src={product.imgsrc} alt={product.naziv} />
                        </div>
                        <div className="productInfo">
                            <h2>{product.naziv}</h2>
                            <p className="productPrice">{product?.price?.toFixed(2)} RSD</p>
                            <h5>Opis proizvoda</h5>
                            <div dangerouslySetInnerHTML={{ __html: product.description }} />
                        </div>
                    </div>
                </div>
            )
            }
        </>
    )
}
