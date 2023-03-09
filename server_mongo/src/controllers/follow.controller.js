const path = require("path");

const User = require("../models/user");
const Follow = require("../models/follow")

const FollowController = {

    saveFollow: (req, res)=>{
        const data = req.body;
        const newFollow = new Follow();

        newFollow.user = req.usuarioId;
        newFollow.followed = data.followed;

        newFollow.save((err, followSaved)=>{
            if(err) res.send("Error al guardar seguimiento");
            if(!followSaved) res.send("El seguimiento no se ha guardado");

            return res.send({follow: followSaved});
        });
    },

    deleteFollow: (req, res)=>{
        const userid = req.usuarioId;
        const followedId = req.params.id;

        Follow.find({"user": userid, "followed": followedId}).remove(err=>{
            if(err) res.send("No se encontró el followed");

            return res.send({message: "El followed fue eliminado"});
        });
    },

    getFollowingUsers: (req, res)=>{
        const userid = req.usuarioId;
        const otherUserId = req.params.id
        var page = parseInt(req.query.page, 10) || 1;
        var itemsPerPage = parseInt(req.query.limit, 10) || 4;
        
        //populate permite recivir informacion de un objetoId del schema y sacar mostrando su informacion como un join en una tabla relacional
        Follow.paginate({user: otherUserId}, {limit: itemsPerPage, page: page, populate: "followed"}, (err, follows)=>{
            if(err) res.send("Error en follows");
            if(follows == 0) res.send("No tienes ningun follow");

            return res.send(follows);
        });
    },

    getFollowedUsers: (req, res)=>{
        const userid = req.usuarioId;
        const otherUserId = req.params.id
        var page = parseInt(req.query.page, 10) || 1;
        var itemsPerPage = parseInt(req.query.limit, 10) || 4;
        
        //populate permite recivir informacion de un objetoId del schema y sacar mostrando su informacion como un join en una tabla relacional
        Follow.paginate({followed: otherUserId}, {limit: itemsPerPage, page: page, populate: "user"}, (err, follows)=>{
            if(err) res.send("Error en follows");
            if(follows == 0) res.send("No tienes ningun follow");

            return res.send(follows);
        });
    },

    getMyFollows: (req, res)=>{
        const userid = req.usuarioId;
        const getFollowed = req.query.followed || "false";

        var find = Follow.find({user: userid});

        if(getFollowed == "true") var find = Follow.find({followed: userid});

        find.populate({path: "user followed"}).exec((err, follows)=>{
            if(err) res.send("Error en follows");
            if(!follows) res.send("No tienes ningun follow");

            return res.send(follows);
        });
    }

};

module.exports = FollowController;