const mongoose = require("mongoose");
const { APP_MESSAGES } = require("../utils/app-constants");

const reviewsSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types,
      required: true,
      ref: "User",
    },
    reviews: [
      {
        requestedFrom: {
          type: mongoose.Schema.Types,
          required: true,
          ref: "User",
        },
        rating: {
          type: Number,
          default: 0,
          validate(value) {
            if (value > 5) {
              throw new Error(APP_MESSAGES.INVALID_RATING);
            }
          },
        },
        positives: {
          type: String,
          trim: true,
          default: "",
        },
        improvements: {
          type: String,
          trim: true,
          default: "",
        },
        completed: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Reviews = mongoose.model("Reviews", reviewsSchema);

module.exports = Reviews;
