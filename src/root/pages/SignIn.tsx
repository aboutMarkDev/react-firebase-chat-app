import { signInSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Loader2 } from "lucide-react";
import useUserStore from "@/store/userStore";
import WelcomeHeader from "@/components/WelcomeHeader";

export default function SignIn() {
  const { currentUser } = useUserStore();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isLoggingIn, setIsLoggingInLoading] = useState(false);

  const firstInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (firstInput.current) {
      firstInput.current.focus();
    }
  }, []);

  async function onSubmit(data: z.infer<typeof signInSchema>) {
    const { email, password } = data;
    setIsLoggingInLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);

      toast.success("Login Successful!");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setIsLoggingInLoading(false);
    }
  }

  if (currentUser) {
    return <Navigate to="/home" />;
  }

  return (
    <section className="flex-grow flex flex-col relative">
      <WelcomeHeader />
      <div className="w-full max-w-[24rem] space-y-5 px-5 py-8 bg-background rounded-lg border m-auto text-sm">
        <h1 className="text-2xl font-bold  text-center">Sign In</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      {...field}
                      className="text-sm"
                      ref={firstInput}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} className="text-sm" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoggingIn}>
              {isLoggingIn ? (
                <>
                  <Loader2 className="animate-spin" />
                  Loading...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </Form>
        <footer className="">
          <span>Don't have an account?</span>
          <Link to="/sign-up">
            <Button variant="link">Sign Up here.</Button>
          </Link>
        </footer>
      </div>
    </section>
  );
}
