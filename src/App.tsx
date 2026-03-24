/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  DraftingCompass,
  Paintbrush, 
  Layout, 
  CheckCircle2, 
  Phone, 
  Mail, 
  MapPin, 
  ChevronRight, 
  Star, 
  Menu, 
  X,
  ArrowRight,
  Home,
  Bath,
  Utensils,
  User
} from 'lucide-react';
import { cn } from './lib/utils';

// --- Types ---
interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
}

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
}

// --- Constants ---
const SERVICES: Service[] = [
  {
    id: 'kitchen',
    title: 'Cocinas de Ensueño',
    description: 'Diseño funcional y estético para el corazón de tu hogar.',
    icon: <Utensils className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&q=80&w=1600'
  },
  {
    id: 'bathroom',
    title: 'Baños Modernos',
    description: 'Espacios de relax con los mejores materiales y acabados.',
    icon: <Bath className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'full',
    title: 'Reformas Integrales',
    description: 'Transformamos tu vivienda por completo con llave en mano.',
    icon: <Home className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'design',
    title: 'Interiorismo',
    description: 'Asesoramiento experto para crear ambientes únicos.',
    icon: <Layout className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800'
  }
];

const PROJECTS: Project[] = [
  { id: 1, title: 'Loft Industrial', category: 'Integral', image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=600' },
  { id: 2, title: 'Cocina Minimalista', category: 'Cocina', image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&q=80&w=600' },
  { id: 3, title: 'Baño Spa', category: 'Baño', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600' },
  { id: 4, title: 'Salón Nórdico', category: 'Interiorismo', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=600' },
];

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      scrolled ? "glass shadow-sm" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-zinc-900 rounded-lg flex items-center justify-center">
            <DraftingCompass className="text-white w-6 h-6" />
          </div>
          <span className="font-serif text-2xl font-bold tracking-tight">Arquetipo Habitat</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {['Inicio', 'Servicios', 'Proyectos'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium hover:text-zinc-600 transition-colors">
              {item}
            </a>
          ))}
          <a href="#contacto" className="bg-zinc-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-zinc-800 transition-all">
            Pide Presupuesto
          </a>
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-zinc-100 p-6 flex flex-col gap-4 md:hidden"
          >
            {['Inicio', 'Servicios', 'Proyectos'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-lg font-medium">
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => (
  <section id="inicio" className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
    <div className="absolute inset-0 z-0">
      <video 
        autoPlay 
        muted 
        loop 
        playsInline
        className="w-full h-full object-cover"
      >
        <source src="/video-reforma.mp4" type="video/mp4" />
        {/* Fallback image if video fails to load or file is not found yet */}
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1920" 
          alt="Luxury Interior" 
          className="w-full h-full object-cover"
        />
      </video>
      {/* Dynamic overlay: darker on mobile, subtle gradient on desktop */}
      <div className="absolute inset-0 bg-black/40 md:bg-gradient-to-r md:from-white/90 md:via-white/40 md:to-transparent" />
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl"
      >
        <span className="inline-block py-1 px-3 bg-zinc-900 text-white text-[10px] uppercase tracking-widest font-bold rounded-full mb-6">
          Transformaciones Reales
        </span>
        <h1 className="font-serif text-6xl md:text-8xl leading-[0.9] mb-8 text-white md:text-zinc-900">
          Diseñamos el <br />
          <span className="italic">espacio</span> de <br />
          tus sueños.
        </h1>
        <p className="text-lg text-zinc-100 md:text-zinc-600 mb-10 max-w-lg leading-relaxed">
          Especialistas en reformas integrales que combinan funcionalidad, 
          estética y los más altos estándares de calidad. Mira cómo transformamos realidades.
        </p>
        <div className="flex flex-wrap gap-4 mt-8">
          <a href="#proyectos" className="whitespace-nowrap bg-zinc-900 text-white px-8 py-4 rounded-full font-medium flex items-center gap-2 hover:bg-zinc-800 transition-all group shadow-lg">
            Ver Proyectos <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#contacto" className="whitespace-nowrap bg-white/10 backdrop-blur-md border border-white/20 text-white md:text-zinc-900 md:border-zinc-200 md:bg-white px-8 py-4 rounded-full font-medium hover:bg-white/20 md:hover:bg-zinc-50 transition-all">
            Pide Presupuesto
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

const TESTIMONIALS = [
  { 
    name: 'Elena García', 
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    text: 'La reforma de mi cocina superó todas mis expectativas. Profesionales y detallistas.', 
    rating: 5 
  },
  { 
    name: 'Carlos Ruiz', 
    image: null,
    text: 'Reformaron mi oficina en tiempo récord y con un gusto exquisito. Muy recomendables.', 
    rating: 4 
  },
  { 
    name: 'Sofía Martínez', 
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
    text: 'Como profesional, valoro mucho su capacidad técnica y cumplimiento de plazos.', 
    rating: 5 
  },
  { 
    name: 'Javier López', 
    image: null,
    text: 'El resultado final es impecable. Entienden perfectamente lo que el cliente busca.', 
    rating: 3 
  },
  { 
    name: 'Lucía Fernández', 
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
    text: 'Excelente ejecución de obra. Entienden perfectamente el concepto de diseño moderno.', 
    rating: 5 
  },
  { 
    name: 'Miguel Ángel', 
    image: null,
    text: 'Buen trabajo en general, aunque hubo un pequeño retraso con los materiales.', 
    rating: 4 
  },
  { 
    name: 'Carmen Ortiz', 
    image: null,
    text: 'La calidad es buena, aunque el presupuesto final varió un poco de la idea inicial.', 
    rating: 3 
  },
  { 
    name: 'Roberto Sanz', 
    image: null,
    text: 'Muy profesionales en el trato. El acabado de la pintura es excelente.', 
    rating: 4 
  },
];

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const next = () => setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  const getVisibleIndices = () => {
    const prevIndex = (currentIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length;
    const nextIndex = (currentIndex + 1) % TESTIMONIALS.length;
    return [prevIndex, currentIndex, nextIndex];
  };

  const visibleIndices = getVisibleIndices();

  return (
    <div className="relative max-w-full mx-auto py-12 px-4 overflow-hidden">
      <div className="flex items-center justify-center h-[420px] md:h-[400px] relative">
        <AnimatePresence initial={false} mode="popLayout">
          {visibleIndices.map((index, i) => {
            const isCenter = i === 1;
            const isLeft = i === 0;
            const isRight = i === 2;
            const testimonial = TESTIMONIALS[index];

            return (
              <motion.div
                key={testimonial.name}
                layout
                initial={{ 
                  opacity: 0, 
                  scale: 0.7,
                  x: isLeft ? -300 : isRight ? 300 : 0 
                }}
                animate={{ 
                  opacity: isCenter ? 1 : 0.35, 
                  scale: isCenter ? 1 : 0.8,
                  x: isLeft ? -320 : isRight ? 320 : 0,
                  zIndex: isCenter ? 20 : 10,
                  filter: isCenter ? "blur(0px)" : "blur(2px)",
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.5,
                  x: isLeft ? -500 : 500 
                }}
                transition={{ 
                  type: "spring",
                  stiffness: 150,
                  damping: 25,
                  mass: 1.2
                }}
                className={cn(
                  "absolute w-[90%] md:w-[420px] bg-white p-10 rounded-[48px] border border-zinc-100 flex flex-col justify-between h-full shadow-sm",
                  isCenter ? "shadow-[0_40px_80px_-15px_rgba(0,0,0,0.12)] border-zinc-200/50" : "pointer-events-none"
                )}
              >
                <div className="space-y-8">
                  <div className="flex justify-center md:justify-start">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-zinc-50 shadow-sm bg-zinc-100 flex items-center justify-center">
                      {testimonial.image ? (
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <User className="w-8 h-8 text-zinc-400" />
                      )}
                    </div>
                  </div>
                  <p className="font-serif italic text-zinc-800 leading-relaxed text-xl md:text-2xl text-center md:text-left">
                    "{testimonial.text}"
                  </p>
                </div>
                
                <div className="mt-auto pt-8 border-t border-zinc-100 flex flex-col items-center md:items-start">
                  <p className="font-bold text-xl tracking-tight text-zinc-900">{testimonial.name}</p>
                  <div className="flex gap-1 mt-2">
                    {[...Array(5)].map((_, starI) => (
                      <Star 
                        key={starI} 
                        className={cn(
                          "w-4 h-4 fill-current",
                          starI < testimonial.rating ? "text-amber-400" : "text-zinc-200"
                        )} 
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="flex justify-center gap-8 mt-16">
        <button 
          onClick={prev}
          className="group w-14 h-14 rounded-full border border-zinc-200 flex items-center justify-center hover:bg-zinc-900 transition-all duration-500"
        >
          <ChevronRight className="w-6 h-6 rotate-180 group-hover:text-white transition-colors" />
        </button>
        <button 
          onClick={next}
          className="group w-14 h-14 rounded-full border border-zinc-200 flex items-center justify-center hover:bg-zinc-900 transition-all duration-500"
        >
          <ChevronRight className="w-6 h-6 group-hover:text-white transition-colors" />
        </button>
      </div>

      <div className="flex justify-center gap-3 mt-10">
        {TESTIMONIALS.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setCurrentIndex(i)}
            className={cn(
              "h-1 rounded-full transition-all duration-700",
              i === currentIndex ? "w-12 bg-zinc-900" : "w-2 bg-zinc-200 hover:bg-zinc-400"
            )} 
          />
        ))}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <Navbar />
      <Hero />

      {/* Services Section */}
      <section id="servicios" className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="font-serif text-4xl md:text-5xl mb-6">Nuestros Servicios</h2>
            <p className="text-zinc-600 leading-relaxed">
              Ofrecemos soluciones integrales para cada rincón de tu hogar, 
              desde pequeñas actualizaciones hasta transformaciones completas.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, i) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white rounded-3xl overflow-hidden border border-zinc-100 hover:shadow-xl transition-all"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6">
                <div className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center mb-4 text-zinc-900">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="proyectos" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl mb-6">Proyectos Recientes</h2>
          <p className="text-zinc-600 max-w-2xl mx-auto">
            Una selección de nuestros trabajos más destacados donde la calidad 
            y el detalle son los protagonistas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((project, i) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer"
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 p-8 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-2 block">
                  {project.category}
                </span>
                <h3 className="text-white text-3xl font-serif">{project.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-24 bg-zinc-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl mb-4">Lo que dicen nuestros clientes</h2>
            <div className="w-20 h-1 bg-zinc-900 mx-auto rounded-full" />
          </div>
          <TestimonialsCarousel />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-24 max-w-7xl mx-auto px-6">
        <div className="bg-zinc-900 rounded-[40px] p-12 md:p-20 text-white flex flex-col md:flex-row gap-16">
          <div className="flex-1">
            <h2 className="font-serif text-4xl md:text-6xl mb-8">¿Hablamos de tu <br /><span className="italic">proyecto</span>?</h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-zinc-400 text-sm">Llámanos</p>
                  <p className="text-xl">+34 912 345 678</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-zinc-400 text-sm">Email</p>
                  <p className="text-xl">hola@reformaselite.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-zinc-400 text-sm">Oficina</p>
                  <p className="text-xl">Calle Serrano 45, Madrid</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-1 bg-white rounded-3xl p-8 text-zinc-900">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Nombre</label>
                  <input type="text" className="w-full bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-zinc-900/5" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Email</label>
                  <input type="email" className="w-full bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-zinc-900/5" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Tipo de Reforma</label>
                <select className="w-full bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-zinc-900/5">
                  <option>General</option>
                  <option>Cocina</option>
                  <option>Baño</option>
                  <option>Otros</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Mensaje</label>
                <textarea rows={4} className="w-full bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-zinc-900/5" />
              </div>
              <button className="w-full bg-zinc-900 text-white py-4 rounded-xl font-bold hover:bg-zinc-800 transition-all">
                Enviar Solicitud
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center">
              <DraftingCompass className="text-white w-4 h-4" />
            </div>
            <span className="font-serif text-xl font-bold">Arquetipo Habitat</span>
          </div>
          <p className="text-zinc-400 text-sm">© 2026 Arquetipo Habitat. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            {['Instagram', 'Facebook', 'LinkedIn'].map(social => (
              <a key={social} href="#" className="text-sm font-medium hover:text-zinc-400 transition-colors">{social}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
