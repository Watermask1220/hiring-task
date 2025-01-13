import { userService } from "../../services";
import { errorHandlerWrapper } from "../../utils";
import { encryptPassword } from "../../utils/encrypt";
import httpStatus from "http-status";

const registerHandler = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await userService.findUserByEmail(email);
    if (existingUser) {
      return res
        .status(httpStatus.CONFLICT)
        .json({ message: "Email is already registered." });
    }

    const hashPassword = await encryptPassword(password);

    const user = await userService.createUser({
      username,
      email,
      password: hashPassword,
    });

    res.status(httpStatus.CREATED).json({ message: "User registered successfully.", user });
  } catch (error) {
    console.error("Error during user registration:", error);

    if (error === "ValidationError") {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "Invalid input data.", details: error });
    }

    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Failed to register user. Please try again later." });
  }
};

export const registerController = errorHandlerWrapper(registerHandler);
