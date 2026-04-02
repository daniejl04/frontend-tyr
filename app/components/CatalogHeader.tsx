import React from "react";

const CatalogHeader = ({ dict }: { dict: any }) => {
  return (
    <div className="bg-surface py-12 px-8 border-b border-outline-variant/10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-headline font-black tracking-tighter uppercase mb-4">
          {dict.title}
        </h1>
        <p className="text-tertiary max-w-2xl font-body font-medium leading-relaxed">
          {dict.description}
        </p>
      </div>
    </div>
  );
};

export default CatalogHeader;
