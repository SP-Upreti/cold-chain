export interface IFAQDescription {
  content: string;
}

export interface IFAQ {
  id: string;
  createdAt: string;
  updatedAt: string;
  sortOrder: number;
  title: string;
  description: IFAQDescription;
  isActive: boolean;
}

export interface IFAQResponse {
  status: number;
  message: string;
  data: {
    faqs: IFAQ[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
