import axios from 'axios';
import { IAdResponse } from '@/types/IAd';
import { api } from '@/config/axios.config';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

export const adService = {
    async getAds(page: number = 1, limit: number = 10): Promise<IAdResponse> {
        try {
            const response = await axios.get(`${API_BASE_URL}/ads/get-ads`, {
                params: { page, limit }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching ads:', error);
            throw error;
        }
    }
};

export async function recordClick(id: string, token: string) {
    const res = await api.post(`/ads/${id}/click`, {}, {
        headers: {
            "X-Recaptcha-Token": token,
        }
    });
    return res?.data;
}

export async function recordImpression(id: string, token: string) {
    const res = await api.post(`/ads/${id}/impression`, {}, {
        headers: {
            "X-Recaptcha-Token": token,
        }
    });
    return res?.data;
}