const User = require("../models/user");
const Follow = require("../models/follow");
const Publication = require("../models/publication");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserController = {
    
    saveUser: (req, res)=>{
        const data = req.body;
        const newUser = new User();
        
        if(data.name && data.surname && data.nick && data.email && data.password){
    
            newUser.name = data.name;
            newUser.surname = data.surname;
            newUser.nick = data.nick;
            newUser.email = data.email;
    
            User.find({ $or: [{email: newUser.email.toLowerCase()}, {nick: newUser.nick.toLowerCase()}] })
          
                .exec((err, users)=>{
                            
                    if(users && users.length >= 1){
                        return res.json({message: "El usuario que intentas registrar ya existe"});
                    }
                    else
                    {
                        //Crear token
                        jwt.sign({id: newUser.id}, "textoSecretoCodificador", {
                            expiresIn: 60 * 60 * 24
                        });
    
                        //Hashear la contraseña
                        bcrypt.hash(data.password, 8, (err, hash)=>{
                            
                            if(err) return res.send("error en hash");
    
                            if(hash){
                                newUser.password = hash;
    
                                //Guardar el usuario
                                newUser.save((err, userSaved)=>{
    
                                if(err) res.send(err);
    
                                if(userSaved) res.send(userSaved);
    
                                });
                            }
                        });
    
                    }
                });
    
        }
        else
        {
            res.send("Agrega todos los campos necesarios.");
        }
    
    },
    
    loginUser: (req, res)=>{
        const data = req.body;
        const dataEmail = data.email;
        const dataPassword = data.password;
    
        User.findOne({ email: dataEmail }, (err, user)=>{ //Agregar callback con , es lo mismo que usar exec
    
            if(err) return res.send("error1");
    
            if(user){
    
                bcrypt.compare(dataPassword, user.password, (err, check)=>{
    
                    if(check){
                        
                        if(data.getToken)
                        {//Si hay un boolean getToken true
                            const token = jwt.sign({id: user.id}, "textoSecretoCodificador", {
                                expiresIn: 60 * 60 * 24
                            });
        
                            return res.json({token: token});
                        }
                        else
                        {
                            return res.send(user);
                        }
                    }
    
                    if(err) return res.send(err);
    
                });
    
            }
            else
            {
                if(err) return res.send("error3");
            }
    
        });
        
    },

    getUser: async(req, res)=>{

        if(req.params.id){
            const myUserId = req.usuarioId;
            const otherUserId = req.params.id;

            var user = await User.findById(otherUserId , {password:0}, (err, user)=>{

                if(err) res.send("Error al ingresar al perfil");
                if(!user) res.send("No se puede ingresar al perfil");
                return user;

            }).clone().catch(function(err){ console.log(err)});

            var following = await Follow.findOne({user: myUserId, followed: otherUserId}, (err, follow)=>{
                if(err) res.send("Error al ingresar al perfil");
                return follow;
            }).clone().catch(function(err){ console.log(err)});//Como se ejecuta el mismo objeto usuario 2 veces es necesario agregar la funcion clone() y un catch()

            var followed = await Follow.findOne({user: otherUserId, followed: myUserId}, (err, follow)=>{
                if(err) res.send("Error al ingresar al perfil");
                return follow;
            }).clone().catch(function(err){ console.log(err)});

            res.send({user, following, followed});
        }
        else
        {
            const data = req.usuarioId;
            User.findById(data , {password:0}, (err, user)=>{
    
                if(err) res.send("No se puede ingresar al perfil");
                if(user) res.send({user});
            });
        }

    },

    getUsers: (req, res)=>{
        const pageData = parseInt(req.query.page, 10) || 1;
        const limitData = parseInt(req.query.limit, 10) || 4;
        const userid = req.usuarioId;

        User.paginate({}, {limit: limitData, page: pageData}, async(err, users)=>{
            //exec() es exclusivo de mongoose y para devolver arrays se usa then()
            var following = await Follow.find({user: userid}).select({"_id": 0, "__v": 0, "user": 0}).exec().then((follows)=>{
                var following_clean = [];
        
                follows.forEach((follow)=>{
                    following_clean.push(follow.followed);
                });
        
                return following_clean;
            });
        
            var followed = await Follow.find({followed: userid}).select({"_id": 0, "__v": 0, "followed": 0}).then((follows)=>{
                var followed_clean = [];
        
                follows.forEach((follow)=>{
                    followed_clean.push(follow.user);
                });
        
                return followed_clean;
            });
            
            res.send({users, following, followed});
            
        });


    },

    getProfileOnly: (req, res)=>{

        if(req.params.id){
            const id = req.params.id;

            User.findById(id , {password:0}, (err, user)=>{
    
                if(err) res.send("No se puede ingresar al perfil");
                if(user) res.send({user});
            });
        }
        else
        {
            const data = req.usuarioId;
            User.findById(data , {password:0}, (err, user)=>{
    
                if(err) res.send("No se puede ingresar al perfil");
                if(user) res.send({user});
            });
        }

    },

    getProfilesOnly: (req, res)=>{

        const pageData = parseInt(req.query.page, 10) || 1;
        const limitData = parseInt(req.query.limit, 10) || 4;

        const users = User.paginate({}, {limit: limitData, page: pageData}, (err, users)=>{
            res.json(users);
        });

    },

    updateUser: async(req, res)=>{
        
        const id = req.usuarioId;
        const dataUpdate = req.body;
        delete dataUpdate.password;

        if(req.file){
            dataUpdate.imagePath = req.file.filename || "";
        }

        User.find({ $or: [{nick: dataUpdate.nick.toLowerCase()}, {email: dataUpdate.email.toLowerCase()}] }, (err, users)=>{

            var sameData = false;
            users.forEach((user)=>{
                if(user._id != id) sameData = true;
            });

            if(sameData) return res.status(404).send({message: 'Los datos ya estan en uso'});

            User.findByIdAndUpdate(id, dataUpdate, {new: true}, (err, userUpdated)=>{

                if(err) return res.status(500).send({
                    message: 'no tienes permiso para actualizar ese usuario'
                })
                 if(!userUpdated) return res.status(404).send({
                     message: 'no sea podido actualizar el usuario'
                })

                return res.status(200).send(userUpdated)

            }); //new: debe ser true para que nos pueda defolver el valor actualizado por consola
            
        });

    },

    uploadImage: (req, res)=>{

        const id = req.usuarioId;
        const NewimagePath = req.file.filename;

        if (NewimagePath)
        {
            User.findByIdAndUpdate(id, (err, user)=>{
                user.imagePath = NewimagePath;

                user.save((err, userSaved)=>{
                    if(err) res.send("La foto no se pudo actualizar");
                    if(userSaved) res.send("La imagen se actualizó");
                });
            });
        }
        else
        {
            res.send("No hay una nueva imagen");
        }
        
    },

    getCounters: (req, res)=>{
        const userid = req.usuarioId;

        getCountFollow(userid).then((value)=>{
            res.send(value);
        });;
    }

}

async function getCountFollow(user_id) {
    var following = await Follow.count({user: user_id}, (err, count)=>{
        if(err) return res.send(err);

        return count;
    }).clone().catch(function(err){ console.log(err)});

    var followed = await Follow.count({followed: user_id}, (err, count)=>{
        if(err) return res.send(err);

        return count;
    }).clone().catch(function(err){ console.log(err)});

    var publications = await Publication.count({user: user_id}, (err, count)=>{
        if(err) return res.send(err);

        return count;
    }).clone().catch(function(err){ console.log(err)});

    return {
        following_count: following,
        followed_count: followed,
        publications_count: publications
    }
}

module.exports = UserController;