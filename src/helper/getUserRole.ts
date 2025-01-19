import { getLoginData } from "@/hooks/useUser";
import getToken from "./getToken";

const getUserRole = async () => {
  const userToken = getToken();
  const loginData = await getLoginData(userToken as string);

  if (loginData?.status) {
    const data = {
      role: loginData?.result?.role,
      firstname: loginData?.result?.firstname,
      userId: loginData?.result?.id,
    };
    return data;
  } else {
    return "expired";
  }
};

export default getUserRole;
