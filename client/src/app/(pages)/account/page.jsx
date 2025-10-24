'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { User, Heart, Ticket, LogOut } from 'lucide-react';

import { AccountDetails } from "../../Components/Account/AccountDetails";
import Voucher from "@/app/Components/Account/Voucher"; 
import { AccountWishlist } from '../../Components/accountWishlist/wishlist';

const Sidebar = ({ selectedTab, onTabChange, onLogout }) => {
    const tabs = [
        { id: "accountdetails", label: "Account Details", icon: <User /> },
        { id: "wishlist", label: "Wishlist", icon: <Heart /> },
        { id: "voucher", label: "Voucher", icon: <Ticket /> },
    ];

    return (
      <div className="flex flex-col w-64 p-4 border-r max-sm:w-24 bg-gray-50">
        <div className="flex-grow">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`w-full flex items-center gap-3 p-3 my-1 rounded-lg text-left text-sm font-medium transition-colors ${
                  selectedTab === tab.id
                    ? 'bg-green-500 text-white shadow-md'
                    : 'text-gray-600 hover:bg-green-100'
                }`}
              >
                {tab.icon}
                <span className="max-sm:hidden">{tab.label}</span>
              </button>
            ))}
        </div>
        
        <div className="mt-auto">
          <button
              onClick={onLogout}
              className="flex items-center w-full gap-3 p-3 my-1 text-sm font-medium text-left text-red-600 transition-colors rounded-lg hover:bg-red-100"
          >
              <LogOut />
              <span className="max-sm:hidden">Logout</span>
          </button>
        </div>
    </div>
  );
};


// --- Main Account Page Component ---
const AccountPage = () => {
  const [activeTab, setActiveTab] = useState("accountdetails");
  const router = useRouter();
  const queryClient = useQueryClient(); // Get the query client instance

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem('authToken');
      queryClient.invalidateQueries();
      
      toast.success("You have been logged out successfully.");
      router.push('/home');
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "accountdetails":
        return <AccountDetails />;
      case "voucher":
        return <Voucher />;
      case "wishlist":
        return <AccountWishlist />;
      default:
        return <AccountDetails />;
    }
  };

  return (
    <div>
      <div className="flex gap-6 max-sm:gap-0 min-h-[80vh]">
        
        <Sidebar
            selectedTab={activeTab} 
            onTabChange={setActiveTab} 
            onLogout={handleLogout} 
        />
        
        <div className="flex-1 p-4 bg-white rounded shadow">
          <h1 className="py-4 text-3xl font-semibold max-sm:text-2xl">Account Overview</h1>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;