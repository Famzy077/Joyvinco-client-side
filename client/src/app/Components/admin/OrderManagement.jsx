// 'use client';

// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import axios from 'axios';
// import { FaSpinner } from 'react-icons/fa';
// import { Badge } from '@/components/ui/badge';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import toast from 'react-hot-toast';

// const API_URL = "https://joyvinco.onrender.com";

// // --- Data Fetching Function ---
// const fetchAllOrders = async () => {
//     const token = localStorage.getItem('authToken');
//     const res = await axios.get(`${API_URL}/api/orders`, {
//         headers: { Authorization: `Bearer ${token}` }
//     });
//     return res.data.data;
// };

// // --- Main Order Management Component ---
// export const OrderManagement = () => {
//     const queryClient = useQueryClient();

//     const { data: orders, isLoading, error } = useQuery({
//         queryKey: ['adminOrders'],
//         queryFn: fetchAllOrders,
//     });

//     const updateStatusMutation = useMutation({
//         mutationFn: ({ orderId, status }) => {
//             const token = localStorage.getItem('authToken');
//             return axios.put(`${API_URL}/api/orders/${orderId}/status`, { status }, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//         },
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ['adminOrders'] });
//             toast.success("Order status updated!");
//         },
//         onError: (error) => {
//             toast.error(error.response?.data?.message || "Failed to update status.");
//         }
//     });

//     const handleStatusChange = (orderId, newStatus) => {
//         updateStatusMutation.mutate({ orderId, status: newStatus });
//     };
    
//     // Function to determine the color of the status badge
//     const getStatusBadgeVariant = (status) => {
//         switch (status) {
//             case 'PENDING':
//                 return 'default'; // Blue/Default
//             case 'SHIPPED':
//                 return 'secondary'; // Gray/Secondary
//             case 'DELIVERED':
//                 return 'outline'; // Green
//             case 'CANCELLED':
//                 return 'destructive'; // Red
//             default:
//                 return 'outline';
//         }
//     };

//     if (isLoading) {
//         return (
//             <div className='flex items-center justify-center min-h-[60vh]'>
//                 <FaSpinner size={32} className="animate-spin text-green-500" />
//             </div>
//         );
//     }

//     if (error) {
//         return <div className="text-center py-10 text-red-500">Failed to load orders.</div>;
//     }

//     return (
//         <div className="border rounded-lg">
//             <Table>
//                 <TableHeader>
//                     <TableRow>
//                         <TableHead>Order ID</TableHead>
//                         <TableHead>Customer</TableHead>
//                         <TableHead>Total Amount</TableHead>
//                         <TableHead>Payment Method</TableHead>
//                         <TableHead>Status</TableHead>
//                     </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                     {orders?.map((order) => (
//                         <TableRow key={order.id}>
//                             <TableCell className="font-mono text-xs">#{order.id.slice(-8)}</TableCell>
//                             <TableCell className="font-medium">{order.customerName}</TableCell>
//                             <TableCell>₦{order.totalAmount.toLocaleString()}</TableCell>
//                             <TableCell>
//                                 {/* This prevents the crash if paymentMethod is null or undefined */}
//                                 <Badge variant="outline">{order.paymentMethod?.replace('_', ' ') || 'N/A'}</Badge>
//                             </TableCell>
//                             <TableCell>
//                                 <Select
//                                     defaultValue={order.status}
//                                     onValueChange={(newStatus) => handleStatusChange(order.id, newStatus)}
//                                 >
//                                     <SelectTrigger className={`w-[120px] focus:ring-0 ${
//                                         order.status === 'PENDING' ? 'bg-yellow-100 border-yellow-400' :
//                                         order.status === 'SHIPPED' ? 'bg-blue-100 border-blue-400' :
//                                         order.status === 'DELIVERED' ? 'bg-green-100 border-green-400' :
//                                         'bg-red-100 border-red-400'
//                                     }`}>
//                                         <SelectValue placeholder="Set status" />
//                                     </SelectTrigger>
//                                     <SelectContent>
//                                         <SelectItem value="PENDING">Pending</SelectItem>
//                                         <SelectItem value="SHIPPED">Shipped</SelectItem>
//                                         <SelectItem value="DELIVERED">Delivered</SelectItem>
//                                         <SelectItem value="CANCELLED">Cancelled</SelectItem>
//                                     </SelectContent>
//                                 </Select>
//                             </TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>
//         </div>
//     );
// };


'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import toast from 'react-hot-toast';

const API_URL = "https://joyvinco.onrender.com";

// --- SVG Icon Components (to remove external dependency) ---

