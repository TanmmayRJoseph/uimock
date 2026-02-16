"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Shield, Zap, LayoutDashboard } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f14] via-[#12121a] to-[#0a0a0f] text-white">
      {/* HERO SECTION */}
      <section className="container mx-auto px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <Badge className="px-4 py-1 text-sm rounded-full bg-white/10 text-white border border-white/20 backdrop-blur-sm">🚀 AI Powered Builder</Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            Build Stunning Projects <span className="text-primary">10x Faster</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Design, manage and deploy your screens effortlessly with a powerful visual workflow, reusable components and smooth animations.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Button size="lg" className="rounded-2xl px-8">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-2xl px-8">
              Live Demo
            </Button>
          </div>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Sparkles className="h-6 w-6" />,
              title: "AI Assisted Generation",
              desc: "Generate layouts, content and UI structure instantly with intelligent assistance.",
            },
            {
              icon: <LayoutDashboard className="h-6 w-6" />,
              title: "Visual Screen Manager",
              desc: "Organize and update your screens with a clean, intuitive dashboard.",
            },
            {
              icon: <Shield className="h-6 w-6" />,
              title: "Secure & Scalable",
              desc: "Built with authentication, validation and production-ready architecture.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
            >
              <Card className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <CardContent className="p-8 space-y-4">
                  <div className="p-3 bg-primary/10 w-fit rounded-xl">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHY USE US */}
      <section className="bg-white/5 border-y border-white/10 py-24">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold">Why Choose Us?</h2>
            <p className="text-muted-foreground text-lg">
              We combine performance, usability and intelligent automation to help developers ship faster without sacrificing quality.
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li>✔ Clean architecture & modular structure</li>
              <li>✔ Production-ready components</li>
              <li>✔ Smooth animations with Framer Motion</li>
              <li>✔ Modern UI powered by shadcn</li>
            </ul>
            <Button className="rounded-2xl px-8">Start Building</Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            {["Fast Setup", "Reusable Blocks", "Live Updates", "Developer First"].map((item, i) => (
              <Card key={i} className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg hover:bg-white/10 transition-all">
                <CardContent className="p-6 font-medium">{item}</CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-6 py-24 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is this beginner friendly?</AccordionTrigger>
              <AccordionContent>
                Yes. The interface is intuitive and built for both beginners and experienced developers.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Can I customize the UI?</AccordionTrigger>
              <AccordionContent>
                Absolutely. All components are fully customizable using Tailwind and shadcn.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is it production ready?</AccordionTrigger>
              <AccordionContent>
                Yes. The architecture follows modern best practices with scalability in mind.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>
      </section>

      {/* CTA FOOTER */}
      <section className="bg-gradient-to-r from-primary/80 to-primary py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Build Something Amazing?</h2>
          <p className="text-lg opacity-90">
            Join developers who are shipping faster and smarter.
          </p>
          <Button size="lg" variant="secondary" className="rounded-2xl px-10">
            Get Started Now <Zap className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </section>
    </div>
  );
}
