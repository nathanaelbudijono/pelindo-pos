import { ACCOUNT_API_KEY } from "../../constant/env";
import {
  loginFormProps,
  loginFormResponseProps,
  signUpFormProps,
  signUpFormResponseProps,
} from "../../types/account-types";

export const signUpFetcher = async ({
  username,
  password,
  email,
}: signUpFormProps): Promise<signUpFormResponseProps> => {
  try {
    const res = await fetch(`${ACCOUNT_API_KEY}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, email }),
    });
    const data = await res.json();
    if (res.ok) {
      return {
        status: res.status,
        statusText: res.statusText,
        success: res.ok,
        body: {
          username: data.username,
          email: data.email,
          token: data.token,
        },
      };
    } else {
      return {
        status: res.status,
        statusText: res.statusText,
        success: res.ok,
        body: Array.isArray(data)
          ? data.map((error: { code: string; description: string }) => ({
              code: error.code,
              statusText: error.description,
            }))
          : [],
      };
    }
  } catch (err) {
    console.log(err);
    return {
      status: 500,
      statusText: "Internal Server Error",
      success: false,
      body: [],
    };
  }
};

export const loginFetcher = async ({
  username,
  password,
}: loginFormProps): Promise<loginFormResponseProps> => {
  try {
    const res = await fetch(`${ACCOUNT_API_KEY}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      const dataBody = await res.json();
      return {
        status: res.status,
        statusText: res.statusText,
        success: res.ok,
        body: {
          username: dataBody.username,
          email: dataBody.email,
          token: dataBody.token,
        },
      };
    } else {
      const dataText = await res.text();
      console.log(dataText);
      return {
        status: res.status,
        statusText: res.statusText,
        success: res.ok,
        body: dataText,
      };
    }
  } catch (err) {
    console.error(err);
    return {
      status: 500,
      statusText: "Internal Server Error",
      success: false,
      body: "",
    };
  }
};

export const isValidToken = async (): Promise<boolean> => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${ACCOUNT_API_KEY}/verify-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
    const data = await res.json();
    if (data.isValid) {
      return true;
    }
    return false;
  } catch (err) {
    console.error(err);
    return false;
  }
};
