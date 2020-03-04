const router = require("express").Router();

const Users = require("./users-model.js");

router.get("/:id/info", (req, res) => {
    const id = req.params.id

    Users.findUsers(id)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({errorMessage: err})
        });
});

router.get("/:id/plants", (req, res) => {
    const userId = req.params.id

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

router.get("/:id/plants/:plantId", (req, res) => {
    const { id, plantId } = req.params

    Users.findByPlantId(plantId)
        .then(plants => {
            res.status(200).json(plants);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({errorMessage: "unable to process this request"})
        });
})

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

router.put("/:userId/plants/:plantId", (req, res) =>{
    const { userId, plantId } = req.params
    const changes = req.body
    
    Users.findUsersId(userId)
        .then(user => {
            if(user){    
                Users.updatePlant(plantId)
                    .then(updated => {
                        res.status(200).json(updated);
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


router.delete("/:userId/plants/:plantId", (req, res) =>{
    const { userId, plantId } = req.params

    Users.findUsersId(userId)
        .then(user => {
            if(user){    
                Users.removePlant(plantId)
                    .then(removed => {
                        res.status(200).json({message: "successfully deleted"});
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


module.exports = router;
