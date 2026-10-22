import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, Sparkles, CheckCircle2, Award, ThumbsUp, Send } from 'lucide-react';

export default function TestimonialsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    name: '',
    location: '',
    purchase: '',
    rating: 5,
    comment: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost/jewelry-api/testimonials/get_testimonials.php');
      const data = await res.json();
      if (data.success) {
        setReviews(data.testimonials);
      }
    } catch (err) {
      console.error('Error fetching public testimonials:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      // Save Review to Database only (Status: Pending)
      const res = await fetch('http://localhost/jewelry-api/testimonials/manage_testimonial.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: reviewForm.name,
          location: reviewForm.location,
          review: reviewForm.comment,
          rating: reviewForm.rating,
          status: 'Pending'
        })
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setReviewForm({ name: '', location: '', purchase: '', rating: 5, comment: '' });
      } else {
        alert(data.message || 'Failed to submit review');
      }
    } catch (err) {
      console.error('Failed to submit review:', err);
      alert('Error submitting review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white py-16 px-4 pt-24 font-sans">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Animated Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 max-w-3xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Client Stories
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-wide">
            Words From Our <span className="text-amber-400">Patrons</span>
          </h1>
          <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed">
            Discover why generations of families in Jaffna and around the globe trust Atelier Harx for their finest gold, diamond, and bridal jewelry.
          </p>
        </motion.div>

        {/* Trust Overview Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-neutral-900/90 border border-amber-500/20 rounded-3xl p-8 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center shadow-2xl backdrop-blur-sm"
        >
          <div className="space-y-1 border-b md:border-b-0 md:border-r border-neutral-800 pb-4 md:pb-0">
            <div className="flex justify-center items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400" />
              ))}
            </div>
            <p className="text-2xl font-serif font-bold text-white pt-2">4.9 / 5.0</p>
            <p className="text-xs text-gray-400 font-light">Overall Customer Rating</p>
          </div>

          <div className="space-y-1 border-b md:border-b-0 md:border-r border-neutral-800 pb-4 md:pb-0">
            <div className="flex justify-center items-center gap-2 text-amber-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <p className="text-2xl font-serif font-bold text-white pt-2">100% Certified</p>
            <p className="text-xs text-gray-400 font-light">22K & VVS Hallmark Guarantee</p>
          </div>

          <div className="space-y-1">
            <div className="flex justify-center items-center gap-2 text-amber-400">
              <Award className="w-6 h-6" />
            </div>
            <p className="text-2xl font-serif font-bold text-white pt-2">20+ Years</p>
            <p className="text-xs text-gray-400 font-light">Goldsmithing Legacy in Jaffna</p>
          </div>
        </motion.div>

        {/* Approved Testimonials Grid */}
        {loading ? (
          <div className="py-16 text-center text-xs text-neutral-500">Loading approved client reviews...</div>
        ) : reviews.length > 0 ? (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {reviews.map((rev) => (
              <motion.div
                key={rev.id}
                variants={itemVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-neutral-900/90 border border-neutral-800 hover:border-amber-500/40 rounded-2xl p-8 space-y-6 transition duration-300 flex flex-col justify-between shadow-xl relative overflow-hidden"
              >
                <Quote className="absolute top-4 right-4 w-12 h-12 text-amber-500/10 pointer-events-none" />

                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(Number(rev.rating) || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-sm text-gray-300 leading-relaxed font-light italic">
                    "{rev.review}"
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-serif font-bold text-white">{rev.clientName}</h3>
                    <p className="text-xs text-amber-400/80 font-medium">{rev.location || 'Jaffna'}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-semibold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/30">
                      Verified Client
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="py-16 text-center text-xs text-neutral-500 bg-neutral-900/50 rounded-3xl border border-neutral-800 max-w-2xl mx-auto">
            No approved customer reviews to display right now.
          </div>
        )}

        {/* Review Submission Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-3xl mx-auto w-full bg-neutral-900/90 border border-amber-500/30 rounded-2xl p-6 sm:p-9 space-y-6 shadow-2xl"
        >
          <div className="text-center space-y-3">
            <ThumbsUp className="w-9 h-9 text-amber-400 mx-auto" />
            <div className="space-y-2 max-w-xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">Share Your Review</h2>
              <p className="text-xs sm:text-sm text-gray-300 font-light">
                Submit your experience with us. Your review will be submitted directly to our system for approval.
              </p>
            </div>
          </div>

          {submitted ? (
            <div role="status" className="bg-emerald-950/40 border border-emerald-500/40 p-6 rounded-2xl text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="text-base font-serif font-bold text-white">Thank You for Your Review!</h3>
              <p className="text-xs text-emerald-200 font-light max-w-md mx-auto leading-relaxed">
                Your feedback has been successfully submitted to our admin team and will be displayed live once approved.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 text-xs font-bold text-amber-400 hover:underline cursor-pointer"
              >
                Submit another review
              </button>
            </div>
          ) : (
            <form onSubmit={handleReviewSubmit} className="space-y-4 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="review-name" className="text-xs text-neutral-300 font-medium">Your name *</label>
                  <input
                    id="review-name"
                    type="text"
                    required
                    value={reviewForm.name}
                    onChange={(event) => setReviewForm({ ...reviewForm, name: event.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-500 rounded-lg px-3.5 py-3 text-white placeholder-neutral-600 outline-none transition"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="review-location" className="text-xs text-neutral-300 font-medium">Your location *</label>
                  <input
                    id="review-location"
                    type="text"
                    required
                    value={reviewForm.location}
                    onChange={(event) => setReviewForm({ ...reviewForm, location: event.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-500 rounded-lg px-3.5 py-3 text-white placeholder-neutral-600 outline-none transition"
                    placeholder="City or country"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="review-purchase" className="text-xs text-neutral-300 font-medium">Jewelry purchased <span className="text-neutral-500">(optional)</span></label>
                <input
                  id="review-purchase"
                  type="text"
                  value={reviewForm.purchase}
                  onChange={(event) => setReviewForm({ ...reviewForm, purchase: event.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-500 rounded-lg px-3.5 py-3 text-white placeholder-neutral-600 outline-none transition"
                  placeholder="For example, a custom gold ring"
                />
              </div>

              <fieldset className="space-y-2">
                <legend className="text-xs text-neutral-300 font-medium">Your rating *</legend>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setReviewForm({ ...reviewForm, rating })}
                      className="p-1 rounded cursor-pointer"
                    >
                      <Star className={`w-6 h-6 transition ${reviewForm.rating >= rating ? 'fill-amber-400 text-amber-400' : 'text-neutral-600'}`} />
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="space-y-1.5">
                <label htmlFor="review-comment" className="text-xs text-neutral-300 font-medium">Your review *</label>
                <textarea
                  id="review-comment"
                  required
                  rows={4}
                  maxLength={1000}
                  value={reviewForm.comment}
                  onChange={(event) => setReviewForm({ ...reviewForm, comment: event.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-500 rounded-lg px-3.5 py-3 text-white placeholder-neutral-600 outline-none transition resize-y"
                  placeholder="How was your experience with us?"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
                <p className="text-[11px] text-neutral-500">Submitted directly for admin approval.</p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-6 py-3 rounded-lg text-xs transition shadow-lg shadow-amber-500/20 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Submitting...' : 'Submit Review'}</span>
                </motion.button>
              </div>
            </form>
          )}
        </motion.div>

      </div>
    </div>
  );
}