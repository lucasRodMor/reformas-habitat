/// <reference types="vite/client" />
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export const ContactForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    // Obtención de variables de entorno de Vite
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Validación de configuración
    if (!serviceId || !templateId || !publicKey) {
      console.error('EmailJS Configuration Error: Missing environment variables.');
      setStatus('error');
      setErrorMessage('Error de configuración: Faltan las variables de entorno de EmailJS (Service ID, Template ID o Public Key).');
      return;
    }

    setStatus('sending');

    try {
      await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current,
        {
          publicKey: publicKey,
        }
      );

      setStatus('success');
      formRef.current.reset();
      
      // Volver al estado inicial después de 5 segundos
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error: any) {
      console.error('EmailJS Error:', error);
      setStatus('error');
      setErrorMessage(
        error?.text || 'Hubo un problema al enviar el mensaje. Por favor, verifica tu conexión e inténtalo de nuevo.'
      );
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 text-zinc-900 shadow-xl border border-zinc-100 w-full">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>
            <h3 className="text-3xl font-serif font-bold mb-3">¡Mensaje Enviado!</h3>
            <p className="text-zinc-500 max-w-xs mx-auto">
              Gracias por contactar con Arquetipo Habitat. Nos pondremos en contacto contigo muy pronto.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-8 text-sm font-bold text-zinc-900 hover:underline decoration-2 underline-offset-4"
            >
              Enviar otro mensaje
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            onSubmit={sendEmail}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  name="user_name"
                  required
                  placeholder="Ej: Juan Pérez"
                  className="w-full bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-zinc-900/5 transition-all placeholder:text-zinc-300"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  name="user_email"
                  required
                  placeholder="juan@ejemplo.com"
                  className="w-full bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-zinc-900/5 transition-all placeholder:text-zinc-300"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                Tipo de Proyecto
              </label>
              <select
                name="project_type"
                required
                className="w-full bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-zinc-900/5 transition-all appearance-none cursor-pointer"
              >
                <option value="reforma_integral">Reforma Integral</option>
                <option value="cocina">Cocina</option>
                <option value="baño">Baño</option>
                <option value="interiorismo">Interiorismo / Decoración</option>
                <option value="otros">Otros</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                Tu Mensaje
              </label>
              <textarea
                name="message"
                required
                rows={4}
                placeholder="Cuéntanos brevemente qué necesitas..."
                className="w-full bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-zinc-900/5 transition-all resize-none placeholder:text-zinc-300"
              />
            </div>

            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 text-red-600 text-sm"
              >
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <p className="leading-tight">{errorMessage}</p>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full bg-zinc-900 text-white py-5 rounded-xl font-bold hover:bg-zinc-800 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-zinc-900/10"
            >
              {status === 'sending' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Enviando solicitud...
                </>
              ) : (
                'Enviar Solicitud'
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};