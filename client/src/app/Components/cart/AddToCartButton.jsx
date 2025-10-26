'use client';
import { useCart } from "@/app/hooks/CartContext";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";


export const AddToCartButton = ({ productId, quantity = 1 }) => {
    const { addToCart } = useCart() || {};

    const handleAddToCart = () => {
        if (!productId) return;
        if (addToCart) {
            toast.success("Product added to cart!", {
                description: "You can view it in your cart now.",
                action: {
                    label: "View Cart",
                    onClick: () => window.location.href = '/cart',
                },
            });
            addToCart({ productId, quantity });
        }
    };

    return (
        <Button onClick={handleAddToCart} size="lg" className="w-[100%] rounded-[5px] my-2 max-sm:text-[12px] cursor-pointer text-lg">
            <ShoppingCart className="w-5 h-5 mr-0" />
            Add to Cart
        </Button>
    );
};

export const ShopButton = () => {
    const { addToCart } = useCart() || {};

    const handleAddToCart = () => {
        if (!productId) return;
        if (addToCart) {
            toast.success("Product added to cart!", {
                description: "You can view it in your cart now.",
                action: {
                    label: "View Cart",
                    onClick: () => window.location.href = '/cart',
                },
            });
            addToCart({ productId, quantity });
        }
    };
    
    return (
        <button onClick={handleAddToCart}  className='w-full text-lg max-sm:text-base border border-green-500 text-white rounded-[5px] bg-green-500 hover:bg-green-600 py-2 px-6 cursor-pointer font-semibold transition-colors flex gap-2 items-center justify-center'>
            <ShoppingCart size={24} className="text-3xl font-bold" />
            Add to Cart
        </button>
    )
}