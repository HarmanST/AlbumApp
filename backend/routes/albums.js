//Path: your-app-name\backend\routes\albums.js

const router = require('express').Router();
let Album = require('../models/album.model');

router.route('/').get((req, res) => {
    Album.find()
        .then(albums => res.json(albums))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Route for adding albums
router.route('/add').post((req, res) => {
    // Log the request body to see what is being sent
    console.log('Received POST /add with data:', req.body);

    const username = req.body.username;
    const albumName = req.body.albumName;
    const artist = req.body.artist;
    const duration = Number(req.body.duration);
    const releaseDate = Date.parse(req.body.releaseDate);
    const nrOfSongs = Number(req.body.nrOfSongs);


    const newAlbum = new Album({
        username,
        albumName,
        artist,
        duration,
        releaseDate,
        nrOfSongs,
    });

    newAlbum.save()
        .then(() => res.json('Album added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// GET request to fetch a random album. (ORDER OF THE ROUTES IS IMPORTANT).
router.route('/random').get((req, res) => {
    // Use MongoDB's aggregate function to select a random album from the collection
    Album.aggregate([{ $sample: { size: 1 } }])  // $sample selects a random document, 'size: 1' returns one random album
        .then(album => {
            // Check if an album was returned
            // The aggregate function always returns an array, even if there's only one result
            if (album.length > 0) {
                res.json(album[0]);  // Return the first (and only) album in the array
            } else {
                res.status(404).json('No albums found');  // Send a 404 error if no albums exist in the database
            }
        })
        .catch(err => res.status(400).json('Error: ' + err));  // Handle any errors that occur during the aggregation process
});


//Route for getting an album based on id
router.route('/:id').get((req, res) => {
    Album.findById(req.params.id)
        .then(album => res.json(album))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Route for deleting albums
router.route('/:id').delete((req, res) => {
    Album.findByIdAndDelete(req.params.id)
        .then(() => res.json('Album deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Route for changing an albums data
router.route('/update/:id').post((req, res) => {
    console.log('POST request received at /update');
    console.log('Request body:', req.body);

    Album.findById(req.params.id)
        .then(album => {
            album.username = req.body.username;
            album.albumName = req.body.albumName;
            album.artist = req.body.artist;
            album.duration = Number(req.body.duration);
            album.releaseDate = Date.parse(req.body.releaseDate);
            album.nrOfSongs = Number(req.body.nrOfSongs);

            album.save()
                .then(() => res.json('Album updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});




module.exports = router;