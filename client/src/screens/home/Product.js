import React from 'react'
import '../../css/product.css'
import DetailProduct from './DetailProduct'
function Product() {
    return (
        <>
            <div className='container product-gallery'>
                <div className="row">
                    <div className="col-lg-4">
                        <div className="card">
                            <div className="card-header text-center">
                                <img src="https://dynamic.zacdn.com/DUtm84aNQgzUT6OtfdW83PfrkBw=/fit-in/346x500/filters:quality(90):fill(ffffff)/https://static-id.zacdn.com/p/hm-4881-8613572-1.jpg" alt="hoodie" />
                            </div>
                            <div className="card-body">
                                <p className="card-title">
                                    Hoodie Black Men's 2022
                                </p>
                                <p className="card-description">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis quia dolorum obcaecati est saepe necessitatibus doloremque exercitationem quos debitis vero.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <DetailProduct />
        </>
    )
}

export default Product
