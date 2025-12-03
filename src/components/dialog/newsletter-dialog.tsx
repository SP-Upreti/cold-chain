"use client"

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Icon } from '@iconify/react'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { BorderBeam } from '../ui/border-beam'

const newsletterSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    name: z.string().min(2, 'Name must be at least 2 characters'),
})

type NewsletterFormData = z.infer<typeof newsletterSchema>

export default function NewsletterDialog() {
    const [isOpen, setIsOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<NewsletterFormData>({
        resolver: zodResolver(newsletterSchema),
        defaultValues: {
            email: '',
            name: '',
        }
    })

    useEffect(() => {
        // Check if user has already subscribed or closed the dialog
        const hasSubscribed = localStorage.getItem('newsletter_subscribed')
        const hasClosed = sessionStorage.getItem('newsletter_closed')

        if (!hasSubscribed && !hasClosed) {
            // Show dialog after 2 seconds
            const timer = setTimeout(() => {
                setIsOpen(true)
            }, 2000)

            return () => clearTimeout(timer)
        }
    }, [])

    const handleClose = () => {
        setIsOpen(false)
        // Mark as closed for this session
        sessionStorage.setItem('newsletter_closed', 'true')
    }

    const onSubmit = async (data: NewsletterFormData) => {
        setIsSubmitting(true)

        try {
            const response = await fetch('/api/newsletter/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            const result = await response.json()

            if (response.ok) {
                toast.success('Successfully subscribed!', {
                    description: 'Thank you for subscribing to our newsletter.',
                    position: 'top-right',
                })

                // Mark as subscribed permanently
                localStorage.setItem('newsletter_subscribed', 'true')
                setIsOpen(false)
                form.reset()
            } else {
                toast.error('Subscription failed', {
                    description: result.message || 'Please try again later.',
                    position: 'top-right',
                })
            }
        } catch (error) {
            console.error('Error subscribing:', error)
            toast.error('An error occurred', {
                description: 'Please try again later.',
                position: 'top-right',
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={() => { }}>
            <DialogContent
                className="sm:max-w-md w-[calc(100vw-2rem)] sm:w-full rounded-2xl p-6 overflow-hidden backdrop-blur-lg fixed bottom-4 right-4 top-auto left-auto translate-x-0 translate-y-0 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom-4 data-[state=closed]:slide-out-to-right-4 data-[state=open]:slide-in-from-bottom-4 data-[state=open]:slide-in-from-right-4 z-[100]"
                onPointerDownOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
                onInteractOutside={(e) => e.preventDefault()}
            >
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <DialogHeader className='gap-2 '>
                            <div className="flex items-center gap-2">
                                <Icon icon="mdi:email-newsletter" className="w-6 h-6 text-primary" />
                                <DialogTitle className='text-xl'>Subscribe to Our Newsletter</DialogTitle>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Get the latest updates and exclusive offers delivered to your inbox.
                            </p>
                        </DialogHeader>

                        <div className="grid gap-4 mt-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                placeholder='Your Name'
                                                {...field}
                                                className='py-5 rounded-lg px-4 border-[1.5px]'
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
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder='Your Email'
                                                {...field}
                                                className='py-5 rounded-lg px-4 border-[1.5px]'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className='flex gap-3 mt-6'>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleClose}
                                className='flex-1 rounded-lg py-5'
                            >
                                Maybe Later
                            </Button>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className='flex-1 rounded-lg py-5'
                            >
                                {isSubmitting ? (
                                    <>
                                        <Icon icon="eos-icons:loading" className="w-5 h-5 mr-2" />
                                        Subscribing...
                                    </>
                                ) : (
                                    <>
                                        Subscribe
                                        <Icon icon="ph:paper-plane-tilt-light" className="w-5 h-5 ml-2" />
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
                <BorderBeam colorFrom='#3b82f6' colorTo='#8b5cf6' duration={4} size={200} />
            </DialogContent>
        </Dialog>
    )
}
