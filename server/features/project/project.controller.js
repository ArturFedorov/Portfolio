'use strict';

const express = require('express');
const router = express.Router();

const { validationResult } = require('express-validator/check');


var projectService=require('./project.service');
var projectValidator=require('./project.validator');


// GET requests
router.get('/projects', (req, res) => {
    
    projectService.getProjects().then(data=>{
        if(!data || !data.length) res.status(404).send("No projects found");
        
        res.status(200).send(data);
    }).catch(err=>{
        res.status(500).json({ errors: { er:{msg:err.message} }});
    })
      
      
});

router.get('/projects/:id', (req, res) => {
    projectService.getProject(req.params.id).then(data=>{
        if(!data) res.status(404).send("No projects found");
        
        res.status(200).send(data);
    }).catch(err=>{
        res.status(500).json({ errors: { er:{msg:error.message} }});
    })    
});


router.get('/projects/history/:name', (req, res) => {
    projectService.getProjectsByName(req.params.name).then(data=>{
        if(!data || !data.length) res.status(404).send("No projects found");
        
        res.status(200).send(data);
    }).catch(err=>{
        res.status(500).send({ errors: { er:{msg:error.message} }});
    })  
});


//POST Requests
router.post('/projects/create', projectValidator.createValidators(),(req, res) => {

   const errors = validationResult(req);
   if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
   }
  
   return projectService.doesProjectExist(req.body.name).then(doesExist=>{
       if(doesExist){
           res.status(409).json({ errors: { latest:{msg:'Project already exists or was archieved'} }});
       }else{
           projectService.createProject(req.body).then(project=>{
               res.status(200).send(project);
           }).catch(error=>{
                res.status(500).json({ errors: { er:{msg:error.message} }});
           })   
       }
    }).catch(error=>{
        res.status(500).json({ errors: { er:{msg:error.message} }});
    }) 
})

router.post('/projects/update', projectValidator.createValidators(),(req, res, next) => {
    
       const errors = validationResult(req);
       if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.mapped() });
       }
       
       return projectService.isProjectLatest(req.body.id).then(isLatest=>{
            if(!isLatest){
            
                res.status(409).json({ errors: { latest:{msg:'Somebody has already updated the project in background'} }});
            }else{
                projectService.updateProject(req.body).then(project=>{
                    res.status(200).send(project);
                }).catch(error=>{
                    res.status(500).json({ errors: { er:{msg:error.message} }});
                })  
            }
        }).catch(error=>{
            res.status(500).json({ errors: { er:{ msg:error} }});
        })
})


//Put Requests
router.put('/projects/archieve', projectValidator.archieveValidators(), async (req, res, next) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
    }
    
    try{
        let isLatest=await projectService.isProjectLatest(req.body.id);
        if(isLatest){
            let project= await projectService.archieveProject(req.body.id);
            res.status(200).send(project);
        } else{
            res.status(409).json({ errors: { latest:{msg:'Somebody has already deleted the project in background'} }});
        }
        
    } catch(error){
        res.status(500).json({ errors: { er:{msg:error} }});
    }
       
})

router.delete('/projects/delete/:name', projectValidator.deleteValidators(), async (req, res, next) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
    }
    
    try{
        let response= await projectService.deleteProject(req.params.name);
        res.status(200).json({message:'ok'});
        
    } catch(error){
        console.log('from catch',response)
        res.status(500).json({ errors: { er:{msg:error} }});
    }
       
})



module.exports = router;