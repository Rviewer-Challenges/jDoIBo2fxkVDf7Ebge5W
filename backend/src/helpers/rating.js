const Comment = require("../models/commentModel");

const getNewStarried = async (websiteID) => {
  try {
    const comments = await Comment.find({ website: websiteID });
    let sumStars = 0;
    comments.forEach((comment) => (sumStars += comment.stars));
    const newStarried = Math.round(sumStars / comments.length);
    return { error: false, stars: newStarried };
  } catch (error) {
    console.log(error);
    return { error: true };
  }
};

module.exports = {
  getNewStarried,
};
