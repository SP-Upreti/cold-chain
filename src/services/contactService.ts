import { api } from "@/config/axios.config";
import { IContactSubmitData } from "@/schema/contact-schema";

export async function postContact(data: IContactSubmitData, captcha: string): Promise<{ data: { status: number; message: string, captcha: string }, captcha: string }> {

    const res = await api.post('/contact/create-contact', data, {
        headers: {
            'x-recaptcha-token': captcha
        }
    });
    return res.data;
}