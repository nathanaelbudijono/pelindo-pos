import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { toast } from "../../../hooks/use-toast";
import { loginService } from "../../../lib/service/account-service";
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

const LoginForm = () => {
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
      const data = await loginService({
        username: values.username,
        password: values.password,
      });

      if (data?.success) {
        toast({
          title: "Login Successfull!",
          description: "Please wait while we redirect you to the dashboard.",
        });

        setTimeout(() => {
          navigate("/dashboard/salesreport");
        }, 2000);
      } else if (data && typeof data.body === "string") {
        toast({
          title: "Login Failed!",
          description: `We encountered the following issues: ${data.body}`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Unexpected Error!",
          description: "Failed to login, please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(error);
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
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Fill the required credential below to login to your account.
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
                          Input your password here.
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
                    "Login"
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/sign-up" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default LoginForm;

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(1),
});
