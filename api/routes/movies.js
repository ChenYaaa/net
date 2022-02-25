const router = require("express").Router();
const Movie = require("../models/Movie");
const verify = require("../verifyToken");

//CREATE

router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newMovie = new Movie(req.body);
    try {
      const savedMovie = await newMovie.save();
      res.status(201).json(savedMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//UPDATE

router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//add ThumbUp
router.put("/ThumbUp/:id", async (req, res) => {
  try {
    const movieA = await Movie.findOneAndUpdate(
      { _id: req.params.id },
      { $inc: { ThumbUp: 1 } }
    );
    res.status(200).json(movieA);
  } catch (err) {
    res.status(500).json(err);
  }
});

//dowm ThumbDown
router.put("/ThumbDown/:id", async (req, res) => {
  try {
    const movieA = await Movie.findOneAndUpdate(
      { _id: req.params.id },
      { $inc: { ThumbUp: -1 } }
    );
    res.status(200).json(movieA);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE

router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Movie.findByIdAndDelete(req.params.id);
      res.status(200).json("The movie has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//GET

router.get("/find/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/episode/:id", verify, async (req, res) => {
  try {
    const episode = await Movie.find({ _id: req.params.id }, { episode: 1 });
    res.status(200).json(episode);
  } catch (err) {
    res.json(500).json(err);
  }
});

//GET RANDOM

router.get("/random", async (req, res) => {
  const type = req.query.type;
  let movie;
  try {
    if (type === "series") {
      movie = await Movie.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
      movie = await Movie.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
    }
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL

router.get("/", async (req, res) => {
  // if (req.user.isAdmin) {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies.reverse());
  } catch (err) {
    res.status(500).json(err);
  }
  // } else {
  //   res.status(403).json("You are not allowed!");
  // }
});

//获取查询内容
router.post("/like_movie_search", (req, res) => {
  let searchValue = req.body.searchValue;
  // console.log(searchValue);
  var str = ".*" + searchValue + ".*$";
  var reg = new RegExp(str);

  Movie.find({ title: { $regex: reg, $options: "i" } }, (err, data) => {
    // $options:'i' 表示忽略大小写
    if (err) {
      console.log(err);
      return res.status(500).json({
        result: 1,
        error_info: err.message,
      });
    }
    // console.log(data)
    let length = data.length;
    return res.status(200).json({
      result: 0,
      count: length,
      searchMovie: data,
    });
  });
});

//获取最新内容
router.get("/recentMovie", async (req, res) => {
  const today = new Date();
  try {
    const data=
  } catch (err) {}
});

module.exports = router;
