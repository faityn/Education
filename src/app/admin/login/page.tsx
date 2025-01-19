import { Metadata } from "next";
import AuthLayout from "@/components/Layouts/AuthLayout";
import Login from "@/components/Admin/Login/Login";

export const metadata: Metadata = {
  title: "Training and Examination System | Admin page - Login",
  icons: "/images/favicon.ico",
};

const LoginPage = () => {
  return (
    <AuthLayout>
      <Login />
    </AuthLayout>
  );
};

export default LoginPage;