// A spinner icon to indicate loading states.
const SpinnerIcon = ({ size = 32, className = '' }) => (
    <svg
        className={`animate-spin ${className}`}
        style={{ width: size, height: size }}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
    >
        <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
        ></circle>
        <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
    </svg>
);

// A line chart icon for the sales card.
const ChartLineIcon = ({ size = 24, className = '' }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M3 3v18h18" />
        <path d="m19 9-5 5-4-4-3 3" />
    </svg>
);


// --- Data Fetching Function ---
const fetchAllOrders = async () => {
    const token = localStorage.getItem('authToken');
    const res = await axios.get(`${API_URL}/api/orders`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    // We sort the orders by creation date to show the most recent ones first
    return res.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

// --- Main Order Management Component ---
export const OrderManagement = () => {
    const queryClient = useQueryClient();

    const { data: orders, isLoading, error } = useQuery({
        queryKey: ['adminOrders'],
        queryFn: fetchAllOrders,
    });

    // --- Calculate Total Monthly Sales for SHIPPED items ---
    // useMemo is used to prevent recalculating this value on every single re-render.
    // It will only recalculate when the 'orders' data changes.
    const monthlySalesTotal = useMemo(() => {
        if (!orders) return 0; // Return 0 if there are no orders yet

        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        // 1. Filter orders to get only 'SHIPPED' items from the current month and year
        const monthlyShippedOrders = orders.filter(order => {
            // IMPORTANT: Assumes your order object has a 'createdAt' field.
            // If your date field is named differently (e.g., 'orderDate'), change 'order.createdAt' below.
            const orderDate = new Date(order.createdAt);
            return (
                order.status === 'SHIPPED' &&
                orderDate.getMonth() === currentMonth &&
                orderDate.getFullYear() === currentYear
            );
        });

        // 2. Calculate the sum of 'totalAmount' for the filtered orders
        const total = monthlyShippedOrders.reduce((sum, order) => sum + order.totalAmount, 0);

        return total;
    }, [orders]); // The dependency array ensures this runs only when 'orders' is updated

    const updateStatusMutation = useMutation({
        mutationFn: ({ orderId, status }) => {
            const token = localStorage.getItem('authToken');
            return axios.put(`${API_URL}/api/orders/${orderId}/status`, { status }, {
                headers: { Authorization: `Bearer ${token}` }
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminOrders'] });
            toast.success("Order status updated!");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update status.");
        }
    });

    const handleStatusChange = (orderId, newStatus) => {
        updateStatusMutation.mutate({ orderId, status: newStatus });
    };

    if (isLoading) {
        return (
            <div className='flex items-center justify-center min-h-[60vh]'>
                <SpinnerIcon size={32} className="text-green-500" />
            </div>
        );
    }

    if (error) {
        return <div className="text-center py-10 text-red-500">Failed to load orders.</div>;
    }

    return (
        <div className="p-4 md:p-6 space-y-6">
            {/* --- Monthly Sales Display Card --- */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                    <div className="bg-green-100 text-green-600 p-3 rounded-full">
                        <ChartLineIcon size={24} />
                    </div>
                    <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-500">This Month's Shipped Sales</h3>
                        <p className="text-3xl font-bold text-gray-800">
                            ₦{monthlySalesTotal.toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>

            {/* --- Existing Orders Table --- */}
            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Total Amount</TableHead>
                            <TableHead>Payment Method</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders?.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell className="font-mono text-xs">#{order.id.slice(-8)}</TableCell>
                                <TableCell className="font-medium">{order.customerName}</TableCell>
                                <TableCell>₦{order.totalAmount.toLocaleString()}</TableCell>
                                <TableCell>
                                    <Badge variant="outline">{order.paymentMethod?.replace('_', ' ') || 'N/A'}</Badge>
                                </TableCell>
                                <TableCell>
                                    <Select
                                        defaultValue={order.status}
                                        onValueChange={(newStatus) => handleStatusChange(order.id, newStatus)}
                                    >
                                        <SelectTrigger className={`w-[120px] focus:ring-0 ${
                                            order.status === 'PENDING' ? 'bg-yellow-100 border-yellow-400 text-yellow-800' :
                                            order.status === 'SHIPPED' ? 'bg-blue-100 border-blue-400 text-blue-800' :
                                            order.status === 'DELIVERED' ? 'bg-green-100 border-green-400 text-green-800' :
                                            'bg-red-100 border-red-400 text-red-800'
                                        }`}>
                                            <SelectValue placeholder="Set status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="PENDING">Pending</SelectItem>
                                            <SelectItem value="SHIPPED">Shipped</SelectItem>
                                            <SelectItem value="DELIVERED">Delivered</SelectItem>
                                            <SelectItem value="CANCELLED">Cancelled</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};
