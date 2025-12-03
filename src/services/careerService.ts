import { api } from "@/config/axios.config";
import { ICareerFormData } from "@/schema/career-schema";
import { ICareerResponse, ICareerByIdResponse } from "@/types/ICareer";

export const getAllCareers = async (): Promise<ICareerResponse> => {
  const res = await api.get<ICareerResponse>("/career/get-all-careers");
  return res.data;
};

export const getCareerById = async (id: string): Promise<ICareerByIdResponse> => {
  const res = await api.get<ICareerByIdResponse>(`/career/get-career/${id}`);
  return res.data;
};

export const submitCareerApplication = async (formData: FormData): Promise<{ status: number; message: string }> => {
  const res = await api.post('/application/create-application', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};