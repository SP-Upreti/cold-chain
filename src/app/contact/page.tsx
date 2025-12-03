"use client";
import React from "react";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type IFormData, ContactPurpose } from "@/schema/contact-schema";
import { countries } from "@/data/countries";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { postContact } from "@/services/contactService";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import BackButton from "@/components/ui/back-button";

const ContactSection = () => {
    const [loading, setLoading] = React.useState(false);
    const [showSuccessModal, setShowSuccessModal] = React.useState(false);
    const [showErrorModal, setShowErrorModal] = React.useState(false);
    const { executeRecaptcha } = useGoogleReCaptcha();

    const form = useForm({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            fullname: "",
            email: "",
            countryCode: "NP",
            phoneNo: "",
            address: "",
            message: "",
            purpose: undefined,
        },
    });

    // Handler to validate trusted events for inputs
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        onChange: (value: string) => void
    ) => {
        if (!e.isTrusted) {
            console.warn('Untrusted input event detected and blocked');
            return;
        }
        onChange(e.target.value);
    };

    // Handler to validate trusted events for select
    const [selectInteractionTrusted, setSelectInteractionTrusted] = React.useState(false);

    const handleSelectOpen = (e: React.PointerEvent | React.KeyboardEvent) => {
        if (e.isTrusted) {
            setSelectInteractionTrusted(true);
            return
        } else {
            console.warn('Untrusted select open event detected');
            setSelectInteractionTrusted(false);
            return;
        }
    };

    const handleSelectChange = (value: string, onChange: (value: string) => void) => {
        if (!selectInteractionTrusted) {
            console.warn('Untrusted select change detected and blocked');
            return;
        }
        onChange(value);
        setSelectInteractionTrusted(false); // Reset after use
    };

    const onSubmit = async (data: IFormData) => {
        if (!executeRecaptcha) {
            console.error('reCAPTCHA not yet available');
            return;
        }
        try {
            setLoading(true);
            const token = await executeRecaptcha('contact_form');

            // Get dial code and append to phone number
            const selectedCountry = countries.find(c => c.code === data.countryCode);
            const dialCode = selectedCountry?.dialCode || '+977';
            const fullPhoneNumber = `${dialCode}${data.phoneNo}`;

            // Create modified data with full phone number and remove countryCode
            const submitData = {
                fullname: data.fullname,
                email: data.email,
                phoneNo: fullPhoneNumber,
                address: data.address,
                message: data.message,
                purpose: data.purpose
            };

            const res = await postContact(submitData, token);
            setShowSuccessModal(true);
            form.reset();
        } catch (error) {
            setShowErrorModal(true);
            console.error("Error submitting contact form:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className=" min-h-screen py-">
            {/* <BackButton text="Contact" /> */}


            <div className=" relative max-w-7xl  items-center mx-auto px-4 xl:px-0 py-12 gap-10  grid grid-cols-5">

                <div className="space-y-3 col-span-3">
                    <h3 className="font-bold text-lg uppercase">Contact Us</h3>
                    <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold flex">Get in touch with Cold Chain <Icon icon="bi:r-circle" className="size-6" /></h2>
                    <p className="text-zinc-800 mt-6 text-base md:text-xl">Have a question or comment? We&apos;re here to help with general inquiries, speaking invitations, or other requests. We provide welcoming, timely support.</p>

                </div>

                <div className="w-full col-span-2 ">
                    <div className="w-full aspect-square relative bg-primary overflow-hidden rounded-full">
                        <img src="https://img.freepik.com/free-photo/friendly-mixed-race-best-friends-enjoy-conversation-with-each-other_273609-44313.jpg?semt=ais_hybrid&w=740&q=80" alt="contact" className="w-full h-full object-cover" />
                    </div>
                </div>

            </div>

            <div className="flex flex-col  max-w-7xl mx-auto px-4 xl:px-0 py-16">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold flex">Send us your message below</h2>
                <p className="text-zinc-800 mt-4 max-w-[60%] text-base md:text-xl">Fill out the form below with your question or comment. We’re here to help and will get back to you promptly.</p>
            </div>

            <div className="max-w-7xl mx-auto px-4 xl:px-0 ">
                <div className="lg:grid grid-cols-5 gap-10">

                    <div className="lg:col-span-3 p-10 rounded-2xl max-w-3xl bg-zinc-100/60 ">
                        <div className=" rounded-2xl  border-zinc-100 ">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit, (errors) => console.log("form error", errors))} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <FormField
                                            control={form.control}
                                            name="fullname"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Full Name</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="John Doe"
                                                            {...field}
                                                            onChange={(e) => handleInputChange(e, field.onChange)}
                                                            className=" border-zinc-400 py-5 focus:bg-white transition-colors"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email Address</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="email"
                                                            placeholder="john@example.com"
                                                            {...field}
                                                            onChange={(e) => handleInputChange(e, field.onChange)}
                                                            className=" border-zinc-400 py-5 focus:bg-white transition-colors"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="flex flex-col  gap-2">
                                            <FormLabel>Phone Number</FormLabel>

                                            <div className="flex gap-0">
                                                <FormField
                                                    control={form.control}
                                                    name="countryCode"
                                                    render={({ field }) => (
                                                        <FormItem className="">
                                                            <FormControl>
                                                                <Select

                                                                    onValueChange={(value) => handleSelectChange(value, field.onChange)}
                                                                    defaultValue={field.value}
                                                                >
                                                                    <SelectTrigger
                                                                        className=" border-zinc-400 py-5 rounded-none rounded-l-sm focus:bg-white"
                                                                        onPointerDown={handleSelectOpen}
                                                                        onKeyDown={handleSelectOpen}
                                                                    >
                                                                        <SelectValue className="">
                                                                            {field.value && countries.find(c => c.code === field.value) ? (
                                                                                <span className="flex items-center gap-1">
                                                                                    <span>{countries.find(c => c.code === field.value)?.dialCode}</span>
                                                                                </span>
                                                                            ) : "Code"}
                                                                        </SelectValue>
                                                                    </SelectTrigger>
                                                                    <SelectContent className="max-h-[300px]">
                                                                        {countries.map((country) => (
                                                                            <SelectItem key={country.code} value={country.code}>
                                                                                <span className="flex items-center gap-2">
                                                                                    <span className="text-zinc-500 w-8 text-xs">{country.code}</span>
                                                                                    <span>{country.dialCode}</span>
                                                                                </span>
                                                                            </SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="phoneNo"
                                                    render={({ field }) => (
                                                        <FormItem className="flex-1 w-full col-span-2 ">

                                                            <FormControl>
                                                                <Input
                                                                    placeholder="9800000000"
                                                                    {...field}
                                                                    onChange={(e) => handleInputChange(e, field.onChange)}
                                                                    className=" border-zinc-400 py-5 rounded-l-none border-l-0 focus:bg-white transition-colors"
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>

                                        <FormField
                                            control={form.control}
                                            name="purpose"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Purpose</FormLabel>
                                                    <FormControl>
                                                        <Select
                                                            onValueChange={(value) => handleSelectChange(value, field.onChange)}
                                                            defaultValue={field.value}
                                                        >
                                                            <SelectTrigger
                                                                className=" border-zinc-400 w-full py-5 focus:bg-white transition-colors"
                                                                onPointerDown={handleSelectOpen}
                                                                onKeyDown={handleSelectOpen}
                                                            >
                                                                <SelectValue placeholder="Select a purpose" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value={ContactPurpose.CHANNEL_SALES}>
                                                                    {ContactPurpose.CHANNEL_SALES}
                                                                </SelectItem>
                                                                <SelectItem value={ContactPurpose.PROJECT_SALES}>
                                                                    {ContactPurpose.PROJECT_SALES}
                                                                </SelectItem>
                                                                <SelectItem value={ContactPurpose.ADMINISTRATION}>
                                                                    {ContactPurpose.ADMINISTRATION}
                                                                </SelectItem>
                                                                <SelectItem value={ContactPurpose.PROCUREMENT}>
                                                                    {ContactPurpose.PROCUREMENT}
                                                                </SelectItem>
                                                                <SelectItem value={ContactPurpose.CAREER}>
                                                                    {ContactPurpose.CAREER}
                                                                </SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="address"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Address</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Your full address"
                                                        {...field}
                                                        onChange={(e) => handleInputChange(e, field.onChange)}
                                                        className=" border-zinc-400 py-5 focus:bg-white transition-colors"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="message"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Message</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="How can we help you?"
                                                        className="min-h-[120px]   border-zinc-400 py-4 focus:bg-white transition-colors resize-none"
                                                        {...field}
                                                        onChange={(e) => handleInputChange(e, field.onChange)}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />


                                    <div className="flex justify-end">
                                        <Button
                                            type="submit"
                                            disabled={loading}
                                            className="w- bg-primary! h-12 text-base font-medium"
                                        >
                                            {loading ? (
                                                <span className="flex items-center gap-2">
                                                    <Icon icon="eos-icons:loading" className="animate-spin" />
                                                    Sending...
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-2">
                                                    Send Message
                                                    <Icon icon="mynaui:send-solid" width="20" height="20" />
                                                </span>
                                            )}
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        <div className="">
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold flex">Send us your message below</h2>
                            <p className="text-zinc-800 mt-4 max-w-[60%] text-base md:text-xl">Fill out the form below with your question or comment. We’re here to help and will get back to you promptly.</p>
                        </div>
                    </div>
                </div>

            </div>

            {/* Success Modal */}
            <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                            <Icon icon="garden:check-badge-fill-12" className="size-8 text-green-600" />
                        </div>
                        <DialogTitle className="text-center text-2xl">Message Sent!</DialogTitle>
                        <DialogDescription className="text-center">
                            Thank you for reaching out. We have received your message and will get back to you shortly.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-center pt-4">
                        <Button
                            onClick={() => setShowSuccessModal(false)}
                            className="bg-green-600 hover:bg-green-700 text-white min-w-[120px]"
                        >
                            Close
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Error Modal */}
            <Dialog open={showErrorModal} onOpenChange={setShowErrorModal}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                            <Icon icon="mdi:alert-circle" className="h-8 w-8 text-red-600" />
                        </div>
                        <DialogTitle className="text-center text-2xl">Something went wrong</DialogTitle>
                        <DialogDescription className="text-center">
                            We couldn&apos;t send your message. Please try again later or contact us directly via phone.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-center pt-4">
                        <Button
                            variant="destructive"
                            onClick={() => setShowErrorModal(false)}
                            className="min-w-[120px]"
                        >
                            Close
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    );
};

export default ContactSection;
