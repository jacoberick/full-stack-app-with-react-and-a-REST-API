"use strict";

const express = require("express");
const router = express.Router();
const User = require("./models").User;
const Course = require("./models").Course;

const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

const auth = require("basic-auth");
const jwt = require("jsonwebtoken");

/* Handler function to wrap each route. */
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      res.status(500).send(error);
    }
  };
}

// User authentication
const authenticateUser = async (req, res, next) => {
  try {
    let message = null;
    // Parse the user's credentials from the Authorization header.
    let credentials = auth(req);
    if (!credentials) {
      const token = req.get("Authorization").split(" ")[1];
      credentials = jwt.verify(token, process.env.JWT_SECRET);
      console.log(credentials);
    }
    // If the user's credentials are available...
    if (credentials) {
      // Attempt to retrieve the user from the data store
      // by their username (i.e. the user's "key"
      // from the Authorization header).
      const user = await User.findOne({
        where: {
          emailAddress: credentials.name
        }
      });
      // If a user was successfully retrieved from the data store...
      if (user) {
        // Use the bcryptjs npm package to compare the user's password
        // (from the Authorization header) to the user's password
        // that was retrieved from the data store.
        const authenticated = await bcrypt.compare(
          credentials.pass,
          user.password
        );

        // If the passwords match...
        if (authenticated) {
          console.log(
            `Authentication successful for username: ${user.emailAddress}`
          );

          // Then store the retrieved user object on the request object
          // so any middleware functions that follow this middleware function
          // will have access to the user's information.
          req.currentUser = user;

          let jwtToken = jwt.sign(
            { name: credentials.name, pass: credentials.pass },
            process.env.JWT_SECRET
          );
          req.jwtToken = jwtToken;
        } else {
          message = `Authentication failure for email Address: ${user.emailAddress}`;
        }
      } else {
        message = `User not found for username: ${credentials.name}`;
      }
    } else {
      message = "Auth header not found";
    }
    // If user authentication failed...
    if (message) {
      console.warn(message);
      // Return a response with a 401 Unauthorized HTTP status code.
      res.status(401).json({ message });
    } else {
      // Or if user authentication succeeded...
      // Call the next() method.
      next();
    }
  } catch (e) {}
};

//validation for input fields
const formValidation = (req, res) => {
  const errors = validationResult(req);
  console.log(errors);

  // If there are validation errors...
  if (!errors.isEmpty()) {
    // Create a mapping of error messages
    const errorMessages = errors.array().map(error => error.msg);

    // Return validation errors response
    return res.status(400).json({ errors: errorMessages });
  }
};

/*
 *  User Routes
 */

const firstNameValidator = check("firstName")
  .exists({ checkNull: true, checkFalsy: true })
  .withMessage("Please provide a value for 'firstName'");

const lastNameValidator = check("lastName")
  .exists({ checkNull: true, checkFalsy: true })
  .withMessage("Please provide a value for 'lastName'");

const emailValidator = check("emailAddress")
  .exists({ checkNull: true, checkFalsy: true })
  .withMessage("Please provide a value for 'emailAddress'");

const passValidator = check("password")
  .exists({ checkNull: true, checkFalsy: true })
  .withMessage("Please provide a value for 'password'");

const titleValidator = check("title")
  .exists({ checkNull: true, checkFalsy: true })
  .withMessage("Please provide a value for 'title'");

const descValidator = check("description")
  .exists({ checkNull: true, checkFalsy: true })
  .withMessage("Please provide a value for 'description'");

// Returns the currently authenticated user
// @ status 200
router.get("/users", authenticateUser, (req, res) => {
  const user = req.currentUser;
  res.json({
    name: `${user.firstName} ${user.lastName}`,
    username: user.emailAddress,
    userId: user.id,
    _token: req.jwtToken
  });
  res
    .location("/")
    .status(200)
    .end();
});

// Creates a user, sets the Location header to "/", and returns no content
// @ status 201
router.post(
  "/users",
  [firstNameValidator, lastNameValidator, emailValidator, passValidator],
  asyncHandler(async (req, res) => {
    formValidation(req, res);

    let user = req.body;
    // Hash user password prior to create
    user.password = bcrypt.hashSync(user.password);

    try {
      user = await User.create(req.body);
      res
        .location("/")
        .status(201)
        .end();
    } catch (e) {
      user = await User.build(req.body);
    }
  })
);

/*
 *  Course Routes
 */

// Returns a list of courses (including the user that owns each course)
// @status — 200
router.get("/courses", async (req, res) => {
  const courses = await Course.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"]
    },
    include: {
      model: User,
      attributes: { exclude: ["createdAt", "updatedAt", "password"] }
    }
  });
  res
    .json(courses)
    .status(200)
    .end();
});

// Returns a course (including the user that owns the course) for the provided course ID
// @status — 200
router.get("/courses/:id", async (req, res) => {
  const course = await Course.findByPk(req.params.id, {
    attributes: {
      exclude: ["createdAt", "updatedAt"]
    },
    include: {
      model: User,
      attributes: { exclude: ["createdAt", "updatedAt", "password"] }
    }
  });
  res
    .json(course)
    .status(200)
    .end();
});

// Creates a course, sets the Location header to the URI for the course, and returns no content
// @status — 201
router.post(
  "/courses",
  [descValidator, titleValidator, authenticateUser],
  asyncHandler(async (req, res) => {
    formValidation(req, res);

    let course;
    try {
      course = await Course.create(req.body);
      res
        .location("/course/" + course.id)
        .status(201)
        .end();
    } catch (e) {
      course = await Course.build(req.body);
    }
  })
);

// Updates a course and returns no content
// @status — 204
router.put(
  "/courses/:id",
  [descValidator, titleValidator, authenticateUser],
  asyncHandler(async (req, res) => {
    formValidation(req, res);

    let course;
    try {
      course = await Course.findByPk(req.params.id);
      await course.update(req.body);
      res.status(204).end();
    } catch (e) {
      course = await Course.build(req.body);
    }
  })
);

// Deletes a course and returns no content
// @status — 204
router.delete(
  "/courses/:id",
  authenticateUser,
  asyncHandler(async (req, res) => {
    const course = await Course.findByPk(req.params.id);
    if (course) {
      await course.destroy();
      res.status(204).end();
    } else {
      res.sendStatus(404);
    }
  })
);

module.exports = router;
