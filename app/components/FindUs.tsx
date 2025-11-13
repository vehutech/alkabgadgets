import { MapPin } from 'lucide-react';

interface GoogleMapProps {
  embedUrl: string;
  title?: string;
  address?: string;
}

export function GoogleMap({ 
  embedUrl, 
  title = "Find Our Store",
  address = "Sule Oyidi St, opposite Federal University Lokoja, Lokoja 260101, Kogi"
}: GoogleMapProps) {
  return (
    <div className="w-full bg-white py-16 px-4 pb-100">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gray-100 rounded-full mb-4">
            <MapPin className="w-6 h-6 text-gray-700" />
          </div>
          <h2 className="text-3xl font-light text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-500 mb-16">{address}</p>
        </div>

        {/* Map Container */}
        <div className="relative w-full overflow-hidden rounded-lg shadow-sm" style={{ paddingBottom: '56.25%' }}>
          <iframe
            src={embedUrl}
            className="absolute top-0 left-0 w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps Location"
          ></iframe>
        </div>
      </div>
    </div>
  );
}