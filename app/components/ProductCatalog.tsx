import React from "react";
import ProductCard from "./ProductCard";

const ProductCatalog = ({ dict, locale }: { dict: any, locale: string }) => {
  const products = [
    {
      id: "gtx3584rs",
      title: dict.products[0].title,
      model: dict.products[0].model,
      price: "$450.00",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuADni4LcbtMxN5lK4wkk0eGyGI8QOCjLcq1wR5R15t91hCoQ1JTPh9O9QM9PNUxO7GpNTrZCk4wpFBB7FSSUfVLbWptNLsXZVIemiON_FEnQLQJ57kRcpLpw4FiYhajXdu8G_sFFuUgvNCTZrzAZ42vRZ14ZrLZ2MtYGY7V5uMHloav49YmG1EflYOL_GejTfkNYKIb5oV6JxbXUvbbaSMueYJzy6c93C0mfj6OI-80ymbPuy2Ue3Am1rm1L8lRjU1CtqQHGvV_Wb1Z",
      inStock: true
    },
    {
      id: "gtx3584rs",
      title: dict.products[1].title,
      model: dict.products[1].model,
      price: "$125.00",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCqnKNyyKs-gOB3XjNrGcrELeRuGcxhr3XIFJWXRY0tiIMddWrXAhJA3-UP8t7dLKxLIKJBiQWmHwe6ZeY-oJs-9koSxwiJy5V1WAJ-aJdHDg0tKrTXUbl6CLJ-5EqmK7tQvQNTMW7osfK_G-61-QZOcBnUcLQL2_ZZtT_GpmLm_hceGM2LvqMY2YJKjkAziId0y8k6U038ze6luvWro7zJx34nioNrcSRjMBA9iFZ1RECr3GWuZ8I4Q794WTgsdCOsEWuuuVZ2dbk7",
    },
    {
      id: "gtx3584rs",
      title: dict.products[2].title,
      model: dict.products[2].model,
      price: "$89.00",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAl4ZIVSQHUFXvlDHoo50CjIDUu6Y6v6KxHzCrUTN3L0t-ghvgGV8ylAdUednvA752qvwNRdbfUKbQzH6hfqir2yiHMqBHsGzMQuQqYpwR9r8Gg7rfFaj0rmLRbhxJVuzFh0IDfpzrNj3K7o4yHpip5Bjm5uL8aPVB4_tm0sdlrdx4QskUW1lG_plclrhgyQgRZfBUL92cZ0yLMIbf4kFEWXJKqRIpqkhPh7_B0uNiFZGyDPVsPPQ4G6Sm7_c-zhywGw5RUXH4b8VJ8",
    },
    {
      id: "gtx3584rs",
      title: dict.products[3].title,
      model: dict.products[3].model,
      price: "$1,850.00",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBfCKO-VDNFkAPJbGZzdVeyc9htyV5ok1DWpu8d8wak3E7ySGRJDqKXbWkCF_WbZ0TfpJgl7nG76RYo3LbL87L8dEjwjI31ygN78StMYhO9y7PAEkdFpkHNbkcHb8nBGfHm6cF0w6hvMuR0oxyhcu_eioNGDvu4pE5_cxHQ7ZmsXhrMZjUtSEaDrB6bEqtwUgoO0lmBDwE0FSUQjZ2VabFGPF9v_ep3t2XLuFC58eGtcDMGPzgkwewAeJdEXkmDCeWrVpwMEoc-zH7L",
      bestSeller: true
    }
  ];

  return (
    <section className="py-24 bg-surface-container-low px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-[2px] w-20 bg-primary"></div>
          <h2 className="text-2xl font-headline font-black uppercase tracking-tighter">{dict.title}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} dict={dict} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCatalog;
