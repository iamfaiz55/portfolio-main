import type { Request, Response } from "express";
import Testimonial from "../models/Testimonial.js";
import { v2 as  cloudinary } from "cloudinary"
import dotenv from 'dotenv';
dotenv.config();
cloudinary.config({
    api_key: process.env.CLOUDINARY_API_KEY || "",
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
    api_secret: process.env.CLOUDINARY_API_SECRET || ""
})
export const getAllTestimonials = async (req: Request, res: Response): Promise<void> => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error: any) {
    console.error('Get testimonials error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

export const getTestimonialById = async (req: Request, res: Response): Promise<void> => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      res.status(404).json({ message: 'Testimonial not found' });
      return;
    }
    res.json(testimonial);
  } catch (error: any) {
    console.error('Get testimonial error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// Create testimonial with Cloudinary image upload
export const createTestimonial = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, role, text, stars, size } = req.body as {
      name: string;
      role: string;
      text: string;
      stars?: string | number;
      size?: 'small' | 'large';
    };

    let imagePath: string | undefined;
    if (req.file) {
      const { secure_url } = await cloudinary.uploader.upload(req.file.path);
      imagePath = secure_url;
    } else if (typeof (req.body as any).image === 'string') {
      imagePath = (req.body as any).image;
    }

    const doc = await Testimonial.create({
      name,
      role,
      text,
      image: imagePath,
      stars: typeof stars !== 'undefined' ? Number(stars) : undefined,
      size,
    });

    res.status(201).json(doc);
  } catch (error: any) {
    console.error('Create testimonial error:', error);
    res.status(400).json({ message: error.message || 'Server error' });
  }
};

// Update testimonial with Cloudinary image upload and delete
export const updateTestimonial = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      name, role, text, stars, size,
      image,
      removeImage,
    } = req.body as {
      name?: string;
      role?: string;
      text?: string;
      stars?: string | number;
      size?: 'small' | 'large';
      image?: string;
      removeImage?: string | boolean;
    };

    const existing = await Testimonial.findById(req.params.id);
    if (!existing) {
      res.status(404).json({ message: 'Testimonial not found' });
      return;
    }

    const updates: Record<string, unknown> = {};

    if (typeof name !== 'undefined') updates.name = name;
    if (typeof role !== 'undefined') updates.role = role;
    if (typeof text !== 'undefined') updates.text = text;
    if (typeof size !== 'undefined') updates.size = size;
    if (typeof stars !== 'undefined') {
      const n = Number(stars);
      if (!Number.isNaN(n)) updates.stars = n;
    }

    // Image handling with Cloudinary
    if (req.file) {
      // Delete old image from Cloudinary if exists
      if (existing.image && existing.image.startsWith("http")) {
        const publicId = existing.image.split("/").pop()?.split(".")[0];
        if (publicId) await cloudinary.uploader.destroy(publicId);
      }
      const { secure_url } = await cloudinary.uploader.upload(req.file.path);
      updates.image = secure_url;
    } else if (removeImage === true || removeImage === 'true') {
      if (existing.image && existing.image.startsWith("http")) {
        const publicId = existing.image.split("/").pop()?.split(".")[0];
        if (publicId) await cloudinary.uploader.destroy(publicId);
      }
      updates.image = undefined;
    } else if (typeof image === 'string' && image.trim() !== '') {
      updates.image = image.trim();
    }

    const updated = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    res.json(updated);
  } catch (error: any) {
    console.error('Update testimonial error:', error);
    res.status(400).json({ message: error.message || 'Server error' });
  }
};

// Delete testimonial and image from Cloudinary
export const deleteTestimonial = async (req: Request, res: Response): Promise<void> => {
  try {
    const doc = await Testimonial.findByIdAndDelete(req.params.id);
    if (!doc) {
      res.status(404).json({ message: 'Testimonial not found' });
      return;
    }
    if (doc.image && doc.image.startsWith("http")) {
      const publicId = doc.image.split("/").pop()?.split(".")[0];
      if (publicId) await cloudinary.uploader.destroy(publicId);
    }
    res.json({ message: 'Deleted' });
  } catch (error: any) {
    console.error('Delete testimonial error:', error);
    res.status(400).json({ message: error.message || 'Server error' });
  }
};