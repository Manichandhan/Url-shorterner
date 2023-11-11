const urlModel = require("../models/urlSchema");
const shortid = require("shortid");
const validurl = require("valid-url");

async function findurl(req, res, next) {
  if (!req.body.email || !req.params.shortid)
    next(new Error("enter email and shortid to find your url"));
  urlModel
    .find({ shortId: req.params.shortid, email: req.body.email })
    .then((data) => {
      if (data == 0) {
        res.status(404).send({ message: "not found", data });
      } else {
        res.status(200);
        res.send({ message: "found url", data });
      }
    })
    .catch((err) => {
      res.status(404);
      res.send({ message: "Not found", error: err.message });
    });
}

async function findAllurls(req, res) {
  urlModel
    .find({ email: req.body.email })
    .then((data) => {
      if (data.length == 0) {
        res.status(200).send({ message: "all urls", data: "No urls to show" });
      } else {
        res.status(200).send({ message: "all urls", data: data });
      }
    })
    .catch((err) => {
      res.status(401).send({ message: "Not Found", error: err.message });
    });
}

async function addUrl(req, res, next) {
  let shortUnqid = shortid.generate();
  const pathName = new URL(req.body.OriginalUrl).hostname;
  if (validurl.isUri(req.body.OriginalUrl)) {
    urlModel
      .create({
        OriginalUrl: req.body.OriginalUrl,
        email: req.body.email,
        shortId: shortUnqid,
        urlName: pathName,
      })
      .then((data) => {
        res.status(201);
        res.send({
          message: "created successfully",
          data: data,
          shortid: data.shortId,
        });
      })
      .catch((err) => {
        if(err.code===11000 && err.keyPattern.OriginalUrl){
          return res.status(400).send({message:"already exists"})
        }
        res.status(400);
        res.send({ message: "not created some error occured", error: err });
      });
  } else {
    res.send({ message: "not a valid url", url: req.body.OriginalUrl });
  }
}

async function removeUrl(req, res) {
  console.log(req.params.shortid);
  const doc = await urlModel.findOneAndDelete({
    shortId: req.params.shortid,
    email: req.body.email,
  });
  if (doc) {
    res.status(200).send({ message: "deleted successfully", deleted: doc });
  } else if (!doc) {
    res
      .status(404)
      .send({ message: "some error occured", error: "shortid Not found" });
  }
}

module.exports = { addUrl, findAllurls, findurl, removeUrl };
