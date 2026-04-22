import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, X, Image as ImageIcon, Globe, Smartphone, Code, Server } from 'lucide-react';
import { useApiClient } from '@/utils/apiClient';

const UploadDevPortfolio = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const tagsInputRef = useRef(null);
  const techInputRef = useRef(null);
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
    tags: [],
    technologies: [],
    images: []
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleTechInputChange = (e) => {
    setTechInput(e.target.value);
  };

  const handleTagKeyDown = (e) => {
    if (['Enter', ','].includes(e.key)) {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (newTag && !formData.tags.includes(newTag)) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, newTag]
        }));
        setTagInput('');
      }
    }
  };

  const handleTechKeyDown = (e) => {
    if (['Enter', ','].includes(e.key)) {
      e.preventDefault();
      const newTech = techInput.trim();
      if (newTech && !formData.technologies.includes(newTech)) {
        setFormData(prev => ({
          ...prev,
          technologies: [...prev.technologies, newTech]
        }));
        setTechInput('');
      }
    }
  };

  const removeTag = (index) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const removeTech = (index) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    const validFiles = files.filter(file => {
      const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
      const maxSize = 5 * 1024 * 1024;
      
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          images: 'Only JPG, PNG, and WEBP images are allowed'
        }));
        return false;
      }
      
      if (file.size > maxSize) {
        setErrors(prev => ({
          ...prev,
          images: 'Image size must be less than 5MB'
        }));
        return false;
      }
      
      return true;
    });

    if (validFiles.length === 0) return;

    const previewUrls = validFiles.map(file => URL.createObjectURL(file));
    setPreviewImages(prev => [...prev, ...previewUrls]);
    
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...validFiles]
    }));

    setErrors(prev => ({ ...prev, images: '' }));
  };

  const removeImage = (index) => {
    const newPreviews = [...previewImages];
    const newImages = [...formData.images];
    
    URL.revokeObjectURL(newPreviews[index]);
    
    newPreviews.splice(index, 1);
    newImages.splice(index, 1);
    
    setPreviewImages(newPreviews);
    setFormData(prev => ({
      ...prev,
      images: newImages
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.type) newErrors.type = 'Project type is required';
    if (!formData.status) newErrors.status = 'Status is required';
    if (!formData.year) newErrors.year = 'Year is required';
    if (formData.images.length === 0) newErrors.images = 'At least one image is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('type', formData.type);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('url', formData.url);
      formDataToSend.append('previewUrl', formData.previewUrl);
      formDataToSend.append('status', formData.status);
      formDataToSend.append('year', formData.year);
      formDataToSend.append('tags', formData.tags.join(','));
      formDataToSend.append('technologies', formData.technologies.join(','));
      
      formData.images.forEach((file) => {
        formDataToSend.append('files', file);
      });

      const response = await post('/uploadDevFiles', formDataToSend, true);

      if (response.success) {
        navigate('/dashboard/dev');
      } else {
        throw new Error(response.error || 'Failed to upload portfolio item');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ 
        submit: error.message || 'Failed to submit portfolio item. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getProjectTypeIcon = (type) => {
    const projectType = projectTypes.find(pt => pt.value === type);
    return projectType ? projectType.icon : Code;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Upload Development Project</h1>
          <p className="mt-2 text-sm text-gray-600">
            Add a new web or mobile development project to your portfolio
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Project Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`block w-full px-4 py-2 rounded-md border shadow-sm sm:text-sm ${errors.title ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'}`}
                placeholder="Enter project title"
              />
              {errors.title && (
                <p className="mt-2 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            {/* Category and Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`block w-full px-4 py-2 rounded-md border shadow-sm sm:text-sm ${errors.category ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'}`}
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-2 text-sm text-red-600">{errors.category}</p>
                )}
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                  Project Type *
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className={`block w-full px-4 py-2 rounded-md border shadow-sm sm:text-sm ${errors.type ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'}`}
                >
                  <option value="">Select project type</option>
                  {projectTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
                {errors.type && (
                  <p className="mt-2 text-sm text-red-600">{errors.type}</p>
                )}
              </div>
            </div>

            {/* Status and Year */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                  Status *
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className={`block w-full px-4 py-2 rounded-md border shadow-sm sm:text-sm ${errors.status ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'}`}
                >
                  <option value="">Select status</option>
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                {errors.status && (
                  <p className="mt-2 text-sm text-red-600">{errors.status}</p>
                )}
              </div>

              <div>
                <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
                  Year *
                </label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  min="2000"
                  max={new Date().getFullYear() + 1}
                  value={formData.year}
                  onChange={handleInputChange}
                  className={`block w-full px-4 py-2 rounded-md border shadow-sm sm:text-sm ${errors.year ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'}`}
                  placeholder="2024"
                />
                {errors.year && (
                  <p className="mt-2 text-sm text-red-600">{errors.year}</p>
                )}
              </div>
            </div>

            {/* URLs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                  Live URL
                </label>
                <input
                  type="url"
                  id="url"
                  name="url"
                  value={formData.url}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <label htmlFor="previewUrl" className="block text-sm font-medium text-gray-700 mb-2">
                  Preview/Demo URL
                </label>
                <input
                  type="url"
                  id="previewUrl"
                  name="previewUrl"
                  value={formData.previewUrl}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="https://demo.example.com"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleInputChange}
                className="block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter project description and key features..."
              />
            </div>

            {/* Technologies */}
            <div>
              <label htmlFor="technologies" className="block text-sm font-medium text-gray-700 mb-2">
                Technologies & Frameworks
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.technologies.map((tech, index) => (
                  <div key={index} className="flex items-center bg-blue-100 text-blue-800 rounded-full px-3 py-1">
                    <span className="text-sm">{tech}</span>
                    <button
                      type="button"
                      onClick={() => removeTech(index)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
              <input
                type="text"
                id="technologies"
                ref={techInputRef}
                value={techInput}
                onChange={handleTechInputChange}
                onKeyDown={handleTechKeyDown}
                className="block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Type technology (React, Node.js, etc.) and press comma or enter"
              />
            </div>

            {/* Tags */}
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                Tags & Features
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.tags.map((tag, index) => (
                  <div key={index} className="flex items-center bg-gray-100 text-gray-700 rounded-full px-3 py-1">
                    <span className="text-sm">{tag}</span>
                    <button
                      type="button"
                      onClick={() => removeTag(index)}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
              <input
                type="text"
                id="tags"
                ref={tagsInputRef}
                value={tagInput}
                onChange={handleTagInputChange}
                onKeyDown={handleTagKeyDown}
                className="block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Type tag (E-commerce, Real-time, etc.) and press comma or enter"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Screenshots & Mockups *
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                    >
                      <span>Upload screenshots</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        multiple
                        accept="image/jpeg, image/png, image/webp"
                        onChange={handleImageUpload}
                        ref={fileInputRef}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, WEBP up to 5MB
                  </p>
                </div>
              </div>
              {errors.images && (
                <p className="mt-2 text-sm text-red-600">{errors.images}</p>
              )}
            </div>

            {/* Image Previews */}
            {previewImages.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {previewImages.map((preview, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-video bg-gray-100 rounded-md overflow-hidden">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="aspect-video border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center text-gray-400 hover:text-gray-500 hover:border-gray-400 transition-colors"
                >
                  <Plus className="w-8 h-8" />
                  <span className="text-sm mt-2">Add more</span>
                </button>
              </div>
            )}

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Uploading...
                  </>
                ) : (
                  'Upload Development Project'
                )}
              </button>
              {errors.submit && (
                <p className="mt-2 text-sm text-red-600 text-center">{errors.submit}</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadDevPortfolio;