export interface ICareerResponse {
  status: number;
  message: string;
  data: {
    careers: ICareer[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}




export interface ICareerByIdResponse {
  status: 200,
  message: "Found",
  career: ICareerDetail
}

export interface ICareer {
  id: string;
  title: string;
  location: string;
  jobType: "FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERNSHIP";
  salaryRange: string;
  slug: string;
}

export interface ICareerDetail {
  id: string
  createdAt: string
  updatedAt: string
  sortOrder: number;
  title: string
  slug: string
  department: string
  location: string
  jobType: string
  description: {
    overview: string
    responsibilities: string[]
  },
  requirements: string
  salaryRange: string
  isOpen: boolean
}