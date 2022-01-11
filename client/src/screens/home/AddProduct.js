import { observer } from 'mobx-react'
import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../../components/layout/Footer'
import Header from '../../components/layout/Header'
import checkFileType from '../../helpers/checkFileType'
import { getLocalStorage } from '../../helpers/localStorage'
import AppStore from '../../store/store'

function AddProduct() {
    const navigate = useNavigate()
    const { createProduct, setCreateProduct, postCreateProduct } = AppStore
    const imageEl = useRef(null)
    const { accessToken } = getLocalStorage()

    useEffect(() => {
        if (!accessToken) navigate('/login')
    }, [accessToken])

    const handleChangeImage = (e) => {
        const imageFile = e.target.files[0]
        const imageUrl = URL.createObjectURL(imageFile)
        const fileType = imageFile.type
        const isMimetypeValid = checkFileType(fileType)
        if (!isMimetypeValid) return alert('Only image/jpeg or image/png')
        imageEl.current.src = imageUrl
        imageEl.current.classList.remove('d-none')
        setCreateProduct(imageFile, 'image')
    }

    const handleCreateProduct = ()=>{
        const res = postCreateProduct(accessToken)
        if(!res) return
        navigate('/')
    }
    return (<>
        <Header />
        <div className="container" style={{
            padding: '1rem'
        }}>
            <div className="row">
                <div className="col-lg-6">
                    <img ref={imageEl} className='img-fluid' src="https://dynamic.zacdn.com/DUtm84aNQgzUT6OtfdW83PfrkBw=/fit-in/346x500/filters:quality(90):fill(ffffff)/https://static-id.zacdn.com/p/hm-4881-8613572-1.jpg" alt="hoodie" />
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

        <Footer />
    </>)
}

export default observer(AddProduct)
