const express = require('express');
const app = require("../app")
const router = express.Router();


const Drone = require("../models/Drone.model");

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  Drone.find()
  .then((drones) => {
    res.render('drones/list', {drones})
  })
  .catch(err => console.log("DB error reading '/drones' "))
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render("drones/create-form")  
});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  const name = req.body.name;
  const propellers = req.body.propellers;
  const maxSpeed = req.body.maxSpeed;

  Drone.create({name, propellers, maxSpeed})
  .then(()=> res.redirect("/drones"))
  .catch((error)=> console.log(`Error while creating a new Drone: ${error}`))
});

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  const id = req.params.id
  Drone.findById(id)
  .then(drone => {
    console.log(`read this drone from DB: ${drone}`)
    res.render("drones/update-form", drone)
  })
  .catch((error)=> console.log(`DB error reading '/drones'`))
});

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  console.log('Edit from body ', req.body);
  const id = req.params.id;

  const name = req.body.name;
  const propellers = req.body.propellers;
  const maxSpeed = req.body.maxSpeed;

  Drone.findByIdAndUpdate(id, {name, propellers, maxSpeed})
  .then(()=> res.redirect('/drones'))
  .catch((error)=> console.log(`Error while updating the Drone: ${error}`))
});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here
});

module.exports = router;
