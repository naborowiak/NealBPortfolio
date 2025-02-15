import { motion } from 'framer-motion';
import { useState } from 'react';
import type { ReactNode } from 'react';

interface Panel {
  id: string;
  title: string;
  content: ReactNode;
  defaultPosition: { x: number; y: number };
}

interface Props {
  panels: Panel[];
}

export default function DashboardLayout({ panels }: Props) {
  const [activePanels, setActivePanels] = useState(panels);

  return (
    <div className="relative min-h-screen p-4">
      {activePanels.map((panel) => (
        <motion.div
          key={panel.id}
          drag
          dragMomentum={false}
          initial={panel.defaultPosition}
          className="absolute bg-white/80 backdrop-blur-md rounded-lg shadow-lg p-4 cursor-move"
          whileHover={{ scale: 1.02 }}
          whileDrag={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-polaris-accent">{panel.title}</h3>
            <div className="flex gap-2">
              <button className="w-3 h-3 rounded-full bg-red-500" />
              <button className="w-3 h-3 rounded-full bg-yellow-500" />
              <button className="w-3 h-3 rounded-full bg-green-500" />
            </div>
          </div>
          {panel.content}
        </motion.div>
      ))}
    </div>
  );
} 