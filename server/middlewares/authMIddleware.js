export default  function(req, res, next) {
    
    if (req.method === "OPTIONS") {
        next()
    };

    try {
        
    } catch (error) {
        console.log(error)
    }
}