import React from "react";
import Link from "next/link";

export interface ProductCardProps {
  id?: string;
  title: string;
  model: string;
  price: string;
  image: string;
  inStock?: boolean;
  bestSeller?: boolean;
  dict: any;
  locale?: string;
}

const ProductCard = ({ id, title, model, price, image, inStock, bestSeller, dict, locale = "es" }: ProductCardProps) => {
  const detailUrl = id ? `/${locale}/catalog/${id}` : "#";

  return (
    <div className={`bg-surface-container-lowest p-6 flex flex-col group relative ${bestSeller ? 'border-4 border-primary-container' : ''}`}>
      <Link href={detailUrl} className="flex flex-col h-full">
        {inStock && (
          <div className="absolute top-4 right-4 bg-error text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest z-10">{dict.inStock}</div>
        )}
        {bestSeller && (
          <div className="absolute top-0 left-0 bg-primary-container text-on-primary-container text-[10px] font-black px-3 py-1 uppercase tracking-[0.2em] z-10">{dict.bestSeller}</div>
        )}
        <div className="mb-8 overflow-hidden aspect-square flex items-center justify-center">
          <img 
            alt={title} 
            className="w-4/5 group-hover:scale-110 transition-transform duration-500" 
            src={image}
          />
        </div>
        <h4 className="font-headline font-black text-lg tracking-tight uppercase leading-none">{title}</h4>
        <p className="text-tertiary text-xs mt-2 uppercase font-bold tracking-widest">{model}</p>
        <div className="mt-auto pt-6 flex justify-between items-center border-t border-outline-variant/20">
          <span className="text-2xl font-headline font-black">{price}</span>
          <button className={`p-2 transition-colors ${bestSeller ? 'bg-primary-container hover:bg-on-primary-container hover:text-white' : 'bg-surface-variant hover:bg-primary-container'}`}>
            <span className="material-symbols-outlined">add_shopping_cart</span>
          </button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
