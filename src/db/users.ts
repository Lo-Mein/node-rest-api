import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    authentication: {
        password: {type: String, required: true, select: false},
        salt: {type: String, select: false},
        sessionToken: { type: String, select: false },
    },
});

export const UserModel = mongoose.model("User", UserSchema);

export const getUser = () => UserModel.find();
export const getUserByEmail = (email: String) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: String) => UserModel.findOne({ "authentication.sessionToken": sessionToken });
export const getUserById = (id: String) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user: any) => user.toObject());
export const deleteUserById = (id: String) => UserModel.findByIdAndDelete({ _id: id});
export const updateUserById = (id: String, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);
