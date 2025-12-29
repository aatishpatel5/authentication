import User from "../models/userModel.js";


export const getCurrentUser = async (req,res) => { 
    try { 
        console.log("error 1 in getCurrentUser user.Controllers")
        const userId = req.userId;
                console.log("error 2 in getCurrentUser user.Controllers")

        if(!userId){
            return res.status(400).json({message:"UserId is not found"})
        }

                console.log("error 3 in getCurrentUser user.Controllers")


        const user = await User.findById(userId);
                console.log("error 4 in getCurrentUser user.Controllers")


        if(!user){
            return res.status(400).json({message:"User is not found"})
        } 
                console.log("error 5 in getCurrentUser user.Controllers")

console.log(user)
        return res.status(200).json(user);

    } catch (error) {
                console.log("error 6 in getCurrentUser user.Controllers")

        return res.status(500).json(`getCurrentUser error ${error}`)
    }
}