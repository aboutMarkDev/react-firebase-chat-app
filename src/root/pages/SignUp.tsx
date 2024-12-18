import { signUpSchema } from "@/lib/validations";
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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import toast from "react-hot-toast";
import useUserStore from "@/store/userStore";
import WelcomeHeader from "@/components/WelcomeHeader";

export default function SignUp() {
  const { currentUser } = useUserStore();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const [isCreatingUser, setIsCreatingUser] = useState(false);

  const firstInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (firstInput.current) {
      firstInput.current.focus();
    }
  }, []);

  async function onSubmit(data: z.infer<typeof signUpSchema>) {
    const { username, email, password } = data;
    setIsCreatingUser(true);
    try {
      // Create a validation for username. Usernames should be unique.
      const userCollection = collection(db, "users");

      const q = query(userCollection, where("username", "==", username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        throw new Error("Username already exists");
      }

      const register = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const { uid } = register.user;

      // Add a new document in collection "users"
      await setDoc(doc(db, "users", uid), {
        username,
        email,
        id: uid,
        isOnline: false,
        createdAt: Date.now(),
      });

      // Add a new document in collection "userChats"
      await setDoc(doc(db, "userChats", uid), {
        conversation: [],
      });

      form.reset();
      toast.success("New user created");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setIsCreatingUser(false);
    }
  }

  if (currentUser) {
    return <Navigate to="/home" />;
  }

  return (
    <section className="flex-grow flex flex-col relative">
      <WelcomeHeader />
      <div className="w-full max-w-[24rem] space-y-5 px-5 py-8 bg-background rounded-lg border m-auto text-sm">
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Username Field */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} className="text-sm" ref={firstInput} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} className="text-sm" />
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
            <Button type="submit" className="w-full" disabled={isCreatingUser}>
              {isCreatingUser ? (
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
        <footer>
          <span>Already have an account?</span>
          <Link to="/sign-in">
            <Button variant="link">Sign In here.</Button>
          </Link>
        </footer>
      </div>
    </section>
  );
}
