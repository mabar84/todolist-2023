import { LoginParamsType, BaseResponseType } from "features/TodolistsList/api/todolists.api";
import { instance } from "common/api/instance";

export const authAPI = {
  me: () => instance.get<BaseResponseType>("/auth/me"),
  login: (loginParams: LoginParamsType) => instance.post("/auth/login", loginParams),
  logout: () => instance.delete<BaseResponseType>("/auth/login"),
};
