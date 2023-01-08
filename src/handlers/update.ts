import prisma from "../db";

export const getOneUpdate = async (req,res) => {
    const update = await prisma.update.findUnique({
        where: {
            id: req.params.id
        }
    })
    res.status(200);
    res.json({data: update})
};

export const getUpdates = async (req,res) => {
        const product = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    })
    const updates = product.reduce((allUpdate, product) => {
        return [...allUpdate, ...product.updates]
    }, [])
    res.status(200);
    res.json({data: updates})
};

//Get all

export const createUpdate = async (req,res) => {
    const product = await prisma.product.findUnique({
        where: {
            id: req.body.productId
        }
    });

    if(!product) {
        return res.json({"message": "Nope"});
    }

    const update = await prisma.update.create({
        data: {
            title: req.body.title,
            body: req.body.body,
            product: {connect: {id: product.id}}
        }
    })

    res.json({data: update});
};

//Get one

export const deleteUpdate = async (req,res) => {
    const product = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id,
        },
        include: {
            updates: true
        }
    })
    const updates = product.reduce((allUpdate, product) => {
        return [...allUpdate, ...product.updates]
    }, [])
    const match = updates.find(update => update.id === req.params.id);
    if(!match) {
         return res.json({"message": "Nope"});
    }


    const deletedUpdate = await prisma.update.delete({
        where: {
            id: req.params.id
        }
    })
    return res.json({data: deletedUpdate})
};

export const updateUpdate = async (req, res) => {
    const product = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id,
        },
        include: {
            updates: true
        }
    })
    const updates = product.reduce((allUpdate, product) => {
        return [...allUpdate, ...product.updates]
    }, [])
    const match = updates.find(update => update.id === req.params.id);
    if(!match) {
         return res.json({"message": "Nope"});
    }


    const updatedUpdate = await prisma.update.update({
        where: {
            id: req.params.id
        },
        data: req.body
    })
    return res.json({data: updatedUpdate})
}