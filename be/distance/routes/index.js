import express from "express";
import UserRouter from './user.js';
import accountRouter from './account.js';
import cors from 'cors';
const router = express.Router();
router.use(cors());
router.use("/user", UserRouter);
router.use("/account", accountRouter);
export default router;
//# sourceMappingURL=index.js.map