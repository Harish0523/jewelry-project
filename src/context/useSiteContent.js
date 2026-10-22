import { useContext } from 'react';
import { SiteContentContext } from './SiteContentStore';

export default function useSiteContent() {
  const context = useContext(SiteContentContext);
  if (!context) {
    throw new Error('useSiteContent must be used within a SiteContentProvider.');
  }
  return context;
}
