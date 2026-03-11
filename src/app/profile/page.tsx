"use client";
import { motion } from "framer-motion";
import { User, Bell, Camera, Shield, Heart, Home, Car, BarChart2, TrendingUp, Users, Edit2, Save, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { PageContainer } from "@/components/layout/PageContainer";

const FINANCIAL_STATS = [
  { label: "Net Worth", value: "₹78.69L", delta: "+4.2%", color: "#2d6a4f", bg: "#f0fdf4", icon: TrendingUp },
  { label: "Savings Rate", value: "24%", delta: "of income", color: "#3b82f6", bg: "#eff6ff", icon: BarChart2 },
  { label: "Life Coverage", value: "₹50L", delta: "LIC Policy", color: "#7c3aed", bg: "#faf5ff", icon: Shield },
  { label: "Emergency Fund", value: "6 months", delta: "₹2.4L saved", color: "#f59e0b", bg: "#fffbeb", icon: Heart },
];

const FAMILY_MEMBERS = [
  { name: "Priya Doe", relation: "Spouse", age: 32, income: "₹80K/mo", initial: "P", color: "#f59e0b" },
  { name: "Karan Doe", relation: "Son", age: 8, income: "—", initial: "K", color: "#3b82f6" },
  { name: "Meera Doe", relation: "Daughter", age: 5, income: "—", initial: "M", color: "#ec4899" },
];

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    monthlyIncome: "1,20,000",
    riskProfile: "Moderate",
  });

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <PageContainer size="wide" className="py-8 pb-12">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">My Profile</h1>
            <p className="text-sm text-gray-400 mt-1 font-medium">Manage your personal details and preferences</p>
          </div>
          <button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold transition-colors"
            style={{
              backgroundColor: isEditing ? "#2d6a4f" : "#f3f4f6",
              color: isEditing ? "white" : "#374151",
            }}
          >
            {isEditing ? <><Save size={15} /> Save Changes</> : <><Edit2 size={15} /> Edit Profile</>}
          </button>
        </div>

        {/* ROW 1: Avatar + Personal Info */}
        <div className="flex flex-col lg:flex-row gap-5 mb-5">
          {/* Avatar Card */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 flex flex-col items-center gap-4 lg:w-64 shrink-0"
          >
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#2d6a4f] to-[#52b788] flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-[#2d6a4f]/30">
                JD
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#3b82f6] flex items-center justify-center text-white shadow-md hover:bg-[#2563eb] transition-colors">
                <Camera size={14} />
              </button>
            </div>
            <div className="text-center">
              <p className="text-xl font-black text-gray-900">{form.firstName} {form.lastName}</p>
              <p className="text-sm text-gray-400 mt-0.5">{form.email}</p>
            </div>
            <div className="w-full pt-4 border-t border-gray-50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 font-medium">Plan</span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#f0fdf4] text-[#2d6a4f] border border-green-200">Premium ✦</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 font-medium">Risk Profile</span>
                <span className="text-xs font-bold text-orange-600">{form.riskProfile}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 font-medium">Member Since</span>
                <span className="text-xs font-bold text-gray-700">Jan 2024</span>
              </div>
            </div>
          </motion.div>

          {/* Personal Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 flex-1"
          >
            <h3 className="text-base font-black text-gray-900 mb-5">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "First Name", key: "firstName", placeholder: "First name" },
                { label: "Last Name", key: "lastName", placeholder: "Last name" },
                { label: "Email Address", key: "email", placeholder: "your@email.com" },
                { label: "Phone Number", key: "phone", placeholder: "+91 98765 43210" },
                { label: "Monthly Income ₹", key: "monthlyIncome", placeholder: "0" },
                { label: "Risk Profile", key: "riskProfile", placeholder: "Moderate" },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5 block">{label}</Label>
                  {isEditing ? (
                    <Input
                      placeholder={placeholder}
                      value={form[key as keyof typeof form]}
                      onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                      className="text-sm font-semibold"
                    />
                  ) : (
                    <p className="text-sm font-bold text-gray-900 py-2.5 px-3 bg-gray-50 rounded-xl border border-gray-100">{form[key as keyof typeof form]}</p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ROW 2: Financial Stats */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-5"
        >
          <h3 className="text-base font-black text-gray-900 mb-3">Financial Overview</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {FINANCIAL_STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: stat.bg }}>
                      <Icon size={18} style={{ color: stat.color }} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{stat.label}</span>
                  </div>
                  <div>
                    <p className="text-2xl font-black" style={{ color: stat.color }}>{stat.value}</p>
                    <p className="text-xs text-gray-400 font-medium mt-0.5">{stat.delta}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* ROW 3: Family Members */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-black text-gray-900">Family Members</h3>
            <button className="flex items-center gap-1.5 text-sm font-bold text-[#2d6a4f] hover:underline">
              <Users size={14} /> Add Member
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {FAMILY_MEMBERS.map((member, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-black text-lg shrink-0"
                  style={{ backgroundColor: member.color }}
                >
                  {member.initial}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black text-gray-900">{member.name}</p>
                  <p className="text-xs text-gray-400">{member.relation} · Age {member.age}</p>
                  <p className="text-xs font-semibold text-gray-600 mt-1">{member.income}</p>
                </div>
                <button className="text-gray-300 hover:text-gray-500 transition-colors">
                  <ChevronRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      </PageContainer>
    </div>
  );
}
