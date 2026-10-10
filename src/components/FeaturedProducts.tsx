import React, { useState } from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useCustomization, DynamicText } from '../context/CustomizationContext';

interface FeaturedProductsProps {
  products: Product[];
  onViewProduct: (slug: string) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  onViewAllClick: () => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  products,
  onViewProduct,
  onAddToCart,
  onViewAllClick,
}) => {
  const { categories } = useStore();
  const { theme } = useCustomization();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Active products only
  const activeProducts = products.filter((p) => p.status === 'active');

  // If some products are marked featured, prioritize them
  const featuredList = activeProducts.filter((p) => p.featured);
  const basePool = featuredList.length > 0 ? featuredList : activeProducts;

  const categoryList = ['All', ...categories.filter((c) => c.slug !== 'all' && c.active).map((c) => c.name)];

  const filteredProducts =
    selectedCategory === 'All'
      ? basePool.slice(0, 4)
      : basePool.filter((p) => p.category === selectedCategory);

  return (
    <section
      className="py-16 sm:py-20 border-b border-[#AFC7A5]/25 transition-colors"
      style={{ backgroundColor: theme.backgroundColor }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#AFC7A5]/30">
          <div className="max-w-xl">
            <div className="flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5" style={{ color: theme.secondaryColor }} />
              <DynamicText
                id="featuredBadge"
                className="text-xs font-semibold uppercase tracking-[0.2em]"
              />
            </div>
            <div className="mt-2">
              <DynamicText
                id="featuredHeading"
                as="h2"
                className="text-3xl sm:text-4xl font-serif font-medium"
              />
            </div>
            <div className="mt-2">
              <DynamicText
                id="featuredSubtitle"
                as="p"
                className="text-sm sm:text-base leading-relaxed opacity-80"
              />
            </div>
          </div>

          {/* Interactive Category Segmented Tabs */}
          <div className="mt-6 md:mt-0 flex flex-wrap items-center gap-1.5 p-1 bg-white rounded-xl border border-[#AFC7A5]/40 self-start md:self-auto">
            {categoryList.slice(0, 5).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#183F32] text-white shadow-2xs'
                    : 'text-[#26312B]/80 hover:text-[#183F32] hover:bg-[#FAF9F3]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewProduct={onViewProduct}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <button
            onClick={onViewAllClick}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white border border-[#AFC7A5] text-[#183F32] text-xs font-semibold uppercase tracking-wider rounded-xl shadow-xs hover:bg-[#183F32] hover:text-white transition-all cursor-pointer group"
          >
            <span>Explore Entire Botanical Collection</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};
