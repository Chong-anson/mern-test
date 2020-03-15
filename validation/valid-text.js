const validText = str => {
    return typeof str === 'string' && str.trim().length > 0 
    // trim() takes out all the spaces  
}

module.exports = validText; 