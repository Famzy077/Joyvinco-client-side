'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import logo from '/public/Images/logo.png';
import Image from 'next/image';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider as ReduxProvider } from 'react-redux';
import store from '../redux/Store';
import { WishlistProvider } from '../hooks/WishlistContext.jsx';
import { CartProvider } from '../hooks/CartContext';
import { FaSpinner } from 'react-icons/fa';

const queryClient = new QueryClient();

const AllProviders = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <ReduxProvider store={store}>
      <WishlistProvider>
        <CartProvider>{children}</CartProvider>
      </WishlistProvider>
    </ReduxProvider>
  </QueryClientProvider>
);

const PageProvider = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [minDelayPassed, setMinDelayPassed] = useState(false);

  useEffect(() => {
    const minDelayTimer = setTimeout(() => {
      setMinDelayPassed(true);
    }, 1500);

    const authToken = localStorage.getItem("authToken");

    if (pathname === "/") {
      router.replace("/home");
    } else {
      const protectedRoutes = ["/wishlist", "/account", "/admin", "/products"];
      const isProtectedRoute = protectedRoutes.some((route) =>
        pathname.startsWith(route)
      );

      if (!authToken && isProtectedRoute) {
        router.replace(`/login?redirect=${pathname}`);
      } else {
        setIsAuthorized(true);
      }
    }

    return () => clearTimeout(minDelayTimer);
  }, [router, pathname]);

  // Track route changes using pathname (App Router way)
  useEffect(() => {
    if (typeof window.gtag !== "undefined") {
      window.gtag("config", "G-XG3M5YQVQH", {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return (
    <>
      {(!isAuthorized || !minDelayPassed) ? (
        <div className="flex flex-col items-center justify-center min-h-[90vh]">
          <Image
            src={logo}
            className="h-[100px] max-sm:w-[50%] w-[230px]"
            alt="Loading Logo"
          />
          <FaSpinner className="text-green-500 animate-spin" size={40} />
        </div>
      ) : (
        <AllProviders>
          {children}
        </AllProviders>
      )}
    </>
  );
};

export default PageProvider;