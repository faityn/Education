import { getAdminLoginData } from "@/hooks/useUser";
import getToken from "./getToken";

const getRole = async () => {
  const userToken = getToken();
  const loginData = await getAdminLoginData(userToken as string);

  if (loginData?.status) {
    const data = {
      role: loginData?.result?.role ? "admin" : "user",
      
    };
    return data;
  } else {
    return "expired";
  }
};

export default getRole;
