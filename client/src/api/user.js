import axios from "axios";

const deleteFavour = (id, username) => {
  try {
    axios.put(
      "/users/favour/" + id,
      { username: username },
      {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
};

const deleteAllFavour = (username) => {
  try {
    axios.post(
      "/users/favour/deleteAll/",
      { username: username },
      {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
};

const postRecord = (data) => {
  try {
    axios.post("/users/movieRecord/", data, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export { deleteFavour, deleteAllFavour, postRecord };
