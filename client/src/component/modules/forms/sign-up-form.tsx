import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { BASE_URL } from "../../../constant/env";
import { toast } from "../../../hooks/use-toast";
import { signUpService } from "../../../lib/service/account-service";
import { useApiActionStore } from "../../../lib/zustand/store";
import { Button } from "../../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";

const SignUpForm = () => {
  const navigate = useNavigate();
  const { setIsAction, isAction } = useApiActionStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (
    values: z.infer<typeof formSchema>
  ): Promise<void> => {
    try {
      setIsAction(true);
      const data = await signUpService({
        username: values.username,
        password: values.password,
        email: values.email,
      });

      if (data?.success) {
        if ("username" in data.body) {
          toast({
            title: "Sign Up Successfull!",
            description: `Account ${data.body.username} created successfully.`,
          });

          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      } else if (data && Array.isArray(data.body)) {
        const errorMessages = data.body
          .map((error) => `${error.code}: ${error.statusText}`)
          .join("\n");
        toast({
          title: "Sign Up Failed!",
          description: `We encountered the following issues: ${errorMessages}`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Unexpected Error!",
          description: "Failed to create account, please try again.",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "Unexpected Error!",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsAction(false);
    }
  };

  return (
    <main className="h-screen flex justify-center items-center px-4">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Fill the required credential below to create to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="me" required {...field} />
                        </FormControl>
                        <FormDescription>
                          Input your username here.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="me@example.com"
                            required
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Input your email here.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="************"
                            required
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Password must include at least one uppercase letter,
                          one lowercase letter, one number, and one special
                          character.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full">
                  {isAction ? (
                    <LoaderCircle strokeWidth={1} className="animate-spin" />
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to={`${BASE_URL}/`} className="underline">
              Log in
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default SignUpForm;

const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email(),
  password: z
    .string()
    .min(12)
    .max(50)
    .regex(/[A-Z]/, "Password must include at least one uppercase letter")
    .regex(/[a-z]/, "Password must include at least one lowercase letter")
    .regex(/\d/, "Password must include at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must include at least one special character"
    ),
});
