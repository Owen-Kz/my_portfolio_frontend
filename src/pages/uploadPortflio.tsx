// src/pages/dashboard/UploadPortfolio.tsx
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, X, Image as ImageIcon, Palette, Layers, Sparkles, Send, ArrowRight } from 'lucide-react';
import { useApiClient } from '@/utils/apiClient';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const UploadPortfolio = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { post } = useApiClient();
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    tags: [] as string[],
    images: [] as File[]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const categories = ['Branding', 'UI/UX', 'Print Design', 'Web Design', 'Illustration'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (['Enter', ','].includes(e.key)) {
      e.preventDefault();
      const val = tagInput.trim();
      if (val && !formData.tags.includes(val)) {
        setFormData(prev => ({ ...prev, tags: [...prev.tags, val] }));
        setTagInput('');
      }
    }
  };

  const removeTag = (index: number) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter((_, i) => i !== index) }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => file.size <= 5 * 1024 * 1024);
    
    const previewUrls = validFiles.map(file => URL.createObjectURL(file));
    setPreviewImages(prev => [...prev, ...previewUrls]);
    setFormData(prev => ({ ...prev, images: [...prev.images, ...validFiles] }));
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(previewImages[index]);
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('tags', formData.tags.join(','));
      formData.images.forEach(file => formDataToSend.append('files', file));

      const response = await post('/uploadFiles', formDataToSend, true);
      if (response.success) navigate('/dashboard');
    } catch (err: any) {
      setErrors({ submit: err.message || 'Submission Interrupted' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* 1. EDITORIAL HEADER */}
        <header className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-purple-500/10 rounded-2xl border border-purple-500/20">
              <Palette className="w-6 h-6 text-purple-500" />
            </div>
            <span className="text-[10px] font-black tracking-[0.5em] text-white/30 uppercase">Creative Forge</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
            Register <span className="text-white/10 italic">Design.</span>
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: COMPOSITION FORM (Liquid Glass) */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="backdrop-blur-3xl bg-white/5 border border-white/10 p-8 md:p-14 rounded-[3.5rem] shadow-2xl"
            >
              <form onSubmit={handleSubmit} className="space-y-12">
                
                {/* Project Identity */}
                <div className="space-y-2 group">
                  <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 italic">01. Composition Identity</Label>
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="ENTER PROJECT TITLE..."
                    className="w-full bg-transparent border-0 border-b border-white/10 rounded-none py-4 text-3xl font-black uppercase tracking-tighter focus:ring-0 focus:border-white transition-all placeholder:text-white/5"
                  />
                  {errors.title && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest">{errors.title}</p>}
                </div>

                {/* Taxonomy & Meta */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 italic">02. Taxonomy</Label>
                    <select 
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-b border-white/10 py-4 text-sm font-bold uppercase tracking-widest outline-none focus:border-white appearance-none"
                    >
                      <option value="" className="bg-black">SELECT CATEGORY</option>
                      {categories.map(c => <option key={c} value={c} className="bg-black">{c}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 italic">03. Metadata Tags</Label>
                    <div className="relative">
                      <input 
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleTagKeyDown}
                        placeholder="ADD TAG..."
                        className="w-full bg-transparent border-b border-white/10 py-4 text-sm font-bold uppercase tracking-widest outline-none focus:border-white placeholder:text-white/5"
                      />
                    </div>
                  </div>
                </div>

                {/* Tag Display */}
                <div className="flex flex-wrap gap-2">
                  <AnimatePresence>
                    {formData.tags.map((tag, i) => (
                      <motion.span 
                        initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
                        key={i} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 group hover:bg-white hover:text-black transition-colors"
                      >
                        {tag} <X className="w-3 h-3 cursor-pointer" onClick={() => removeTag(i)} />
                      </motion.span>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Description Brief */}
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 italic">04. Design Brief</Label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={5}
                    placeholder="DESCRIBE THE VISUAL LANGUAGE..."
                    className="w-full bg-white/5 border border-white/10 rounded-[2rem] p-6 text-sm font-medium focus:ring-1 focus:ring-white transition-all outline-none leading-relaxed"
                  />
                </div>

                <Button 
                  disabled={isSubmitting}
                  className="w-full py-10 rounded-full bg-white text-black text-lg font-black uppercase tracking-[0.3em] hover:bg-white/90 transition-all hover:scale-[1.01] active:scale-95 shadow-2xl shadow-white/10"
                >
                  {isSubmitting ? 'ENGINEERING...' : <><Sparkles className="mr-3 w-5 h-5" /> Commit to Portfolio</>}
                </Button>
              </form>
            </motion.div>
          </div>

          {/* RIGHT: VISUAL EXHIBITS (Curved Assets Pod) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 md:p-10 rounded-[3.5rem] bg-white/5 border border-white/10 backdrop-blur-md">
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-white/30 mb-8 flex items-center gap-2">
                <Layers className="w-4 h-4" /> Visual Exhibits
              </h3>
              
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="aspect-square rounded-[3rem] border-2 border-dashed border-white/10 flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 hover:border-white/20 transition-all group mb-8"
              >
                <div className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Plus className="w-10 h-10" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Drop high-res captures</p>
                <input type="file" multiple ref={fileInputRef} className="hidden" onChange={handleImageUpload} accept="image/*" />
              </div>

              {/* Grid Previews */}
              <div className="grid grid-cols-2 gap-4">
                <AnimatePresence>
                  {previewImages.map((src, i) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                      key={src} className="relative aspect-square rounded-[1.5rem] overflow-hidden group border border-white/10 bg-black"
                    >
                      <img src={src} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                      <button 
                        onClick={() => removeImage(i)}
                        className="absolute inset-0 bg-red-600/90 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center"
                      >
                        <X className="w-6 h-6 text-white" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Hint Card */}
            <div className="p-10 rounded-[3rem] bg-gradient-to-br from-white/10 to-transparent border border-white/10">
               <div className="flex items-center gap-3 mb-4">
                 <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                 <span className="text-[10px] font-black uppercase tracking-widest">Quality Control</span>
               </div>
               <p className="text-xs text-white/40 leading-relaxed font-light">
                 Upload high-fidelity PNG or WEBP formats. Ensure aspect ratios are consistent for a balanced gallery presence.
               </p>
            </div>
          </div>

        </div>
      </div>

      {errors.submit && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 px-8 py-4 bg-red-500 text-white rounded-full font-black uppercase tracking-widest text-xs z-[200] shadow-2xl">
          {errors.submit}
        </div>
      )}
    </div>
  );
};

export default UploadPortfolio;