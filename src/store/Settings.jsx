import { atom, selector } from "recoil";

export const dateMaskState = atom({
  key: "dateMaskState",
  default: "__-__-____ __:__",
});
