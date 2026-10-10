import React from 'react';
import { Article } from '../types';
import { ArrowRight, BookOpen } from 'lucide-react';
import { useCustomization, DynamicText } from '../context/CustomizationContext';

interface JournalPreviewProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  onViewJournalClick: () => void;
}

export const JournalPreview: React.FC<JournalPreviewProps> = ({
  articles,
  onSelectArticle,
  onViewJournalClick,
}) => {
  const { theme } = useCustomization();

  return (
    <section
      className="py-16 sm:py-24 border-b border-[#AFC7A5]/25 transition-colors"
      style={{ backgroundColor: theme.backgroundColor }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-4 border-b border-[#AFC7A5]/30">
          <div>
            <DynamicText
              id="journalBadge"
              className="text-xs font-semibold uppercase tracking-[0.2em] block"
            />
            <div className="mt-2">
              <DynamicText
                id="journalHeading"
                as="h2"
                className="text-3xl sm:text-4xl font-serif font-medium"
              />
            </div>
            <div className="mt-2">
              <DynamicText
                id="journalSubtitle"
                as="p"
                className="text-sm sm:text-base leading-relaxed opacity-80"
              />
            </div>
          </div>

          <button
            onClick={onViewJournalClick}
            className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider hover:underline cursor-pointer self-start sm:self-auto"
            style={{ color: theme.primaryColor }}
          >
            <span>Read All Articles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.slice(0, 3).map((article) => (
            <article
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="rounded-2xl border border-[#AFC7A5]/35 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group cursor-pointer"
              style={{ backgroundColor: theme.surfaceColor }}
            >
              <div className="relative aspect-16/10 w-full bg-[#E8F1DF] overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                  loading="lazy"
                />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs mb-3 font-medium opacity-70">
                    <span className="uppercase tracking-wider">{article.category}</span>
                    <span>·</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3
                    className="font-serif text-xl font-semibold mb-2 leading-snug group-hover:opacity-85 transition-opacity"
                    style={{ color: theme.primaryColor }}
                  >
                    {article.title}
                  </h3>

                  <p className="text-xs text-[#26312B]/75 line-clamp-2 leading-relaxed mb-4">
                    {article.excerpt}
                  </p>
                </div>

                <div
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider group-hover:translate-x-0.5 transition-transform"
                  style={{ color: theme.secondaryColor }}
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
