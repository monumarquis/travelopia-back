import { Document } from "mongoose";

export type UserDocument = Document & {
  name: string;
  email: string;
  destination: string;
  travellers: number;
  budgetOfPerson: number;
};

export type UserInput = {
  name: UserDocument["name"];
  email: UserDocument["email"];
  destination: UserDocument["destination"];
  travellers: UserDocument["travellers"];
  budgetOfPerson: UserDocument["budgetOfPerson"];
};
