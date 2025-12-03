"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Icon } from '@iconify/react'
import { Textarea } from '../ui/textarea'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { InquiryPayload, inquirySchema } from '@/schema/inquiry-schema'
import { submitInquiry } from '@/services/inquiryService'
import { BorderBeam } from '../ui/border-beam'
import { toast } from 'sonner'
import { Product } from '@/types/IProductBySlug'
import { useMediaQuery } from '@/hooks/use-media-query'
import { IAllProduct } from '@/services/productService'

export default function ContactModal({ productData, btnClassName }: {
  productData?: Product | undefined | IAllProduct, 
  btnClassName?: string;
}) {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isResultOpen, setIsResultOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 740)');
  const [result, setResult] = useState<{ isSuccess: boolean; message: string }>({
    isSuccess: false,
    message: ''
  });


  const form = useForm({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      productId: productData?.id || '',
      brandId: productData?.brand?.id || '',
      name: '',
      email: '',
      phone: '',
      address: '',
      message: '',
    }
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

  const onSubmit = async (data: InquiryPayload) => {
    if (!executeRecaptcha) {
      console.error('reCAPTCHA not yet available');
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate reCAPTCHA token
      const token = await executeRecaptcha('contact_form');
      const res = await submitInquiry(data, token);

      if (res.status === 201) {
        setResult({
          isSuccess: true,
          message: 'Your inquiry has been submitted successfully! We will get back to you soon.'
        });
        setIsFormOpen(false);
        setIsResultOpen(true);
        form.reset();
      }
      else {
        setResult({
          isSuccess: false,
          message: 'Failed to submit inquiry. Please try again.'
        });
        setIsFormOpen(false);
        setIsResultOpen(true);
      }

    } catch (error) {
      console.error('Error submitting form:', error);
      setResult({
        isSuccess: false,
        message: 'An error occurred while submitting the form. Please try again.'
      });
      setIsFormOpen(false);
      setIsResultOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen} >
        <DialogTrigger asChild>
          <button className={`bg-primary font-poppins text-white dark:hover:text-white dark:hover:border-white cursor-pointer px-3 sm:px-4 border py-1.5 sm:py-2 hover:bg-transparent hover:text-primary text-xs sm:text-sm hover:border-primary rounded-lg transition-colors duration-200 text-center flex items-center gap-1 sm:gap-2 ${btnClassName}`}>
            Inquiry
            <Icon icon="solar:bag-3-bold" className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </DialogTrigger>
        <DialogContent showCloseButton={false} className="sm:max-w-3xl rounded-2xl p-4 sm:p-6 md:p-8 overflow-hidden backdrop-blur-lg w-[95vw] max-h-[90vh] overflow-y-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, (errors) => {
              const firstError = Object.values(errors)[0];
              console.log(productData)
              toast.error(firstError?.message || "Please fill all data correctly", {
                description: "Make sure to provide valid information in all required fields.",
                position: "top-right",
                classNames: {
                  description: "!text-gray-800 ",
                  icon: "mt-0.5",
                  title: "!text-red-500",
                  content: "!items-start"
                }
              });
            })}>
              <DialogHeader className='gap-0'>
                <DialogTitle className='text-lg sm:text-xl md:text-2xl md:pl-2'>Enquiry About <span className='text-primary break-words'>{productData?.name}</span></DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 sm:gap-y-6 mt-4 sm:mt-6 gap-3 sm:gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className='h-fit'>
                      <FormLabel className='text-sm sm:text-md md:text-lg font-medium text-zinc-800 md:pl-2'>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Ram Prasad'
                          value={field.value}
                          onChange={(e) => handleInputChange(e, field.onChange)}
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                          className='py-3 sm:py-4 md:py-5 rounded-md md:rounded-full px-3 sm:px-4 md:px-5 border-[1.5px] overflow-hidden border-zinc-600 text-sm sm:text-base'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className='h-fit'>
                      <FormLabel className='text-sm sm:text-md md:text-lg font-medium text-zinc-800 md:pl-2'>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='98xxxxxxxx'
                          value={field.value}
                          onChange={(e) => handleInputChange(e, field.onChange)}
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                          className='py-3 sm:py-4 md:py-5 rounded-md md:rounded-full px-3 sm:px-4 md:px-5 border-[1.5px] overflow-hidden border-zinc-600 text-sm sm:text-base'
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
                    <FormItem className='h-fit'>
                      <FormLabel className='text-sm sm:text-md md:text-lg font-medium text-zinc-800 md:pl-2'>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='example@gmail.com'
                          value={field.value}
                          onChange={(e) => handleInputChange(e, field.onChange)}
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                          className='py-3 sm:py-4 md:py-5 rounded-md md:rounded-full px-3 sm:px-4 md:px-5 border-[1.5px] overflow-hidden border-zinc-600 text-sm sm:text-base'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className='h-fit'>
                      <FormLabel className='text-sm sm:text-md md:text-lg font-medium text-zinc-800 md:pl-2' htmlFor="address">Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='banesor, kathmandu'
                          value={field.value}
                          onChange={(e) => handleInputChange(e, field.onChange)}
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                          className='py-3 sm:py-4 md:py-5 rounded-md md:rounded-full px-3 sm:px-4 md:px-5 border-[1.5px] overflow-hidden border-zinc-600 text-sm sm:text-base'
                          id="address"
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
                    <FormItem className='h-fit col-span-1 sm:col-span-2'>
                      <FormLabel className='text-sm sm:text-md md:text-lg font-medium text-zinc-800 md:pl-2'>Enquiry Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='I would like to ...'
                          value={field.value}
                          onChange={(e) => handleInputChange(e, field.onChange)}
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                          className='py-3 sm:py-4 md:py-5 rounded-md md:rounded-3xl border border-zinc-600 min-h-24 sm:min-h-28 ring-0 outline-0 text-sm sm:text-base'
                          id="enquiry-message"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              </div>
              <DialogFooter className='mt-4 sm:mt-6 flex-col sm:flex-row gap-2 sm:gap-6'>
                <DialogClose asChild>
                  <Button variant="outline" type='button' className='w-full sm:w-auto px-6 sm:px-8 py-4 sm:py-5 rounded-md md:rounded-full border-primary text-primary shadow-none text-sm sm:text-base'>Cancel</Button>
                </DialogClose>
                <Button type="submit" disabled={isSubmitting} className='w-full sm:w-auto rounded-md md:rounded-full !px-6 sm:!px-8 py-4 sm:py-5 border-primary shadow-none text-sm sm:text-base'>
                  {isSubmitting ? 'Sending...' : 'Send'} <Icon icon="ph:paper-plane-tilt-light" className="w-5 h-5 sm:w-6 sm:h-6" />
                </Button>
              </DialogFooter>
            </form>
          </Form>
          <BorderBeam colorFrom='red' colorTo='red' duration={4} size={300} />

        </DialogContent>
      </Dialog>

      {/* Success/Error Modal */}
      <Dialog open={isResultOpen} onOpenChange={setIsResultOpen}>
        <DialogContent showCloseButton={false} className="sm:max-w-md rounded-2xl p-4 sm:p-6 md:p-8 w-[90vw]">
          <div className="flex flex-col items-center justify-center gap-4  sm:gap-4 py-4 sm:py-6">
            {result.isSuccess ? (
              <>
                <div className="rounded-md md:rounded-full">
                  <Icon
                    icon="garden:check-badge-fill-12"
                    className="text-green-600"
                    width="48"
                    height="48"
                  />
                </div>
                <DialogTitle className="text-xl sm:text-2xl font-semibold text-center">
                  Success!
                </DialogTitle>
                <p className="text-center text-sm sm:text-base text-gray-600 dark:text-gray-400 px-2">
                  {result.message}
                </p>
              </>
            ) : (
              <>
                  <div className="rounded-md md:rounded-full ">
                  <Icon
                    icon="si:error-line"
                    className="text-red-600"
                      width="48"
                      height="48"
                  />
                </div>
                  <DialogTitle className="text-xl sm:text-2xl font-semibold text-center">
                  Error!
                </DialogTitle>
                  <p className="text-center text-sm sm:text-base text-gray-600 dark:text-gray-400 px-2">
                  {result.message}
                </p>
              </>
            )}
            <DialogFooter className="w-full mt-3 sm:mt-4">
              <Button
                onClick={() => setIsResultOpen(false)}
                className={`w-full sm:w-fit mx-auto rounded-sm py-4 sm:py-5 text-sm sm:text-base ${result.isSuccess
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-red-600 hover:bg-red-700'
                  }`}
              >
                Got It !
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
