import React, { useState } from 'react';
import { useCustomization } from '../../context/CustomizationContext';
import { SiteCopyContent, TextCustomization } from '../../types/customization';
import { AVAILABLE_FONTS, FONT_SIZES, FONT_WEIGHTS, PRESET_COLORS, DEFAULT_CONTENT } from '../../config/defaultCustomization';
import {
  FileText,
  Save,
  RotateCcw,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Type,
  Palette,
  CheckCircle2,
} from 'lucide-react';

interface AdminContentEditorProps {
  onNotify: (msg: string) => void;
}

export const AdminContentEditor: React.FC<AdminContentEditorProps> = ({ onNotify }) => {
  const { content, updateContent, resetContent } = useCustomization();
  const [formData, setFormData] = useState<SiteCopyContent>(content);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  const handleItemChange = (key: keyof SiteCopyContent, field: keyof TextCustomization, value: any) => {
    setFormData((prev) => {
      const current = prev[key] || DEFAULT_CONTENT[key];
      return {
        ...prev,
        [key]: {
          ...current,
          [field]: value,
        },
      };
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateContent(formData);
      onNotify('Website paragraphs, fonts, and colors updated live on faraabee.com!');
    } catch {
      onNotify('Failed to save website content.');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (window.confirm('Reset all website text, paragraphs, fonts, and colors back to original factory text?')) {
      await resetContent();
      setFormData(DEFAULT_CONTENT);
      onNotify('Website copy reset to original botanical defaults.');
    }
  };

  const sections = [
    { id: 'announcement', title: 'Top Announcement Bar', count: 1 },
    { id: 'hero', title: 'Hero Banner & Main Title', count: 6 },
    { id: 'trust', title: 'Trust Strip & 4 Promises', count: 8 },
    { id: 'why', title: 'Why FARAABEE / Botanical Roots', count: 4 },
    { id: 'story', title: 'Craftsmanship & Sourcing Story', count: 5 },
    { id: 'featured', title: 'Featured Formulations Titles', count: 3 },
    { id: 'journal', title: 'Herbal Journal Preview', count: 3 },
    { id: 'footer', title: 'Footer Bio & Disclaimers', count: 3 },
  ];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-[#AFC7A5]/30 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#183F32]">
              Live Copy & Typography Studio
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#183F32] mt-1">
            Edit Any Text, Paragraph, Font & Color
          </h2>
          <p className="text-xs text-[#26312B]/70 mt-1 max-w-2xl leading-relaxed">
            Change any sentence or paragraph across the entire website. Choose your preferred <strong>font family</strong>, <strong>text color</strong>, and <strong>font size</strong> for each piece of text. Changes are published live to <strong>faraabee.com</strong> instantly.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#26312B]/70 hover:text-red-700 bg-[#FAF9F3] hover:bg-red-50 border border-[#AFC7A5]/40 rounded-xl transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Original Copy</span>
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#183F32] hover:bg-[#122F25] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Publishing...' : 'Publish Content Live'}</span>
          </button>
        </div>
      </div>

      {/* Section Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#AFC7A5]/25">
        {sections.map((sec) => (
          <button
            key={sec.id}
            onClick={() => setActiveSection(sec.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
              activeSection === sec.id
                ? 'bg-[#183F32] text-white shadow-xs'
                : 'text-[#26312B]/80 hover:bg-[#E3EBDD]/40'
            }`}
          >
            {sec.title}
          </button>
        ))}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* SECTION 1: ANNOUNCEMENT BAR */}
        {activeSection === 'announcement' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#AFC7A5]/30 shadow-xs space-y-6">
            <h3 className="font-serif text-lg font-bold text-[#183F32] pb-3 border-b border-[#AFC7A5]/20">
              Top Announcement Ribbon
            </h3>
            <TextEditorBlock
              label="Announcement Bar Text"
              item={formData.announcementText}
              onChange={(field, val) => handleItemChange('announcementText', field, val)}
              multiline={false}
            />
          </div>
        )}

        {/* SECTION 2: HERO BANNER */}
        {activeSection === 'hero' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#AFC7A5]/30 shadow-xs space-y-6">
            <h3 className="font-serif text-lg font-bold text-[#183F32] pb-3 border-b border-[#AFC7A5]/20">
              Hero Banner (Homepage Main Viewport)
            </h3>

            <TextEditorBlock
              label="Hero Top Badge"
              item={formData.heroBadge}
              onChange={(field, val) => handleItemChange('heroBadge', field, val)}
            />

            <TextEditorBlock
              label="Main Hero Title (Big Heading)"
              item={formData.heroHeading}
              onChange={(field, val) => handleItemChange('heroHeading', field, val)}
            />

            <TextEditorBlock
              label="Urdu Calligraphy Sub-Heading"
              item={formData.heroUrduHeading}
              onChange={(field, val) => handleItemChange('heroUrduHeading', field, val)}
              isUrdu={true}
            />

            <TextEditorBlock
              label="Hero Subtitle / Main Introduction Paragraph"
              item={formData.heroSubtitle}
              onChange={(field, val) => handleItemChange('heroSubtitle', field, val)}
              multiline={true}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <TextEditorBlock
                label="Primary Button Label (e.g. Explore Formulations)"
                item={formData.heroBtnPrimary}
                onChange={(field, val) => handleItemChange('heroBtnPrimary', field, val)}
              />
              <TextEditorBlock
                label="Secondary Button Label (e.g. Our Herbal Philosophy)"
                item={formData.heroBtnSecondary}
                onChange={(field, val) => handleItemChange('heroBtnSecondary', field, val)}
              />
            </div>
          </div>
        )}

        {/* SECTION 3: TRUST STRIP */}
        {activeSection === 'trust' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#AFC7A5]/30 shadow-xs space-y-6">
            <h3 className="font-serif text-lg font-bold text-[#183F32] pb-3 border-b border-[#AFC7A5]/20">
              Apothecary Promises & Trust Strip (4 Cards)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-[#FAF9F3]/60 border border-[#AFC7A5]/30 space-y-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#183F32]">Card 1</span>
                <TextEditorBlock
                  label="Promise 1 Title"
                  item={formData.trustItem1Title}
                  onChange={(field, val) => handleItemChange('trustItem1Title', field, val)}
                />
                <TextEditorBlock
                  label="Promise 1 Description"
                  item={formData.trustItem1Desc}
                  onChange={(field, val) => handleItemChange('trustItem1Desc', field, val)}
                  multiline={true}
                />
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF9F3]/60 border border-[#AFC7A5]/30 space-y-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#183F32]">Card 2</span>
                <TextEditorBlock
                  label="Promise 2 Title"
                  item={formData.trustItem2Title}
                  onChange={(field, val) => handleItemChange('trustItem2Title', field, val)}
                />
                <TextEditorBlock
                  label="Promise 2 Description"
                  item={formData.trustItem2Desc}
                  onChange={(field, val) => handleItemChange('trustItem2Desc', field, val)}
                  multiline={true}
                />
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF9F3]/60 border border-[#AFC7A5]/30 space-y-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#183F32]">Card 3</span>
                <TextEditorBlock
                  label="Promise 3 Title"
                  item={formData.trustItem3Title}
                  onChange={(field, val) => handleItemChange('trustItem3Title', field, val)}
                />
                <TextEditorBlock
                  label="Promise 3 Description"
                  item={formData.trustItem3Desc}
                  onChange={(field, val) => handleItemChange('trustItem3Desc', field, val)}
                  multiline={true}
                />
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF9F3]/60 border border-[#AFC7A5]/30 space-y-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#183F32]">Card 4</span>
                <TextEditorBlock
                  label="Promise 4 Title"
                  item={formData.trustItem4Title}
                  onChange={(field, val) => handleItemChange('trustItem4Title', field, val)}
                />
                <TextEditorBlock
                  label="Promise 4 Description"
                  item={formData.trustItem4Desc}
                  onChange={(field, val) => handleItemChange('trustItem4Desc', field, val)}
                  multiline={true}
                />
              </div>
            </div>
          </div>
        )}

        {/* SECTION 4: WHY FARABI */}
        {activeSection === 'why' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#AFC7A5]/30 shadow-xs space-y-6">
            <h3 className="font-serif text-lg font-bold text-[#183F32] pb-3 border-b border-[#AFC7A5]/20">
              Why FARAABEE / Botanical Roots Section
            </h3>

            <TextEditorBlock
              label="Section Badge"
              item={formData.whyFarabiBadge}
              onChange={(field, val) => handleItemChange('whyFarabiBadge', field, val)}
            />

            <TextEditorBlock
              label="Main Section Heading"
              item={formData.whyFarabiHeading}
              onChange={(field, val) => handleItemChange('whyFarabiHeading', field, val)}
            />

            <TextEditorBlock
              label="Paragraph 1 (The Classical Tradition)"
              item={formData.whyFarabiParagraph1}
              onChange={(field, val) => handleItemChange('whyFarabiParagraph1', field, val)}
              multiline={true}
            />

            <TextEditorBlock
              label="Paragraph 2 (Our Promise & Purity)"
              item={formData.whyFarabiParagraph2}
              onChange={(field, val) => handleItemChange('whyFarabiParagraph2', field, val)}
              multiline={true}
            />
          </div>
        )}

        {/* SECTION 5: CRAFTSMANSHIP & STORY */}
        {activeSection === 'story' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#AFC7A5]/30 shadow-xs space-y-6">
            <h3 className="font-serif text-lg font-bold text-[#183F32] pb-3 border-b border-[#AFC7A5]/20">
              Craftsmanship & Sourcing Story
            </h3>

            <TextEditorBlock
              label="Section Badge"
              item={formData.storyBadge}
              onChange={(field, val) => handleItemChange('storyBadge', field, val)}
            />

            <TextEditorBlock
              label="Main Story Heading"
              item={formData.storyHeading}
              onChange={(field, val) => handleItemChange('storyHeading', field, val)}
            />

            <TextEditorBlock
              label="Story Paragraph 1 (Slow Maceration)"
              item={formData.storyParagraph1}
              onChange={(field, val) => handleItemChange('storyParagraph1', field, val)}
              multiline={true}
            />

            <TextEditorBlock
              label="Story Paragraph 2 (Bio-available Results)"
              item={formData.storyParagraph2}
              onChange={(field, val) => handleItemChange('storyParagraph2', field, val)}
              multiline={true}
            />

            <TextEditorBlock
              label="Botanical Philosophy Quote"
              item={formData.storyQuote}
              onChange={(field, val) => handleItemChange('storyQuote', field, val)}
            />
          </div>
        )}

        {/* SECTION 6: FEATURED PRODUCTS */}
        {activeSection === 'featured' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#AFC7A5]/30 shadow-xs space-y-6">
            <h3 className="font-serif text-lg font-bold text-[#183F32] pb-3 border-b border-[#AFC7A5]/20">
              Featured Formulations Heading
            </h3>

            <TextEditorBlock
              label="Section Badge"
              item={formData.featuredBadge}
              onChange={(field, val) => handleItemChange('featuredBadge', field, val)}
            />

            <TextEditorBlock
              label="Section Main Heading"
              item={formData.featuredHeading}
              onChange={(field, val) => handleItemChange('featuredHeading', field, val)}
            />

            <TextEditorBlock
              label="Section Subtitle"
              item={formData.featuredSubtitle}
              onChange={(field, val) => handleItemChange('featuredSubtitle', field, val)}
              multiline={true}
            />
          </div>
        )}

        {/* SECTION 7: JOURNAL PREVIEW */}
        {activeSection === 'journal' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#AFC7A5]/30 shadow-xs space-y-6">
            <h3 className="font-serif text-lg font-bold text-[#183F32] pb-3 border-b border-[#AFC7A5]/20">
              Herbal Journal & Articles Heading
            </h3>

            <TextEditorBlock
              label="Section Badge"
              item={formData.journalBadge}
              onChange={(field, val) => handleItemChange('journalBadge', field, val)}
            />

            <TextEditorBlock
              label="Section Main Heading"
              item={formData.journalHeading}
              onChange={(field, val) => handleItemChange('journalHeading', field, val)}
            />

            <TextEditorBlock
              label="Section Subtitle"
              item={formData.journalSubtitle}
              onChange={(field, val) => handleItemChange('journalSubtitle', field, val)}
              multiline={true}
            />
          </div>
        )}

        {/* SECTION 8: FOOTER */}
        {activeSection === 'footer' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#AFC7A5]/30 shadow-xs space-y-6">
            <h3 className="font-serif text-lg font-bold text-[#183F32] pb-3 border-b border-[#AFC7A5]/20">
              Footer Bio & Regulatory Disclaimers
            </h3>

            <TextEditorBlock
              label="Brand Story Bio (Under Logo in Footer)"
              item={formData.footerBrandBio}
              onChange={(field, val) => handleItemChange('footerBrandBio', field, val)}
              multiline={true}
            />

            <TextEditorBlock
              label="Urdu Slogan (Footer)"
              item={formData.footerUrduTagline}
              onChange={(field, val) => handleItemChange('footerUrduTagline', field, val)}
              isUrdu={true}
            />

            <TextEditorBlock
              label="Legal & Regulatory Disclaimer"
              item={formData.footerDisclaimer}
              onChange={(field, val) => handleItemChange('footerDisclaimer', field, val)}
              multiline={true}
            />
          </div>
        )}

        {/* Floating Save Button at bottom */}
        <div className="p-4 bg-white rounded-2xl border border-[#AFC7A5]/30 shadow-xs flex items-center justify-between">
          <p className="text-xs text-[#26312B]/70">
            Publish your edits in real time to all visitors.
          </p>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#183F32] hover:bg-[#122F25] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Publishing to Cloud...' : 'Publish Content Live'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

