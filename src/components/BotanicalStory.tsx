import React from 'react';
import olivesImg from '../assets/images/farabi_botanical_olives_1790683606379.jpg';
import clovesImg from '../assets/images/farabi_botanical_cloves_1790683626855.jpg';
import blackseedImg from '../assets/images/farabi_hair_elixir_bottle_1790683590806.jpg';
import { useCustomization, DynamicText } from '../context/CustomizationContext';

export const BotanicalStory: React.FC = () => {
  const { theme } = useCustomization();

  const botanicals = [
    {
      name: 'Olive Fruit',
      botanicalName: 'Olea Europaea',
      urdu: 'زیتون',
      image: olivesImg,
      description:
        'Celebrated across ancient Mediterranean and Eastern wellness traditions as a golden emollient. Rich in squalene and oleic acids, cold-pressed olive oil helps sustain the skin barrier and deeply conditions dry hair lengths.',
      traditionalRole: 'Traditionally valued in herbal massage and restorative skin balms for deep cellular nourishment.',
    },
    {
      name: 'Clove Bud',
      botanicalName: 'Syzygium Aromaticum',
      urdu: 'لونگ',
      image: clovesImg,
      description:
        'Harvested as unopened flower buds and sun-dried, cloves are revered for their warm, invigorating essence and high eugenol content. Their aromatic warmth provides a comforting sensation during seasonal damp and cold.',
      traditionalRole: 'Traditionally valued in warming chest rubs, muscle salves, and soothing botanical vapors.',
    },
    {
      name: 'Black Seed (Kalonji)',
      botanicalName: 'Nigella Sativa',
      urdu: 'کلونجی',
      image: blackseedImg,
      description:
        'One of the most venerated seeds in Eastern and Prophetic herbal traditions. Tiny matte black seeds yielding an intense, peppery oil abundant in thymoquinone and essential polyunsaturated fatty acids.',
      traditionalRole: 'Traditionally valued in scalp fortifying elixirs and balanced skin-soothing botanical oils.',
    },
  ];

  return (
    <section
      className="py-16 sm:py-24 border-b border-[#AFC7A5]/25 transition-colors"
      style={{ backgroundColor: theme.backgroundColor }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <DynamicText
            id="storyBadge"
            className="text-xs font-semibold uppercase tracking-[0.2em] block"
          />
          <div className="mt-2">
            <DynamicText
              id="storyHeading"
              as="h2"
              className="text-3xl sm:text-4xl font-serif font-medium"
            />
          </div>
          <div className="mt-3 space-y-2">
            <DynamicText
              id="storyParagraph1"
              as="p"
              className="text-sm sm:text-base leading-relaxed opacity-85"
            />
            <DynamicText
              id="storyParagraph2"
              as="p"
              className="text-xs sm:text-sm leading-relaxed opacity-75"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {botanicals.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-[#AFC7A5]/35 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group"
              style={{ backgroundColor: theme.surfaceColor }}
            >
              {/* Image container */}
              <div className="relative aspect-4/3 w-full bg-[#E8F1DF]/50 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-xs font-serif text-[#183F32] border border-[#AFC7A5]/40 font-urdu">
                  {item.urdu}
                </span>
              </div>

              {/* Text content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-baseline justify-between mb-1">
                    <h3
                      className="font-serif text-xl font-semibold"
                      style={{ color: theme.primaryColor }}
                    >
                      {item.name}
                    </h3>
                  </div>
                  <span className="text-xs italic text-[#285844] font-serif block mb-3">
                    {item.botanicalName}
                  </span>
                  <p className="text-xs text-[#26312B]/80 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div
                  className="pt-3 border-t border-[#AFC7A5]/25 text-[11px] leading-relaxed italic"
                  style={{ color: theme.secondaryColor }}
                >
                  {item.traditionalRole}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botanical Quote Callout */}
        <div className="mt-12 text-center max-w-xl mx-auto p-4 rounded-2xl bg-white/60 border border-[#AFC7A5]/30">
          <DynamicText
            id="storyQuote"
            className="font-serif italic text-base sm:text-lg block"
          />
        </div>
      </div>
    </section>
  );
};
