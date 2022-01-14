import { observer } from 'mobx-react'
import React, { useRef } from 'react'
import Modal from 'react-modal'
import { getLocalStorage } from '../../helpers/localStorage'
import DOMPurify from 'dompurify'
import ProductStore from '../../store/productStore'
import changeImage from '../../helpers/changeImage'

const customStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)'
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        overflow: 'auto',
        height: '90vh'
    },
}

function DetailProduct() {
    const { accessToken } = getLocalStorage()
    const imageEl = useRef(null)
    const { getProducts, getProductDetail, offset, productModalDetail, setProductModalDetail, deleteProduct, product, setDetailProduct, putUpdateProduct, setEditable, editable } = ProductStore

    function closeModal() {
        setProductModalDetail(false)
        getProductDetail({ accessToken, id: product.id })
        getProducts({ accessToken, offset })
    }

    const handleDeleteProduct = async () => {
        const res = await deleteProduct({ accessToken, id: product.id })
        if (!res) return
        alert('Product deleted successfully')
        setProductModalDetail(false)
    }

    const handleChangeImage = (e) => {
        const { isValid, imageFile, message } = changeImage({ e, refEl: imageEl })
        if (!isValid) return alert(message)
        setDetailProduct(imageFile, 'image')
    }
    const handleToggleEditable = () => {
        getProductDetail({ accessToken, id: product.id })
        setEditable(!editable)
    }

    const renderImg = (product) => {
        if (!product.image) return <img ref={imageEl} src={'https://esmokeoutlet.com/assets/front/fashi/img/products/default.png'} alt="product" className='img-fluid' style={{ height: '500px', objectFit: 'cover' }} />
        let isHttp = ''
        if (typeof product.image !== 'object') isHttp = product.image.includes('http')
        if (isHttp) return <img ref={imageEl} src={product.image} alt="product" className='img-fluid' style={{ height: '500px', objectFit: 'cover' }} />
        return <img ref={imageEl} src={`data:image/jpeg;base64,${product.image}`} alt="product" className='img-fluid' style={{ height: '500px', objectFit: 'cover' }} />
    }
    return (
        <div>
            <Modal
                isOpen={productModalDetail}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Detail Product"
            >
                <div className="row">
                    <div className="col-lg-7 d-flex align-items-center">
                        {renderImg(product)}
                    </div>
                    <div className="col-lg-5"
                    >
                        {
                            editable ? <FormEdit product={product} handleChangeImage={handleChangeImage} /> : <DetailInfo product={product} />
                        }
                        <div className="button-wrapper mt-3">
                            <button className='btn primary mx-1' onClick={handleToggleEditable}>{editable ? 'Cancel' : 'Edit'}</button>
                            {
                                editable ? <button className="btn secondary me-1" onClick={() => putUpdateProduct(accessToken)}>
                                    Update
                                </button> : !editable &&
                                <button className="btn secondary me-1" onClick={() => handleDeleteProduct()}>
                                    Delete
                                </button>
                            }
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default observer(DetailProduct)

const DetailInfo = observer(({ product }) => {
    return <div className="info">
        <p>SKU: {product.sku}</p>
        <p>Name: {product.name}</p>
        <p>Price: IDR {product.price}</p>
        <hr />
        <p>Description:</p>
        <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(`${product.description}` || '-') }}></p>
    </div>
})

const FormEdit = observer(({ product, handleChangeImage }) => {
    const { setDetailProduct } = ProductStore
    return <form className="">
        <div className="form-group mb-3">
            <label htmlFor="name">Name</label>
            <input type="text" value={product.name} name='name' onChange={(e) => setDetailProduct(e.target.value, 'name')} className='form-control' />
        </div>
        <div className="form-group mb-3">
            <label htmlFor="price">Price</label>
            <input type="text" value={product.price} name='price' onChange={(e) => setDetailProduct(e.target.value, 'price')} className='form-control' />
        </div>
        <div className="form-group mb-3">
            <label htmlFor="description">Description</label>
            <input type="text" value={product.description} onChange={(e) => setDetailProduct(e.target.value, 'description')} name='description' className='form-control' />
        </div>
        <div className="form-group mb-3">
            <label htmlFor="image">Image</label>
            <input type="file" onChange={(e) => handleChangeImage(e)} name='image' className='form-control' />
        </div>
    </form>
})