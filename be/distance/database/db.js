import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;
const User = new Schema({
    username: { type: String, unique: true },
    firstname: { type: String },
    lastname: { type: String },
    password: { type: String },
    // user can have many accounts 
    account: { type: [ObjectId], ref: ('account') }
});
const Account = new Schema({
    balance: Number,
    // only one user
    user: { type: ObjectId, ref: ('user') }
});
export const userModel = mongoose.model('user', User);
export const accountModel = mongoose.model('account', Account);
//# sourceMappingURL=db.js.map