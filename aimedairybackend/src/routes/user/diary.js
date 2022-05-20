const express = require("express");
const {
  GenerateError,
  ServerError,
  BadRequest,
} = require("../../helpers/errors");
const Diary = require("../../models/Diary");
const User = require("../../models/User");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { title, date, diary, location, isPrivate, _user, logo } = req.body;

    const diaryObj = new Diary({
      title,
      date,
      diary,
      location,
      isPrivate,
      _user,
      logo,
    });
    const response = await diaryObj.save();
    if (!response) return ServerError(res, "Opps!Something went wrong!");

    res.send({ diary: response });
  } catch (err) {
    GenerateError(res, err);
  }
});

router.get("/myDiaries/:_user", async (req, res) => {
  try {
    const { _user } = req.params;

    const diaries = await Diary.find({ _user }).populate({
      model: "user",
      path: "_user",
    });
    if (!diaries) return ServerError(res, "Opps!Something went wrong!");

    res.send({ diaries });
  } catch (err) {
    GenerateError(res, err);
  }
});

router.get("/publicDiaries", async (req, res) => {
  try {
    const diaries = await Diary.find({ isPrivate: false }).populate({
      model: "user",
      path: "_user",
    });
    if (!diaries) return ServerError(res, "Opps!Something went wrong!");

    res.send({ diaries });
  } catch (err) {
    GenerateError(res, err);
  }
});

router.post("/viewDiary", async (req, res) => {
  try {
    const { _diary } = req.body;

    const diary = await Diary.findById(_diary);
    if (!diary) return BadRequest(res, "Diary does not exist!");

    const response = await Diary.findByIdAndUpdate(
      _diary,
      {
        $inc: { views: 1 },
      },
      {
        new: true,
      }
    );
    res.send({ diary: response });
  } catch (err) {
    GenerateError(res, err);
  }
});

router.post("/getSpecificDiary", async (req, res) => {
  try {
    const { _user, _diary } = req.body;

    console.log(req.body);

    const diary = await Diary.findById(_diary).populate({
      model: "user",
      path: "_user",
    });
    if (!diary) return BadRequest(res, "Diary does not exist!");

    console.log(diary._user);

    if (diary.isPrivate && diary._user._id.toString() !== _user.toString())
      return BadRequest(res, "Access denied!");

    res.send({ diary });
  } catch (err) {
    GenerateError(res, err);
  }
});

router.post("/getInRange", async (req, res) => {
  try {
    let { startDate, endDate, _user } = req.body;

    startDate = new Date(startDate);
    endDate = new Date(endDate);

    const diaries = await Diary.find({
      _user,
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    });
    if (!diaries) return ServerError(res, "Opps!Something went wrong!");

    res.send({ diaries });
  } catch (err) {
    GenerateError(res, err);
  }
});

module.exports = router;
