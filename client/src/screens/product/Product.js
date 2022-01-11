import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import '../../css/product.css'
import { getLocalStorage } from '../../helpers/localStorage'
import AppStore from '../../store/store'
import DetailProduct from './DetailProduct'
function Product() {
    const { setProductModalDetail, getProducts, products, getProductDetail } = AppStore
    const { accessToken } = getLocalStorage()

    useEffect(() => {
        getProducts(accessToken)
    }, [getProducts, accessToken])

    const handleProductDetail = (productId, showModal) => {
        setProductModalDetail(showModal)
        getProductDetail({ accessToken, id: productId })
    }

    return (
        <>
            <div className='container product-gallery' style={{ height: '75vh', overflow: 'auto' }}>
                <div className="row">
                    {
                        products && products.map(product => {
                            return <div className="col-lg-4" key={product.id} style={{ cursor: 'pointer' }}>
                                <div className="card">
                                    <div className="card-header text-center">
                                        {
                                            product.image ? <img src={`data:image/jpeg;base64,${product.image}`} alt={product.name} onClick={() => handleProductDetail(product.id, true)} /> : <img src="https://esmokeoutlet.com/assets/front/fashi/img/products/default.png" alt="product" />
                                        }
                                    </div>
                                    <div className="card-body">
                                        <p className="card-title">
                                            {product.name}
                                        </p>
                                        <p className="card-description">
                                            {product.description || '-'}
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

