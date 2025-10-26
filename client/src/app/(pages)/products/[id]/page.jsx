'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { FaSpinner } from 'react-icons/fa';
import { Phone } from 'lucide-react';
import { AddToCartButton } from '@/app/Components/cart/AddToCartButton';
import Docs from '@/app/UI/Docs';
import bannerImage from '/public/assets/allIProducts.png';
import { ShopButton } from '@/app/Components/cart/AddToCartButton';

const API_URL = "https://joyvinco.onrender.com";

// Fetches a SINGLE product by its ID (including its images)
const fetchProductById = async (productId) => {
  const res = await axios.get(`${API_URL}/api/products/${productId}`);
  return res.data.data;
};

// Fetches ALL products (for the related items section)
const fetchAllProducts = async () => {
    const res = await axios.get(`${API_URL}/api/products`);
    return res.data.data;
};

// --- A dedicated component for the Image Gallery ---
const ProductImageGallery = ({ images, productName }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (images && images.length > 0) {
      setSelectedImage(images[0]);
    }
  }, [images]);

  if (!images || images.length === 0) {
    return (
      <div className='flex items-center justify-center p-4 bg-gray-100 border rounded-lg h-96'>
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center overflow-hidden bg-white border rounded-lg h-80 md:h-96">
        {selectedImage && (
          <Image
            src={selectedImage.url}
            alt={`Main view of ${productName}`}
            width={400}
            height={400}
            className="object-contain w-auto max-h-full transition-opacity duration-300"
            priority
          />
        )}
      </div>
      <div className="grid grid-cols-5 gap-2">
        {images.map((image) => (
          <button
            key={image.id}
            onClick={() => setSelectedImage(image)}
            className={`border-2 rounded-lg p-1 transition-all ${
              selectedImage?.id === image.id ? 'border-green-500 scale-105' : 'border-transparent hover:border-gray-300'
            }`}
          >
            <Image
              src={image.url}
              alt={`Thumbnail ${image.id}`}
              width={80}
              height={80}
              className="object-cover w-full h-16 rounded-md"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

// --- Reusable Related Product Card Component ---
const RelatedProductCard = ({ product }) => {
    // Get the first image for display, with a fallback
    const displayImage = product.images?.[0]?.url || '/default-placeholder.png';

    return (
        <div className="relative overflow-hidden transition-shadow bg-white border rounded-lg group hover:shadow-lg">
            <Link href={`/products/${product.id}`}>
                <div className="flex justify-center w-full p-2 overflow-hidden bg-white aspect-w-1 aspect-h-1">
                    <Image
                        src={displayImage}
                        alt={product.name}
                        width={150}
                        height={150}
                        className="object-contain h-28"
                    />
                </div>
                <div className="p-3 border-t">
                    <h3 className="text-sm font-medium text-gray-700 truncate">{product.name}</h3>
                    <p className="mt-1 text-lg font-bold text-gray-900">₦{product.price.toLocaleString()}</p>
                </div>
            </Link>
        </div>
    );
};


// --- Related Products Section ---
const RelatedProducts = ({ category, currentProductId }) => {
    const { data: allProducts, isLoading } = useQuery({
        queryKey: ['publicProducts'], // Uses cached data from homepage if available!
        queryFn: fetchAllProducts,
    });

    const relatedProducts = allProducts
        ?.filter(p => p.category === category && p.id !== currentProductId)
        .slice(0, 6);

    if (isLoading || !relatedProducts || relatedProducts.length === 0) {
        return null;
    }

    return (
        <div className='p-5 sm:p-8 mb-14'>
          <h2 className='mb-6 text-2xl font-semibold sm:text-3xl text-zinc-800'>You Might Also Like</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {relatedProducts.map(product => (
              <RelatedProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
    );
};


// --- Main Product Page Component ---
const ProductPage = ({ params }) => {
  const { id } = params;

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <FaSpinner className="text-green-500 animate-spin" size={32} /> 
      </div>
    );
  }

  if (error || !product) {
    return <div className="py-20 text-center text-red-500">Product not found or an error occurred.</div>;
  }

  return (
    <main>
      <div className='text-center'>
        <div className="relative h-[40vh] md:h-[50vh] flex justify-center items-center text-white">
          <div className="absolute inset-0 bg-center bg-cover" style={{ backgroundImage: `url(${bannerImage.src})` }}>
            <div className="absolute inset-0 bg-black opacity-60"></div>
          </div>
          <div className="relative z-10 flex items-center space-x-2">
            <p className="text-xl underline md:text-2xl"><Link href="/home">Home</Link></p>
            <span className="text-xl md:text-2xl">/</span>
            <h1 className="text-xl font-bold text-green-400 md:text-2xl">Shop</h1>
          </div>
        </div>
        <h1 className="mx-auto mt-5 mb-1 ml-5 text-2xl font-bold text-black rounded-md sm:text-center text-start md:text-3xl max-sm:rounded-none">Product Details</h1>
      </div>

      <div className="max-w-5xl p-5 mx-auto mt-8 mb-10">
        <div className='flex flex-col gap-8 md:flex-row lg:gap-12'>
          
          <div className='md:w-1/2'>
            <ProductImageGallery images={product.images} productName={product.name} />
          </div>

          <div className='flex flex-col pt-4 md:w-1/2'>
            <h1 className="mb-2 text-[22px] font-bold sm:text-3xl">{product.name}</h1>
            <div className="flex items-baseline mb-4">
              <p className="text-2xl font-bold text-gray-900 sm:text-3xl">₦{product.price.toLocaleString()}</p>
              {product.oldPrice && <p className="ml-3 text-lg text-gray-500 line-through">₦{product.oldPrice.toLocaleString()}</p>}
            </div>
            <p className="mb-6 leading-relaxed text-gray-700">{product.description}</p>
            <div className="gap-3 flx-col sm:flex sm:items-center">
              <div className='text-xl font-semibold cursor-pointer'>
                <ShopButton productId={product.id} />
              </div>
              <p className='text-sm text-center font- sm:text-xl'>OR</p>
              <a href="tel:+2349069905126">
                <button className='w-full text-lg max-sm:text-base border border-green-500 text-white rounded-[5px] bg-green-500 hover:bg-green-600 py-2 px-6 cursor-pointer font-semibold transition-colors flex gap-2 items-center justify-center'>
                  <Phone size={24}/>
                  Call to order
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {product.category && <RelatedProducts category={product.category} currentProductId={product.id} />}

      <Docs/>
    </main>
  );
}

export default ProductPage;