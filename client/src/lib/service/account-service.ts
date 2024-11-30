import {
  isValidToken,
  loginFetcher,
  signUpFetcher,
} from "../fetcher/account-fetcher";
import {
  signUpFormProps,
  signUpFormResponseProps,
  loginFormProps,
  loginFormResponseProps,
} from "../../types/account-types";

export const signUpService = async ({
  email,
  username,
  password,
}: signUpFormProps): Promise<signUpFormResponseProps | null> => {
  try {
    const data = await signUpFetcher({ email, username, password });
    if (data?.success) {
      if ("token" in data.body) {
        localStorage.setItem("token", data.body.token);
      }
      return data;
    } else {
      return data;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const loginService = async ({
  username,
  password,
}: loginFormProps): Promise<loginFormResponseProps | null> => {
  try {
    const data = await loginFetcher({ username, password });
    if (data?.success) {
      if (
        data?.success &&
        typeof data.body === "object" &&
        data.body !== null
      ) {
        localStorage.setItem("token", data.body.token);
      }
      return data;
    } else {
      return data;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const isValidTokenService = async (): Promise<boolean> => {
  try {
    const data = await isValidToken();

    if (data) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
};
