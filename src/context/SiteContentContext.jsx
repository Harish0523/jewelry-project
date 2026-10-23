import React, { useCallback, useEffect, useState } from 'react';
import { API_BASE_URL } from '../api';
import { SiteContentContext } from './SiteContentStore';

const defaultContent = {
  showroomAddress: 'Kandy Road, Chavakachcheri, Jaffna, Sri Lanka',
  mainPhone: '+94 76 208 4145',
  whatsappNumber: '+94 76 208 4145',
  email: 'contact@atelierharx.com',
  openingHours: 'Mon - Sat: 9:00 AM - 6:30 PM | Sun: Closed',
  instagramUrl: 'https://instagram.com'
};

export function SiteContentProvider({ children }) {
  const [content, setContent] = useState(defaultContent);
  const [loading, setLoading] = useState(true);

  const refreshContent = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/inquiries/get_content.php`);
      if (!response.ok) {
        throw new Error(`Unable to load site content (HTTP ${response.status}).`);
      }

      const data = await response.json();
      if (data.success && data.content) {
        setContent({
          showroomAddress: data.content.address || defaultContent.showroomAddress,
          mainPhone: data.content.hotline || defaultContent.mainPhone,
          whatsappNumber: data.content.whatsapp || defaultContent.whatsappNumber,
          email: data.content.email || defaultContent.email,
          openingHours: data.content.opening_hours || defaultContent.openingHours,
          instagramUrl: data.content.instagram_url || defaultContent.instagramUrl
        });
      } else if (!data.success) {
        throw new Error(data.message || 'Unable to load site content.');
      }
    } catch (error) {
      console.error('Error loading public site content:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // oxlint-disable-next-line react/set-state-in-effect -- intentional initial load of site content from the backend API
    refreshContent();
  }, [refreshContent]);

  return (
    <SiteContentContext.Provider value={{ content, loading, refreshContent }}>
      {children}
    </SiteContentContext.Provider>
  );
}
