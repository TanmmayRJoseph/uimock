"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Shield, Zap, LayoutDashboard } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-[#0B0C10] text-white overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-purple-600/20 blur-[140px] rounded-full pointer-events-none" />

      {/* HERO SECTION */}
      <section className="relative container mx-auto px-6 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-8"
        >
          <Badge className="px-4 py-1 text-sm rounded-full bg-white/5 text-purple-300 border border-white/10 backdrop-blur-md">
            🚀 AI Powered Builder
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
            Build Stunning Projects{" "}
            <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              10x Faster
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Design, manage and deploy your screens effortlessly with a powerful visual workflow,
            reusable components and smooth animations.
          </p>

          <div className="flex justify-center gap-6 pt-6">
            <Button
              size="lg"
              className="rounded-2xl px-10 bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-600/30"
            >
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="rounded-2xl px-10 border-white/20 hover:bg-white/5 transition-all"
            >
              Live Demo
            </Button>
          </div>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section className="relative container mx-auto px-6 py-24">
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              icon: <Sparkles className="h-6 w-6 text-purple-400" />,
              title: "AI Assisted Generation",
              desc: "Generate layouts, content and UI structure instantly with intelligent assistance.",
            },
            {
              icon: <LayoutDashboard className="h-6 w-6 text-indigo-400" />,
              title: "Visual Screen Manager",
              desc: "Organize and update your screens with a clean, intuitive dashboard.",
            },
            {
              icon: <Shield className="h-6 w-6 text-purple-400" />,
              title: "Secure & Scalable",
              desc: "Built with authentication, validation and production-ready architecture.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
            >
              <Card className="rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-purple-500/40 hover:-translate-y-2 transition-all duration-500 shadow-xl">
                <CardContent className="p-10 space-y-6">
                  <div className="p-4 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 w-fit rounded-2xl">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.desc}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHY USE US */}
      <section className="relative py-32 border-y border-white/5 bg-white/[0.02]">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold">
              Why Choose Us?
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed">
              We combine performance, usability and intelligent automation to help developers ship faster without sacrificing quality.
            </p>

            <ul className="space-y-4 text-gray-400">
              <li>✔ Clean architecture & modular structure</li>
              <li>✔ Production-ready components</li>
              <li>✔ Smooth animations with Framer Motion</li>
              <li>✔ Modern UI powered by shadcn</li>
            </ul>

            <Button className="rounded-2xl px-10 bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-600/30">
              Start Building
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-2 gap-6"
          >
            {["Fast Setup", "Reusable Blocks", "Live Updates", "Developer First"].map((item, i) => (
              <Card
                key={i}
                className="rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-purple-500/40 transition-all duration-300"
              >
                <CardContent className="p-8 font-medium text-gray-300">
                  {item}
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-6 py-32 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-12"
        >
          <h2 className="text-4xl font-bold text-center">
            Frequently Asked Questions
          </h2>

          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="border border-white/10 rounded-2xl px-6">
              <AccordionTrigger>Is this beginner friendly?</AccordionTrigger>
              <AccordionContent className="text-gray-400">
                Yes. The interface is intuitive and built for both beginners and experienced developers.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border border-white/10 rounded-2xl px-6">
              <AccordionTrigger>Can I customize the UI?</AccordionTrigger>
              <AccordionContent className="text-gray-400">
                Absolutely. All components are fully customizable using Tailwind and shadcn.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border border-white/10 rounded-2xl px-6">
              <AccordionTrigger>Is it production ready?</AccordionTrigger>
              <AccordionContent className="text-gray-400">
                Yes. The architecture follows modern best practices with scalability in mind.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>
      </section>

      {/* CTA FOOTER */}
      <section className="relative py-24 text-center bg-gradient-to-r from-purple-700 to-indigo-700">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            Ready to Build Something Amazing?
          </h2>

          <p className="text-lg opacity-90">
            Join developers who are shipping faster and smarter.
          </p>

          <Button
            size="lg"
            variant="secondary"
            className="rounded-2xl px-12 hover:scale-105 transition-all duration-300"
          >
            Get Started Now <Zap className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </section>
    </div>
  );
}
