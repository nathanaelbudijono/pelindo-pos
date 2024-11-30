import LoginForm from "../component/modules/forms/login-form";
import { Helmet } from "react-helmet";
import { BASE_URL } from "../constant/env";

const IndexPage = () => {
  return (
    <main className="h-screen flex justify-center items-center px-4">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login</title>
        <link rel="canonical" href={`${BASE_URL}`} />
      </Helmet>
      <LoginForm />
    </main>
  );
};

export default IndexPage;
