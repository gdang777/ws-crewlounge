"use client";

import { useState, useContext } from 'react';
import Button from './Button';
import AuthContext from '../context/AuthContext';

interface PropertyFormProps {
  onClose: () => void;
  onSubmit: (propertyData: any) => void;
}

const PropertyForm: React.FC<PropertyFormProps> = ({ onClose, onSubmit }) => {
  const { user } = useContext(AuthContext);
  const [listingType, setListingType] = useState<'crashpad' | 'gig'>('crashpad');
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    distanceToAirport: '',
    price: '',
    pricePerUnit: 'Per Night',
    propertyType: 'Private Room',
    bedrooms: '1',
    bathrooms: '1',
    description: '',
    amenities: {
      wifi: false,
      parking: false,
      dedicatedWorkspace: false,
      airConditioning: false,
      kitchen: false,
      airportShuttle: false,
      tv: false,
      laundry: false,
      blackoutCurtains: false,
      heating: false
    },
    images: [] as File[]
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAmenityChange = (amenity: string) => {
    setFormData({
      ...formData,
      amenities: {
        ...formData.amenities,
        [amenity]: !formData.amenities[amenity as keyof typeof formData.amenities]
      }
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        images: [...formData.images, file]
      });

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create form data for submission including images
    const submitData = {
      ...formData,
      host: user?._id,
      category: listingType,
      // Convert to appropriate types
      price: parseFloat(formData.price),
      bedrooms: parseInt(formData.bedrooms),
      bathrooms: parseInt(formData.bathrooms)
    };
    
    onSubmit(submitData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Create a New Listing</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <p className="font-medium mb-2">What would you like to list?</p>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className={`py-3 px-4 border rounded-md text-center ${
                    listingType === 'crashpad' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  }`}
                  onClick={() => setListingType('crashpad')}
                >
                  Crashpad / Rental Property
                </button>
                <button
                  type="button"
                  className={`py-3 px-4 border rounded-md text-center ${
                    listingType === 'gig' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  }`}
                  onClick={() => setListingType('gig')}
                >
                  Gig / Service
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="title" className="block font-medium mb-1">Listing Title</label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="e.g., Cozy Crashpad Near YYZ Airport"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="location" className="block font-medium mb-1">Location</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    placeholder="e.g., Toronto, ON"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="distanceToAirport" className="block font-medium mb-1">Distance to Airport</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="distanceToAirport"
                    name="distanceToAirport"
                    placeholder="e.g., 3.2 km to YYZ"
                    value={formData.distanceToAirport}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label htmlFor="price" className="block font-medium mb-1">Price</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">$</span>
                  </div>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    placeholder="75"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="pricePerUnit" className="block font-medium mb-1">Price Per</label>
                <select
                  id="pricePerUnit"
                  name="pricePerUnit"
                  value={formData.pricePerUnit}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="Per Night">Per Night</option>
                  <option value="Per Week">Per Week</option>
                  <option value="Per Month">Per Month</option>
                </select>
              </div>
              <div>
                <label htmlFor="propertyType" className="block font-medium mb-1">Property Type</label>
                <select
                  id="propertyType"
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="Private Room">Private Room</option>
                  <option value="Shared Room">Shared Room</option>
                  <option value="Studio">Studio</option>
                  <option value="Entire Apartment">Entire Apartment</option>
                  <option value="Entire House">Entire House</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="bedrooms" className="block font-medium mb-1">Bedrooms</label>
                <input
                  type="number"
                  id="bedrooms"
                  name="bedrooms"
                  min="1"
                  value={formData.bedrooms}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label htmlFor="bathrooms" className="block font-medium mb-1">Bathrooms</label>
                <input
                  type="number"
                  id="bathrooms"
                  name="bathrooms"
                  min="1"
                  step="0.5"
                  value={formData.bathrooms}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block font-medium mb-1">Description</label>
              <textarea
                id="description"
                name="description"
                placeholder="Describe your property..."
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md h-32"
                required
              />
            </div>

            <div className="mb-6">
              <p className="font-medium mb-2">Amenities</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="wifi"
                    checked={formData.amenities.wifi}
                    onChange={() => handleAmenityChange('wifi')}
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <label htmlFor="wifi" className="ml-2 text-sm">WiFi</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="parking"
                    checked={formData.amenities.parking}
                    onChange={() => handleAmenityChange('parking')}
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <label htmlFor="parking" className="ml-2 text-sm">Parking</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="dedicatedWorkspace"
                    checked={formData.amenities.dedicatedWorkspace}
                    onChange={() => handleAmenityChange('dedicatedWorkspace')}
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <label htmlFor="dedicatedWorkspace" className="ml-2 text-sm">Dedicated Workspace</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="airConditioning"
                    checked={formData.amenities.airConditioning}
                    onChange={() => handleAmenityChange('airConditioning')}
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <label htmlFor="airConditioning" className="ml-2 text-sm">Air Conditioning</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="kitchen"
                    checked={formData.amenities.kitchen}
                    onChange={() => handleAmenityChange('kitchen')}
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <label htmlFor="kitchen" className="ml-2 text-sm">Kitchen</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="airportShuttle"
                    checked={formData.amenities.airportShuttle}
                    onChange={() => handleAmenityChange('airportShuttle')}
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <label htmlFor="airportShuttle" className="ml-2 text-sm">Airport Shuttle</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="tv"
                    checked={formData.amenities.tv}
                    onChange={() => handleAmenityChange('tv')}
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <label htmlFor="tv" className="ml-2 text-sm">TV</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="laundry"
                    checked={formData.amenities.laundry}
                    onChange={() => handleAmenityChange('laundry')}
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <label htmlFor="laundry" className="ml-2 text-sm">Laundry</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="blackoutCurtains"
                    checked={formData.amenities.blackoutCurtains}
                    onChange={() => handleAmenityChange('blackoutCurtains')}
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <label htmlFor="blackoutCurtains" className="ml-2 text-sm">Blackout Curtains</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="heating"
                    checked={formData.amenities.heating}
                    onChange={() => handleAmenityChange('heating')}
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <label htmlFor="heating" className="ml-2 text-sm">Heating</label>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <p className="font-medium mb-2">Upload Images</p>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {imagePreview ? (
                  <div className="mb-4">
                    <img src={imagePreview} alt="Preview" className="h-40 mx-auto object-cover rounded" />
                  </div>
                ) : null}
                <div className="flex flex-col items-center">
                  <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">Click to upload</p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <Button variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Create Listing
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PropertyForm;
