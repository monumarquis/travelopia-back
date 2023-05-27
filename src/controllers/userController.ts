import { Request, Response } from "express";
import userModel from "../models/user.model";
import { UserDocument, UserInput } from "../types/user"


// Post Route Logic 
const postUser = async (req: Request, res: Response) => {
  const {
    name,
    email,
    destination,
    travellers,
    budgetOfPerson,
  }: {
    name: string;
    email: string;
    destination: string;
    travellers: number;
    budgetOfPerson: number;
  } = req.body;
  console.log({
    name,
    email,
    destination,
    travellers,
    budgetOfPerson,
  })
  if (
    !name ||
    !email ||
    !destination ||
    !travellers ||
    !budgetOfPerson
  )
    return res.status(403).send({ message: "Please Enter All Details" });

  const exist: UserDocument | null = await userModel.findOne({ email });
  if (exist)
    return res
      .status(404)
      .send({ message: "User Already Created Try Logging in" });

  let userInput: UserInput = {
    name,
    email,
    destination,
    travellers,
    budgetOfPerson,
  };
  const user: UserDocument = new userModel(userInput);
  await user.save();

  return res
    .status(201)
    .send({ user, message: "Your Details Added Successfully" });
}

// Get Route Logic
const getAllUser = async (req: Request, res: Response) => {
  const { page = 1, limit = 5 } = req.query
  console.log(page, limit)
  if (page) {
    const Totaluser: UserDocument[] = await userModel.find({})
    let totalPages: number = Math.ceil(Totaluser.length / 5)
    console.log(totalPages)
    const user: UserDocument[] = await userModel.find({}).limit(Number(limit) * 1)
      .skip((Number(page) - 1) * Number(limit));
    return res
      .status(200)
      .send({ user, message: "Your Details retrieved Successfully", totalPages });
  }
  else {
    const user: UserDocument[] = await userModel.find({})
    return res
      .status(200)
      .send({ user, message: "Your Details retrieved Successfully" });
  }
}


export { postUser, getAllUser }