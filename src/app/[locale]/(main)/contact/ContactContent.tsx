'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Linkedin, Send, ArrowRight, Calendar } from 'lucide-react';
import { Container, ButtonLink } from '@/components/ui';
import { fadeInUp, staggerContainer, staggerItem, slideInLeft, slideInRight, defaultViewport } from '@/lib/animations';

const roomOptions = ['1-20', '21-50', '51-100', '100+'];

export function ContactContent() {
  const t = useTranslations('contact');
  const prefersReducedMotion = useReducedMotion();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    hotelName: '',
    rooms: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Log form data (no backend yet)
    console.log('Form submitted:', formData);

    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-brand-light/30 to-white pt-32 pb-16 md:pt-40 md:pb-24">
        <Container>
          <motion.div
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            animate="visible"
            variants={fadeInUp}
            className="text-center"
          >
            <h1 className="text-3xl font-bold tracking-tight text-brand-dark md:text-4xl lg:text-5xl">
              {t('hero.title')}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600">
              {t('hero.subtitle')}
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left Column - Form */}
            <motion.div
              initial={prefersReducedMotion ? 'visible' : 'hidden'}
              whileInView="visible"
              variants={slideInLeft}
              viewport={defaultViewport}
            >
              <h2 className="text-2xl font-bold text-brand-dark mb-6">
                {t('form.title')}
              </h2>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-2xl bg-brand-primary/10 p-8 text-center"
                >
                  <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark">
                    {t('form.success.title')}
                  </h3>
                  <p className="mt-2 text-zinc-600">
                    {t('form.success.message')}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-zinc-700 mb-1">
                      {t('form.fields.name')} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-colors"
                      placeholder={t('form.placeholders.name')}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-zinc-700 mb-1">
                      {t('form.fields.email')} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-colors"
                      placeholder={t('form.placeholders.email')}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-zinc-700 mb-1">
                      {t('form.fields.phone')}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-colors"
                      placeholder={t('form.placeholders.phone')}
                    />
                  </div>

                  {/* Hotel Name */}
                  <div>
                    <label htmlFor="hotelName" className="block text-sm font-medium text-zinc-700 mb-1">
                      {t('form.fields.hotelName')} *
                    </label>
                    <input
                      type="text"
                      id="hotelName"
                      name="hotelName"
                      required
                      value={formData.hotelName}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-colors"
                      placeholder={t('form.placeholders.hotelName')}
                    />
                  </div>

                  {/* Rooms */}
                  <div>
                    <label htmlFor="rooms" className="block text-sm font-medium text-zinc-700 mb-1">
                      {t('form.fields.rooms')}
                    </label>
                    <select
                      id="rooms"
                      name="rooms"
                      value={formData.rooms}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-colors bg-white"
                    >
                      <option value="">{t('form.placeholders.rooms')}</option>
                      {roomOptions.map((option) => (
                        <option key={option} value={option}>
                          {option} {t('form.rooms')}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-zinc-700 mb-1">
                      {t('form.fields.message')} *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-colors resize-none"
                      placeholder={t('form.placeholders.message')}
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={!prefersReducedMotion ? { scale: 1.02 } : {}}
                    whileTap={!prefersReducedMotion ? { scale: 0.98 } : {}}
                    className="w-full bg-brand-primary text-white font-medium py-3 px-6 rounded-lg hover:bg-brand-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>{t('form.submitting')}</span>
                    ) : (
                      <>
                        {t('form.submit')}
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </motion.div>

            {/* Right Column - Contact Info */}
            <motion.div
              initial={prefersReducedMotion ? 'visible' : 'hidden'}
              whileInView="visible"
              variants={slideInRight}
              viewport={defaultViewport}
            >
              <h2 className="text-2xl font-bold text-brand-dark mb-6">
                {t('info.title')}
              </h2>

              {/* Contact Card */}
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm mb-8">
                <motion.div
                  initial={prefersReducedMotion ? 'visible' : 'hidden'}
                  whileInView="visible"
                  variants={staggerContainer}
                  viewport={defaultViewport}
                  className="space-y-5"
                >
                  {/* Email */}
                  {/* eslint-disable-next-line */}
                  <motion.a
                    variants={staggerItem}
                    href="mailto:contact@trigger-flow.com"
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-brand-light/50 transition-colors group"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/10 group-hover:bg-brand-primary/20 transition-colors">
                      <Mail className="h-6 w-6 text-brand-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-zinc-500">{t('info.email')}</p>
                      <p className="font-medium text-brand-dark">contact@trigger-flow.com</p>
                    </div>
                  </motion.a>

                  {/* Phone */}
                  {/* eslint-disable-next-line */}
                  <motion.a
                    variants={staggerItem}
                    href="tel:+33554544852"
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-brand-light/50 transition-colors group"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/10 group-hover:bg-brand-primary/20 transition-colors">
                      <Phone className="h-6 w-6 text-brand-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-zinc-500">{t('info.phone')}</p>
                      <p className="font-medium text-brand-dark">+33 (0)5 54 54 48 52</p>
                    </div>
                  </motion.a>

                  {/* Address */}
                  <motion.div
                    variants={staggerItem}
                    className="flex items-center gap-4 p-3 rounded-xl"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/10">
                      <MapPin className="h-6 w-6 text-brand-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-zinc-500">{t('info.address')}</p>
                      <p className="font-medium text-brand-dark">Toulouse, France</p>
                    </div>
                  </motion.div>

                  {/* Hours */}
                  <motion.div
                    variants={staggerItem}
                    className="flex items-center gap-4 p-3 rounded-xl"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/10">
                      <Clock className="h-6 w-6 text-brand-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-zinc-500">{t('info.hours')}</p>
                      <p className="font-medium text-brand-dark">{t('info.hoursValue')}</p>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Social Links */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-4">
                  {t('info.social')}
                </h3>
                {/* eslint-disable-next-line */}
                <a
                  href="https://www.linkedin.com/company/triggerflow"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-200 hover:border-brand-primary hover:text-brand-primary transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="text-sm font-medium">LinkedIn</span>
                </a>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Demo Section */}
      <section className="py-16 md:py-24 bg-zinc-50">
        <Container>
          <motion.div
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            variants={fadeInUp}
            viewport={defaultViewport}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Calendar className="h-8 w-8 text-brand-primary" />
            </div>
            <h2 className="text-2xl font-bold text-brand-dark md:text-3xl">
              {t('demo.title')}
            </h2>
            <p className="mt-4 text-zinc-600">
              {t('demo.description')}
            </p>
            <div className="mt-8">
              <ButtonLink
                href="https://app.lemcal.com/@trigger-flow/demo"
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="lg"
                className="gap-2"
              >
                {t('demo.cta')}
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </motion.div>
        </Container>
      </section>
    </main>
  );
}
