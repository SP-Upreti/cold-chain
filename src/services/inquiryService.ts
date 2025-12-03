import { api } from "@/config/axios.config";
import { InquiryPayload } from "@/schema/inquiry-schema";

export async function submitInquiry(data: InquiryPayload, token: string): Promise<{ status: number, message: string }> {
    // Recaptcha token is now automatically added by axios interceptor
    const res = await api.post('/inquiry/create-inquiry', data, {
        headers:{
           " x-recaptcha-token": token
        }
    });
    return res.data;
}