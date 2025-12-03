import { api } from "@/config/axios.config"
import { IBlogBySlugResponse, IBlogResponse } from "@/types/IBlog";

export const getAllBlogs = async ():Promise<IBlogResponse>=>{
    const res = await api.get<IBlogResponse>('/blog/get-all-blogs');
    return res.data;
}

export const getBlogBySlug = async (slug:string):Promise<IBlogBySlugResponse>=>{
    const res = await api.get<IBlogBySlugResponse>(`/blog/get-blog/${slug}`);
    return res.data;
}

