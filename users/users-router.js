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
            res.status(500).json({error: err})
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
                        res.status(500).json({error: err})
                    });
            } else {
                res.status(404).json({errorMessage: "user not found"})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: err})
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
            res.status(500).json({errorMessage: err})
        });
})

router.post("/:id/plants", (req, res) =>{
    const userId = req.params.id
    const newPlant = {...req.body, user_id: id}

    Users.addPlant(newPlant, userId)
        .then(plant => {
            res.status(201).json(plant)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: err})
        });
})

router.put("/:id/plants/:plantId", (req, res) =>{
    const id = req.params.id
    const changes = req.body

    Users.updatePlant(id)
    .then( {
        
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: err})
    });
})


router.delete("/:id/plants/:plantId", (req, res) =>{
    const id = req.params.id

    Users.removePlant(id)
    .then( {

    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: err})
    });
})


module.exports = router;
