import { atom } from "recoil";

export const awsInfoState = atom({
  key: "awsInfoState",
  default: {
    region: "eu-central-1",
    endpoint: "https://dynamodb.eu-central-1.amazonaws.com/",
    accessKeyId: "",
    accessSecretKey: "",
  },
});

export const someTableState = atom({
  key: "someTableState",
  default: [],
});
