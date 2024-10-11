//Path: your-app-name\backend\models\album.model.js

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//This might need to be changed when using an API
const albumSchema = new Schema({
    username: { type: String, required: true },
    albumName: { type: String, required: true },
    artist: {type : String, required: true},
    duration: { type: Number, required: true },
    releaseDate: { type: Date, required: true },
    nrOfSongs: {type: Number, required: true},
    //releaseType: { type: String, enum: ['Album', 'EP', 'Single'], default: 'Album' },
    //listeningPriority: { type: Number, min: 1, max: 5, required: true },
}, {
    timestamps: true,
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;