//Path: your-app-name\src\components\edit-album.component.js

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import { useParams } from 'react-router-dom';  // Import useParams hook
import "react-datepicker/dist/react-datepicker.css";

const EditAlbum = () => {
    const { id } = useParams();  // Get the album ID from the URL parameters

    const [username, setUsername] = useState('');
    const [albumName, setAlbumName] = useState('');
    const [artist, setArtist] = useState('');
    const [duration, setDuration] = useState(0);
    const [releaseDate, setReleaseDate] = useState(new Date());
    const [nrOfSongs, setNrOfSongs] = useState(0);
    const [users, setUsers] = useState([]);
    const userInput = useRef(null);  // Ref for the select element

    useEffect(() => {
        // Fetch the album details
        axios.get(`http://localhost:5000/albums/${id}`)
            .then(response => {
                setUsername(response.data.username);
                setAlbumName(response.data.albumName);
                setArtist(response.data.artist);
                setDuration(response.data.duration);
                setReleaseDate(new Date(response.data.releaseDate));
                setNrOfSongs(response.data.nrOfSongs);
            })
            .catch(error => {
                console.log(error);
            });

        // Fetch the list of users
        axios.get('http://localhost:5000/users/')
            .then(response => {
                if (response.data.length > 0) {
                    setUsers(response.data.map(user => user.username));
                }
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);

    const onSubmit = (e) => {
        e.preventDefault();

        const album = {
            username,
            albumName,
            artist,
            duration,
            releaseDate,
            nrOfSongs
        };

        console.log(album);

        axios.post(`http://localhost:5000/albums/update/${id}`, album)
            .then(res => console.log(res.data));

        window.location = '/';
    };

    return (
        <div>
            <h3>Edit Album</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <select ref={userInput} required className="form-control" value={username} onChange={(e) => setUsername(e.target.value)}>
                        {
                            users.map(user => (
                                <option key={user} value={user}>{user}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label>Album Name: </label>
                    <input type="text" required className="form-control" value={albumName} onChange={(e) => setAlbumName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Artist: </label>
                    <input type="text" required className="form-control" value={artist} onChange={(e) => setArtist(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input type="text" className="form-control" value={duration} onChange={(e) => setDuration(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Release Date: </label>
                    <DatePicker selected={releaseDate} onChange={setReleaseDate} />
                </div>
                <div className="form-group">
                    <label>Number of Songs: </label>
                    <input type="text" className="form-control" value={nrOfSongs} onChange={(e) => setNrOfSongs(e.target.value)} />
                </div>
                <div className="form-group">
                    <input type="submit" value="Edit Album" className="btn btn-primary" />
                </div>
            </form>
        </div>
    );
};

export default EditAlbum;
