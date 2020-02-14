const express = require("express");

const Projects = require("./projectModel.js");
const Actions = require("./actionModel.js");

const router = express.Router();

// This GET retrieves a specified project - .get(id)
router.get("/:id", validateProjectId, (request, response) => {
  console.log("This is request.body in router.get('/:id'): ", request.body);
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
router.get("/:id/actions", validateProjectId, (request, response) => {
  console.log("This is request.body in router.get('/:id/actions", request.body);
  const { id } = request.params;
  Projects.getProjectActions(id)
    .then(actionsFound => {
      console.log(
        "This is projectsFound in router.get('/:id/actions'): ",
        actionsFound
      );
      response.status(200).json(actionsFound);
    })
    .catch(error => {
      console.log("This is error in router.get('/:id/actions'): ", error);
      response.status(500).json({ error: "Error retrieving actions" });
    });
});

// This POST adds a new project - .insert(project)
router.post("/", (request, response) => {
  console.log("This is request.body in router.post('/'): ", request.body);
  Projects.insert(request.body)
    .then(newProject => {
      console.log("This is newProject in router.post('/'): ", newProject);
      response.status(201).json(newProject);
    })
    .catch(error => {
      console.log("This is error in router.post('/'): ", error);
      response.status(500).json({ error: "Error adding project" });
    });
});

// This POST adds a new action to a project
router.post("/:id/actions", validateProjectId, (request, response) => {
  console.log(
    "This is request.body in router.post('/:id/actions'): ",
    request.body
  );
  const actionWithProjectId = {
    ...request.body,
    project_id: request.project.id
  };
  Actions.insert(actionWithProjectId)
    .then(newAction => {
      console.log(
        "This is newAction in router.post('/:id/actions'): ",
        newAction
      );
      response.status(201).json(newAction);
    })
    .catch(error => {
      console.log("This is error in router.post('/:id/actions'): ", error);
      response.status(500).json({ error: "Error adding action" });
    });
});

// This PUT updates a specified project - .update(id, changes)
router.put("/:id", validateProjectId, (request, response) => {
  console.log("This is request.body in router.put('/:id'): ", request.body);
  Projects.update(request.project.id, request.body)
    .then(changes => {
      console.log("This is changes in router.put('/:id'): ", changes);
      response.status(200).json(changes);
    })
    .catch(error => {
      console.log("This is error in router.put('/:id'): ", error);
      response.status(500).json({ error: "Error updating project" });
    });
});

// This DELETE obliterates a specified existing project - .remove(id)
router.delete("/:id", validateProjectId, (request, response) => {
  console.log(
    "This is request.project.id in router.delete('/:id'): ",
    request.project.id
  );
  Projects.remove(request.project.id)
    .then(count => {
      console.log("This is counts in router.delete('/:id'): ", count);
      response.status(200).json({ message: "This project has been nuked" });
    })
    .catch(error => {
      console.log("This is error in router.delete('/:id'): ", error);
      response.status(500).json({ error: "Error deleting this project" });
    });
});

// Custom Middleware
function validateProjectId(request, response, next) {
  const { id } = request.params;
  console.log("This is id in validateProjectId(): ", id);
  Projects.get(id)
    .then(projectFound => {
      console.log("This is projectFound in validateProjectID: ", projectFound);
      if (projectFound && projectFound !== undefined) {
        request.project = projectFound;
        next();
      } else {
        response.status(400).json({ error: "This project doesn't exist" });
      }
    })
    .catch(error => {
      console.log("This is error in validateProjectId(): ", error);
      response.status(500).json({ error: "Error validating project ID" });
    });
}

module.exports = router;
