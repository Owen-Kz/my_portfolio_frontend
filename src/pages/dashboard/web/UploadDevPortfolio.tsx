import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, X, Globe, Smartphone, Code, Server, Zap, Rocket, Terminal, Layers } from 'lucide-react';
import { useApiClient } from '@/utils/apiClient';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const UploadDevPortfolio = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { post } = useApiClient();
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    type: '',
    description: '',
    url: '',
    previewUrl: '',
    status: '',
    year: new Date().getFullYear().toString(),
    tags: [] as string[],
    technologies: [] as string[],
    images: [] as File[]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [techInput, setTechInput] = useState('');

  const categories = ['Websites', 'Web Apps', 'Mobile Apps', 'E-commerce', 'Dashboard', 'API', 'Full-Stack'];
  const projectTypes = [
    { value: 'website', label: 'Website', icon: Globe },
    { value: 'webapp', label: 'Web Application', icon: Code },
    { value: 'mobile', label: 'Mobile App', icon: Smartphone },
    { value: 'api', label: 'API/Backend', icon: Server }
  ];
  const statusOptions = ['Live', 'Demo', 'Development', 'Maintenance'];

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

  const handleTechKeyDown = (e: React.KeyboardEvent) => {
    if (['Enter', ','].includes(e.key)) {
      e.preventDefault();
      const val = techInput.trim();
      if (val && !formData.technologies.includes(val)) {
        setFormData(prev => ({ ...prev, technologies: [...prev.technologies, val] }));
        setTechInput('');
      }
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => file.size <= 5 * 1024 * 1024);
    
    const previewUrls = validFiles.map(file => URL.createObjectURL(file));
    setPreviewImages(prev => [...prev, ...previewUrls]);
    setFormData(prev => ({ ...prev, images: [...prev.images, ...validFiles] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'images') {
          formData.images.forEach(file => formDataToSend.append('files', file));
        } else if (Array.isArray(value)) {
          formDataToSend.append(key, value.join(','));
        } else {
          formDataToSend.append(key, value as string);
        }
      });

      const response = await post('/uploadDevFiles', formDataToSend, true);
      if (response.success) navigate('/dashboard/dev');
    } catch (error: any) {
      setErrors({ submit: error.message || 'Transmission Failed' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505]/90  text-white py-20 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* 1. EDITORIAL HEADER */}
        <header className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20">
              <Terminal className="w-6 h-6 text-blue-500" />
            </div>
            <span className="text-[10px] font-black tracking-[0.5em] text-white/30 uppercase">Deployment Terminal</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
            New <span className="text-white/10 italic">Repository.</span>
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: FORM POD (Liquid Glass) */}
          <div className="lg:col-span-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="backdrop-blur-3xl bg-white/5 border border-white/10 p-8 md:p-12 rounded-[3.5rem] shadow-2xl"
            >
              <form onSubmit={handleSubmit} className="space-y-10">
                
                {/* Project Title */}
                <div className="space-y-2 group">
                  <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 group-focus-within:text-white transition-colors italic">01. Identity</Label>
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="ENTER PROJECT NAME..."
                    className="w-full bg-transparent border-0 border-b border-white/10 rounded-none py-4 text-2xl font-black uppercase tracking-tighter focus:ring-0 focus:border-white transition-all placeholder:text-white/5"
                  />
                </div>

                {/* Primary Specs Grid */}
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
                    <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 italic">03. Engine Type</Label>
                    <select 
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-b border-white/10 py-4 text-sm font-bold uppercase tracking-widest outline-none focus:border-white appearance-none"
                    >
                      <option value="" className="bg-black">SELECT TYPE</option>
                      {projectTypes.map(t => <option key={t.value} value={t.value} className="bg-black">{t.label}</option>)}
                    </select>
                  </div>
                </div>

                {/* Status & Year */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 italic">04. Operational Status</Label>
                    <select 
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-b border-white/10 py-4 text-sm font-bold uppercase tracking-widest outline-none focus:border-white appearance-none"
                    >
                      <option value="" className="bg-black">SELECT STATUS</option>
                      {statusOptions.map(s => <option key={s} value={s} className="bg-black">{s}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 italic">05. Epoch</Label>
                    <input 
                      name="year"
                      type="number"
                      value={formData.year}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-b border-white/10 py-4 text-sm font-bold uppercase tracking-widest outline-none focus:border-white"
                    />
                  </div>
                </div>

                {/* Technologies */}
                <div className="space-y-4">
                  <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 italic">06. Tech Stack</Label>
                  <div className="flex flex-wrap gap-2 min-h-[40px] p-4 bg-white/5 rounded-2xl border border-white/10">
                    <AnimatePresence>
                      {formData.technologies.map((tech, i) => (
                        <motion.span 
                          initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
                          key={i} className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2"
                        >
                          {tech} <X className="w-3 h-3 cursor-pointer hover:text-red-500" onClick={() => setFormData(prev => ({...prev, technologies: prev.technologies.filter((_, idx) => idx !== i)}))} />
                        </motion.span>
                      ))}
                    </AnimatePresence>
                    <input 
                      value={techInput} onChange={(e) => setTechInput(e.target.value)} onKeyDown={handleTechKeyDown}
                      placeholder="ADD TECH (PRESS ENTER)..."
                      className="bg-transparent border-none focus:ring-0 text-xs font-bold uppercase tracking-widest placeholder:text-white/10"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 italic">07. Intelligence Brief</Label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="DESCRIBE THE CORE LOGIC..."
                    className="w-full bg-white/5 border border-white/10 rounded-[2rem] p-6 text-sm font-medium focus:ring-1 focus:ring-white transition-all outline-none"
                  />
                </div>

                <Button 
                  disabled={isSubmitting}
                  className="w-full py-10 rounded-full bg-white text-black text-lg font-black uppercase tracking-[0.3em] hover:bg-white/90 transition-all hover:scale-[1.01]"
                >
                  {isSubmitting ? 'TRANSMITTING...' : <><Rocket className="mr-3 w-5 h-5" /> Deploy Project</>}
                </Button>
              </form>
            </motion.div>
          </div>

          {/* RIGHT: ASSETS PANEL */}
          <div className="lg:col-span-4 space-y-8">
            <div className="p-8 rounded-[3rem] bg-white/5 border border-white/10">
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-white/30 mb-8 flex items-center gap-2">
                <Layers className="w-4 h-4" /> Visual Assets
              </h3>
              
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="aspect-square rounded-[2rem] border-2 border-dashed border-white/10 flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 hover:border-white/20 transition-all group mb-6"
              >
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Plus className="w-8 h-8" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Drop Interface Previews</p>
                <input type="file" multiple ref={fileInputRef} className="hidden" onChange={handleImageUpload} accept="image/*" />
              </div>

              {/* Previews */}
              <div className="grid grid-cols-2 gap-4">
                {previewImages.map((src, i) => (
                  <div key={i} className="relative aspect-video rounded-xl overflow-hidden group border border-white/10">
                    <img src={src} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                    <button className="absolute inset-0 bg-red-600/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Links Pod */}
            <div className="p-8 rounded-[3rem] bg-white/5 border border-white/10 space-y-6">
              <div className="space-y-4">
                <Label className="text-[10px] font-black tracking-widest opacity-20">LIVE_LINK</Label>
                <input name="url" value={formData.url} onChange={handleInputChange} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs font-mono" placeholder="https://..." />
              </div>
              <div className="space-y-4">
                <Label className="text-[10px] font-black tracking-widest opacity-20">DEMO_LINK</Label>
                <input name="previewUrl" value={formData.previewUrl} onChange={handleInputChange} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs font-mono" placeholder="https://..." />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadDevPortfolio;