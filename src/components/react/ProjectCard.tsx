import { motion } from 'framer-motion';

interface ProjectProps {
  title: string;
  image: string;
  status: string;
  link: string;
  preview: string;
}

export default function ProjectCard({ title, image, status, link, preview }: ProjectProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
        className="aspect-video bg-polaris-bg"
      >
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
      </motion.div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-polaris-accent mb-2">
          {title}
        </h3>
        <p className="text-polaris-text/80 mb-4">
          {status}
        </p>
        <div className="flex flex-wrap gap-2">
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            target="_blank" 
            href={link} 
            aria-label="GitHub"
            className="px-3 py-1 bg-polaris-secondary/10 text-polaris-primary rounded-full text-sm hover:bg-opacity-90 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7">
              <path d="M24 12L18.3431 17.6569L16.9289 16.2426L21.1716 12L16.9289 7.75736L18.3431 6.34315L24 12ZM2.82843 12L7.07107 16.2426L5.65685 17.6569L0 12L5.65685 6.34315L7.07107 7.75736L2.82843 12ZM9.78845 21H7.66009L14.2116 3H16.3399L9.78845 21Z" />
            </svg>
          </motion.a>
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            target="_blank" 
            href={preview} 
            aria-label="Preview"
            className="px-3 py-1 bg-polaris-secondary/10 text-polaris-primary rounded-full text-sm hover:bg-opacity-90 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7">
              <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z" />
            </svg>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
} 