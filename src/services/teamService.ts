export interface TeamMember {
  id: string;
  createdAt: string;
  updatedAt: string;
  sortOrder: number;
  addToHome: boolean;
  fullname: string;
  designation: string;
  image: string;
  countryCode: string;
  phoneNumber: string;
  facebook: string;
  twitter: string;
  linkedin: string;
  instagram: string;
}

export interface TeamResponseData {
  members: TeamMember[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface TeamApiResponse {
  status: number;
  data: TeamResponseData;
}

// Server-side function (direct fetch, no reCAPTCHA needed)
export async function getAllTeamMembersServer({ 
    page = 1, 
    limit = 10
}: { 
    page?: number; 
    limit?: number;
} = {}): Promise<TeamApiResponse> {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    
    const params = new URLSearchParams({
        page: String(page),
        limit: String(limit)
    });
    
    const res = await fetch(`${API_BASE_URL}/team/get-all-members?${params.toString()}`, {
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    
    if (!res.ok) {
        console.error('getAllTeamMembersServer: Error fetching team members:', res.statusText);
        throw new Error(`Failed to fetch team members: ${res.statusText}`);
    }
    
    return res.json();
}
