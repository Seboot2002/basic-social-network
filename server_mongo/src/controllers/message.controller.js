const moment = require("moment");

const User = require("../models/user");
const Follow = require("../models/follow");
const Message = require("../models/message");

const MessageController = {

    saveMessage: (req, res)=>{
        const data = req.body;

        if(!data.text || !data.receiver) return res.send("Rellena los campos necesarios");
        
        const newMessage = new Message();
        newMessage.emitter = req.usuarioId;
        newMessage.receiver = data.receiver;
        newMessage.text = data.text;
        newMessage.created_at = moment().unix();
        newMessage.viewed = "false";

        newMessage.save((err, messageSaved)=>{
            if(err) return res.send("Error en la peticion");
            if(!messageSaved) return res.send("Error al enviar el mensaje");

            return res.send({message: messageSaved});
        });
    },

    getReceivedMessages: (req, res)=>{
        const userid = req.usuarioId;

        var page = parseInt(req.query.page, 10) || 1;
        var itemsPerPage = parseInt(req.query.items, 10) || 4;

        Message.paginate({receiver: userid}, {items: itemsPerPage, page: page, populate: [{path: "emitter", select: "name surname nick imagePath _id"}, {path: "receiver", select: "name surname nick imagePath _id"}], sort: "-created_at"}, (err, messages)=>{
            if(err) return res.send("Error en la peticion");
            if(!messages) return res.send("No hay mensaje");

            return res.send(messages);
        });
    },

    getEmitMessages: (req, res)=>{
        const userid = req.usuarioId;

        var page = parseInt(req.query.page, 10) || 1;
        var itemsPerPage = parseInt(req.query.items, 10) || 4;

        Message.paginate({emitter: userid}, {items: itemsPerPage, page: page, populate: [{path: "emitter", select: "name surname nick imagePath _id"}, {path: "receiver", select: "name surname nick imagePath _id"}], sort: "-created_at"}, (err, messages)=>{
            if(err) return res.send("Error en la peticion");
            if(!messages) return res.send("No hay mensaje");

            return res.send(messages);
        });
    },

    getUnviewedMessages: (req, res)=>{
        const userid = req.usuarioId;

        Message.count({receiver: userid, viewed: "false"}, (err, count)=>{
            if(err) return res.send("Error en la peticion");
            if(!count) return res.send("No tienes mensajes no leidos");

            return res.send({unviewed: count});
        });
    },

    setViewedMessages: (req, res)=>{
        const userid = req.usuarioId;

        Message.updateMany({receiver: userid, viewed: "false"}, {viewed: "true"}, (err, messages)=>{
            if(err) return res.send("Error en la peticion");
            if(!messages) return res.send("No tienes mensajes leidos");

            return res.send({messages: messages});
        });
    }

}

module.exports = MessageController;