import React from "react";

const Stats = ({ dict }: { dict: any }) => {
  const stats = [
    { value: "15k+", label: dict.inventory },
    { value: "1200", label: dict.repairs },
    { value: "25y", label: dict.expertise },
    { value: "99%", label: dict.reliability }
  ];

  return (
    <section className="bg-on-background py-16 px-8">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-12 text-white">
        {stats.map((stat, index) => (
          <div key={index} className="flex-1 min-w-[200px] border-l border-primary/30 pl-6">
            <p className="text-4xl font-headline font-black text-primary-container">{stat.value}</p>
            <p className="text-xs uppercase font-black tracking-widest mt-2 opacity-60">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
