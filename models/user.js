module.exports = mongoose => {
    let esquema = new mongoose.Schema({
        user: String,
        password: String,
        token: String,
    });

    return mongoose.model('Users',esquema);
}