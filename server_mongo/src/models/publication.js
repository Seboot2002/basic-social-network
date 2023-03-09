const {Schema, model} = require("mongoose");
const paginate = require("mongoose-paginate-v2");

const PublicationSchema = new Schema({
    text: String,
    imagePath: String,
    created_at: String,
    user: { type: Schema.ObjectId, ref: "User"}
});

PublicationSchema.plugin(paginate);

module.exports = model("Publication", PublicationSchema);