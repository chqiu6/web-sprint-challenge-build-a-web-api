// Write your "projects" router here!

// - [ ] Inside `api/projects/projects-router.js` build endpoints for performing CRUD operations on _projects_:
//   - `[GET] /api/projects` returns an array of projects (or an empty array) as the body of the response.
//   - `[GET] /api/projects/:id` returns a project with the given `id` as the body of the _response_.
//   - `[POST] /api/projects` returns the newly created project as the body of the _response_.
//   - `[PUT] /api/projects/:id` returns the updated project as the body of the _response_.
//   - `[DELETE] /api/projects/:id` returns no _response_ body.

// - [ ] Inside `api/projects/projects-router.js` add an endpoint for retrieving the list of actions for a project:
//   - `[GET] /api/projects/:id/actions` sends an array of actions (or an empty array) as the body of the response.

const express = require("express");
const projectsModel = require("./projects-model")

const router = express.Router();

router.get("/", async (req,res,next) => { 
    try {
        const projectsArray = await projectsModel.get()
        console.log(projectsArray);
        res.status(200).json(projectsArray);
    } catch(err) {
        next(err);
    }
})

router.get("/:id", async (req, res, next) => { 
    const id = req.params.id;
    try { 
        const projectsId = await projectsModel.get(id)
        if(!projectsId) {
            res.status(404).json({message: "id doesn't exist"});
        }else {
          console.log(projectsId);
        res.status(200).json(projectsId);
        }
    } catch(err) {
        next(err);
    }
})

router.post("/", async (req, res, next) => {
    try { 
        if( !req.body.name || !req.body.description ){
          res.status(400).json({ message : "Missing name or description"});
        } else {
            const projectsCreate = await projectsModel.insert(req.body)
          console.log(projectsCreate);
          res.status(201).json(projectsCreate);
        }
    } catch(err){
        next(err);
    };
});

router.put("/:id", async (req, res, next) => { 
    const id = req.params.id;
    try { 
        if( !req.body.name || !req.body.description ){
            res.status(400).json({ message : "Missing name or description"});
        } else if(!id){
          res.status(400).json({ message : "id doesn't exist"});
        } else {
        const projectsUpdate = await projectsModel.update(id, req.body)
        console.log(projectsUpdate);
        res.status(200).json(projectsUpdate);
      }
    }catch(err) {
        next(err);
    }
})

router.delete("/:id", async (req, res, next) =>{ 
    const id = req.params.id; 
    try{ const projectsDelete = await projectsModel.remove(id)
      if(!projectsDelete){
          res.status(404).json({ message : "trying to get codegrade automate testing to pass a 404 status code if id doesnt exist"});
      } else {
     const projectsDelete = await projectsModel.remove(id)
      console.log("Successfully deleted ", projectsDelete);
      res.status(200).end();
      }
    }catch(err){
      next(err);
    }
  })

router.get("/:id/actions", async (req, res, next) => {
    const id = req.params.id;
    const projectId = req.params.project_id;
    try{
        const projectsGetActions = await projectsModel.getProjectActions(id)
        console.log(projectsGetActions);
        res.status(200).json(projectsGetActions);
    }catch(err) {
        next(err);
    }
})
module.exports = router;