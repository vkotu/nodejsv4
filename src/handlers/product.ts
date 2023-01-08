import prisma from "../db";

export const createProduct = async (req,res, next) => {
    try {
        const product = await prisma.product.create({
            data: {
                name: req.body.name,
                belongsToId: req.user.id
            }
        })
        res.status(200);
        res.json({data: product})

    }catch (e){
        console.log(e);
        next(e);
    }
};

export const updateProduct = async (req,res) => {
    const id = req.params.id;
    const belongsToId = req.user.id
    console.log(id);
    console.log(belongsToId);
    const update = await prisma.product.update({
        where: {
            id_belongsToId : {
                id,
                belongsToId
            }
        },
        data: {
            name: req.body.name
        }
    })

    res.json({data: update});
};

//Get all

export const getProduct = async (req,res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id
        },
        include: {
            Product: true
        }
    })

    res.json({data: user.Product});
};

//Get one

export const getOneProduct = async (req,res) => {
    const id = req.params.id;
    const product = await prisma.product.findFirst({
        where: {
            id,
            belongsToId: req.user.id
        }
    })

    res.json({data: product});
};

export const deleteProduct = async (req, res) => {
    const id = req.params.id;
    const belongsToId = req.user.id
    const deleted = await prisma.product.delete({
        where: {
            id_belongsToId : {
                id,
                belongsToId
            }
        }
    })

    res.json({data: deleted});
}