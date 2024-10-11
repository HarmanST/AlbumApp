//Path: your-app-name\src\components\album-list.component.js

import React, { Component } from 'react';
import  { Link } from 'react-router-dom';
import axios from "axios";

const Album = props => (
    <tr>
        <td>{props.album.username}</td>
        <td>{props.album.albumName}</td>
        <td>{props.album.artist}</td>
        <td>{props.album.duration}</td>
        <td>{props.album.releaseDate.substring(0, 10)}</td>
        <td>{props.album.nrOfSongs}</td>
        <td>
            <Link to={"/edit/"+props.album._id}>edit</Link> | <a href="#" onClick={() => { props.deleteAlbum(props.album._id) }}>delete</a>
        </td>
    </tr>
)

export default class AlbumList extends Component {
    constructor(props) {
        super(props);

        this.deleteAlbum = this.deleteAlbum.bind(this);

        this.state = {albums: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/albums/')
            .then(response => {
                this.setState({ albums: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteAlbum(id) {
        axios.delete('http://localhost:5000/albums/'+id)
            .then(res => console.log(res.data));

        this.setState({
            albums: this.state.albums.filter(el => el._id !== id)
        })
    }

    albumList() {
        return this.state.albums.map(currentalbum => {
            return <Album album={currentalbum} deleteAlbum={this.deleteAlbum} key={currentalbum._id}/>;
        })
    }

    render () {
        return(
            <div>
                <h3>Added Albums</h3>
                <table className="table">
                    <thead className="thead-light">
                    <tr>
                        <th>Username</th>
                        <th>Album Name</th>
                        <th>Artist</th>
                        <th>Duration</th>
                        <th>Release Date:</th>
                        <th>Number of Songs</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.albumList() }
                    </tbody>
                </table>
            </div>
        );
    }
}