const express = require("express");
const router = express.Router();
const Reviews = require("../models/reviews");
const auth = require("../middleware/auth");
const cors = require("cors");

router.use(cors());

router.post("/reviews/assign", async (req, res) => {
  const reviewsModel = new Reviews();
  try {
    reviewsModel.employee = req.body.employee;
    reviewsModel.reviews.push({
      requestedFrom: req.body.requestedFrom,
    });
    await reviewsModel.save();
    res.status(201).send({ reviewsModel });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/reviews/add", async (req, res) => {
  try {
    const reviewsModel = await Reviews.findById(req.params.id);

    if (!reviewsModel || !reviewsModel.employee || !reviewsModel.reviews) {
      throw new Error();
    }

    reviewsModel.reviews.forEach((data) => {
      if (
        data.requestedFrom.employeeId === req.params.requestedFrom.employeeId
      ) {
        data.rating = req.params.rating;
        data.positives = req.params.positives;
        data.improvements = req.params.improvements;
        data.completed = true;
      }
    });

    res.status(201).send({ reviewsModel });
  } catch (e) {
    res.status(404).send();
  }
});

module.exports = router;
