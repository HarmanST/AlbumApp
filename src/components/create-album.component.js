//Path: your-app-name\src\components\create-album.component.js

import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateAlbum extends Component {
    constructor(props) {
        super(props);

        // Not in video
        this.userInput = React.createRef();

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeAlbumName = this.onChangeAlbumName.bind(this);
        this.onChangeArtist = this.onChangeArtist.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeReleaseDate = this.onChangeReleaseDate.bind(this);
        this.onChangeNrOfSongs = this.onChangeNrOfSongs.bind(this);
        this.onSubmit = this.onSubmit.bind(this);



        this.state = {
            username: '',
            albumName: '',
            artist: '',
            duration: 0,
            releaseDate: new Date(),
            nrOfSongs: 0,
            users: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user.username),
                        username: response.data[0].username
                    })
                }
            })
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeAlbumName(e) {
        this.setState({
            albumName: e.target.value
        });
    }

    onChangeArtist(e) {
        this.setState({
            artist: e.target.value
        });
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        });
    }

    onChangeReleaseDate(date) {
        this.setState({
            releaseDate: date
        });
    }

    onChangeNrOfSongs(e) {
        this.setState({
            nrOfSongs: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        console.log('Form submitted!');  // Log to ensure the form submission is working

        console.log("Current Release Date:", this.state.releaseDate);  // Log the release date to see what it's set to


        const album = {
            username: this.state.username,
            albumName: this.state.albumName,
            artist: this.state.artist,
            duration: this.state.duration,
            releaseDate: this.state.releaseDate,
            nrOfSongs: this.state.nrOfSongs
        }

        console.log("Album data before POST:", album);  // Check if this is correct

        axios.post('http://localhost:5000/albums/add', album)
            .then(res => console.log(res.data))
            .catch(error => console.log(error));


        window.location = '/';
    }



    render () {
        return(
            <div>
                <h3>Create New Album Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref={this.userInput}  // Not in video
                                required
                                className="form-control"
                                value={this.state.username}
                                onChange={this.onChangeUsername}>
                            {
                                this.state.users.map(function (user) {
                                    return <option
                                        key={user}
                                        value={user}>{user}
                                    </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Album Name: </label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.albumName}
                               onChange={this.onChangeAlbumName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Artist: </label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.artist}
                               onChange={this.onChangeArtist}
                        />
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                        />
                    </div>
                    <div className="form-group">
                        <label>Release Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.releaseDate}
                                onChange={this.onChangeReleaseDate}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Number of Songs: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.nrOfSongs}
                            onChange={this.onChangeNrOfSongs}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Album Log" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        );
    }
}