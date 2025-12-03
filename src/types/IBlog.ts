export interface IBlogResponse {
  status: number;
  data: IBlogData;
  cached: boolean;
}

export interface IBlogData {
  blogs: IBlog[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IBlog {
  id: string;
  createdAt: string;
  updatedAt: string;
  sortOrder: number;
  isDeleted: boolean;
  title: string;
  slug: string;
  excerpt: string;
  isPublished: boolean;
  description: string;
  coverImage: string | null;
  publishedAt: string | null;
  author: IAuthor;
  estimatedReadTime: number;
  mediaAssets: IMediaAsset[];
  seoMetadata: ISeoMetadata | null;
}

export interface IAuthor {
  id: string;
  createdAt: string;
  updatedAt: string;
  sortOrder: number;
  isDeleted: boolean;
  firstname: string;
  middlename: string | null;
  lastname: string;
  email: string;
  phone: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  isVerified: boolean;
  address: string | null;
  createdBy: string | null;
  profilePicture: string | null;
  role: "ADMIN" | "USER" | "WRITER" | string;
}

export interface IMediaAsset {
  id: string;
  createdAt: string;
  updatedAt: string;
  sortOrder: number;
  isDeleted: boolean;
  fileUrl: string;
  type: "IMAGE" | "VIDEO" | "FILE" | string;
}

export interface ISeoMetadata {
  title?: string;
  description?: string;
  keywords?: string[];
}

export interface Author {
  id: string;
  createdAt: string;
  updatedAt: string;
  sortOrder: number;
  isDeleted: boolean;
  firstname: string;
  middlename: string | null;
  lastname: string;
  email: string;
  phone: string;
  gender: string;
  isVerified: boolean;
  address: string;
  createdBy: string | null;
  profilePicture: string | null;
  role: string;
}

export interface MediaAsset {
  id: string;
  createdAt: string;
  updatedAt: string;
  sortOrder: number;
  isDeleted: boolean;
  fileUrl: string;
  type: "IMAGE" | "VIDEO";
}

export interface SimilarBlog {
  id: string;
  createdAt: string;
  updatedAt: string;
  sortOrder: number;
  isDeleted: boolean;
  title: string;
  slug: string;
  excerpt: string;
  isPublished: boolean;
  description: string;
  coverImage: string | null;
  publishedAt: string | null;
  author: Author;
  estimatedReadTime: number;
  mediaAssets: MediaAsset[];
  seoMetadata:  null;
}

export interface Blog {
  similarBlogs: SimilarBlog[];
}


export interface IBlogBySlugResponse {
  status: number;
  blog: IBlog;
  similarBlogs: IBlog[];
}


