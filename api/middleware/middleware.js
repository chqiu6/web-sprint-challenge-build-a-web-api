//creating middlewares after I have finished CRUD operations and have them working as intended
const actionsModel = require("../actions/actions-model");
const projectsModel = require("../projects/projects-model");
//actions middleware 
function validateActionId(){
    return async (req, res, next) =>{
    const id = req.params.id;
    try {
      const actionsId = await actionsModel.get(id)
      if(!actionsId){
        res.status(400).json({ message : "id doesn't exist"});
      } else {
        console.log(id);
        req.actionsId = actionsId;
        req.id = id;
        next();
      }
    }catch(err){
      next(err);
    }
  }
}

 async function validateActionBody(req, res, next){
 try {
 if(!req.body.project_id || !req.body.description || !req.body.notes){
     res.status(400).json({ message : "Missing either project id, description or notes"});
  } else {
   next();
  }}catch(err){
   next(err);
  }
 }
 

 module.exports = {
     validateActionId,
     validateActionBody
 }