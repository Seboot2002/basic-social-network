const path = require("path");
const moment = require("moment");

const User = require("../models/user");
const Follow = require("../models/follow");
const Publication = require("../models/publication");

const PublicationController = {

    savePublication: (req, res)=>{

        const data = req.body;
        data.imagePath = req.file.filename || "";

        const newPublication = new Publication();
        newPublication.text = data.text;
        newPublication.user = req.usuarioId;
        newPublication.created_at = moment().unix();
        newPublication.imagePath = data.imagePath;

        newPublication.save((err, publicationSaved)=>{
            if(err) return res.send("Error en publicacion");
            if(!publicationSaved) return res.send("La publicacion no fue guardada");

            return res.send({publication: publicationSaved});
        });
    },

    getPublication: (req, res)=>{
        const publication_id = req.params.id;

        Publication.find({user: req.usuarioId, _id: publication_id}, (err, publication)=>{
            if(err) return res.send("Error en publicacion");
            if(!publication) return res.send("La publicacion no fue encontrada");

            return res.send({publication});
        });
    },

    getPublications: (req, res)=>{
        var page = parseInt(req.query.page, 10) || 1;
        var itemsPerPage = parseInt(req.query.items, 10) || 4;

        Follow.find({user: req.usuarioId}, {page: page, limit: itemsPerPage}).populate("followed").exec((err, follows)=>{
            if(err) return res.send("Error en follows");
            if(!follows) return res.send("No hay follows");

            var followed_clean = [];

            follows.forEach(follow => {
                followed_clean.push(follow.followed);
            });

            followed_clean.push(req.usuarioId);

            //El $in permite entrar en un array y sacar todas las posible coincidencias dentro de la variable user
            Publication.paginate({user: {"$in": followed_clean}}, {page: page, limit: itemsPerPage, sort: "-created_at", populate: "user"}, (err, publications)=>{
                if(err) return res.send("Error en publicaciones");
                if(!publications) return res.send("No hay publicaciones");

                return res.send({publications});
            });

        });

    },

    getPublicationsUser: (req, res)=>{
        var page = parseInt(req.query.page, 10) || 1;
        var itemsPerPage = parseInt(req.query.items, 10) || 4;
        var userId = req.params.id;

        if(req.params.id){
            Publication.paginate({user: userId}, {page: page, limit: itemsPerPage, sort: "-created_at", populate: "user"}, (err, publications)=>{
                if(err) return res.send("Error en publicaciones");
                if(!publications) return res.send("No hay publicaciones");
    
                return res.send({publications});
            });
        }
        else
        {
            Publication.paginate({user: req.usuarioId}, {page: page, limit: itemsPerPage, sort: "-created_at", populate: "user"}, (err, publications)=>{
                if(err) return res.send("Error en publicaciones");
                if(!publications) return res.send("No hay publicaciones");
    
                return res.send({publications});
            });
        }


    },

    uploadImage: (req, res)=>{
        const userid = req.usuarioId;
        const publi_id = req.params.id;
        const NewimagePath = req.file.filename;

        if(NewimagePath)
        {
            Publication.find({user: userid, _id: publi_id}, (err, publication)=>{

                if(publication)
                {
                    publication.imagePath = NewimagePath;
    
                    publication.save((err, publicationUpdated)=>{
    
                        if(err) return res.send("Error en actualizar imagen");
                        if(publicationUpdated) return res.send("Imagen actualizada");
    
                    });
                }
                else
                {
                    return res.send("No tienes permiso");
                }

            });
        }
    },

    deletePublication: (req, res)=>{
        const publication_id = req.params.id;

        Publication.find({user: req.usuarioId, _id: publication_id}).remove((err)=>{
            if(err) return res.send("Error en eliminar publicaciones");

            return res.send({message: "Publicacion eliminada"});

        });

    }

}

module.exports = PublicationController;