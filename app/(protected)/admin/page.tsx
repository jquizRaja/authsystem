"use client";
import { admin } from "@/actions/admin";
import RoleGate from "@/components/auth/RoleGate";
import FormSuccess from "@/components/form/FormSuccess";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import React from "react";
import { toast } from "sonner";

const AdminPage = () => {
  const onServerActionClick = () => {
    admin().then((data) => {
      if (data.success) {
        toast.success("You are allowed WELCOME");
      }
      if (data.error) {
        toast.error("ForBidden");
      }
    });
  };
  const onApiRouteClick = () => {
    fetch("/api/admin").then((response) => {
      if (response.ok) {
        toast.success("You are Welcome");
      } else {
        toast.error("FORBIDDEN");
      }
    });
  };
  return (
    <Card className="w-[600px] ">
      <CardHeader>
        <p className="text-2xl text-center">🗝🔑Admin</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You are Welcome as User to view contents" />
        </RoleGate>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin Only Api Routes</p>
          <Button onClick={onApiRouteClick}>Click to Test</Button>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin Only Server Actions</p>
          <Button onClick={onServerActionClick}>Click to Test</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
