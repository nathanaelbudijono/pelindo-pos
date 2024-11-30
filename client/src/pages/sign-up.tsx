import { Helmet } from "react-helmet";
import SignUpForm from "../component/modules/forms/sign-up-form";
import { BASE_URL } from "../constant/env";

const SignUpPage = () => {
  return (
    <main className="h-screen flex justify-center items-center px-4">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Sign up</title>
        <link rel="canonical" href={`${BASE_URL}/sign-up`} />
      </Helmet>
      <SignUpForm />
    </main>
  );
};

export default SignUpPage;
