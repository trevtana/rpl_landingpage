import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, FileText, Trophy, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AdminActivities from '../components/admin/AdminActivities';
import AdminAchievements from '../components/admin/AdminAchievements';

const Admin = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('activities');

  const handleLogout = async () => {
    if (confirm('Apakah Anda yakin ingin keluar?')) {
      await logout();
      navigate('/login');
    }
  };

  const tabs = [
    { id: 'activities', label: 'Dokumentasi Kegiatan', icon: FileText },
    { id: 'achievements', label: 'Prestasi', icon: Trophy },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src="/logorpl.png" alt="RPL Logo" className="w-12 h-12" />
              <div>
                <h1 className="text-2xl font-bold text-dark-grey">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">RPL SMKN 1 Cimahi</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                <User className="w-5 h-5 text-rpl-blue" />
                <span className="text-sm font-medium text-dark-grey">{user?.name}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Keluar</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6">
          <div className="flex gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-rpl-blue text-rpl-blue font-semibold'
                    : 'border-transparent text-gray-600 hover:text-rpl-blue'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'activities' && <AdminActivities />}
          {activeTab === 'achievements' && <AdminAchievements />}
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;
