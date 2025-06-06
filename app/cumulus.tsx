import { Redirect, usePathname } from 'expo-router';

export default function CumulusRedirect() {
  const pathname = usePathname();
  // Remove the base path (/loyalty-bolt) from the current path
  const pathWithoutBase = pathname.replace('/loyalty-bolt', '');
  
  // If we're already at /cumulus, redirect to the tab
  if (pathWithoutBase === '/cumulus') {
    return <Redirect href="/(tabs)/cumulus" />;
  }
  
  // Otherwise, show a 404
  return null;
} 