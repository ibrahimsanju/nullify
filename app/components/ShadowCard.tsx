import { memo } from 'react';

interface shadowCardProps{
    label:number,
    percentage:number
}

const ShadowCard = ({label,percentage}:shadowCardProps) => {
  return (
    <section className='border h-20 w-10 flex flex-col items-center justify-center rounded-lg '>
      <h2>{label}</h2>
      <div>{percentage}</div>
    </section>
  );
};

export default memo(ShadowCard);