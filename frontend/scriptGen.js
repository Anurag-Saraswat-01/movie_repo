const axios = require("axios");

axios
  .get("http://www.omdbapi.com/?t=The%20Godfather&apikey=69c77d68")
  .then((res) => console.log(res.data))
  .catch((err) => console.log(err));
