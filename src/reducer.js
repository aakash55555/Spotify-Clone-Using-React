import { CardActions } from "@material-ui/core";

export const initialState = {
    user: null,
    playlists: [],
    playing: false,
    item: null,
    //Remove after development
  //   token: 'BQBWYyHE-pe7F6P6SNV3XwCB1mpa78n28KlwGdjAuDXoTalkJJr-U0qlVSAsYeFBVYRY4kw80cYgKHRrxotar-I8lJa1DGvoLqExFOfHm3YL0bL2jsL62KTtNOUNRg40y4IZXh57tKYKykAg1TFP0T6RDGTiRa3wWVGxCjL5ATF-R6oo',
    };

//action is how we manipulate the dataLayer look like
//action is like set the user, set what the user is currently listening
const reducer = (state, action) => {
    console.log(action);

    //Action -> type, [payload]

    switch(action.type){
      //listerner and the dispatcher is in App.js  
      case "SET_USER":
        return {
          //set the state and save the action  
          ...state, 
          user: action.user
        };
      
        case "SET_TOKEN":
          return {
            ...state,
            token: action.token  
          };  
        //listener for setting the playlist for the user
        case "SET_PLAYLISTS":
        return {
          ...state,
          playlists: action.playlists,
        };

        case "SET_DISCOVER_WEEKLY":
          return {
            ...state,
            discover_weekly: action.discover_weekly,
          };
        
      default:
        return state;    
    }
};
export default reducer;