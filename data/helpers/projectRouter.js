const express = require("express");

const Projects = require("./projectModel.js");
// const Actions = require("./actionModel.js");

const router = express.Router();

// This GET retrieves a specified project - .get(id)
router.get("/:id", (request, response) => {
  console.log("This is req.body in router.get('/:id'): ", request.body);
  const { id } = request.params;
  Projects.get(id)
    .then(projectFound => {
      console.log("This is projectFound in router.get('/:id'): ", projectFound);
      response.status(200).json(projectFound);
    })
    .catch(error => {
      console.log("This is error in router.get('/:id'): ", error);
      response.status(500).json({ errror: "Error retrieving project" });
    });
});

// This GET retrieves a list of actions associated with a specific project - /getProjectActions(projectId)

// This POST adds a new project - .insert(project)

// This PUT updates a specified project - .update(id, changes)

// This DELETE obliterates a specified existing project - .remove(id)

// Custom Middleware
// function validateProjectId(request, response, next) {
//     const { id } = request.params;
//     console.log("This is id in validateProjectId")
// }

module.exports = router;