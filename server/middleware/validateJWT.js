const validateJWT = (decoded, request, h)=>{
     if (!decoded.email) {
        return { isValid: false };
      }
      else {
        return { isValid: true };
      }
}

module.exports = validateJWT