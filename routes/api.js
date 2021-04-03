const router = require("express").Router();
const Workout = require("../models/workout.js");

router.post("/api/workouts", (req, res) => {
  Workout.create({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put("/api/workouts/:id", ({ body, params }, res) => {
  Workout.findByIdAndUpdate(params.id, { $push: { exercises: body } })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/api/workouts", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration",
        },
      },
    },
  ])
    .then((datas) => {
      res.json(datas);
    })
    .catch((err) => {
      res.json(err);
    });
});
router.get("/api/workouts/range", (req, res) => {
  Workout.find()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(404).json(err));
});

module.exports = router;
