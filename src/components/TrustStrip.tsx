import React from 'react';
import { BookOpen, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';
import { useCustomization, DynamicText } from '../context/CustomizationContext';

export const TrustStrip: React.FC = () => {
  const { theme } = useCustomization();

  const trustItems = [
    {
      icon: BookOpen,
      titleId: 'trustItem1Title' as const,
      descId: 'trustItem1Desc' as const,
    },
    {
      icon: Sparkles,
      titleId: 'trustItem2Title' as const,
      descId: 'trustItem2Desc' as const,
    },
    {
      icon: ShieldCheck,
      titleId: 'trustItem3Title' as const,
      descId: 'trustItem3Desc' as const,
    },
    {
      icon: HeartHandshake,
      titleId: 'trustItem4Title' as const,
      descId: 'trustItem4Desc' as const,
    },
  ];

  return (
    <section
      className="border-b border-[#AFC7A5]/25 py-8 transition-colors"
      style={{ backgroundColor: theme.surfaceColor }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-4 p-3 rounded-2xl transition-colors hover:bg-black/[0.02]"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: theme.accentLightColor,
                    color: theme.primaryColor,
                  }}
                >
                  <Icon className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold leading-snug">
                    <DynamicText id={item.titleId} />
                  </h3>
                  <p className="text-xs mt-1 leading-normal opacity-80">
                    <DynamicText id={item.descId} />
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
