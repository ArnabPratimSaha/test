const mongoose=require('mongoose');


const movieSchema = new mongoose.Schema({
    index: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    poster:{ type:String },
    year: { type: String },
    description: { type: String },
    genres: { type: Array, default: () => [], maxlength: 200 },
    languages: { type: Array, default: () => [], maxlength: 200 },
    runtime: { type: String },
    casts:[{ name:String,pic:String}]
});



const movieModel = mongoose.model('Movies', movieSchema);
module.exports={movieModel};