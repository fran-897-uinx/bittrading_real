"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { getAccessToken } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import Footer from "@/public/Footer";
import Navbar from "@/public/Navbar";
import { apiUrl } from "../api/route";

// ✅ Validation schema
const formSchema = z.object({
  email: z.string().email("Enter a valid email."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
    mode: "onBlur", // ✅ triggers validation when user leaves the input
  });

  // ✅ Submit logic
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.detail || "Invalid credentials.");
        return;
      }

      if (data.access) {
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
      }

      const token = getAccessToken();
      if (!token) router.push("/login");

      toast.success("Login successful!");
      router.push("/private/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Network or server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-white">
      <Navbar />

      {/* Header Section */}
      <div className="bg-[#0a0e3f] text-white py-16 text-center mt-7">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="mt-2 text-sm text-gray-300">
          <Link href="/">Home</Link>
          <span className="mx-1">{`>`}</span> Login
        </p>
      </div>

      {/* Main Login Section */}
      <div className="max-w-5xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
        {/* Illustration */}
        <div className="hidden md:flex justify-center">
          <Image
            src="/login.jpg"
            alt="Login Illustration"
            width={400}
            height={400}
            className="object-contain"
          />
        </div>

        {/* Login Form */}
        <motion.div
          // initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-0 shadow-none">
            <CardContent>
              <h2 className="text-2xl font-semibold text-[#0a0e3f] mb-6">
                Welcome Back
              </h2>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit, () => {
                    toast.error(
                      "Please fix the errors in the form before continuing."
                    );
                  })}
                  className="space-y-4"
                  noValidate
                >
                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <Label>Email</Label>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="john@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-600 text-sm" />
                      </FormItem>
                    )}
                  />

                  {/* Password */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <Label>Password</Label>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="••••••••"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-600 text-sm" />
                      </FormItem>
                    )}
                  />

                  {/* Remember / Forgot Password */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="remember"
                        className="border-gray-300"
                      />
                      <label
                        htmlFor="remember"
                        className="text-sm text-gray-600"
                      >
                        Remember me
                      </label>
                    </div>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full mt-4 bg-blue-700 hover:bg-blue-800 text-white cursor-pointer"
                    disabled={loading}
                  >
                    {loading ? "Signing in..." : "Login"}
                  </Button>

                  {/* Sign Up link */}
                  <p className="text-center text-sm mt-2 text-gray-600">
                    Don’t have an account?{" "}
                    <Link
                      href="/signup"
                      className="text-blue-600 hover:underline"
                    >
                      Register
                    </Link>
                  </p>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Footer />
    </section>
  );
}
