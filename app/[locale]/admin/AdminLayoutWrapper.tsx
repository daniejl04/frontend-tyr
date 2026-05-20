"use client";

import React, { useState } from "react";
import AdminSidebar from "@/app/components/admin/AdminSidebar";
import AdminDashboard from "@/app/components/admin/AdminDashboard";

interface AdminLayoutWrapperProps {
  locale: string;
  dict: any;
}

export default function AdminLayoutWrapper({
  locale,
  dict,
}: AdminLayoutWrapperProps) {
  const [activeSection, setActiveSection] = useState("inventory");

  return (
    <div className="flex min-h-screen bg-surface text-on-surface">
      <AdminSidebar
        locale={locale}
        dict={dict}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <div className="flex-1">
        <AdminDashboard
          locale={locale}
          dict={dict}
          activeSection={activeSection}
        />
      </div>
    </div>
  );
}
