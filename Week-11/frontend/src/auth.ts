import api from "./api";

type SignupData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export const signup = async (data: SignupData) => {
  const response = await api.post("/api/v1/user/signup", data);

  return response.data;
};