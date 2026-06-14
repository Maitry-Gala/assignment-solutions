import { Router, type Request } from "express";
import { auth } from "../middleware";
import { AccountModel } from "../db";
import z from "zod";
import mongoose from "mongoose";

export const accountRouter = Router();

accountRouter.get("/balance", auth, async (req, res) => {
  const user = req.userId;

  const account = await AccountModel.findOne({
    userId: user as string,
  });

  if (!account) {
    return res.status(404).json({
      message: "Account not found",
    });
  }

  return res.json({
    balance: account.balance,
  });
});

accountRouter.post("/transfer", auth, async (req, res) => {
  const tranferBody = z.object({
    to: z.string(),
    amount: z.number().positive(),
  });

  const parsed = tranferBody.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: "Invalid inputs",
    });
  }

  const { to, amount } = parsed.data;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    if (to === req.userId) {
      await session.abortTransaction();

      return res.status(400).json({
        message: "Cannot transfer to yourself",
      });
    }

    const senderAccount = await AccountModel.findOne({
      userId: req.userId as string,
    }).session(session);

    if (!senderAccount || senderAccount.balance < amount) {
      await session.abortTransaction();

      return res.status(400).json({
        message: "Insufficient balance or account not found",
      });
    }
    const receiverAccount = await AccountModel.findOne({
      userId: to,
    }).session(session);

    if (!receiverAccount) {
      await session.abortTransaction();

      return res.status(404).json({
        message: "Receiver not found",
      });
    }

    await AccountModel.updateOne(
      { userId: req.userId as string },
      {
        $inc: {
          balance: -amount,
        },
      },
    ).session(session);

    await AccountModel.updateOne(
      { userId: to },
      {
        $inc: {
          balance: amount,
        },
      },
    ).session(session);

    await session.commitTransaction();

    res.json({
      message: "Transfer successful",
    });
  } catch (e) {
    await session.abortTransaction();

    res.status(500).json({
      message: "Transfer failed",
    });
  } finally {
    session.endSession();
  }
});
