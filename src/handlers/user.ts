import prisma from "../db";
import { createJWT, hashPassword, comparePasswords } from "../modules/auth";

export const createNewUser = async(req, res) => {
    try {
        const user = await prisma.user.create({
            data: {
                username: req.body.username,
                password: await hashPassword(req.body.password) 
            }
        });

        const token = createJWT(user);
        res.json({token});
    }catch(e){
        console.log(e);
        res.status(404);
        res.json({message: 'username already exists'});
        return;
    }

}

export const signin = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            username: req.body.username
        }
    });
    const isValid = await comparePasswords(req.body.password, user.password);
    if(!isValid){
        res.status(401);
        res.json({message: 'not authorized'});
        return;
    }else{
        res.status(200);
        res.json({token: createJWT(user)});
        return;
    }
}
