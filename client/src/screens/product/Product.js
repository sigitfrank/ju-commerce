import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import '../../css/product.css'
import { getLocalStorage } from '../../helpers/localStorage'
import AppStore from '../../store/store'
import DetailProduct from './DetailProduct'
import DOMPurify from 'dompurify'


function Product() {
    const { setProductModalDetail, getProducts, products, getProductDetail, offset, setOffset, isLoading } = AppStore
    const { accessToken } = getLocalStorage()

    useEffect(() => {
        getProducts({ accessToken, offset })
    }, [getProducts, accessToken, offset])

    const handleProductDetail = (productId, showModal) => {
        setProductModalDetail(showModal)
        getProductDetail({ accessToken, id: productId })
    }
    const renderImg = (product) => {
        if (!product.image) return <img src={'https://esmokeoutlet.com/assets/front/fashi/img/products/default.png'} alt="product" onClick={() => handleProductDetail(product.id, true)} />
        const isHttp = product.image.includes('http')
        if (isHttp) return <img src={product.image} alt="product" onClick={() => handleProductDetail(product.id, true)} />
        return <img src={`data:image/jpeg;base64,${product.image}`} alt="product" onClick={() => handleProductDetail(product.id, true)} />
    }

    useEffect(() => {
        const handleScroll = (event) => {
            const element = event.target.scrollingElement;
            if (element.scrollTop + element.clientHeight == element.scrollHeight) {
                setOffset()
            }
        }
        document.addEventListener('scroll', handleScroll)
        return () => document.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <>
            <div className='container product-gallery'>
                <div className="row">
                    {
                        products && products.map(product => {
                            return <div className="col-lg-4" key={product.id} style={{ cursor: 'pointer' }}>
                                <div className="card">
                                    <div className="card-header text-center">
                                        {renderImg(product)}
                                    </div>
                                    <div className="card-body">
                                        <p className="card-title">
                                            {product.name}
                                        </p>
                                        <p className="card-description"
                                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description || '-') }}
                                        >
                                        </p>
                                    </div>
                                </div>
                            </div>
                        })
                    }

                    {isLoading && <p className='text-center fw-bold'>Loading...</p>}

                </div>
            </div>
            <DetailProduct />
        </>
    )
}

export default observer(Product)

