'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { ProjectDTO } from '@/types';
// import { useGetProjectsQuery, useDeleteProjectMutation } from '@/redux/apis/projectApi';
import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';
import { Badge } from '@/components/ui/badge';
import ProjectModal from './ProjectModel';
import { useDeleteProjectMutation, useGetProjectsQuery } from '@/redux/apis/projectsApi';

export default function ProjectsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectDTO | null>(null);

  const { data: projectsData, isLoading } = useGetProjectsQuery();
  const [deleteProject] = useDeleteProjectMutation();

  const projects = projectsData || [];

  const handleEdit = (project: ProjectDTO) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleDelete = async (project: ProjectDTO) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(project._id!).unwrap();
        toast.success('Project deleted successfully');
      } catch (error) {
        toast.error('Failed to delete project');
      }
    }
  };

  const handleCreate = () => {
    setSelectedProject(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const columns = [
    {
      key: 'name' as keyof ProjectDTO,
      label: 'Name',
      sortable: true,
    },
    {
      key: 'shortDesc' as keyof ProjectDTO,
      label: 'Short Description',
      render: (value: string) => (
        <span className="text-gray-600 max-w-xs truncate block">{value}</span>
      ),
    },
    {
      key: 'link' as keyof ProjectDTO,
      label: 'Link',
      render: (value: string) => (
        <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
          {value}
        </a>
      ),
    },
    {
      key: 'image' as keyof ProjectDTO,
      label: 'Image',
      render: (value: string) =>
        value ? (
          <img src={value} alt="Project" className="w-16 h-10 object-cover rounded" />
        ) : (
          <span className="text-gray-400">No image</span>
        ),
    },
    {
      key: 'actions' as keyof ProjectDTO,
      label: 'Actions',
    },
  ];

  return (
    <>
      <PageHeader
        title="Projects"
        description="Manage website projects and their details"
      />

      <DataTable
        data={projects}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
        searchPlaceholder="Search projects..."
        isLoading={isLoading}
      />

      <ProjectModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        project={selectedProject}
      />
    </>
  );
}