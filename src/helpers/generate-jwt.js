import jwt from "jsonwebtoken";

export const generateJWT = (uid = " ") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    console.log("🔐 SECRET_KEY:", process.env.SECRET_KEY);

    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      {
        expiresIn: "24h"
      },
      (err, token) => {
        if (err) {
          reject({
            success: false,
            message: "No se pudo renerar el TOKEN"
          });
        } else {
          resolve(token);
        }
      }
    );
  });
};
