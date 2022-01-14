import checkFileType from "./checkFileType"

const changeImage = ({ e, refEl }) => {
    const imageFile = e.target.files[0]
    const imageUrl = URL.createObjectURL(imageFile)
    const fileType = imageFile.type
    const isMimetypeValid = checkFileType(fileType)
    if (!isMimetypeValid) return { isValid: false, message: 'Only image/jpeg or image/png', imageFile: null }
    refEl.current.src = imageUrl
    refEl.current.classList.remove('d-none')
    return { isValid: true, message: 'Image is allowed', imageFile }
}

export default changeImage