import axios from "axios";

export const doLogin = (body) => {
  return axios.post(`${process.env.NEXT_PUBLIC_BE_HOST}/auth/login`, body)
}