import { fetchFAQsServer } from "@/services/faqService";
import FAQList from "./_components/faq-list";
import { api } from "@/config/axios.config";

export const metadata = {
    title: "FAQ - Plaze Electronics",
    description: "Find answers to frequently asked questions about Plaze Electronics products, services, and policies.",
    keywords: ["FAQ", "Questions", "Support", "Help", "Electronics"],
};

const fetchFaq = async () => {
    try {
        const res = await api.get('/faq/get-all-faq');
        return res.data;
    } catch (error) {
        console.error("Error fetching FAQs:", error);
        return {
            status: 404,
            message: "Error",
            data: {
                faqs: [],
            }
        };
    }
};

export default async function FAQPage() {

    const faqData = await fetchFaq();
    const faqs = faqData.data.faqs;

    return (
        <>
            <FAQList
                faqs={faqs}
            />
        </>
    );
}