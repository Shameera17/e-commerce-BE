import jwt from "jsonwebtoken";

interface IGenerateTokenProps {
  userId: any;
  email: string;
}
const generateToken = ({ userId, email }: IGenerateTokenProps) => {
  const secret = process.env.JWT_SECRET;
  // Create and sign the JWT token
  const token = jwt.sign(
    {
      userId,
      email,
    },
    secret!,
    {
      expiresIn: "1h",
    }
  );
  return token;
};

export default generateToken;
