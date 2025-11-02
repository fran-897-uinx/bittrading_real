"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";

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
import Navbar from "@/public/Navbar";
import Footer from "@/public/Footer";
import { apiUrl } from "../api/route";

const formSchema = z.object({
  firstName: z.string().min(2, "Enter your first name."),
  lastName: z.string().min(2, "Enter your last name."),
  username: z.string().min(3, "Username too short."),
  phone: z.string().min(7, "Enter a valid phone."),
  email: z.string().email("Enter a valid email."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  confirmPassword: z.string().min(6, "Confirm your password."),
});

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}signup/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname: values.firstName,
          lastname: values.lastName,
          username: values.username,
          email: values.email,
          password: values.password,
          phone: values.phone,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        // server returned an error payload
        toast.error(data?.error || "Signup failed");
        return;
      }

      // success
      toast.success(data?.message || "Registration successful!");
      router.push("/login");
    } catch (error) {
      console.log("signup error", error);
      toast.error("Something went wrong. please try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-white w-full">
      <Navbar />
      {/* Header Section */}
      <div className="bg-[#0a0e3f] text-white py-16 text-center mt-10">
        <h1 className="text-3xl font-bold">Register</h1>
        <p className="mt-2 text-sm text-gray-300">
          <Link href="/">Home</Link> <span className="mx-1">{`>`}</span>{" "}
          Register
        </p>
      </div>

      {/* Main Form Section */}
      <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
        {/* Illustration */}
        <div className="flex-col hidden md:flex justify-center gap-2.5 h-50 ">
          <Image
            src="/signup.jpg"
            alt="Register Illustration"
            width={400}
            height={400}
            className="object-contain"
          />
        </div>

        {/* Form */}
        <Card className="border-0 shadow-none">
          <CardContent>
            <h2 className="text-2xl font-semibold text-[#0a0e3f] mb-6">
              Register Now
            </h2>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* First + Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <Label>First name</Label>
                        <FormControl>
                          <Input placeholder="First name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <Label>Last name</Label>
                        <FormControl>
                          <Input placeholder="Last name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Username */}
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Username</Label>
                      <FormControl>
                        <Input placeholder="francis_db" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Phone</Label>
                      <FormControl>
                        <Input placeholder="Phone" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Email</Label>
                      <FormControl>
                        <Input type="email" placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password + Confirm */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <Label>Password</Label>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <Label>Confirm Password</Label>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Confirm password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Privacy Checkbox */}
                <div className="flex items-center space-x-2 mt-3">
                  <input
                    type="checkbox"
                    id="terms"
                    className="border-gray-300"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to the{" "}
                    <Link
                      href="/privacy"
                      className="text-blue-600 hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full mt-4 bg-blue-700 hover:bg-blue-800 text-white cursor-pointer"
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Register"}
                </Button>

                {/* Login Link */}
                <p className="text-center text-sm mt-2 text-gray-600">
                  Already have an account?{" "}
                  <Link href="/login" className="text-blue-600 hover:underline">
                    Log In
                  </Link>
                </p>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </section>
  );
}
