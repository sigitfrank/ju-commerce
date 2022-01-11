import React, { useState } from 'react'
import Modal from 'react-modal';
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
        width: '50vw'
    },
};

function DetailProduct() {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [ediatable, setEdiatable] = useState(false)
    function openModal() {
        setIsOpen(true);
    }
    function afterOpenModal() {

    }
    function closeModal() {
        setIsOpen(false);
    }
    return (
        <div>
            <button onClick={openModal}>Open Modal</button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Detail Product"
            >
                <div className="row">
                    <div className="col-lg-6">
                        <img className='img-fluid' src="https://dynamic.zacdn.com/DUtm84aNQgzUT6OtfdW83PfrkBw=/fit-in/346x500/filters:quality(90):fill(ffffff)/https://static-id.zacdn.com/p/hm-4881-8613572-1.jpg" alt="hoodie" />
                    </div>
                    <div className="col-lg-6"
                    >
                        {
                            ediatable ? <FormEdit /> : <DetailInfo />
                        }
                        <div className="button-wrapper mt-3">
                            {
                                ediatable && <button className="btn secondary me-1">
                                    Update
                                </button>
                            }
                            <button className='btn primary ms-1' onClick={() => setEdiatable(prev => !prev)}>{ediatable ? 'Cancel' : 'Edit'}</button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default DetailProduct

const DetailInfo = () => {
    return <div className="info">
        <p>SKU: 81929a29ads921</p>
        <p>Name: Hoodie Black Men's 2022</p>
        <p>Price: IDR 5000</p>
        <hr />
        <p>Description:</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi nostrum error quia harum, est explicabo quidem aspernatur porro a rem fugiat quos optio provident. Non aliquam saepe sint iste deleniti.</p>
    </div>
}

const FormEdit = () => {
    return <form className="">
        <div className="form-group mb-3">
            <label htmlFor="name">Name</label>
            <input type="text" name='name' className='form-control' />
        </div>
        <div className="form-group mb-3">
            <label htmlFor="price">Price</label>
            <input type="text" name='price' className='form-control' />
        </div>
        <div className="form-group mb-3">
            <label htmlFor="description">Description</label>
            <input type="text" name='description' className='form-control' />
        </div>
        <div className="form-group mb-3">
            <label htmlFor="image">Image</label>
            <input type="file" name='image' className='form-control' />
        </div>
    </form>
}
