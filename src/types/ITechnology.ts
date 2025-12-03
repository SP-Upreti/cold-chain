export interface ITechnology {
    id: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    coverImage: string;
    description: string;
}

export interface ITechnologiesResponse {
    status: number;
    data: {
        technologies: ITechnology[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
    cached: boolean;
}
