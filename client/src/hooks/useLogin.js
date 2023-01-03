import Cookies from "js-cookie";
import { LoginAPI } from "../apis/loginAPI";
import { useStateContext } from "../context";
export const useLogin = () => {
  const { setToken } = useStateContext();
  const login = async (values) => {
    const user = await LoginAPI.login(values);
    if (user) {
      Cookies.set("token", user.data.user.token);
      setToken(user.data.user.token);
    }
  };
  return login;
};
