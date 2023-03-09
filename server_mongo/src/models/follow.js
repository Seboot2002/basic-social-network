const {Schema, model} = require("mongoose");
const paginate = require("mongoose-paginate-v2");

const FollowSchema = new Schema({
    user: { type: Schema.ObjectId, ref: "User"},
    followed: { type: Schema.ObjectId, ref: "User"}
});

FollowSchema.plugin(paginate);

module.exports = model("Follow", FollowSchema);