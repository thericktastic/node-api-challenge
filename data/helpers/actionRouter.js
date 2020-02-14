const express = require("express");

const Actions = require("./actionModel");

const router = express.Router();

// This GET retrieves a specific action?
router.get("/:id", validateActionId, (request, response) => {
  console.log("This is request.body in router.get('/:id'): ", request.body);
  const { id } = request.params;
  Actions.get(id)
    .then(actionFound => {
      console.log("This is actionFound in router.get('/:id'): ", actionFound);
      response.status(200).json(actionFound);
    })
    .catch(error => {
      console.log("This is error in router.get('/:id'): ", error);
      response.status(500).json({ errror: "Error retrieving action" });
    });
});

// This PUT updates a specified action
router.put("/:id", validateActionId, (request, response) => {
  console.log("This is request.body in router.put('/:id'): ", request.body);
  Actions.update(request.action.id, request.body)
    .then(changes => {
      console.log("This is changes in router.put('/:id'): ", changes);
      response.status(200).json(changes);
    })
    .catch(error => {
      console.log("This is error in router.put('/:id'): ", error);
      response.status(500).json({ error: "Error updating action" });
    });
});

// This DELETE annhilates a specific action
router.delete("/:id", validateActionId, (request, response) => {
  console.log(
    "This is request.action.id in router.delete('/:id'): ",
    request.action.id
  );
  Actions.remove(request.action.id)
    .then(count => {
      console.log("This is counts in router.delete('/:id'): ", count);
      response.status(200).json({ message: "This action has been nuked" });
    })
    .catch(error => {
      console.log("This is error in router.delete('/:id'): ", error);
      response.status(500).json({ error: "Error deleting this action" });
    });
});

// Custom Middleware
function validateActionId(request, response, next) {
  const { id } = request.params;
  console.log("This is id in validateActionID(): ", id);
  Actions.get(id)
    .then(actionFound => {
      console.log("This is actionFound in validateActionID: ", actionFound);
      if (actionFound && actionFound !== undefined) {
        request.action = actionFound;
        next();
      } else {
        response.status(400).json({ error: "This action doesn't exist" });
      }
    })
    .catch(error => {
      console.log("This is error in validateActionId(): ", error);
      response.status(500).json({ error: "Error validating action ID" });
    });
}

module.exports = router;
