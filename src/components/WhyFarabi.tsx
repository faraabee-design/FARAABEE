import React from 'react';
import { Compass, Beaker, PackageCheck, Sun } from 'lucide-react';
import { useCustomization, DynamicText } from '../context/CustomizationContext';

export const WhyFarabi: React.FC = () => {
  const { theme } = useCustomization();

  const pillars = [
    {
      icon: Compass,
      title: 'Traditional Inspiration',
      description:
        'Grounded in time-tested herbal formulations that have sustained generational wellness across centuries of Eastern apothecary practice.',
    },
    {
      icon: Beaker,
      title: 'Careful Preparation',
      description:
        'Slow, unhurried lipid maceration and temperature-gentle processing ensure full preservation of volatile botanical essences and actives.',
    },
    {
      icon: PackageCheck,
      title: 'Thoughtful Presentation',
      description:
        'Housed in pharmaceutical-grade amber and emerald UV-blocking glass to preserve potency naturally without synthetic preservatives.',
    },
    {
      icon: Sun,
      title: 'Everyday Wellness',
      description:
        'Formulated for effortless integration into daily self-care routines, bringing calm, physical balance, and sensory grounding to modern life.',
    },
  ];

  return (
    <section
      className="py-16 sm:py-20 border-b border-[#AFC7A5]/25 transition-colors"
      style={{ backgroundColor: theme.surfaceColor }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <DynamicText
            id="whyFarabiBadge"
            className="text-xs font-semibold uppercase tracking-[0.2em] block"
          />
          <div className="mt-2">
            <DynamicText
              id="whyFarabiHeading"
              as="h2"
              className="text-3xl sm:text-4xl font-serif font-medium"
            />
          </div>
          <div className="mt-3 space-y-2">
            <DynamicText
              id="whyFarabiParagraph1"
              as="p"
              className="text-sm sm:text-base leading-relaxed opacity-85"
            />
            <DynamicText
              id="whyFarabiParagraph2"
              as="p"
              className="text-xs sm:text-sm leading-relaxed opacity-75"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-2xl border border-[#AFC7A5]/30 hover:border-[#183F32]/40 transition-all duration-300 flex flex-col items-start"
                style={{ backgroundColor: theme.backgroundColor }}
              >
                <div
                  className="w-12 h-12 rounded-xl border border-[#AFC7A5]/40 flex items-center justify-center mb-5 shadow-2xs"
                  style={{
                    backgroundColor: theme.surfaceColor,
                    color: theme.primaryColor,
                  }}
                >
                  <Icon className="w-5 h-5 stroke-[1.75]" />
                </div>
                <h3
                  className="font-serif text-lg font-semibold mb-2"
                  style={{ color: theme.primaryColor }}
                >
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#26312B]/75 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
