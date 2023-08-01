import jwt from "jsonwebtoken";

interface IGenerateTokenProps {
  userId: any;
  email: string;
  role: string;
}
const generateToken = ({ userId, email, role }: IGenerateTokenProps) => {
  const secret = process.env.JWT_SECRET;
  // 1 min = 60000 milliseconds
  const hour = 3600000;
  // Create and sign the JWT token
  const token = jwt.sign(
    {
      userId,
      email,
      role,
    },
    secret!,
    {
      expiresIn: hour,
    }
  );
  return token;
};
export default generateToken;
