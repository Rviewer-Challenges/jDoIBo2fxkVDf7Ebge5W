const { request, response } = require("express");
const { resourceExist } = require("../helpers/validateResource");
const Website = require("../models/websiteModel");
const User = require("../models/userModel");

const createWebsite = async (req = request, res = response) => {
  try {
    const { resource: resourceID } = req.body;
    const existResource = await resourceExist(resourceID);
    if (!existResource) {
      return res.status(404).json({
        ok: true,
        msg: "Resource not found",
      });
    }
    const newWebsite = new Website({ ...req.body });
    newWebsite.resource = resourceID;
    const websiteCreated = await newWebsite.save();
    res.status(201).json({
      ok: true,
      website: websiteCreated,
      msg: "Website created correctly",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Something went wrong, try again",
    });
  }
};

const getWebsites = async (req = request, res = response) => {
  try {
    const { skip = 0, limit = 10 } = req.query;
    const websites = await Website.find({}, "", {
      limit,
      skip,
    }).populate({ path: "resource", select: "name" });
    res.status(200).json({
      ok: true,
      websites,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Something went wrong, try again",
    });
  }
};

const getWebsitesByResource = async (req = request, res = response) => {
  try {
    const { id: resourceID } = req.params;
    const { skip = 0, limit = 10, search: query = null } = req.query;
    const searchParams = { resource: resourceID };
    if (query && query.trim().length > 0) {
      const regexQuery = new RegExp(query, "i");
      searchParams["name"] = regexQuery;
    }
    const websites = await Website.find(searchParams, "", {
      limit,
      skip,
    });
    res.status(200).json({
      ok: true,
      websites,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Something went wrong, try again",
    });
  }
};

const getWebsitesByUser = async (req = request, res = response) => {
  try {
    const { id: userId } = req;
    const { skip = 0, limit = 10 } = req.query;
    const userFound = await User.findById(userId, "websitesSaved")
      .populate({
        path: "websitesSaved",
        select: "-__v -comments",
      })
      .slice("websitesSaved", [+skip, +limit]);
    res.status(200).json({
      ok: true,
      websites: userFound.websitesSaved,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Something went wrong, try again",
    });
  }
};

const getWebsiteById = async (req = request, res = response) => {
  try {
    const websiteID = req.params.id;
    const websiteDB = await Website.findById(websiteID).populate({
      path: "resource",
      select: "name category",
      populate: {
        path: "category",
        select: "name",
      },
    });
    if (!websiteDB) {
      return res.status(404).json({
        ok: true,
        msg: "Website not found",
      });
    }
    res.status(200).json({
      ok: true,
      website: websiteDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Something went wrong, try again",
    });
  }
};

module.exports = {
  createWebsite,
  getWebsites,
  getWebsitesByResource,
  getWebsiteById,
  getWebsitesByUser,
};
