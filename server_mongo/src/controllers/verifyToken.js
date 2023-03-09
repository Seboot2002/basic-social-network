const jwt = require("jsonwebtoken");

function verifyToken(req, res, next){

    //const token = req.headers.authorization.replace(/['"]+/g, '');
    const token = req.headers['authorization']

    if(!token){
        res.send("No existe un token");
    }

    const decoded = jwt.verify(token, "textoSecretoCodificador", (err, decoded)=>{
        
        if(err){
            return res.status(401).send('Token expirado');
        }
        else
        {
            req.usuarioId = decoded.id; //Agregamos los datos por el objeto request con un metodo personalisado para que todas las rutas puedan usarlo
            next(); //Pasamos a otra funcion
        }
    });

}

module.exports = verifyToken;