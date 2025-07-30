import  Jwt  from "jsonwebtoken";

export function authorizeToken(req, res, next) {
    //1 extract token from headers
    console.log(req.headers.authorization);
    const authHeader = req.headers.authorization;
    
      //2. check if token is available
      if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({ message: "token not provided" });
      }
      //3, split the token to get the role
      const token = authHeader.split(" ")[1]; //get the token from the header

      try {
          //4.verify token
            const decoded = Jwt.verify(token, process.env.JWT_SECRET);
          
          //5.if unverified ,send error response
          const {userType} = decoded;
            // if((!userType == "admin")|| (!userType == "manager")){
            //     return res.status(400).json({ message: "access denied" });
            // }or
            if (userType.toLower()== "employee") {
                return res.status(403).json({ message: "Access denied for employees" });
            }

            next(); //if verified, call next middleware or route handler
          //6.if verified, check if role is admin or not
        
      } catch (error) {
            console.error("Error while authorizing token:", error);
            return res.status(401).json({ message: "Invalid token" });
        
      }
       
}