
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Header from '@/components/Header';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { GitHub, Linkedin } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

type FormData = {
  name: string;
  email: string;
  message: string;
};

const Contact = () => {
  const form = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Form submitted:', data);
    toast.success('Message sent successfully! We\'ll get back to you soon.');
    form.reset();
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={() => {}} />
      
      <main className="container max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Get in Touch</h1>
            <p className="text-muted-foreground">
              Have questions or feedback? We'd love to hear from you!
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
                <p className="text-muted-foreground">
                  Fill out the form and our team will get back to you as soon as possible.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/Ashar086"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700 transition-colors"
                  >
                    <GitHub size={24} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/muhammad-ashar-ishfaq/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-500 transition-colors"
                  >
                    <Linkedin size={24} />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-card p-6 rounded-xl shadow-md border">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} required />
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your.email@example.com" {...field} required />
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
                          <Textarea placeholder="Your message..." rows={5} {...field} required />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 animate-pulse"
                  >
                    {isSubmitting ? 'Sending...' : 'Submit'}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
