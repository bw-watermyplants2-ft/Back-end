const router = require("express").Router();

const Users = require("./users-model.js");

//user's info//
router.get("/:userId", (req, res) => {
    const id = req.params.userId

    Users.findUsersId(id)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({errorMessage: err})
        });
});

//update user's info
router.put("/:userId", (req, res) =>{
    const userId = req.params.userId;
    const changes = req.body;
    
    Users.findUsersId(userId)
        .then(user => {
            if(user){    
                Users.updateUser(changes, userId)
                    .then(updated => {
                        res.status(200).json(updated)
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json({errorMessage: "unable to process this request"})
                    })
            } else {
                res.status(404).json({errorMessage: "user not found"})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({errorMessage: "unable to process this request"})
        });
})

//get plants by user
router.get("/:userId/plants", (req, res) => {
    const userId = req.params.userId

    Users.findUsersId(userId)
        .then(user => {
            if(user){    
                Users.findPlantsByUser(userId)
                    .then(plants => {
                        res.status(200).json(plants);
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json({errorMessage: "unable to process this request"})
                    });
            } else {
                res.status(404).json({errorMessage: "user not found"})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({errorMessage: "unable to process this request"})
        });
})

//get plant by plant id
router.get("/:userId/plants/:plantId", (req, res) => {
    const { userId, plantId } = req.params

    Users.findByPlantId(plantId)
        .then(plants => {
            res.status(200).json(plants);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({errorMessage: "unable to process this request"})
        });
})

//add new plant
router.post("/:id/plants", (req, res) =>{
    const userId = req.params.id
    const newPlant = {...req.body, user_id: userId}

    Users.addPlant(newPlant, userId)
        .then(plant => {
            res.status(201).json(plant)
        })
        .catch(err => {
            console.log(err)
            rres.status(500).json({errorMessage: "unable to process this request"})
        });
})

//update plant
router.put("/:userId/plants/:plantId", (req, res) =>{
    const { userId, plantId } = req.params
    const changes = req.body

    Users.findUsersId(userId)
        .then(user => {
            if(user){    
                Users.findByPlantId(plantId)
                    .then(plant => {
                        if(plant){
                            Users.updatePlant(changes, plantId)
                                .then(updated => {
                                    res.status(200).json(updated).json({message: "successfully updated"});
                                })
                                .catch(err => {
                                    console.log(err)
                                    res.status(500).json({errorMessage: "unable to process this request"})
                                });
                        } else {
                            res.status(404).json({errorMessage: "plant not found"})
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json({errorMessage: "unable to process this request"})
                    })
            } else {
                res.status(404).json({errorMessage: "user not found"})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({errorMessage: "unable to process this request"})
        });
})

//delete plant
router.delete("/:userId/plants/:plantId", (req, res) =>{
    const { userId, plantId } = req.params

    Users.findUsersId(userId)
        .then(user => {
            if(user){    
                Users.findByPlantId(plantId)
                    .then(plant => {
                        if(plant){
                            Users.removePlant(plantId)
                                .then(removed => {
                                    res.status(200).json({message: "successfully deleted"});
                                })
                                .catch(err => {
                                    console.log(err)
                                    res.status(500).json({errorMessage: "unable to process this request"})
                                });
                        } else {
                            res.status(404).json({errorMessage: "plant not found"})
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json({errorMessage: "unable to process this request"})
                    })
            } else {
                res.status(404).json({errorMessage: "user not found"})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({errorMessage: "unable to process this request"})
        });
})

module.exports = router;
