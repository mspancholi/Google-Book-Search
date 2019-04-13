import axios from "axios";

var GOOGLE_BOOK_API = "https://www.googleapis.com/books/v1/volumes?q=";
var GOOGLE_API_KEY = "AIzaSyCDiw1AVCWMSLw3QcLqHqpQMfpI_TfjP6E";

export default {
    searchBook: function(searchText){
        var queryText = GOOGLE_BOOK_API + searchText + "&key=" + GOOGLE_API_KEY;
        return axios.get(queryText);

    }
}