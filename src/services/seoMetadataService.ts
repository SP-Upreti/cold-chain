import { api } from "@/config/axios.config";
import { ISeoMetadataResponse, ISeoMetadataDetailResponse, ISeoMetadata } from "@/types/ISeoMetadata";

export async function getAllSeoMetadata({
  page = 1,
  limit = 10,
  search = "",
  entityType = ""
}: {
  page?: number;
  limit?: number;
  search?: string;
  entityType?: string;
}): Promise<ISeoMetadataResponse> {
  let url = `/seo-metadata?page=${page}&limit=${limit}&search=${search}`;
  if (entityType) {
    url += `&entityType=${entityType}`;
  }
  const res = await api.get<ISeoMetadataResponse>(url);
  return res.data;
}

export async function getSeoMetadataBySlug(slug: string): Promise<ISeoMetadataDetailResponse> {
  const res = await api.get<ISeoMetadataDetailResponse>(`/seo-metadata/${slug}`);
  return res.data;
}

export async function createSeoMetadata(data: FormData): Promise<ISeoMetadataDetailResponse> {
  const res = await api.post<ISeoMetadataDetailResponse>("/seo-metadata", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
}

export async function updateSeoMetadata(id: string, data: FormData): Promise<ISeoMetadataDetailResponse> {
  const res = await api.put<ISeoMetadataDetailResponse>(`/seo-metadata/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
}

export async function deleteSeoMetadata(id: string): Promise<{ status: number; message: string }> {
  const res = await api.delete(`/seo-metadata/${id}`);
  return res.data;
}

export async function getSiteSeoMetadata(): Promise<{ status: number; message: string; seoMetadata: ISeoMetadata[] }> {
  const res = await api.get<{ status: number; message: string; seoMetadata: ISeoMetadata[] }>("/seo-metadata/site-seo");
  return res.data;
}
