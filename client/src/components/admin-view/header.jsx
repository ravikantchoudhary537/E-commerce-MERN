import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { AlignJustify, LogOut } from "lucide-react";
import { useLogoutUserMutation } from "@/store/authapi";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";


const AdminHeader = ({ setOpen }) => {
  const [logoutUser]=useLogoutUserMutation();
  const navigate=useNavigate();
  const {toast}=useToast();
  const handleLogout =async () => {
    try {
     const result= await logoutUser().unwrap();
    //  console.log("Logout data ",result);
     if (result?.success) {
      toast({
        title: result?.message,
        variant: "success",
      });
      navigate("/auth/login");
      
    } else {
      toast({
        title: result?.message,
        variant: "destructive",
      });
    }
  } catch (error) {
    toast({
      title: "An unexpected error occurred.",
      description: error?.message || "Please try again later.",
      variant: "destructive",
    });
    console.log("Error during logout ", error);
  }
  };
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <Button onClick={() => setOpen(true)} className="lg:hidden sm:block">
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button
          onClick={handleLogout}
          className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow"
        >
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
