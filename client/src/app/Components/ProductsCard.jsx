// 'use client';
// import Link from 'next/link';
// import { FaHeart, FaRegHeart } from 'react-icons/fa';
// import { useWishlist } from '@/app/hooks/WishlistContext.jsx';

// const ProductCard = ({ product }) => {
//   const { addToWishlist, removeFromWishlist, isWishlisted, isMounted } = useWishlist();

//   if (!product) return null;

//   const isInWishlist = isWishlisted(product.id);

//   return (
//     <div className="relative flex flex-col transition-shadow duration-300 bg-white border border-gray-300 rounded-lg hover:shadow-lg">
//       {isMounted && (
//         <button
//           onClick={() => {
//             if (isInWishlist) {
//               removeFromWishlist(product.id);
//             } else {
//               addToWishlist(product);
//             }
//           }}
//           className="absolute text-[17px] bg-pink-200 rounded-full p-1.5 top-2 right-2 text-red-500 z-10"
//         >
//           {isInWishlist ? <FaHeart /> : <FaRegHeart />}
//         </button>
//       )}

//       <Link href={`/products/${product.id}`}>
//         <div className="flex items-center justify-center py-2 mb-1">
//           {/* <img
//             src={product.image}
//             alt={product.name}
//             className="max-sm:h-[90px] h-[100px] object-fit rounded-lg"
//           /> */}
//         </div>
//         <div className="p-4 bg-gray-200 rounded-lg">
//           <h3 className='text-1.8 lg:font-semibold text-gray-800 font-medium truncate'>
//             {product.name.slice(0, 10)}...
//           </h3>
//           <div className="flex items-baseline mt-2">
//             <p className="text-[15px] max-sm:text-[11px] font-medium text-gray-800">₦{product.price}</p>
//             <strike className="ml-2 text-[14px] max-sm:text-[14px] text-gray-500 line-through">
//               ₦{product.oldPrice}
//             </strike>
//           </div>
//         </div>
//       </Link>
//     </div>
//   );
// };

// export default ProductCard;

import Link from 'next/link';
import { AddToCartButton } from './cart/AddToCartButton';

export const ProductCard = ({ product }) => {
  const calculateDiscount = (price, oldPrice) => {
    if (!oldPrice || oldPrice <= price) return null;
    return Math.round(((oldPrice - price) / oldPrice) * 100);
  };
  const discountPercentage = calculateDiscount(product.price, product.oldPrice);

  return (
    <div className="relative overflow-hidden transition-all duration-300 ease-out bg-white border border-gray-300 rounded-lg group hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1">
      <Link href={`/products/${product.id}`}>
        <div className="flex justify-center w-full py-3 overflow-hidden bg-white aspect-w-1 aspect-h-1">
          <img
            src={product.image}
            alt={product.name}
            className="max-sm:h-[100px] h-[120px] object-fit object-center transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </Link>
      {discountPercentage && (
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs max-sm:text-[11px] font-bold max-sm:px-[0.3rem] px-2 py-1 rounded-md animate-pulse shadow-lg">
          -{discountPercentage}%
        </div>
      )}
      <div className="p-4 pb-2 transition-colors duration-300 bg-gray-200 max-sm:py-0 group-hover:bg-gray-100">
        <h3 className="text-1.8 max-sm:text-[0.9rem] lg:font-semibold text-gray-800 font-medium truncate transition-colors duration-300 group-hover:text-blue-600">
          <Link href={`/products/${product.id}`}>{product.name}</Link>
        </h3>
        <div className="flex items-baseline my-0.5">
          <p className="text-[15px] max-sm:text-[13px] font-medium text-gray-800 transition-colors duration-300 group-hover:text-green-600">
            ₦{product.price ? product.price.toLocaleString() : '0.00'}
          </p>
          {product.oldPrice && (
            <p className="ml-2 text-[14px] max-sm:text-[11px] text-gray-500 line-through">₦{product.oldPrice.toLocaleString()}</p>
          )}
        </div>
        <div className="transition-transform duration-300 group-hover:scale-[1.02]">
          <AddToCartButton productId={product.id} />
        </div>
      </div>
    </div>
  );
};