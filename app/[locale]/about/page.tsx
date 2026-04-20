import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { getDictionary } from "../../../lib/get-dictionary";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as "en" | "es");
  const t = dict.aboutPage;

  return (
    <>
      <Navbar dict={dict.navbar} />
      <main className="pt-20 min-h-screen bg-surface">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden border-b border-outline-variant/20">
          <div className="absolute inset-0 bg-primary/5 -skew-y-6 transform origin-top-left -translate-y-24"></div>
          <div className="container mx-auto px-8 relative z-10">
            <div className="max-w-4xl">
              <h2 className="text-primary font-black tracking-widest text-xs uppercase mb-4">
                {t.subtitle}
              </h2>
              <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-on-surface mb-8 font-headline leading-none">
                {t.title}
              </h1>
              <p className="text-xl text-tertiary font-medium max-w-2xl leading-relaxed">
                {t.description}
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Experience */}
        <section className="py-24 border-b border-outline-variant/20">
          <div className="container mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-4 bg-surface-container-high px-6 py-3 rounded-full border border-outline-variant/20">
                  <span className="text-4xl font-black text-primary">{t.experience.years}</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-tertiary leading-tight">
                    {t.experience.label.split(' ').join('\n')}
                  </span>
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tight text-on-surface">
                  {t.mission.title}
                </h3>
                <p className="text-lg text-tertiary leading-relaxed">
                  {t.mission.text}
                </p>
              </div>
              <div className="relative aspect-video bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant/20 group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="material-symbols-outlined text-8xl text-primary/20 group-hover:scale-110 transition-transform duration-500">
                    precision_manufacturing
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 bg-surface-container-lowest">
          <div className="container mx-auto px-8">
            <h3 className="text-center text-xs font-black tracking-[0.3em] uppercase text-primary mb-16">
              {t.values.title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Quality */}
              <div className="p-8 bg-surface border border-outline-variant/10 rounded-2xl hover:border-primary/30 transition-all duration-300">
                <span className="material-symbols-outlined text-4xl text-primary mb-6">
                  verified
                </span>
                <h4 className="text-xl font-black uppercase tracking-tight mb-4 text-on-surface">
                  {t.values.quality.title}
                </h4>
                <p className="text-tertiary text-sm leading-relaxed">
                  {t.values.quality.text}
                </p>
              </div>

              {/* Reliability */}
              <div className="p-8 bg-surface border border-outline-variant/10 rounded-2xl hover:border-primary/30 transition-all duration-300">
                <span className="material-symbols-outlined text-4xl text-primary mb-6">
                  settings_suggest
                </span>
                <h4 className="text-xl font-black uppercase tracking-tight mb-4 text-on-surface">
                  {t.values.reliability.title}
                </h4>
                <p className="text-tertiary text-sm leading-relaxed">
                  {t.values.reliability.text}
                </p>
              </div>

              {/* Innovation */}
              <div className="p-8 bg-surface border border-outline-variant/10 rounded-2xl hover:border-primary/30 transition-all duration-300">
                <span className="material-symbols-outlined text-4xl text-primary mb-6">
                  bolt
                </span>
                <h4 className="text-xl font-black uppercase tracking-tight mb-4 text-on-surface">
                  {t.values.innovation.title}
                </h4>
                <p className="text-tertiary text-sm leading-relaxed">
                  {t.values.innovation.text}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 bg-primary text-on-primary text-center">
          <div className="container mx-auto px-8">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 leading-none">
              {dict.catalogPage.customEngineering.title}
            </h2>
            <p className="text-on-primary/80 text-lg mb-12 max-w-2xl mx-auto font-medium">
              {dict.catalogPage.customEngineering.description}
            </p>
            <a 
              href={`/${locale}/catalog`} 
              className="inline-flex items-center gap-3 bg-on-primary text-primary px-10 py-5 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform duration-300"
            >
              {dict.catalogPage.customEngineering.cta}
              <span className="material-symbols-outlined">arrow_forward</span>
            </a>
          </div>
        </section>
      </main>
      <Footer dict={dict.footer} locale={locale} />
    </>
  );
}
