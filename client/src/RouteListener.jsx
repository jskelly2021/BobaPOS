import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function RouteListener() {
  const { pathname } = useLocation();

  useEffect(() => {
    // pages where we want to *hide* the translate widget
    const hideOn = ['/menu/customer', '/menu/cashier'];
    if (hideOn.some(p => pathname.startsWith(p))) {
      document.body.classList.add('hide-translate');
    } else {
      document.body.classList.remove('hide-translate');
    }
  }, [pathname]);

  return null;
}
