import React, { useEffect} from "react";
import "./App.css";
import Login from "./Login";
import { getTokenFromUrl } from './spotify';
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./Player";
import { useDataLayerValue } from "./DataLayer";

//super object
const spotify = new SpotifyWebApi();

function App() {
      //BEM convention
      //const [token, setToken] = useState(null);
      //to pull out information from datalayer this line is enough
      const[{ user, token }, dispatch] = useDataLayerValue();

    //Run code based on a given condition
    useEffect(() => {

      const hash = getTokenFromUrl();
      window.location.hash = "";
      //because token variable is also there
      const _token = hash.access_token;

      if(_token){
        //Stored the token
        
          dispatch({
            type: "SET_TOKEN",
            token: _token,
          });  

        //connect spotify Api using react using access token
        spotify.setAccessToken(_token);

        // get the user detail who is accessing the account in the console  
         spotify.getMe().then(user => {
           //dispatch will put the user name in the data layer 
           dispatch({
             type: 'SET_USER',
             user: user,
           });
         });

      //dispatcher For getting user playlist
      spotify.getUserPlaylists().then((playlists) => {
      dispatch({
        type: "SET_PLAYLISTS",
        playlists: playlists,   
      });
    });

    spotify.getPlaylist('3KkNMTEtf6VWuRXyBjaSWJ').then(response => 
      dispatch({
        type: "SET_DISCOVER_WEEKLY",
        discover_weekly: response,   
      })
    );
  }
  }, []);

    //This will print the user detail on the console
    console.log("User information", user);
    console.log("Alien token ", token);

    return (
    <div className="app">
      {
        token ?
          /*If token there*/
          // <h1>I am logged in</h1>
          <Player spotify = {spotify} /> : <Login />        
      }
    </div>
  );
}

export default App;
