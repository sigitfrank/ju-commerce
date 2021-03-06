import { observer } from 'mobx-react'
import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/layout/Header'
import changeImage from '../../helpers/changeImage'
import checkFileType from '../../helpers/checkFileType'
import { getLocalStorage } from '../../helpers/localStorage'
import ProductStore from '../../store/productStore'

function AddProduct() {
    const navigate = useNavigate()
    const { createProduct, setCreateProduct, postCreateProduct } = ProductStore
    const imageEl = useRef(null)
    const { accessToken } = getLocalStorage()

    const handleChangeImage = (e) => {
        const { isValid, imageFile, message } = changeImage({ e, refEl: imageEl })
        if (!isValid) return alert(message)
        setCreateProduct(imageFile, 'image')
    }

    const handleCreateProduct = async () => {
        const res = await postCreateProduct(accessToken)
        if (!res) return
        navigate('/')
    }
    return (<>
        <Header />
        <div className="container" style={{
            padding: '1rem'
        }}>
            <div className="row">
                <div className="col-lg-6">
                    <img ref={imageEl} className='img-fluid h-100' src="https://esmokeoutlet.com/assets/front/fashi/img/products/default.png" alt="product" />
                </div>
                <div className="col-lg-6"
                >
                    <form className="">
                        <div className="form-group mb-3">
                            <label htmlFor="name">Name</label>
                            <input value={createProduct.name} onChange={(e) => setCreateProduct(e.target.value, 'name')} type="text" name='name' className='form-control' />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="price">Price</label>
                            <input value={createProduct.price} onChange={(e) => setCreateProduct(e.target.value, 'price')} type="text" name='price' className='form-control' />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="description">Description</label>
                            <input value={createProduct.description} onChange={(e) => setCreateProduct(e.target.value, 'description')} type="text" name='description' className='form-control' />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="image">Image</label>
                            <input onChange={(e) => handleChangeImage(e)} type="file" name='image' className='form-control' />
                        </div>
                    </form>
                    <div className="button-wrapper mt-3">
                        <button className="btn secondary me-1" onClick={handleCreateProduct}>
                            Add Product
                        </button>

                        <button className='btn primary ms-1' onClick={() => navigate('/')}>Back</button>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default observer(AddProduct)
