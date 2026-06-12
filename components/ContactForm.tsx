"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n/context";
import { BRAND } from "@/lib/constants";

interface FormData {
  name: string;
  email: string;
  service: string;
  message: string;
}

export default function ContactForm() {
  const { t } = useLanguage();
  const c = t.contact;
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setSubmitError(false);
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${BRAND.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          service: data.service,
          message: data.message,
          _subject: `Nueva consulta web — ${data.name}`,
          _template: "table",
          _captcha: "false",
        }),
      });
      if (!res.ok) throw new Error(`FormSubmit responded ${res.status}`);
      setSubmitted(true);
    } catch {
      setSubmitError(true);
    }
  };

  const inputClass =
    "w-full font-dmsans text-sm text-text bg-cream border border-border rounded-xl px-4 py-3 outline-none focus:border-gold transition-colors placeholder:text-text-muted";
  const labelClass = "font-montserrat text-[10px] font-semibold tracking-widest uppercase text-text-soft mb-1.5 block";
  const errorClass = "font-dmsans text-xs text-red-500 mt-1";

  return (
    <div className="bg-cream2 rounded-2xl p-8 border border-border">
      <span className="font-montserrat text-[11px] font-semibold tracking-[0.2em] uppercase text-gold block mb-6">
        {c.formEyebrow}
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
            <h3 className="font-cormorant text-2xl font-medium text-text">{c.successTitle}</h3>
            <p className="font-dmsans text-sm text-text-soft max-w-xs">{c.successBody}</p>
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
              <label className={labelClass}>{c.formName}</label>
              <input
                type="text"
                placeholder={c.formNamePlaceholder}
                className={inputClass}
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <p className={errorClass}>{errors.name.message}</p>}
            </div>

            <div>
              <label className={labelClass}>{c.formEmail}</label>
              <input
                type="email"
                placeholder={c.formEmailPlaceholder}
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
              <label className={labelClass}>{c.formService}</label>
              <select
                className={inputClass}
                {...register("service", { required: "Please select an option" })}
                defaultValue=""
              >
                <option value="" disabled>{c.formServicePlaceholder}</option>
                <option value="personal-training">{c.formOptPersonal}</option>
                <option value="hybrid-coaching">{c.formOptHybrid}</option>
                <option value="online-coaching">{c.formOptOnline}</option>
                <option value="not-sure">{c.formOptNotSure}</option>
              </select>
              {errors.service && <p className={errorClass}>{errors.service.message}</p>}
            </div>

            <div>
              <label className={labelClass}>{c.formMessage}</label>
              <textarea
                rows={4}
                placeholder={c.formMessagePlaceholder}
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
              {isSubmitting ? c.formSubmitting : c.formSubmit}
            </button>
            {submitError && (
              <p className="font-dmsans text-sm text-red-500 text-center">{c.formError}</p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
