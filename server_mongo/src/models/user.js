const {Schema, model} = require("mongoose");
const bcrypt = require("bcrypt");
const mongoosePaginate = require("mongoose-paginate-v2");

const UserSchema = new Schema({
    name: String,
    surname: String,
    nick: String,
    email: String,
    password: String,
    imagePath: String
});

//Agregamos el plugin paginate al schema
UserSchema.plugin(mongoosePaginate);

//Podemos crear metodos especificos para un nuevo elemento que creemos del schema
UserSchema.methods.encryptPassword = async(password)=>{
    const saltos = await bcrypt.genSalt(8);
    return bcrypt.hash(password, saltos);
};

UserSchema.methods.validatePassword = (password)=>{
    return bcrypt.compare(password, this.password);
};

module.exports = model("User", UserSchema);