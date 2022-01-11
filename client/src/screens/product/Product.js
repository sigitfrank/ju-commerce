import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import '../../css/product.css'
import { getLocalStorage } from '../../helpers/localStorage'
import AppStore from '../../store/store'
import DetailProduct from './DetailProduct'
import DOMPurify from 'dompurify'
function Product() {
    const { setProductModalDetail, getProducts, products, getProductDetail } = AppStore
    const { accessToken } = getLocalStorage()

    useEffect(() => {
        getProducts(accessToken)
    }, [getProducts, accessToken])

    const handleProductDetail = (productId, showModal) => {
        console.log(productId, showModal)
        setProductModalDetail(showModal)
        getProductDetail({ accessToken, id: productId })
    }

    const renderImg = (product)=>{
        if(!product.image) return ''
        const isHttp = product.image.includes('http')
        if(isHttp) return <img src={product.image} alt="product"  onClick={() => handleProductDetail(product.id, true)}/>
        return <img src={`data:image/jpeg;base64,${product.image}`} alt="product" onClick={() => handleProductDetail(product.id, true)} />
    }

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

                </div>
            </div>
            <DetailProduct />
        </>
    )
}

export default observer(Product)

