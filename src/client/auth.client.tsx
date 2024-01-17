import { User } from "../models/User";
import axios from "axios";

const user_auth_path = "http://localhost:7878/auth";
const user_verify_path = "http://localhost:7878/verify";

export const loginUser = async (
  email: string,
  password: string
): Promise<User> => {
  return axios
    .post(user_auth_path, {
      email: email,
      password: password,
    })
    .then(function (response) {
      console.log("user-auth-client-response POST user :", response.data);
      return response.data;
    })
    .catch(function (error: Error) {
      console.error("Error: could not log user" + error.message);
      throw error;
    });
};

export const checkAccountExists = async (email: string) => {
  return await axios
    .post(user_verify_path, {
      email: email,
    })
    .then(function (response) {
      console.log("user-verify-client-response POST user :", response.data);
      return response.data;
    })
    .catch(function (error: Error) {
      console.error("Error: could not verify if user exists" + error.message);
      throw error;
    });
};
