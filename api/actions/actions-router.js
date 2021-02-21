// Write your "actions" router here!

// - [ ] Inside `api/actions/actions-router.js` build endpoints for performing CRUD operations on _actions_:
//   - `[GET] /api/actions` returns an array of actions (or an empty array) as the body of the _response_.
//   - `[GET] /api/actions/:id` returns an action with the given `id` as the body of the _response_.
//   - `[POST] /api/actions` returns the newly created action as the body of the _response_.
//   - `[PUT] /api/actions/:id` returns the updated action as the body of the _response_.
//   - `[DELETE] /api/actions/:id` returns no _response_ body.

const express = require("express");
const actionsModel = require("./actions-model");

const router = express.Router();

router.get("/", async (req,res,next) => { 
    try {
        const actionsArray = await actionsModel.get()
        console.log(actionsArray);
        res.status(200).json(actionsArray);
    } catch(err) {
        next(err);
    }
})

router.get("/:id", async (req, res, next) => { 
    const id = req.params.id;
    try { 
        const actionsId = await actionsModel.get(id)
        if(!actionsId) {
            res.status(404).json({message: "id doesn't exist"});
        }else {
          console.log(actionsId);
        res.status(200).json(actionsId);
        }
    } catch(err) {
        next(err);
    }
})

// router.get("/:id", validateActionId(), (req, res, next) => {
//   const actionsId = actionsModel.get(id)
// })

router.post("/", async (req, res, next) => {
    try { 
        if(!req.body.project_id || !req.body.description || !req.body.notes){
          res.status(400).json({ message : "Missing either project id, description or notes"});
        } else {
          const actionsCreate = await actionsModel.insert(req.body)
          console.log(actionsCreate);
          res.status(201).json(actionsCreate);
        }
    } catch(err){
        next(err);
    };
});

router.put("/:id", async (req, res, next) => { 
    const id = req.params.id;
    try { 
        if(!req.body.project_id || !req.body.description || !req.body.notes){
          res.status(400).json({ message : "Missing either project id, description or notes"});
        } else if(!id){
          res.status(400).json({ message : "id doesn't exist"});
        } else {
        const actionsUpdate = await actionsModel.update(id, req.body)
        console.log(actionsUpdate);
        res.status(200).json(actionsUpdate);
      }
    }catch(err) {
        next(err);
    }
})

router.delete("/:id", async (req, res, next) =>{ 
  const id = req.params.id; 
  try{ 
    const actionsDelete = await actionsModel.remove(id)
    console.log("Successfully deleted ", actionsDelete);
    res.status(200).end();
  }catch(err){
    next(err);
  }
})



  function validateActionId(req, res, next){
    const id = req.params.id;
    try {
      if(!id){
        res.status(400).json({ message : "id doesn't exist"});
      } else {
        console.log(id);
        res.status(200).json(id);
      }
    }catch(err){
      next(err);
    }
  }
module.exports = router;

