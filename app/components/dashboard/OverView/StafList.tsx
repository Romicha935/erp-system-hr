import React from "react";
import { Card } from "@/app/components/ui/card";

const staffData = [
  { id: "01", name: "Abubakar Ismaila Goje", role: "Admin", designation: "Human Resource Dept." },
  { id: "02", name: "Ifeanyi Obinna", role: "Admin", designation: "Management" },
  { id: "03", name: "Bankole Olanrewaju", role: "HOD I.T", designation: "Peoples and Operation" },
  { id: "04", name: "Chidinma Ebere", role: "HOD Account", designation: "Accounts" },
];

export const StaffListSection = () => {
  return (
    <Card title="Staff List" className="overflow-x-auto">
      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-slate-100 text-slate-400 font-semibold">
            <th className="pb-3">S/N</th>
            <th className="pb-3">Staff Name</th>
            <th className="pb-3">Staff Role</th>
            <th className="pb-3">Designation</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50 text-slate-700 font-medium">
          {staffData.map((item) => (
            <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
              <td className="py-3 text-slate-400">{item.id}</td>
              <td className="py-3 font-semibold text-slate-800">{item.name}</td>
              <td className="py-3">{item.role}</td>
              <td className="py-3 text-slate-500">{item.designation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};