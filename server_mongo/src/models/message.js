const {Schema, model} = require("mongoose");
const paginate = require("mongoose-paginate-v2");

const MessageSchema = new Schema({
    text: String,
    viewed: String,
    created_at: String,
    emitter: { type: Schema.ObjectId, ref: "User" },
    receiver: { type: Schema.ObjectId, ref: "User"}
});

MessageSchema.plugin(paginate);

module.exports = model("Message", MessageSchema);