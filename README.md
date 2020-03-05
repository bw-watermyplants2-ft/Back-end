# Welcome to Water My Plants (2) (March 2-6, 2020 - Lambda Build Week)!

## Team:
- UI Developer: Julia Vu
- React 1: Christian Rios
- React 2: Magdiel Martinez
- Backend Developer: Kristin "KP" Parrish
- Project Lead: Thomas Cacciatore

## Proposal:

Ensuring that all your plants are consistently watered can be quite the task. Water My Plants is an app that helps to solve those problems with an easy to use interface for creating a plant watering schedule tailored to each individual plant.

## Features:

- What features are required for your minimum viable product?

    - User creation and login
    - User can add new plants to the user profile profile
    - User can edit/delete plants from the user profile
    - User can edit/delete user profile

- What features may you wish to put in a future release?
    - Upload plant images
    - Allow users to differentiate gardens - example: indoor & outdoor plant groupings
    - 
    - Automate notifications for watering frequency


## Frameworks - Libraries:

- What 3rd party frameworks/libraries are you considering using?
    - React Hook Form (form validation instead of Formik) https://react-hook-form.com – React I
    - Context – React II
    - Express – Backend
    - Node – Backend

- Do APIs require you to contact its maintainer to gain access?
    -no

- Are you required to pay to use the API?
    - no


## Target Audience:

- Who is your target audience? Be specific.
    - People who own plants and have trouble remembering when to water them

- What feedback have you gotten from potential users?  
	- None


## Instructions

**Read these instructions carefully.**

This is a team assignment with individual assessments. All work must be your own but remember to collaborate with everyone on your team. Your challenge score is a measure of your ability to work independently using the material covered through this sprint and there is a score on overall teamwork. You need to demonstrate proficiency in the concepts and objectives introduced and practiced in preceding days.


## Commits

In case you ever need to return to old code. Remember your **ABC: Always Be Committing!**


## Project Set Up

Follow these steps to set up and work on your project:

- [ ]  Clone your OWN version of Repo.
- [ ]  Create a new Branch on the clone: `git checkout -b <firstName-lastName>`.
- [ ]  Implement the project on this branch, committing changes regularly.
- [ ]  Push commits: `git push origin <firstName-lastName>`.
- [ ]  **LOOK** at your project directory and notice it's just a plain ol' React App that we've built using `create-react-app`.
- [ ]  **RUN** `yarn install` or `npm install` to retrieve the client-side dependencies.
- [ ]  **RUN** `yarn start` or `npm start` to fire up your React application.
- [ ] **RUN** `yarn add` or `npm i` to add frameworks and libraries needed for your project (i.e. redux, formik, yup, react-router-dom, etc.).


## Minimum Viable Product (MVP)

1. User creation and login
2. Add plant objects
3. CRUD operations on Users and Plants

## STRETCH GOALS 💪

1. Upload images of plants
2. 
3. Improve model performance by sourcing additional data


## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

 **If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**
 - Check first to see if your issue has already been reported.
 - Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
 - Create a live example of the problem.
 - Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes,  where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.



# Back-end
# API Documentation

#### 1️⃣ Backend delpoyed at [heroku](https://watermyplants2.herokuapp.com/) <br>
#### 1️⃣ Additional Documentation: https://www.getpostman.com/collections/785d2d9d619a6135cee4 
#### 1️⃣ Getting started

To get the server running locally:

- Clone this repo
- **npm install** to install all required dependencies
- **npm run server** to start the local server
- **npm run test** to start server using testing environment


## 2️⃣ Endpoints

#### Authorization Routes

| Method | Endpoint                | Access Control | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| POST   | `/auth/register`        | all users      | Returns a newly created user                 |
| POST   | `/auth/login`           | all users      | Login a previously created user              |

#### User Routes

| Method | Endpoint                         | Description                                          |
| ------ | ---------------------------------| ---------------------------------------------------- |
| GET    | `/users/:userId`                 | Returns info for a single logged in user             |
| PUT    | `/users/:userId`                 | Updates info for a single user                       |
| DELETE | `/users/:userId`                 | Deletes a single user                                |
| GET    | `/users/:userId/plants`          | Returns plant info for a single logged in user       |
| GET    | `/users/:userId/plants/:plantId` | Returns info for a single plant object               |
| POST   | `/users/:userId/plants`          | Returns a new plant object                           |
| PUT    | `/users/:userId/plants/:plantId` | Updates a plant object                               |
| DELETE | `/users/:userId/plants/:plantId` | Deletes a plant object                               |

# Data Model
#### USERS
---
```
{
  id: UUID
  username: STRING
  phone_number: STRING
  password: STRING
}
```

#### PLANTS
---
```
{
  id: UUID
  user_id: UUID foreign key in USERS table
  nickname: STRING
  species: STRING
  h2O_freq: STRING
}
```

## 2️⃣ Actions

`addUser()` -> Registers a new user and returns that user

`updateUser(changes, userId)` -> Updates a single user by userId

`removeUser(userId)` -> Delete a user by ID

`findUsersId(id)` -> returns a user's id, username, & phone number by userID

`findPlantsByUser(userId)` -> returns a list of all created plants

`addPlant(plant, userId)` -> Returns the created plant

`updatePlant(changes, plantId)` -> Update a plant by ID

`deletePlant(plantId)` -> Delete a plant by ID

`getUser(orgId)` -> if no param all users

`getUser(userId)` -> Returns a single user by user ID


## 3️⃣ Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:

    *  NODE_ENV - set to "development" until ready for "production"
    *  JWT_SECRET - you can generate this by using a python shell and running import random''.join([random.SystemRandom().choice('abcdefghijklmnopqrstuvwxyz0123456789!@#\$%^&amp;*(-*=+)') for i in range(50)])