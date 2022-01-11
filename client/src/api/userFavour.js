import axios from "axios";


const deleteFavour = (id, username) => {
  axios.put("/users/favour/" + id, {username:username}, {
    headers: {
      token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    },
  });
};

const deleteAllFavour = (username) => {
  axios.post("/users/favour/deleteAll/", {username:username}, {
    headers: {
      token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    },
  });
};




export { deleteFavour, deleteAllFavour };
