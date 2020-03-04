const db = require('../data/dbConfig.js');

module.exports = {
    addUser,
    updateUser,
    findUsersId,
    findBy,
    findByPlantId,
    findPlantsByUser,
    addPlant,
    updatePlant,
    removePlant,
};

async function addUser(user) {
    const [id] = await db("users").insert(user);
    return findUsersId(id);
}

function updateUser(changes, userId){
    return db("users")
        .where({ "id": userId})
        .update(changes)
        .then(updatedUser => {
            return findUsersId(userId[0]);
        });
}

function findUsersId(id) {
    return db("users")
        .select("id", "username", "phone_number")
        .where({ id })
        .first()
}

function findBy(filter) {
    return db("users").where(filter);
}
// getGarden - modify recipe code
// function getShoppingList(recipe_id){
//     return db("recipes")
//         .where({ id })
//         .first()
//         .then(recipe => {
//             return db("shoppingCart")
//             .join("recipes", "shoppingCart.recipe_id", "recipes.id")
//             .join("ingredients", "shoppingCart.ingredient_id", "ingredient_id")
//             .select("ingredient.id", "ingredient.description", "shoppingCart.ingredient_qty")
//             .where({"shoppingCart.recipe_id": recipe_id })
//             .orderBy("shoppingCart_ingredient_id");
//         })
// };

function findPlantsByUser(userId){
    return db("plants")
    .join("users", "users.id", "plants.user_id",)
    .where({ "plants.user_id": userId})
    .select("plants.user_id", "plants.id as plant_id", "plants.nickname", "plants.species", "plants.h2O_freq")
}

function findByPlantId(plantId) {
    return db("plants")
    .where({ id: plantId })
    .first();
}

function addPlant(plant, userId){
    return db("plants")
        .insert(plant, "id")
        .where({ "plants.user_id": userId})
        .then(id => {
            return findByPlantId(id[0])
        });
};

function updatePlant(changes, plantId){
    return db("plants")
        .where({ "id": plantId})
        .update(changes)
        .then(updatedPlant => {
            return findByPlantId(plantId[0]);
        });
};

function removePlant(id){
    return db("plants")
        .where({ id })
        .then(found => {
            return db("plants")
            .where({ id })
            .del()
        });
};