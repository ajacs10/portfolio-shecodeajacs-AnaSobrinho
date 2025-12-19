import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; 

export const ParticleBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      className="absolute inset-0 -z-10"
      options={{
        background: { color: { value: "transparent" } },
        fpsLimit: 60,
        particles: {
          color: { value: "#00C2FF" }, // Seu azul elétrico
          links: {
            color: "#A78BFA", // Seu roxo neon
            distance: 150,
            enable: true,
            opacity: 0.2,
            width: 1,
          },
          move: { enable: true, speed: 1 },
          number: { value: 60 },
          opacity: { value: 0.3 },
          size: { value: { min: 1, max: 2 } },
        },
      }}
    />
  );
};
