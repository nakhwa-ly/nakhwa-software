'use client';
import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  href?: string;
  viewProject?: string;
  // Swap with <Image src="…" fill alt="…" className="object-cover" /> in one line when screenshots arrive
  mockupSlot?: ReactNode;
}

export function ProjectCard({ title, description, tags, href, viewProject, mockupSlot }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.6, ease: 'easeOut' as const }}
      className="group rounded-2xl border bg-card overflow-hidden hover:border-primary/50 hover:shadow-xl transition-shadow"
    >
      {/* Mockup area — gradient sweep animates on group-hover */}
      <div className="relative h-48 bg-gradient-to-br from-primary/5 to-accent/5 overflow-hidden">
        {mockupSlot}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/5 group-hover:to-accent/10 transition-all duration-[600ms] ease-out pointer-events-none" />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4 text-sm">{description}</p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        {href && viewProject && (
          <a
            href={href}
            className="text-primary font-medium inline-flex items-center gap-2 text-sm group-hover:gap-3 transition-all"
          >
            {viewProject}
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>
    </motion.div>
  );
}
