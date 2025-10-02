import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {  ApiResponse } from '@/types';
import { RootState } from '../store';
interface Project {
  _id: string;
  name: string; 

    image: string;
    shortDesc: string;
    longDesc: string;
    link: string;
    createdAt: string;
    updatedAt: string;
}   
export const projectApi = createApi({
  reducerPath: 'projectApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/projects` || 'http://localhost:5000/api/projects',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Project'],
  endpoints: (builder) => ({
    getProjects: builder.query<Project[], void>({
      query: () => '',
      providesTags: ['Project'],
    }),
    getProject: builder.query<ApiResponse<Project>, string | number>({
      query: (id) => `${id}`,
      providesTags: ['Project'],
    }),
    createProject: builder.mutation<ApiResponse<Project>, FormData>({
      query: (project) => ({
        url: '',
        method: 'POST',
        body: project,
      }),
      invalidatesTags: ['Project'],
    }),
    updateProject: builder.mutation<ApiResponse<Project>, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Project'],
    }),
    deleteProject: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Project'],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectApi;