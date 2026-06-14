import { Router, type Request } from "express";
import { auth } from "../middleware";
import { AccountModel } from "../db";

export const accountRouter = Router();

accountRouter.get("/balance", auth, async (req, res) => {
    const user = req.userId

  const account = await AccountModel.findOne({
    userId: user as string
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

accountRouter.post("/tranfer",auth,async (req, res) => {

});