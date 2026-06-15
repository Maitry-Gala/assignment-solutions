import { Router } from "express";
import z from "zod";
import bcrypt from "bcryptjs";
import { AccountModel, UserModel } from "../db";
import jwt from "jsonwebtoken";
import { auth } from "../middleware";

export const userRouter = Router();

userRouter.post("/signup", async function (req, res) {
  const requiredBody = z.object({
    email: z.string().min(3).max(25).email(),
    password: z
      .string()
      .min(6)
      .max(8)
      .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[@!$%*?&])[A-Za-z\d@!$%*?&]+$/),
    firstName: z.string().min(3).max(10),
    lastName: z.string().min(3).max(10),
  });

  const ParsedDataWithSuccess = requiredBody.safeParse(req.body);

  if (!ParsedDataWithSuccess.success) {
    return res.status(400).json({
      message: "Validation failed",
    });
  }

  const { email, password, firstName, lastName } = ParsedDataWithSuccess.data;

  try {
    const existingUser = await UserModel.findOne({
      email: email,
    });
    if (existingUser) {
      return res.status(401).json({
        message: "User already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 3);

    const user = await UserModel.create({
      email: email,
      password: hashedPassword,
      firstname: firstName,
      lastname: lastName,
    });

    await AccountModel.create({
      userId: user._id,
      balance: Math.floor(Math.random() * 10000),
    });

    res.json({
      message: "Signup succed!",
    });
  } catch (e) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
});

userRouter.post("/signin", async function (req, res) {
  const requiredBody = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const parsed = requiredBody.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: "Invalid inputs",
    });
  }

  const { email, password } = parsed.data;
  try {
    const user = await UserModel.findOne({
      email: email,
    });
    console.log(user);

    if (!user) {
      return res.status(403).json({
        message: "User doesnt exist in our database",
      });
    }

    const passwordMatched = await bcrypt.compare(password, user.password);

    if (passwordMatched) {
      const token = jwt.sign(
        {
          id: user._id.toString(),
        },
        process.env.JWT_USER_SECRET!,
      );

      return res.json({
        token: token,
        message: "you are signed in!",
      });
    } else {
      return res.status(403).json({
        message: "Incorrect creds!",
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
});

userRouter.put("/update", auth, async function (req, res) {
  const updateBody = z.object({
    mail: z.string().min(3).max(25).email().optional(),
    password: z
      .string()
      .min(6)
      .max(8)
      .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[@!$%*?&])[A-Za-z\d@!$%*?&]+$/)
      .optional(),
    firstname: z.string().min(3).max(10).optional(),
    lastname: z.string().min(3).max(10).optional(),
  });

  const parsed = updateBody.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: "Invalid inputs",
    });
  }
  console.log(parsed.data);
  try {
    await UserModel.updateOne(
      {
        _id: req.userId,
      },
      {
        $set: parsed.data,
      },
    );

    return res.status(200).json({
      message: "Data updated successfully",
    });

  } catch (e) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
});

userRouter.get("/bulk", auth, async (req, res) => {
  const filter = (req.query.filter as string) || "";
  console.log(filter);
  const users = await UserModel.find({
    _id: { $ne: req.userId },
    $or: [
      {
        firstname: {
          $regex: filter,
          $options: "i",
        },
      },
      {
        lastname: {
          $regex: filter,
          $options: "i",
        },
      },
    ],
  });

  res.json({
    users: users.map((user) => ({
      _id: user._id,
      username: user.email,
      firstName: user.firstname,
      lastName: user.lastname,
    })),
  });
});
