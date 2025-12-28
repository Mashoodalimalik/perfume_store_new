"use client";
import React from "react";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

export default function Contact() {
  return (
    <main className="min-h-screen pt-32 px-6 md:px-20 bg-background text-foreground">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
        
        {/* Left: Info */}
        <div className="space-y-12 animate-slide-in-left">
          <div>
            <h1 className="text-6xl md:text-8xl font-bold uppercase tracking-tighter mb-6">
              Contact
            </h1>
            <p className="text-lg opacity-70 leading-relaxed">
              We'd love to hear from you. Whether you have a question about our scents,
              pricing, or anything else, our team is ready to answer.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
               <Mail className="mt-1 opacity-50" />
               <div>
                 <h3 className="font-bold uppercase tracking-widest text-sm mb-1">Email</h3>
                 <p className="opacity-80">support@lessence.com</p>
               </div>
            </div>
            
            <div className="flex items-start gap-4">
               <Phone className="mt-1 opacity-50" />
               <div>
                 <h3 className="font-bold uppercase tracking-widest text-sm mb-1">Phone</h3>
                 <p className="opacity-80">+1 (555) 123-4567</p>
               </div>
            </div>

            <div className="flex items-start gap-4">
               <MapPin className="mt-1 opacity-50" />
               <div>
                 <h3 className="font-bold uppercase tracking-widest text-sm mb-1">Studio</h3>
                 <p className="opacity-80">123 Fragrance Lane<br/>Paris, France 75001</p>
               </div>
            </div>
          </div>

          <div className="pt-8 border-t border-foreground/10">
            <h3 className="font-bold uppercase tracking-widest text-sm mb-4">Quick Chat</h3>
            <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#25D366] text-white px-6 py-3 rounded-full font-bold hover:brightness-110 transition-all magnetic-wrap"
            >
                <MessageCircle size={20} />
                Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Right: Form */}
        <div className="border border-foreground/10 p-8 md:p-12 rounded-sm animate-fade-in-up">
           <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs uppercase font-bold tracking-widest opacity-50">Name</label>
                <input type="text" className="w-full bg-transparent border-b border-foreground/20 py-2 focus:border-foreground outline-none transition-colors" placeholder="Your Name" />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs uppercase font-bold tracking-widest opacity-50">Email</label>
                <input type="email" className="w-full bg-transparent border-b border-foreground/20 py-2 focus:border-foreground outline-none transition-colors" placeholder="Your Email" />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase font-bold tracking-widest opacity-50">Message</label>
                <textarea rows="4" className="w-full bg-transparent border-b border-foreground/20 py-2 focus:border-foreground outline-none transition-colors resize-none" placeholder="How can we help?"></textarea>
              </div>

              <button className="w-full bg-foreground text-background py-4 uppercase font-bold tracking-widest hover:opacity-90 transition-opacity mt-4 magnetic-wrap">
                Send Message
              </button>
           </form>
        </div>

      </div>
    </main>
  );
}
