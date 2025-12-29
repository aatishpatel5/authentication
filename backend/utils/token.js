import jwt from "jsonwebtoken"


const tokenGenrate = async (userId) => {
    try {
      const token = await jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn:"7d"})
        return token
    } catch (error) {
        console.log(" errro in token gerate:",error)
    }
}

export default tokenGenrate