module.exports = mongoose => {
    let esquema = new mongoose.Schema({
        numero: String
    });

    return mongoose.model('Loteria',esquema);
}