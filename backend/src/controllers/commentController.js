const { request, response } = require("express");
const { getNewStarried } = require("../helpers/rating");
const Comment = require("../models/commentModel");
const User = require("../models/userModel");
const Website = require("../models/websiteModel");

const createComment = async (req = request, res = response) => {
  try {
    const { user, stars, content = null, website } = req.body;

    const commentBefore = await Comment.findOne({ user, website });
    if (commentBefore) {
      return res.status(400).json({
        ok: false,
        msg: "you have already comment this website, try to update it",
      });
    }
    const [userExist, websiteExist] = await Promise.all([
      User.findById(user),
      Website.findById(website),
    ]);
    if (!userExist || !websiteExist) {
      return res.status(404).json({
        ok: false,
        msg: "user or website not found, try again",
      });
    }
    const newComment = new Comment({ user, stars, content, website });
    const commentCreated = await (
      await newComment.save()
    ).populate({
      path: "user",
      select: "-password",
    });

    // update user websites commented
    userExist.websitesCommented.push(websiteExist._id);
    await userExist.save();

    // update website stars
    const { error, stars: newStars } = await getNewStarried(website);
    if (!error) {
      await Website.findByIdAndUpdate(website, { stars: newStars });
    }

    res.status(201).json({
      ok: true,
      comment: commentCreated,
      msg: "comment created correctly",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Something went wrong",
    });
  }
};

const updateComment = async (req = request, res = response) => {
  try {
    const { id: commentId } = req.params;
    const { id: userId } = req;
    const commentDB = await Comment.findOne({ _id: commentId, user: userId });
    if (!commentDB) {
      return res.status(404).json({
        ok: false,
        msg: "comment not found",
      });
    }

    // update comment
    const { content } = req.body;
    commentDB.edited = true;
    commentDB.content = content;
    await commentDB.save();

    res.status(200).json({
      ok: true,
      msg: "comment updated correctly",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Something went wrong",
    });
  }
};

const getComments = async (req = request, res = response) => {
  try {
    const { skip = 0, limit = 10 } = req.query;
    const { id: websiteId } = req.params;
    const comments = await Comment.find({ website: websiteId }, "", {
      limit,
      skip,
      sort: { created: -1 },
    }).populate({ path: "user", select: "email name lastName image" });
    res.status(200).json({
      ok: true,
      comments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Something went wrong",
    });
  }
};

module.exports = {
  createComment,
  updateComment,
  getComments,
};
