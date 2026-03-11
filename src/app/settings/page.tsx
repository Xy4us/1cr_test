"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  User, Bell, Shield, Database, Download, Trash2, ChevronRight,
  Lock, Eye, EyeOff, Link2, FileSpreadsheet, AlertTriangle, Check,
  ToggleLeft, ToggleRight
} from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { toast } from "sonner";

type SettingItem = {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  action?: "toggle" | "navigate" | "danger";
  defaultValue?: boolean;
};

type SettingGroup = {
  section: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  items: SettingItem[];
};

const SETTING_GROUPS: SettingGroup[] = [
  {
    section: "Account Settings",
    icon: User,
    color: "#2d6a4f",
    bg: "#f0fdf4",
    items: [
      { id: "edit-profile", label: "Edit Profile", description: "Update your name, contact info, and photo", icon: User, action: "navigate" },
      { id: "change-password", label: "Change Password", description: "Set a new secure password for your account", icon: Lock, action: "navigate" },
      { id: "2fa", label: "Two-Factor Authentication", description: "Add an extra layer of security to your login", icon: Shield, action: "toggle", defaultValue: false },
      { id: "sessions", label: "Active Sessions", description: "Manage devices logged into your account", icon: Eye, action: "navigate" },
    ],
  },
  {
    section: "Notifications",
    icon: Bell,
    color: "#3b82f6",
    bg: "#eff6ff",
    items: [
      { id: "notif-alerts", label: "Financial Alerts", description: "Get notified about goal deadlines and risks", icon: Bell, action: "toggle", defaultValue: true },
      { id: "notif-weekly", label: "Weekly Summary", description: "Receive a weekly portfolio performance report", icon: Bell, action: "toggle", defaultValue: true },
      { id: "notif-tips", label: "Smart Money Tips", description: "Personalized savings and investment suggestions", icon: Bell, action: "toggle", defaultValue: false },
    ],
  },
  {
    section: "Financial Data",
    icon: Database,
    color: "#7c3aed",
    bg: "#faf5ff",
    items: [
      { id: "import", label: "Import Financial Data", description: "Sync bank accounts, investments and loans", icon: Link2, action: "navigate" },
      { id: "export-csv", label: "Export Data (CSV)", description: "Download all your financial data as a spreadsheet", icon: FileSpreadsheet, action: "navigate" },
      { id: "download-report", label: "Download Annual Report", description: "Get a full PDF report of your financial year", icon: Download, action: "navigate" },
    ],
  },
  {
    section: "Danger Zone",
    icon: AlertTriangle,
    color: "#dc2626",
    bg: "#fef2f2",
    items: [
      { id: "delete-data", label: "Clear All Data", description: "Remove all financial data while keeping your account", icon: Trash2, action: "danger" },
      { id: "delete-account", label: "Delete Account", description: "Permanently delete your 1CR Club account and all data", icon: Trash2, action: "danger" },
    ],
  },
];

export default function SettingsPage() {
  const [toggles, setToggles] = useState<Record<string, boolean>>(
    Object.fromEntries(
      SETTING_GROUPS.flatMap(g => g.items)
        .filter(item => item.action === "toggle")
        .map(item => [item.id, item.defaultValue ?? false])
    )
  );

  const handleAction = (item: SettingItem) => {
    if (item.action === "toggle") {
      setToggles(prev => ({ ...prev, [item.id]: !prev[item.id] }));
      toast.success(`${item.label} ${!toggles[item.id] ? "enabled" : "disabled"}`);
    } else if (item.action === "danger") {
      toast.error("This action requires additional confirmation. Please contact support.");
    } else {
      toast.info(`Navigating to ${item.label}...`);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <PageContainer size="wide" className="py-8 pb-12">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Settings</h1>
          <p className="text-sm text-gray-400 mt-1 font-medium">Manage your account, notifications, and data preferences</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left nav */}
          <div className="lg:w-56 shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sticky top-6">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Quick Nav</p>
              {SETTING_GROUPS.map((group) => {
                const Icon = group.icon;
                return (
                  <button
                    key={group.section}
                    onClick={() => document.getElementById(group.section.replace(/\s/g, "-"))?.scrollIntoView({ behavior: "smooth" })}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all text-left"
                  >
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: group.bg }}>
                      <Icon size={14} style={{ color: group.color }} />
                    </div>
                    {group.section.split(" ")[0]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Settings content */}
          <div className="flex-1 space-y-6">
            {SETTING_GROUPS.map((group, gi) => {
              const GroupIcon = group.icon;
              const isDanger = group.section === "Danger Zone";
              return (
                <motion.div
                  key={group.section}
                  id={group.section.replace(/\s/g, "-")}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: gi * 0.07 }}
                  className={`rounded-3xl border shadow-sm overflow-hidden ${isDanger ? "border-red-200" : "border-gray-100"}`}
                  style={{ backgroundColor: isDanger ? "#fff5f5" : "white" }}
                >
                  {/* Group Header */}
                  <div className="flex items-center gap-3 p-5 border-b" style={{ borderColor: isDanger ? "#fecaca" : "#f9fafb" }}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: group.bg }}>
                      <GroupIcon size={16} style={{ color: group.color }} />
                    </div>
                    <h2 className="text-base font-black" style={{ color: isDanger ? "#dc2626" : "#111827" }}>{group.section}</h2>
                  </div>

                  {/* Items */}
                  <div className="divide-y" style={{ divideColor: isDanger ? "#fee2e2" : "#f9fafb" }}>
                    {group.items.map((item) => {
                      const ItemIcon = item.icon;
                      const isToggle = item.action === "toggle";
                      const isOn = toggles[item.id];
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleAction(item)}
                          className="w-full flex items-center gap-4 p-5 text-left transition-all group"
                          style={{
                            backgroundColor: isDanger ? "transparent" : "transparent",
                          }}
                          onMouseEnter={e => { if (!isDanger) (e.currentTarget as HTMLElement).style.backgroundColor = "#f9fafb"; }}
                          onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"}
                        >
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: group.bg }}>
                            <ItemIcon size={16} style={{ color: isDanger ? "#dc2626" : group.color }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold" style={{ color: isDanger ? "#dc2626" : "#111827" }}>{item.label}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{item.description}</p>
                          </div>
                          {isToggle ? (
                            <div className="shrink-0">
                              {isOn ? (
                                <ToggleRight size={28} className="text-[#2d6a4f]" />
                              ) : (
                                <ToggleLeft size={28} className="text-gray-300" />
                              )}
                            </div>
                          ) : (
                            <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-500 transition-colors shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
