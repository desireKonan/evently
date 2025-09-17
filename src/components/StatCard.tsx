import React from 'react';

interface StatCardProps {
  title: string;
  value: number;
  icon: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-gray-200 bg-white p-6">
      <div className="flex items-center gap-2 text-gray-500">
        <span className={`material-symbols-outlined ${color}`}>{icon}</span>
        <p className="text-sm font-medium">{title}</p>
      </div>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
    </div>
  );
};

export default StatCard;