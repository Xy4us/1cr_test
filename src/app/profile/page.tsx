"use client";
import { motion } from "framer-motion";
import { User, Bell, Camera } from "lucide-react";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { PageHeader } from "@/components/ui/PageHeader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ProfilePage() {
    return (
        <div className="min-h-screen" style={{ backgroundColor: "#f4f7f5" }}>
            <PageHeader title="Profile" />
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="px-4 lg:px-8 py-6 max-w-2xl space-y-6">
                {/* Avatar */}
                <motion.div variants={fadeUp} custom={0} className="rounded-2xl p-6 text-center"
                    style={{ backgroundColor: "#ffffff", boxShadow: "var(--shadow-card)", border: "1px solid #e5e7eb" }}>
                    <div className="relative inline-block mb-4">
                        <div className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold"
                            style={{ backgroundColor: "#2d6a4f" }}>U</div>
                        <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full flex items-center justify-center text-white"
                            style={{ backgroundColor: "#3d5af1" }}>
                            <Camera size={13} />
                        </button>
                    </div>
                    <p className="font-bold text-lg" style={{ color: "#1a1a1a" }}>User</p>
                    <span className="text-xs px-3 py-1 rounded-full font-medium" style={{ backgroundColor: "#d8f3dc", color: "#2d6a4f" }}>Free Plan</span>
                </motion.div>

                {/* Form */}
                <motion.div variants={fadeUp} custom={1} className="rounded-2xl p-6 space-y-4"
                    style={{ backgroundColor: "#ffffff", boxShadow: "var(--shadow-card)", border: "1px solid #e5e7eb" }}>
                    <h3 className="font-semibold" style={{ color: "#1a1a1a" }}>Personal Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div><Label className="text-xs text-gray-500 mb-1 block">First Name</Label><Input placeholder="First name" /></div>
                        <div><Label className="text-xs text-gray-500 mb-1 block">Last Name</Label><Input placeholder="Last name" /></div>
                    </div>
                    <div><Label className="text-xs text-gray-500 mb-1 block">Email</Label><Input type="email" placeholder="your@email.com" /></div>
                    <div><Label className="text-xs text-gray-500 mb-1 block">Phone</Label><Input type="tel" placeholder="+91 98765 43210" /></div>
                    <div><Label className="text-xs text-gray-500 mb-1 block">Monthly Income ₹</Label><Input type="number" placeholder="0" /></div>
                    <Button className="w-full text-white" style={{ backgroundColor: "#2d6a4f" }} onClick={() => toast.success("Profile updated!")}>
                        Save Changes
                    </Button>
                </motion.div>
            </motion.div>
        </div>
    );
}
