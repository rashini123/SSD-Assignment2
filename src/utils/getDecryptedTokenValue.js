import jwt from "jsonwebtoken";

const getDecryptedTokenValue = (receivedToken) => {
  try {
    const decodedToken = jwt.verify(receivedToken, process.env.JWT_SECRET);
    return decodedToken;
  } catch (error) {
    console.log("Not Valid Token!(getDecryptedTokenValue) ");
    return null;
  }
};

export default getDecryptedTokenValue;
