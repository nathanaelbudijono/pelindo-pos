import { responseTypes } from "./response-types";

export interface signUpFormProps {
  username: string;
  email: string;
  password: string;
}

export interface signUpFormResponseProps extends responseTypes {
  body:
    | {
        username: string;
        email: string;
        token: string;
      }
    | Array<{ code: string; statusText: string }>;
  statusText: string;
}

export interface loginFormProps {
  username: string;
  password: string;
}

export interface loginFormResponseProps extends responseTypes {
  body:
    | {
        username: string;
        email: string;
        token: string;
      }
    | string;
  statusText: string;
}
