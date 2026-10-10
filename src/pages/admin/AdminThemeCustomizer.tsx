import React, { useState } from 'react';
import { useCustomization } from '../../context/CustomizationContext';
import { THEME_PRESETS, AVAILABLE_FONTS, PRESET_COLORS, DEFAULT_THEME } from '../../config/defaultCustomization';
import { SiteTheme } from '../../types/customization';
import {
  Palette,
  Sparkles,
  Save,
  RotateCcw,
  CheckCircle2,
  Type,
  Layout,
  Eye,
  Sliders,
} from 'lucide-react';

interface AdminThemeCustomizerProps {
  onNotify: (msg: string) => void;
}

export const AdminThemeCustomizer: React.FC<AdminThemeCustomizerProps> = ({ onNotify }) => {
  const { theme, updateTheme, resetTheme } = useCustomization();
  const [formData, setFormData] = useState<SiteTheme>(theme);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'colors' | 'typography' | 'presets'>('colors');

  const handleColorChange = (key: keyof SiteTheme, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleApplyPreset = (presetTheme: Partial<SiteTheme>) => {
    setFormData((prev) => ({ ...prev, ...presetTheme }));
    onNotify('Preset applied! Click "Save Theme" to publish.');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateTheme(formData);
      onNotify('Theme colors & styles updated live on faraabee.com!');
    } catch {
      onNotify('Failed to save theme settings.');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (window.confirm('Reset all colors and typography back to Farabi original factory settings?')) {
      await resetTheme();
      setFormData(DEFAULT_THEME);
      onNotify('Theme reset to default botanical palette.');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-[#AFC7A5]/30 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#183F32]">
              Global Appearance Engine
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#183F32] mt-1">
            Website Colors, Typography & Styling
          </h2>
          <p className="text-xs text-[#26312B]/70 mt-1 max-w-2xl leading-relaxed">
            Customize the color palette, fonts, buttons, header, and footer across all pages. Changes take effect on <strong>faraabee.com</strong> in real time without editing code.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#26312B]/70 hover:text-red-700 bg-[#FAF9F3] hover:bg-red-50 border border-[#AFC7A5]/40 rounded-xl transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#183F32] hover:bg-[#122F25] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Theme'}</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-[#AFC7A5]/25 pb-3">
        <button
          onClick={() => setActiveTab('colors')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            activeTab === 'colors'
              ? 'bg-[#183F32] text-white shadow-xs'
              : 'text-[#26312B]/80 hover:bg-[#E3EBDD]/40'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>Colors & Sections</span>
        </button>
        <button
          onClick={() => setActiveTab('typography')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            activeTab === 'typography'
              ? 'bg-[#183F32] text-white shadow-xs'
              : 'text-[#26312B]/80 hover:bg-[#E3EBDD]/40'
          }`}
        >
          <Type className="w-4 h-4" />
          <span>Global Typography</span>
        </button>
        <button
          onClick={() => setActiveTab('presets')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            activeTab === 'presets'
              ? 'bg-[#183F32] text-white shadow-xs'
              : 'text-[#26312B]/80 hover:bg-[#E3EBDD]/40'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Luxury Presets (1-Click)</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Controls */}
        <div className="lg:col-span-8 space-y-6">
          {activeTab === 'presets' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#AFC7A5]/30 shadow-xs space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#183F32]">
                Curated Luxury Apothecary Presets
              </h3>
              <p className="text-xs text-[#26312B]/70">
                Instantly re-skin your entire store with harmonious designer color schemes.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {THEME_PRESETS.map((preset) => {
                  return (
                    <div
                      key={preset.id}
                      className="p-5 rounded-2xl border border-[#AFC7A5]/35 bg-[#FAF9F3]/60 hover:bg-white hover:border-[#183F32] transition-all flex flex-col justify-between space-y-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                            style={{ backgroundColor: preset.theme.primaryColor }}
                          />
                          <span
                            className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                            style={{ backgroundColor: preset.theme.accentColor }}
                          />
                          <span
                            className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                            style={{ backgroundColor: preset.theme.backgroundColor }}
                          />
                          <span
                            className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                            style={{ backgroundColor: preset.theme.footerBgColor }}
                          />
                        </div>
                        <h4 className="font-serif font-bold text-sm text-[#183F32] mt-2">
                          {preset.name}
                        </h4>
                        <p className="text-[11px] text-[#26312B]/70 mt-0.5">
                          {preset.description}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleApplyPreset(preset.theme)}
                        className="w-full py-2 px-3 bg-[#E3EBDD] hover:bg-[#AFC7A5]/40 text-[#183F32] text-xs font-bold rounded-xl transition-colors cursor-pointer"
                      >
                        Apply This Palette
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'colors' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#AFC7A5]/30 shadow-xs space-y-6">
              <h3 className="font-serif text-lg font-bold text-[#183F32] pb-3 border-b border-[#AFC7A5]/20">
                Section & Component Color Controls
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* 1. Primary Accent */}
                <ColorInputCard
                  label="Primary Accent (Headings, Main Elements)"
                  colorKey="primaryColor"
                  value={formData.primaryColor}
                  onChange={(val) => handleColorChange('primaryColor', val)}
                />

                {/* 2. Secondary Accent */}
                <ColorInputCard
                  label="Secondary Accent (Badges, Secondary Buttons)"
                  colorKey="secondaryColor"
                  value={formData.secondaryColor}
                  onChange={(val) => handleColorChange('secondaryColor', val)}
                />

                {/* 3. Background Color */}
                <ColorInputCard
                  label="Page Background Color (Body Canvas)"
                  colorKey="backgroundColor"
                  value={formData.backgroundColor}
                  onChange={(val) => handleColorChange('backgroundColor', val)}
                />

                {/* 4. Card Surface Color */}
                <ColorInputCard
                  label="Product & Content Card Surface"
                  colorKey="surfaceColor"
                  value={formData.surfaceColor}
                  onChange={(val) => handleColorChange('surfaceColor', val)}
                />

                {/* 5. Header Background */}
                <ColorInputCard
                  label="Header Bar Background"
                  colorKey="headerBgColor"
                  value={formData.headerBgColor}
                  onChange={(val) => handleColorChange('headerBgColor', val)}
                />

                {/* 6. Header Text / Nav Links Color */}
                <ColorInputCard
                  label="Header Navigation Links & Logo Color"
                  colorKey="headerTextColor"
                  value={formData.headerTextColor}
                  onChange={(val) => handleColorChange('headerTextColor', val)}
                />

                {/* 7. Footer Background */}
                <ColorInputCard
                  label="Footer Background Color"
                  colorKey="footerBgColor"
                  value={formData.footerBgColor}
                  onChange={(val) => handleColorChange('footerBgColor', val)}
                />

                {/* 8. Footer Text */}
                <ColorInputCard
                  label="Footer Text & Links Color"
                  colorKey="footerTextColor"
                  value={formData.footerTextColor}
                  onChange={(val) => handleColorChange('footerTextColor', val)}
                />

                {/* 9. Primary Action Buttons Background */}
                <ColorInputCard
                  label="Main Buttons Background (Add to Cart, Checkout)"
                  colorKey="buttonBgColor"
                  value={formData.buttonBgColor}
                  onChange={(val) => handleColorChange('buttonBgColor', val)}
                />

                {/* 10. Button Text Color */}
                <ColorInputCard
                  label="Main Buttons Label Text Color"
                  colorKey="buttonTextColor"
                  value={formData.buttonTextColor}
                  onChange={(val) => handleColorChange('buttonTextColor', val)}
                />

                {/* 11. Announcement Banner Background */}
                <ColorInputCard
                  label="Top Announcement Banner Background"
                  colorKey="bannerBgColor"
                  value={formData.bannerBgColor}
                  onChange={(val) => handleColorChange('bannerBgColor', val)}
                />

                {/* 12. Announcement Banner Text */}
                <ColorInputCard
                  label="Top Announcement Banner Text Color"
                  colorKey="bannerTextColor"
                  value={formData.bannerTextColor}
                  onChange={(val) => handleColorChange('bannerTextColor', val)}
                />
              </div>
            </div>
          )}

          {activeTab === 'typography' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#AFC7A5]/30 shadow-xs space-y-6">
              <h3 className="font-serif text-lg font-bold text-[#183F32] pb-3 border-b border-[#AFC7A5]/20">
                Global Font Architecture
              </h3>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#183F32] mb-1.5">
                    Primary Headings Font Family (Titles & Heroes)
                  </label>
                  <select
                    value={formData.fontHeading}
                    onChange={(e) => setFormData({ ...formData, fontHeading: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#AFC7A5]/40 bg-[#FAF9F3]/30 focus:outline-none focus:ring-1 focus:ring-[#183F32] cursor-pointer"
                  >
                    {AVAILABLE_FONTS.map((f) => (
                      <option key={f.name} value={f.name}>
                        {f.label}
                      </option>
                    ))}
                  </select>
                  <p
                    className="mt-2 text-xl font-bold text-[#183F32] p-3 rounded-xl bg-[#FAF9F3] border border-[#AFC7A5]/30"
                    style={{ fontFamily: `"${formData.fontHeading}", serif` }}
                  >
                    Farabi Herbal Apothecary (Sample Heading)
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#183F32] mb-1.5">
                    Primary Body Text Font Family (Descriptions & Content)
                  </label>
                  <select
                    value={formData.fontBody}
                    onChange={(e) => setFormData({ ...formData, fontBody: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#AFC7A5]/40 bg-[#FAF9F3]/30 focus:outline-none focus:ring-1 focus:ring-[#183F32] cursor-pointer"
                  >
                    {AVAILABLE_FONTS.map((f) => (
                      <option key={f.name} value={f.name}>
                        {f.label}
                      </option>
                    ))}
                  </select>
                  <p
                    className="mt-2 text-xs leading-relaxed text-[#26312B] p-3 rounded-xl bg-[#FAF9F3] border border-[#AFC7A5]/30"
                    style={{ fontFamily: `"${formData.fontBody}", sans-serif` }}
                  >
                    Crafted with pure carrier oils, dried whole herbs, and quiet daily patience in Pakistan.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Live Interactive Preview */}
        <div className="lg:col-span-4 sticky top-6 space-y-5">
          <div className="bg-white rounded-3xl p-6 border border-[#AFC7A5]/30 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#AFC7A5]/20">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#183F32]" />
                <h4 className="font-serif font-bold text-sm text-[#183F32]">
                  Live Component Preview
                </h4>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                Real-Time
              </span>
            </div>

            {/* Preview Banner */}
            <div
              className="p-2 rounded-xl text-center text-[10px] font-semibold transition-colors"
              style={{
                backgroundColor: formData.bannerBgColor,
                color: formData.bannerTextColor,
              }}
            >
              🌿 Free Delivery Across Pakistan on Orders Over Rs. 5,000
            </div>

            {/* Preview Header */}
            <div
              className="p-3.5 rounded-2xl border border-black/5 flex items-center justify-between transition-colors"
              style={{
                backgroundColor: formData.headerBgColor,
                color: formData.headerTextColor,
              }}
            >
              <span
                className="font-bold text-sm tracking-wider"
                style={{ fontFamily: `"${formData.fontHeading}", serif` }}
              >
                FARAABEE
              </span>
              <div className="flex items-center gap-2 text-[11px] font-medium opacity-80">
                <span>Products</span>
                <span>Philosophy</span>
                <span>Contact</span>
              </div>
            </div>

            {/* Preview Card */}
            <div
              className="p-4 rounded-2xl border border-black/10 space-y-3 transition-colors"
              style={{
                backgroundColor: formData.surfaceColor,
                color: formData.textColor,
              }}
            >
              <div className="flex items-center gap-1.5">
                <span
                  className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider"
                  style={{
                    backgroundColor: formData.accentLightColor,
                    color: formData.secondaryColor,
                  }}
                >
                  Pure Cold-Pressed
                </span>
              </div>

              <h5
                className="text-base font-bold transition-colors"
                style={{
                  fontFamily: `"${formData.fontHeading}", serif`,
                  color: formData.primaryColor,
                }}
              >
                Botanical Scalp & Hair Elixir
              </h5>

              <p
                className="text-[11px] leading-relaxed opacity-85"
                style={{ fontFamily: `"${formData.fontBody}", sans-serif` }}
              >
                Slow-macerated whole amla, black seed, and organic sesame oil for follicular vitality.
              </p>

              <div className="flex items-center justify-between pt-1">
                <span className="text-sm font-bold">Rs. 1,850</span>
                <button
                  type="button"
                  className="px-3 py-1.5 rounded-xl text-xs font-bold transition-colors shadow-2xs"
                  style={{
                    backgroundColor: formData.buttonBgColor,
                    color: formData.buttonTextColor,
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Preview Footer */}
            <div
              className="p-3.5 rounded-2xl text-[11px] space-y-1 transition-colors"
              style={{
                backgroundColor: formData.footerBgColor,
                color: formData.footerTextColor,
              }}
            >
              <p className="font-bold">FARAABEE Herbal Wellness</p>
              <p className="text-[10px] opacity-75">
                © 2026 Handcrafted botanical care from Gujranwala.
              </p>
            </div>

            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="w-full py-2.5 bg-[#183F32] hover:bg-[#122F25] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-xs disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Publishing Live...' : 'Publish Theme to faraabee.com'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Color Input Card with Picker and Color Swatches
interface ColorInputCardProps {
  label: string;
  colorKey: keyof SiteTheme;
  value: string;
  onChange: (val: string) => void;
}

const ColorInputCard: React.FC<ColorInputCardProps> = ({ label, value, onChange }) => {
  return (
    <div className="p-4 rounded-2xl bg-[#FAF9F3]/60 border border-[#AFC7A5]/35 space-y-2.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-[#183F32] leading-tight pr-2">
          {label}
        </label>
        <span className="text-[11px] font-mono font-semibold text-[#26312B]/70 uppercase">
          {value}
        </span>
      </div>

      <div className="flex items-center gap-2.5">
        <div className="relative shrink-0">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-9 h-9 rounded-xl border border-black/20 cursor-pointer overflow-hidden p-0"
          />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#183F32"
          className="flex-1 px-3 py-1.5 text-xs font-mono rounded-xl border border-[#AFC7A5]/40 bg-white focus:outline-none focus:ring-1 focus:ring-[#183F32]"
        />
      </div>

      {/* Preset Swatches */}
      <div className="flex items-center gap-1.5 flex-wrap pt-1">
        {PRESET_COLORS.map((swatch) => (
          <button
            key={swatch}
            type="button"
            onClick={() => onChange(swatch)}
            title={swatch}
            className={`w-4 h-4 rounded-full border border-black/15 transition-transform hover:scale-125 cursor-pointer ${
              value.toLowerCase() === swatch.toLowerCase() ? 'ring-2 ring-[#183F32] ring-offset-1' : ''
            }`}
            style={{ backgroundColor: swatch }}
          />
        ))}
      </div>
    </div>
  );
};
