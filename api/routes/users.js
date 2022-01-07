const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const verify = require("../verifyToken");

//CREATE
router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newUser = new user(req.body);
    try {
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//UPDATE
router.put("/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString();
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can update only your account!");
  }
});

//DELETE
router.delete("/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can delete only your account!");
  }
});

//GET
router.get("/find/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...info } = user._doc;
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
router.get("/", verify, async (req, res) => {
  const query = req.query.new;
  if (req.user.isAdmin) {
    try {
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed to see all users!");
  }
});

//GET USER STATS
router.get("/stats", async (req, res) => {
  const today = new Date();
  const latYear = today.setFullYear(today.setFullYear() - 1);

  try {
    const data = await User.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

//favour post
router.post("/favour/post/:username", verify, function (req, res) {
  let postData = {
    // username:req.body.username,
    _id: req.body._id,
    imgTitle: req.body.imgTitle,
    img: req.body.img,
    video:req.body.video,
    desc:req.body.desc,
    postTime: new Date(),
  };
  User.findOne({
    username: req.body.username,
  }).then((user) => {
    let arr = user.favour;
    let _id = req.body._id;
    console.log(arr);
    let result = arr.some((item) => {
      if (item._id == _id) {
        return true;
      }
    });
    if (result) {
      res.status(200).json(user);
      // alert("This movie has been collected, collection failed!")
      console.log("This movie has been collected, collection failed!");
      console.log(user.favour);
    } else {
      user.favour.unshift(postData);
      return user.save().then((newUser) => {
        res.status(200).json(newUser);
        console.log("Collection of success!");
      });
    }
  });
});

//get All somebody

router.get("/favour/",verify, async (req, res) => {
  try {
    const favour = await User.find({ username: req.query.username },{favour:1});
    // const arrFavour = user.favour;
    // console.log(arrFavour)
    res.status(200).json(favour);
  } catch (err) {
    res.json(500).json(err);
  }
});

module.exports = router;
