import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: '764ec9a4-f4f7-4da3-8eb6-2cb0f0e6a61d',
          name: formData.name,
          email: formData.email,
          subject: 'Snapture Contact Form',
          message: formData.message,
        }),
      });

      const result = await response.json();
      if (result.success) {
        toast.success('Message sent successfully! We\'ll get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        toast.error('Failed to send message. Please try again later.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 font-inter relative overflow-hidden">
      {/* Subtle Particle Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="animate-particle-float bg-indigo-300/20 w-2 h-2 rounded-full absolute top-10 left-20"></div>
        <div className="animate-particle-float bg-pink-300/20 w-3 h-3 rounded-full absolute top-40 right-30 delay-1000"></div>
        <div className="animate-particle-float bg-purple-300/20 w-2 h-2 rounded-full absolute bottom-20 left-40 delay-2000"></div>
        <div className="animate-particle-float bg-blue-300/20 w-3 h-3 rounded-full absolute bottom-10 right-50 delay-3000"></div>
      </div>

      <Navigation />
      
      <main className="flex-1 py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Hero Section with Parallax Effect */}
          <div className="text-center mb-24 animate-in fade-in zoom-in duration-1200 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-pink-500/20 transform -skew-y-6 scale-110"></div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight relative z-10">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse-text">
                Connect with Us
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-800 max-w-4xl mx-auto leading-relaxed relative z-10">
              Got questions, ideas, or need assistance? Reach out, and let's create something extraordinary together!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Contact Form with Solid Background and Slide-In Animation */}
            <Card className="p-8 bg-white shadow-2xl border border-indigo-200 rounded-3xl transform animate-in slide-in-from-left duration-1000 delay-200">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="group animate-in fade-in duration-800 delay-400">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full border-gray-200 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 group-hover:shadow-glow rounded-md"
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="group animate-in fade-in duration-800 delay-500">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full border-gray-200 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 group-hover:shadow-glow rounded-md"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div className="group animate-in fade-in duration-800 delay-600">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <Input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full border-gray-200 focus:ring-pink-500 focus:border-pink-500 transition-all duration-300 group-hover:shadow-glow rounded-md"
                    placeholder="What's this about?"
                  />
                </div>
                
                <div className="group animate-in fade-in duration-800 delay-700">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full border-gray-200 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 group-hover:shadow-glow rounded-md"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>
                
                <div className="text-center animate-in fade-in duration-800 delay-800">
                  <Button 
                    type="submit" 
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold py-3 transform hover:scale-105 transition-all duration-500 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="mr-2 h-5 w-5 animate-bounce" />
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </div>
              </form>
            </Card>

            {/* Contact Information with Slide-In Animation */}
            <div className="space-y-8 animate-in slide-in-from-right duration-1000 delay-400">
              <Card className="p-8 bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-700 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-pink-500/20 animate-pulse-slow"></div>
                <h2 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight relative z-10">Contact Information</h2>
                <p className="text-indigo-100 mb-8 relative z-10">
                  We're here to help you capture every moment. Reach out any way you prefer!
                </p>
                
                <div className="space-y-6 relative z-10">
                  <div className="group flex items-center space-x-4 transform hover:scale-105 transition-all duration-500">
                    <div className="bg-white/20 p-3 rounded-full group-hover:bg-white/30">
                      <Mail className="h-6 w-6 group-hover:animate-bounce" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <p className="text-indigo-100">balukarthik1308@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="group flex items-center space-x-4 transform hover:scale-105 transition-all duration-500">
                    <div className="bg-white/20 p-3 rounded-full group-hover:bg-white/30">
                      <Phone className="h-6 w-6 group-hover:animate-bounce" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Phone</h3>
                      <p className="text-indigo-100">+91 9515607788</p>
                    </div>
                  </div>
                  
                  <div className="group flex items-center space-x-4 transform hover:scale-105 transition-all duration-500">
                    <div className="bg-white/20 p-3 rounded-full group-hover:bg-white/30">
                      <MapPin className="h-6 w-6 group-hover:animate-bounce" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Location</h3>
                      <p className="text-indigo-100">Visakhapatnam, India</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* FAQ Section with Solid Background and Fade-In Animation */}
              <Card className="p-8 bg-white shadow-2xl border border-indigo-200 rounded-3xl animate-in fade-in duration-1000 delay-600">
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6 tracking-tight">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  <div className="group p-4 rounded-xl hover:bg-indigo-50/50 transition-all duration-500">
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-indigo-600">Is Snapture free to use?</h3>
                    <p className="text-gray-700">Yes, Snapture is completely free with all features available.</p>
                  </div>
                  
                  <div className="group p-4 rounded-xl hover:bg-purple-50/50 transition-all duration-500">
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-purple-600">Do I need to install anything?</h3>
                    <p className="text-gray-700">No installation needed! Snapture runs directly in your browser.</p>
                  </div>
                  
                  <div className="group p-4 rounded-xl hover:bg-pink-50/50 transition-all duration-500">
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-pink-600">Can I use it on mobile devices?</h3>
                    <p className="text-gray-700">Absolutely! Our responsive design shines on phones and tablets.</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactPage;