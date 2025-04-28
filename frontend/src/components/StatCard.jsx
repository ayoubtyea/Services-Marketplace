import React from 'react';

const StatCard = ({ icon: Icon, title, value, color, bgColor }) => {
  return (
    <div className={`p-6 rounded-lg shadow-lg ${bgColor} flex items-center justify-between`}>
      <div className="flex items-center">
        <Icon size={32} className={`${color} mr-4`} />
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
