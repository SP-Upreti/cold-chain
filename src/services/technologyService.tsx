import { api } from "@/config/axios.config";
import { ITechnologiesResponse } from "@/types/ITechnology";

export async function getTechnology(): Promise<ITechnologiesResponse> {
    const res = await api.get("/technology/get-technologies");
    return res?.data
}