import { memo } from 'react';

interface shadowCardProps{
    label:number,
    percentage:number
}

const ShadowCard = ({label,percentage}:shadowCardProps) => {
  return (
    <section className="
    h-20 w-14 
    flex flex-col items-center justify-center 
    rounded-2xl p-4 
    text-center 
    shadow-[0_4px_20px_rgba(0,0,0,0.15)]
    bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.18),rgba(0,0,0,0.05))]
    backdrop-blur-sm
    border border-white/20
  "
>
      <h2 className="text-sm font-semibold text-white">{label}</h2>
      <div className="text-xl font-bold text-green-300">{percentage}</div>
    </section>
  );
};

export default memo(ShadowCard);