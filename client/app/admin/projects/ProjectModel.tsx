'use client';

import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
// import { ProjectDTO } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ProjectDTO } from '@/types';
import { useCreateProjectMutation, useUpdateProjectMutation } from '@/redux/apis/projectsApi';

const projectSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  shortDesc: z.string().min(1, 'Short description is required'),
  longDesc: z.string().min(1, 'Long description is required'),
  link: z.string().url('Valid URL required'),
  image: z.any().optional(), // image will be handled as File
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project?: ProjectDTO | null;
}

export default function ProjectModal({
  isOpen,
  onClose,
  project,
}: ProjectModalProps) {
  const [createProject, { isLoading: isCreating }] = useCreateProjectMutation();
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();

  const isEditing = !!project;
  const isLoading = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    watch,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
  });

  const imageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (project) {
      reset({
        name: project.name,
        shortDesc: project.shortDesc,
        longDesc: project.longDesc,
        link: project.link,
        image: undefined,
      });
    } else {
      reset({
        name: '',
        shortDesc: '',
        longDesc: '',
        link: '',
        image: undefined,
      });
    }
  }, [project, reset]);

const onSubmit = async (data: ProjectFormData) => {
  try {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('shortDesc', data.shortDesc);
    formData.append('longDesc', data.longDesc);
    formData.append('link', data.link);
    if (data.image && data.image instanceof File) {
      formData.append('image', data.image); // ✅ actual file goes in here
    }

    if (isEditing && project) {
      await updateProject({
        id: project._id as string,
        data: formData,
      }).unwrap();
      toast.success('Project updated successfully');
    } else {
      await createProject(formData).unwrap();
      toast.success('Project created successfully');
    }
    onClose();
  } catch (error) {
    toast.error(isEditing ? 'Failed to update project' : 'Failed to create project');
  }
};


  // Watch image for preview
  const imageFile = watch('image');
  const imagePreview =
    imageFile && imageFile instanceof File
      ? URL.createObjectURL(imageFile)
      : project?.image || '';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[520px] p-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle>
            {isEditing ? 'Edit Project' : 'Create New Project'}
          </DialogTitle>
        </DialogHeader>

        {/* Scrollable body */}
        <div className="max-h-[75vh] overflow-y-auto px-6 py-5">
          <form
            id="project-form"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            encType="multipart/form-data"
          >
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                {...register('name')}
                placeholder="Enter project name"
                className="mt-1"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="shortDesc">Short Description</Label>
              <Textarea
                id="shortDesc"
                {...register('shortDesc')}
                placeholder="Enter short description"
                rows={2}
                className="mt-1"
              />
              {errors.shortDesc && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.shortDesc.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="longDesc">Long Description</Label>
              <Textarea
                id="longDesc"
                {...register('longDesc')}
                placeholder="Enter long description"
                rows={4}
                className="mt-1"
              />
              {errors.longDesc && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.longDesc.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="link">Project Link</Label>
              <Input
                id="link"
                {...register('link')}
                placeholder="https://example.com"
                className="mt-1"
              />
              {errors.link && (
                <p className="text-red-500 text-sm mt-1">{errors.link.message}</p>
              )}
            </div>

           <div>
  <Label htmlFor="image">Project Image</Label>
  <Input
    id="image"
    type="file"
    accept="image/*"
    ref={imageInputRef}
    className="mt-1"
    onChange={(e) => {
      const file = e.target.files?.[0];
      if (file) {
        setValue("image", file, { shouldValidate: true });
      }
    }}
  />
  {imagePreview && (
    <img
      src={imagePreview}
      alt="Preview"
      className="mt-3 rounded border w-full max-h-40 object-contain"
    />
  )}
</div>

          </form>
        </div>

        {/* Sticky footer with actions */}
        <div className="sticky bottom-0 w-full border-t bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex justify-end gap-3 px-6 py-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              form="project-form"
              disabled={isLoading}
            >
              {isLoading
                ? 'Saving...'
                : isEditing
                ? 'Update Project'
                : 'Create Project'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}