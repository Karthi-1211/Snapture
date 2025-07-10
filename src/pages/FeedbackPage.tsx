import { useState } from "react";
import { Star, Send, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const FeedbackPage = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedback: '',
    suggestion: ''
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
          feedback: formData.feedback,
          suggestion: formData.suggestion,
          rating: rating,
          subject: 'Snapture Feedback Form',
        }),
      });

      const result = await response.json();
      if (result.success) {
        toast.success('Thank you for your feedback! It has been sent successfully.');
        setFormData({ name: '', email: '', feedback: '', suggestion: '' });
        setRating(0);
      } else {
        toast.error('Failed to send feedback. Please try again later.');
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
      {/* Enhanced Particle Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="animate-particle-float bg-indigo-300/30 w-2 h-2 rounded-full absolute top-10 left-20"></div>
        <div className="animate-particle-float bg-pink-300/30 w-3 h-3 rounded-full absolute top-40 right-30 delay-1000"></div>
        <div className="animate-particle-float bg-purple-300/30 w-2 h-2 rounded-full absolute bottom-20 left-40 delay-2000"></div>
        <div className="animate-particle-float bg-blue-300/30 w-3 h-3 rounded-full absolute bottom-10 right-50 delay-3000"></div>
        <div className="animate-particle-float bg-yellow-300/30 w-2 h-2 rounded-full absolute top-60 left-60 delay-1500"></div>
        <div className="animate-particle-float bg-pink-400/30 w-3 h-3 rounded-full absolute bottom-30 right-20 delay-2500"></div>
      </div>

      <Navigation />
      
      <main className="flex-1 py-24 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Hero Section with Parallax Effect and Enhanced Animation */}
          <div className="text-center mb-24 animate-in slide-in-from-top duration-1200 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-pink-500/20 transform -skew-y-6 scale-110 animate-pulse-slow"></div>
            <div className="flex justify-center mb-6">
              <Heart className="h-20 w-20 text-pink-600 animate-pulse transform hover:scale-110 transition-all duration-500" />
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight relative z-10">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse-text">
                Your Feedback Matters
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-800 max-w-3xl mx-auto leading-relaxed relative z-10">
              Help shape the future of Snapture! Share your thoughts, suggestions, and experiences to make it even better.
            </p>
          </div>

          {/* Form with Solid Background and Slide-In Animation */}
          <Card className="p-8 bg-white shadow-2xl border border-indigo-200 rounded-3xl transform animate-in slide-in-from-left duration-1000 delay-200">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Rating Section with Staggered Animation */}
              <div className="text-center animate-in zoom-in duration-800 delay-400">
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">Rate Your Experience</h2>
                <div className="flex justify-center space-x-2 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`p-2 transition-all duration-300 transform hover:scale-125 hover:rotate-12 ${
                        star <= (hoverRating || rating) 
                          ? 'text-yellow-400' 
                          : 'text-gray-300'
                      } animate-in zoom-in duration-800 delay-${400 + star * 100}`}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                    >
                      <Star className="h-10 w-10 fill-current" />
                    </button>
                  ))}
                </div>
                <p className="text-gray-700 text-lg animate-in fade-in duration-800 delay-900">
                  {rating === 0 && "Please rate your experience"}
                  {rating === 1 && "Poor - We'll work harder to impress you!"}
                  {rating === 2 && "Fair - Thanks for your input!"}
                  {rating === 3 && "Good - Glad you liked it!"}
                  {rating === 4 && "Great - We're thrilled you enjoyed it!"}
                  {rating === 5 && "Excellent - You're our star!"}
                </p>
              </div>

              {/* Form Fields with Staggered Animations */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="group animate-in slide-in-from-left duration-800 delay-1000">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border-gray-200 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 group-hover:shadow-glow rounded-md"
                    placeholder="Your name"
                  />
                </div>
                <div className="group animate-in slide-in-from-right duration-800 delay-1100">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
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
              
              <div className="group animate-in slide-in-from-left duration-800 delay-1200">
                <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Feedback
                </label>
                <Textarea
                  id="feedback"
                  name="feedback"
                  value={formData.feedback}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full border-gray-200 focus:ring-pink-500 focus:border-pink-500 transition-all duration-300 group-hover:shadow-glow rounded-md"
                  placeholder="Share your experience with Snapture..."
                />
              </div>
              
              <div className="group animate-in slide-in-from-right duration-800 delay-1300">
                <label htmlFor="suggestion" className="block text-sm font-medium text-gray-700 mb-2">
                  Suggestions for Improvement
                </label>
                <Textarea
                  id="suggestion"
                  name="suggestion"
                  value={formData.suggestion}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full border-gray-200 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 group-hover:shadow-glow rounded-md"
                  placeholder="Any features or improvements you'd love to see?"
                />
              </div>
              
              <div className="text-center animate-in zoom-in duration-800 delay-1400">
                <Button 
                  type="submit" 
                  size="lg"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-4 transform hover:scale-105 hover:rotate-2 transition-all duration-500 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="mr-2 h-5 w-5 animate-bounce" />
                  {isSubmitting ? 'Sending...' : 'Submit Feedback'}
                </Button>
              </div>
            </form>
          </Card>

          {/* Thank You Section with Slide-In Animation */}
          <div className="mt-16 text-center bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 rounded-3xl p-12 text-white shadow-2xl relative overflow-hidden animate-in slide-in-from-bottom duration-1000 delay-1600">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-pink-500/20 animate-pulse-slow"></div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight relative z-10">Thank You!</h2>
            <p className="text-xl md:text-2xl mb-6 relative z-10">
              Your feedback fuels our passion to create the ultimate photobooth experience.
            </p>
            <p className="text-indigo-100 relative z-10">
              Every star, comment, and suggestion helps us shine brighter for you.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FeedbackPage;