// Reusable Paragraph / Heading Editor Component with Text, Font, Size, and Color
interface TextEditorBlockProps {
  label: string;
  item: TextCustomization;
  onChange: (field: keyof TextCustomization, val: any) => void;
  multiline?: boolean;
  isUrdu?: boolean;
}

const TextEditorBlock: React.FC<TextEditorBlockProps> = ({
  label,
  item,
  onChange,
  multiline = false,
  isUrdu = false,
}) => {
  const [showStyling, setShowStyling] = useState(false);

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF9F3]/60 border border-[#AFC7A5]/35 space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-[#183F32]">{label}</label>
        <button
          type="button"
          onClick={() => setShowStyling(!showStyling)}
          className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#183F32] bg-[#E3EBDD] hover:bg-[#AFC7A5]/40 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
        >
          <Type className="w-3 h-3" />
          <span>{showStyling ? 'Hide Font & Color' : 'Change Font & Color'}</span>
          {showStyling ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
      </div>

      {/* Main Text Content Input */}
      {multiline ? (
        <textarea
          rows={3}
          value={item.text || ''}
          onChange={(e) => onChange('text', e.target.value)}
          dir={isUrdu ? 'rtl' : 'ltr'}
          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#AFC7A5]/40 bg-white focus:outline-none focus:ring-1 focus:ring-[#183F32] leading-relaxed"
        />
      ) : (
        <input
          type="text"
          value={item.text || ''}
          onChange={(e) => onChange('text', e.target.value)}
          dir={isUrdu ? 'rtl' : 'ltr'}
          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#AFC7A5]/40 bg-white focus:outline-none focus:ring-1 focus:ring-[#183F32]"
        />
      )}

      {/* Live Preview Badge */}
      <div className="p-3 rounded-xl bg-white border border-[#AFC7A5]/25 space-y-1">
        <span className="text-[10px] uppercase font-bold text-[#26312B]/50 block">Live Preview:</span>
        <div
          dir={isUrdu ? 'rtl' : 'ltr'}
          className={`${item.fontSize || 'text-sm'} ${item.fontWeight || 'font-normal'} leading-relaxed`}
          style={{
            fontFamily: item.fontFamily ? `"${item.fontFamily}", serif` : undefined,
            color: item.color || '#183F32',
          }}
        >
          {item.text || '(Empty)'}
        </div>
      </div>

      {/* Typography & Color Customization Controls (Collapsible) */}
      {showStyling && (
        <div className="pt-3 border-t border-[#AFC7A5]/25 grid grid-cols-1 sm:grid-cols-3 gap-3 animate-fade-in">
          {/* Font Family */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#183F32] mb-1">
              Font Family
            </label>
            <select
              value={item.fontFamily || 'Plus Jakarta Sans'}
              onChange={(e) => onChange('fontFamily', e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-[#AFC7A5]/40 bg-white cursor-pointer"
            >
              {AVAILABLE_FONTS.map((f) => (
                <option key={f.name} value={f.name}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>

          {/* Font Size */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#183F32] mb-1">
              Font Size
            </label>
            <select
              value={item.fontSize || 'text-sm'}
              onChange={(e) => onChange('fontSize', e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-[#AFC7A5]/40 bg-white cursor-pointer"
            >
              {FONT_SIZES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          {/* Text Color */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#183F32] mb-1">
              Text Color
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={item.color || '#183F32'}
                onChange={(e) => onChange('color', e.target.value)}
                className="w-7 h-7 rounded-lg border border-black/20 cursor-pointer overflow-hidden p-0 shrink-0"
              />
              <input
                type="text"
                value={item.color || '#183F32'}
                onChange={(e) => onChange('color', e.target.value)}
                placeholder="#183F32"
                className="flex-1 px-2 py-1 text-xs font-mono rounded-lg border border-[#AFC7A5]/40 bg-white"
              />
            </div>
            {/* Swatches */}
            <div className="flex items-center gap-1 flex-wrap pt-1.5">
              {PRESET_COLORS.slice(0, 8).map((col) => (
                <button
                  key={col}
                  type="button"
                  onClick={() => onChange('color', col)}
                  className="w-3.5 h-3.5 rounded-full border border-black/15 cursor-pointer hover:scale-125 transition-transform"
                  style={{ backgroundColor: col }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
