const router = require("express").Router();
const Workout = require("../models/Workout.js"); 

router.get("/api/workouts", ({ body }, res) => {
    Workout.aggregate( [
        {
          $addFields: {
            totalDuration: { $sum: "$exercises.duration" } 
          }
        }
     ] ) .then(dbWorkout=> {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(400).json(err);
      }); 
  });

  router.post("/api/workouts", ({ body }, res) => {
    Workout.create({ body})
      .then(dbWorkout=> {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(400).json(err);
      }); 
  });

  router.put("/api/workouts/:id", ({ body , params}, res) => {
    Workout.findByIdAndUpdate(params.id, { body })
    .then(dbWorkout=> {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    }); 
  });

  router.get("/api/workouts/range", ({ body }, res) => {
    Workout.aggregate( [
        {
          $addFields: {
            totalDistance: { $sum: "$exercises.distance" } 
          }
        }
     ] ) .then(dbWorkout=> {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(400).json(err);
      }); 
  });

  module.exports = router; 