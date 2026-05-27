import { useState } from "react";
import { X, Building2, Mail, Phone, User, MessageSquare, Loader2, Check } from "lucide-react";
import { z } from "zod";
import { submitSponsorship } from "@/lib/firebaseService";
import { useToast } from "@/hooks/use-toast";

// Validation schema for sponsor form
const sponsorSchema = z.object({
  organizationName: z.string()
    .trim()
    .min(1, { message: "Organization name is required" })
    .max(200, { message: "Organization name must be 200 characters or less" }),
  contactName: z.string()
    .trim()
    .min(1, { message: "Contact name is required" })
    .max(100, { message: "Name must be 100 characters or less" })
    .regex(/^[a-zA-Z\s\-'\.]+$/, { message: "Please enter a valid name" }),
  email: z.string()
    .trim()
    .email({ message: "Enter a valid email" })
    .max(255, { message: "Email must be 255 characters or less" }),
  phone: z.string()
    .trim()
    .max(20, { message: "Phone must be 20 characters or less" })
    .optional()
    .or(z.literal("")),
  sponsorshipLevel: z.string()
    .trim()
    .min(1, { message: "Please select a sponsorship level" }),
  interests: z.array(z.string()),
  message: z.string()
    .trim()
    .max(2000, { message: "Message must be 2000 characters or less" })
    .optional()
    .or(z.literal("")),
});

interface SponsorFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const SponsorForm = ({ isOpen, onClose }: SponsorFormProps) => {
  const [formData, setFormData] = useState({
    organizationName: "",
    contactName: "",
    email: "",
    phone: "",
    sponsorshipLevel: "",
    interests: [] as string[],
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  // Check if all required fields are filled and valid
  const isFormValid = () => {
    return (
      formData.organizationName.trim().length > 0 &&
      formData.contactName.trim().length > 0 &&
      formData.email.trim().length > 0 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()) &&
      formData.sponsorshipLevel.trim().length > 0
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    const result = sponsorSchema.safeParse(formData);
    if (!result.success) {
      const firstError = result.error.issues[0];
      toast({
        title: "Please check your information",
        description: firstError.message,
        variant: "destructive",
      });
      return;
    }
    
    // Submit to Firebase
    setIsSubmitting(true);
    try {
      await submitSponsorship(result.data as any);
      setSubmitted(true);
      toast({
        title: "Thank you for your interest!",
        description: "We'll review your sponsorship inquiry and get back to you soon.",
      });
      
      // Reset form after 2 seconds and close
      setTimeout(() => {
        setFormData({
          organizationName: "",
          contactName: "",
          email: "",
          phone: "",
          sponsorshipLevel: "",
          interests: [],
          message: "",
        });
        setSubmitted(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Something went wrong",
        description: error instanceof Error ? error.message : "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCheckboxChange = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background border border-border rounded-3xl shadow-2xl p-8 md:p-12">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label="Close form"
        >
          <X className="w-5 h-5 text-foreground" />
        </button>

        {/* Header */}
        <div className="mb-8">
          <p className="text-primary font-semibold text-xs tracking-widest uppercase mb-3">
            Partnership Inquiry
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            Become a Sponsor
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Support storytelling that centers lived experience. Partner with us to amplify voices, 
            challenge systems, and build a more inclusive world.
          </p>
        </div>

        {submitted ? (
          /* Success Message */
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground mb-2">
              Thank you for your interest!
            </h3>
            <p className="text-muted-foreground">
              We've received your sponsorship inquiry and will be in touch soon.
            </p>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} className="space-y-6">
          {/* Organization Name */}
          <div>
            <label htmlFor="organizationName" className="block text-sm font-medium text-foreground mb-2">
              Organization Name <span className="text-primary">*</span>
            </label>
            <div className="relative">
              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                id="organizationName"
                required
                value={formData.organizationName}
                onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-muted border-2 border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 text-foreground placeholder:text-muted-foreground transition-all"
                placeholder="Your Company or Organization"
                maxLength={200}
                aria-required="true"
              />
            </div>
          </div>

          {/* Contact Name */}
          <div>
            <label htmlFor="contactName" className="block text-sm font-medium text-foreground mb-2">
              Contact Name <span className="text-primary">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                id="contactName"
                required
                value={formData.contactName}
                onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-muted border-2 border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 text-foreground placeholder:text-muted-foreground transition-all"
                placeholder="Your Full Name"
                maxLength={100}
                aria-required="true"
              />
            </div>
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email <span className="text-primary">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-muted border-2 border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 text-foreground placeholder:text-muted-foreground transition-all"
                  placeholder="your@email.com"
                  maxLength={255}
                  aria-required="true"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-muted border-2 border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 text-foreground placeholder:text-muted-foreground transition-all"
                  placeholder="+1 (555) 000-0000"
                  maxLength={20}
                />
              </div>
            </div>
          </div>

          {/* Sponsorship Level */}
          <div>
            <label htmlFor="sponsorshipLevel" className="block text-sm font-medium text-foreground mb-2">
              Sponsorship Interest <span className="text-primary">*</span>
            </label>
            <select
              id="sponsorshipLevel"
              required
              value={formData.sponsorshipLevel}
              onChange={(e) => setFormData({ ...formData, sponsorshipLevel: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-muted border-2 border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 text-foreground transition-all"
              aria-required="true"
            >
              <option value="">Select a sponsorship level</option>
              <option value="presenting">Presenting Sponsor</option>
              <option value="season">Season Sponsor</option>
              <option value="series">Series Sponsor</option>
              <option value="episode">Episode Sponsor</option>
              <option value="custom">Custom Partnership</option>
            </select>
          </div>

          {/* Areas of Interest */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Areas of Interest
            </label>
            <div className="space-y-2">
              {[
                "Brand visibility & awareness",
                "DEI & accessibility initiatives",
                "Content co-creation",
                "Event sponsorship",
                "Community partnerships",
                "Thought leadership opportunities",
              ].map((interest) => (
                <label key={interest} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={formData.interests.includes(interest)}
                    onChange={() => handleCheckboxChange(interest)}
                    className="w-5 h-5 rounded border-2 border-border text-primary focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 transition-all cursor-pointer"
                  />
                  <span className="text-sm text-foreground/90 group-hover:text-foreground transition-colors">
                    {interest}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
              Tell us about your sponsorship goals
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-muted border-2 border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 text-foreground placeholder:text-muted-foreground transition-all resize-none"
                placeholder="Share your vision for partnership and what you hope to achieve..."
                maxLength={2000}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="submit"
              disabled={isSubmitting || !isFormValid()}
              className="flex-1 inline-flex items-center justify-center gap-2 text-sm font-semibold bg-primary text-primary-foreground px-6 py-3 rounded-full hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Inquiry"
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 text-sm font-medium text-foreground bg-muted px-6 py-3 rounded-full hover:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </div>
        </form>
        )}
      </div>
    </div>
  );
};

export default SponsorForm;
