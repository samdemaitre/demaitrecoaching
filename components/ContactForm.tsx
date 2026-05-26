"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";

interface FormData {
  name: string;
  email: string;
  service: string;
  message: string;
}

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
  };

  const inputClass =
    "w-full font-dmsans text-sm text-text bg-cream border border-border rounded-xl px-4 py-3 outline-none focus:border-gold transition-colors placeholder:text-text-muted";
  const labelClass = "font-montserrat text-[10px] font-semibold tracking-widest uppercase text-text-soft mb-1.5 block";
  const errorClass = "font-dmsans text-xs text-red-500 mt-1";

  return (
    <div className="bg-cream2 rounded-2xl p-8 border border-border">
      <span className="font-montserrat text-[11px] font-semibold tracking-[0.2em] uppercase text-gold block mb-6">
        Send a Message
      </span>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-4 py-10 text-center"
          >
            <div className="w-14 h-14 rounded-full bg-green-dark flex items-center justify-center">
              <svg className="w-7 h-7 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-cormorant text-2xl font-medium text-text">Message Sent</h3>
            <p className="font-dmsans text-sm text-text-soft max-w-xs">
              Thank you for reaching out. Sam will be in touch within 24 hours.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div>
              <label className={labelClass}>Full Name</label>
              <input
                type="text"
                placeholder="Your name"
                className={inputClass}
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <p className={errorClass}>{errors.name.message}</p>}
            </div>

            <div>
              <label className={labelClass}>Email Address</label>
              <input
                type="email"
                placeholder="your@email.com"
                className={inputClass}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email",
                  },
                })}
              />
              {errors.email && <p className={errorClass}>{errors.email.message}</p>}
            </div>

            <div>
              <label className={labelClass}>I&apos;m Interested In</label>
              <select
                className={inputClass}
                {...register("service", { required: "Please select an option" })}
                defaultValue=""
              >
                <option value="" disabled>Select a service...</option>
                <option value="personal-training">Personal Training</option>
                <option value="hybrid-coaching">Hybrid Coaching</option>
                <option value="online-coaching">Online Coaching</option>
                <option value="not-sure">Not sure yet</option>
              </select>
              {errors.service && <p className={errorClass}>{errors.service.message}</p>}
            </div>

            <div>
              <label className={labelClass}>Message</label>
              <textarea
                rows={4}
                placeholder="Tell Sam a bit about your goals..."
                className={`${inputClass} resize-none`}
                {...register("message", { required: "Please include a message" })}
              />
              {errors.message && <p className={errorClass}>{errors.message.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full font-montserrat text-xs font-semibold tracking-widest uppercase bg-green-dark text-cream rounded-full py-4 hover:bg-green-mid transition-colors disabled:opacity-60 mt-2"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
