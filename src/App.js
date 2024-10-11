//Path: your-app-name\src\App.js

import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Navbar from "./components/navbar.component"
import AlbumList from "./components/album-list.component";
import EditAlbum from "./components/edit-album.component";
import CreateAlbum from "./components/create-album.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
      <Router>
          <div className="container">
              <Navbar />
              <br/>
              <Routes>
                  <Route path="/" exact element={<AlbumList/>} />
                  <Route path="/edit/:id" element={<EditAlbum/>} />
                  <Route path="/create" element={<CreateAlbum/>} />
                  <Route path="/user" element={<CreateUser/>} />
              </Routes>
          </div>
      </Router>
  );
}

export default App;
