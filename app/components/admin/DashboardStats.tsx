"use client";

import { DashboardStats } from "@/lib/types";
import { Package, Smartphone, TabletSmartphone, Cable, Archive, AlertTriangle } from "lucide-react";

interface Props {
  stats: DashboardStats;
}

export default function DashboardStatsComponent({ stats }: Props) {
  const statCards = [
    {
      label: "Total Products",
      value: stats.totalProducts,
      icon: Package,
      color: "bg-blue-500",
      textColor: "text-blue-600",
    },
    {
      label: "iPhones",
      value: stats.totalIphones,
      icon: Smartphone,
      color: "bg-purple-500",
      textColor: "text-purple-600",
    },
    {
      label: "Android Devices",
      value: stats.totalAndroids,
      icon: TabletSmartphone,
      color: "bg-green-500",
      textColor: "text-green-600",
    },
    {
      label: "Accessories",
      value: stats.totalAccessories,
      icon: Cable,
      color: "bg-yellow-500",
      textColor: "text-yellow-600",
    },
    {
      label: "Total Stock",
      value: stats.totalStock,
      icon: Archive,
      color: "bg-indigo-500",
      textColor: "text-indigo-600",
    },
    {
      label: "Low Stock Items",
      value: stats.lowStockProducts,
      icon: AlertTriangle,
      color: "bg-red-500",
      textColor: "text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {statCards.map((card) => {
        const Icon = card.icon;
        
        return (
          <div
            key={card.label}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {card.label}
                </p>
                <p className={`text-3xl font-bold ${card.textColor}`}>
                  {card.value}
                </p>
              </div>
              <div className={`${card.color} p-3 rounded-lg`}>
                <Icon className="text-white" size={24} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}