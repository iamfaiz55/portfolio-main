import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  name: string;
  image: string;
  shortDesc: string;
  longDesc: string;
  link: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Project name is required'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  image: {
    type: String,
    required: [true, 'Project image is required'],
    trim: true
  },
  shortDesc: {
    type: String,
    required: [true, 'Short description is required'],
    maxlength: [200, 'Short description cannot be more than 200 characters']
  },
  longDesc: {
    type: String,
    required: [true, 'Long description is required']
  },
  link: {
    type: String,
    required: [true, 'Project link is required'],
    trim: true
  }
}, {
  timestamps: true
});

export default mongoose.model<IProject>('Project', ProjectSchema);