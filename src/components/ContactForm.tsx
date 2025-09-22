import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Mail, User, MessageSquare, Building, Globe, FileText, HelpCircle } from "lucide-react";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  telegram: z.string().optional(),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  website: z.string().url("Please enter a valid website URL").optional().or(z.literal("")),
  businessUseCase: z.string().min(10, "Please provide at least 10 characters describing your use case"),
  hearAboutUs: z.string().min(1, "Please select how you heard about us"),
});

type FormData = z.infer<typeof formSchema>;

const hearAboutUsOptions = [
  "Search Engine",
  "Social Media",
  "Referral",
  "Advertisement",
  "Blog/Article",
  "Conference/Event",
  "Partner",
  "Other"
];

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      telegram: "",
      company: "",
      website: "",
      businessUseCase: "",
      hearAboutUs: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log("Form submitted:", data);
    
    toast({
      title: "Form submitted successfully!",
      description: "We will respond to your inquiry within 24 hours.",
    });
    
    form.reset();
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Contact Us
          </h1>
          <div className="space-y-2 text-sm">
            <p className="text-form-label">
              Please complete the form below with as much detail as possible.
            </p>
            <p className="text-form-description">
              If you want to talk to someone urgently, then you can contact us on our{" "}
              <a href="#" className="text-accent hover:underline">Telegram</a>
            </p>
            <p className="text-form-description">
              If you haven't, try our APIs, check{" "}
              <a href="#" className="text-accent hover:underline">ide.bitquery.io</a>
            </p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-form-label flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email (Business Email preferable) *
                  </FormLabel>
                  <FormDescription className="text-form-description">
                    We will respond to this Enquiry form within 24 hours. Kindly monitor your email for our reply.
                  </FormDescription>
                  <FormControl>
                    <Input 
                      placeholder="your.email@company.com" 
                      className="bg-input-background text-background border-border"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-form-error" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-form-label flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Name *
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Your full name" 
                      className="bg-input-background text-background border-border"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-form-error" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="telegram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-form-label flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Telegram Username
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="@yourusername" 
                      className="bg-input-background text-background border-border"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-form-error" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-form-label flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    Company name *
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Your company name" 
                      className="bg-input-background text-background border-border"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-form-error" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-form-label flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Company Website
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://yourcompany.com" 
                      className="bg-input-background text-background border-border"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-form-error" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="businessUseCase"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-form-label flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    What is your business use case? What data do you need, and how do you plan to use it? *
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Please describe your business use case, what data you need, and how you plan to use it..."
                      className="bg-input-background text-background border-border min-h-[120px] resize-y"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-form-error" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hearAboutUs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-form-label flex items-center gap-2">
                    <HelpCircle className="w-4 h-4" />
                    How Did You Hear About Us? *
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-input-background text-background border-border">
                        <SelectValue placeholder="Please Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-popover border-border">
                      {hearAboutUsOptions.map((option) => (
                        <SelectItem 
                          key={option} 
                          value={option}
                          className="focus:bg-accent focus:text-accent-foreground"
                        >
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-form-error" />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8 py-3 w-full md:w-auto"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}