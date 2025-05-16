import express from "express";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import userModel from "../models/userModel.js";
import projectModel from "../models/projectModel.js";

dotenv.config();

const router = express.Router();

const secret = process.env.TOKEN;

// create a new user

router.post("/signup", async (req, res) => {
  let { email, name, password } = req.body;

  let emailConfirm = await userModel.findOne({ email: email });

  if (emailConfirm) {
    return res.json({
      status: false,
      message: "The email already exists.",
    });
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    let user = userModel.create({
      name: name,
      email: email,
      password: hashedPass,
    });

    return res.json({
      success: true,
      message: "User created successfully.",
    });
  }
});

// login user

router.post("/login", async (req, res) => {
  let { email, password } = req.body;

  let user = await userModel.findOne({ email: email });

  if (user) {
    bcrypt.compare(password, user.password, (err, isMatch) => {

      if (err) {
        return res.json({
          status: false,
          message: "Something went wrong.",
          error: err,
        });
      }
      

      // if the password is correct

      if (isMatch) {
        let token = jwt.sign({ email: user.email, id: user._id }, secret);
        return res.json({
          status: true,
          message: "Login successful",
          token: token,
          userId: user._id,
        });
      } else {
        return res.json({
          status: false,
          message: "Invalid email or password.",
        });
      }
    });
  } else {
   return res.json({
      status: false,
      message: "User not found.",
    });
  }

});

// get user details

router.post("/getuserdetails", async (req, res) => {

  let {userId} = req.body;

  let user = await userModel.findOne({ _id: userId });
  if(user){
    return res.json({
      success: true,
      message: "User details fetched successfully.",
      user: user,
    })
  } else{
    return res.json({
      success: false,
      message: "User not found.",
    })
  }
});

// create a new project

router.post("/createproject", async (req, res) => {

  let {userId, title, htmlCode, cssCode, jsCode} = req.body;

  let user = await userModel.findOne({ _id: userId });

  if(user){
    let project = await projectModel.create({
      title: title,
      createdBy: userId,
    });

    return res.json({
      success: true,
      message: "Project created successfully.",
      projectId: project._id,
    })
  } else{
    return res.json({
      success: false,
      message: "User not found.",
    })
  }

});

// get all projects

router.post("/getprojects", async (req, res) => {
  let {userId} = req.body;

  let user = await userModel.findOne({ _id: userId });
  if(user){
    let projects = await projectModel.find({ createdBy: userId });

    return res.json({
      success: true,
      message: "Projects fetched successfully.",
      projects: projects,
    })
  } else{
    return res.json({
      success: false,
      message: "User not found.",
    })
  }


});

// delete a project

router.post("/deleteproject", async (req, res) => {
  let {userId, projectId} = req.body;

  let user = await userModel.findOne({ _id: userId });
  if(user){
    let project = await projectModel.findOneAndDelete({ _id: projectId });
    if(project){
      return res.json({
        success: true,
        message: "Project deleted successfully.",
      })
    } else{
      return res.json({
        success: false,
        message: "Project not found.",
      })
    }
  }
  else{
    return res.json({
      success: false,
      message: "User not found.",
    })
  }
});

// get single project details

router.post("/getproject", async (req, res) => { 
  let {userId, projectId} = req.body;

  let user = await userModel.findOne({ _id: userId });
  if(user){
    let project = await projectModel.findOne({ _id: projectId });
    if(project){
      return res.json({
        success: true,
        message: "Project fetched successfully.",
        project: project,
      })
    } else{
      return res.json({
        success: false,
        message: "Project not found.",
      })
    }
  }
  else{
    return res.json({
      success: false,
      message: "User not found.",
    })
  }
});

// update single project code 

router.post("/updateproject", async (req, res) => {
let {userId, projectId, htmlCode, cssCode, jsCode} = req.body;

  let user = await userModel.findOne({ _id: userId });
  if(user){
    let project = await projectModel.findOneAndUpdate({ _id: projectId }, {
      htmlCode: htmlCode,
      cssCode: cssCode,
      jsCode: jsCode,
    });
    if(project){
      return res.json({
        success: true,
        message: "Project updated successfully.",
      })
    } else{
      return res.json({
        success: false,
        message: "Project not found.",
      })
    }
  }
  else{
    return res.json({
      success: false,
      message: "User not found.",
    })
  }
})


export default router;