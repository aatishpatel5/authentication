import jwt from "jsonwebtoken";
 
const isAuth = async (req, res, next) => {
  try {
  console.log("error check 1 in isAuth")
    const token = req.cookies.token;
      console.log("error check 2 in isAuth")

    if (!token) { 
        console.log("error check 3 in isAuth")

      return res.status(401).json({ message: "token not found" });
    } 
      console.log("error check 4 in isAuth")

    const decodeToken =  jwt.verify(token, process.env.JWT_SECRET);
    // console.log(`error 1 checking in middleware isAuth`, decodeToken)
   console.log("error check 5 in isAuth")

    if (!decodeToken) { 
      return res.status(401).json({ message: "token not verify" });
    } 
  console.log("error check 6 in isAuth")

    req.userId = decodeToken.userId;
      console.log("error check 7 in isAuth")

    next();
      console.log("error check 8 in isAuth")

  } catch (error) {
    return res.status(500).json(`isAuth error ${error}`);   
  }
};
 
export default isAuth;
