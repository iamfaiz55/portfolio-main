import type { Request, Response } from "express";
import Projects from "../models/Projects.js";
// import cloudinary  from "../utils/uploadConfig.js"; // Make sure you have this utility
// import cloudinary from "../utils/cloudinary.js"; // Make sure you have this utility
import { v2 as  cloudinary } from "cloudinary"
import dotenv from 'dotenv';
dotenv.config();
cloudinary.config({
    api_key: process.env.CLOUDINARY_API_KEY || "",
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
    api_secret: process.env.CLOUDINARY_API_SECRET || ""
})

// Get all projects
export const getAllProjects = async (_req: Request, res: Response): Promise<void> => {
  try {
    const projects = await Projects.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error: any) {
    console.error("Get projects error:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

// Get project by ID
export const getProjectById = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Projects.findById(req.params.id);
    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }
    res.json(project);
  } catch (error: any) {
    console.error("Get project error:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

// Create project
export const createProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, shortDesc, longDesc, link } = req.body;

    let imageUrl: string | undefined;
    if (req.file) {
      const { secure_url } = await cloudinary.uploader.upload(req.file.path);
      imageUrl = secure_url;
    }

    const project = new Projects({
      name,
      shortDesc,
      longDesc,
      link,
      image: imageUrl,
    });

    await project.save();
    res.status(201).json(project);
  } catch (error: any) {
    console.error("Create project error:", error);
    res.status(400).json({ message: error.message || "Server error" });
  }
};

// Update project
export const updateProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, shortDesc, longDesc, link } = req.body;
    const project = await Projects.findById(req.params.id);

    let imageUrl = project?.image;
    if (req.file) {
      // Delete old image from Cloudinary if exists
      if (project?.image) {
        const publicId = project.image.split("/").pop()?.split(".")[0];
        if (publicId) await cloudinary.uploader.destroy(publicId);
      }
      const { secure_url } = await cloudinary.uploader.upload(req.file.path);
      imageUrl = secure_url;
    }

    const updateData: any = { name, shortDesc, longDesc, link, image: imageUrl };

    const updatedProject = await Projects.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      res.status(404).json({ message: "Project not found" });
      return;
    }

    res.json(updatedProject);
  } catch (error: any) {
    console.error("Update project error:", error);
    res.status(400).json({ message: error.message || "Server error" });
  }
};

// Delete project
export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Projects.findByIdAndDelete(req.params.id);
    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }
    // Delete image from Cloudinary if exists
    if (project.image) {
      const publicId = project.image.split("/").pop()?.split(".")[0];
      if (publicId) await cloudinary.uploader.destroy(publicId);
    }
    res.json({ message: "Project deleted successfully" });
  } catch (error: any) {
    console.error("Delete project error:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};