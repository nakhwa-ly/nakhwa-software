import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  href?: string;
  viewProject?: string;
  imagePlaceholder?: string;
}

export function ProjectCard({ title, description, tags, href, viewProject, imagePlaceholder }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="group rounded-2xl border bg-card overflow-hidden hover:border-primary/50 hover:shadow-xl transition-all"
    >
      <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-4xl">
        {imagePlaceholder ?? '🚀'}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4 text-sm">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
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
