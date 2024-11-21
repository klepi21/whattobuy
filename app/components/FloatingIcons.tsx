"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const icons = [
  { src: "/icons/btc.svg", size: 40, delay: 0 },
  { src: "/icons/eth.svg", size: 36, delay: 0.2 },
  { src: "/icons/usdc.svg", size: 32, delay: 0.4 },
  { src: "/icons/egld.svg", size: 38, delay: 0.6 },
];

export function FloatingIcons() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {icons.map((icon, index) => (
        <motion.div
          key={index}
          className="absolute"
          initial={{ 
            x: Math.random() * 100 - 50 + "%",
            y: "120%",
            opacity: 0,
            rotate: 0
          }}
          animate={{
            y: [120, -20],
            opacity: [0, 1, 1, 0],
            rotate: 360,
          }}
          transition={{
            duration: 15,
            delay: icon.delay,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            left: `${15 + (index * 25)}%`,
          }}
        >
          <Image
            src={icon.src}
            alt="Crypto Icon"
            width={icon.size}
            height={icon.size}
            className="opacity-20"
          />
        </motion.div>
      ))}
    </div>
  );
}