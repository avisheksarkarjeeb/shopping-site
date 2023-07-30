const product = require("../models/product");
const { param } = require("../routes/productRoutes");
exports.createProduct = async(req, res) =>{
    try{
        const{ title, description, price, imgUrl } = req.body;
        let newProduct = new product({
            title,
            description,
            price,
            imgUrl,
   
        });
        newProduct = await newProduct.save();
        res.status(201).json(newProduct);
    }
    catch(e)
    {
        res.status(500).json({error: e.message});
    }
};
exports.products = async(req, res) =>{
    try{
        const products = await product.find({});
        res.json(products);

    } catch{ 
        res.status(500).json({error: e.message});

    }
};
exports.Product = async(req, res) => {
    try{
        const Product = await product.findById(req.params.id);
        if(!Product) {
            res.json({message:"product does not found:"});
            return
        }
        res.json(Product);

    } catch(e){
        res.status(500).json({error: e.message});

    }
};
exports.updateProduct = async(req, res) =>{
    try{
        const{ title, description, price, imgUrl } = req.body;
        let updatedProduct = new product({
            title,
            description,
            price,
            imgUrl,
            _id:req.params.id

        });
        updatedProduct = await product.findByIdAndUpdate(req.params.id, updatedProduct);
        res.json({message: `product with id ${req.params.id}updated successfully`});
    }
    catch(e)
    {
        res.status(500).json({error: e.message});
    }
};
exports.deleteproduct = async(req, res) => {
    try{

    
    const deleteproduct = await product.findByIdAndRemove(req.params.id);
    res.json({message: `product with id ${req.params.id}deleted successfully`});
    }catch{
        res.status(500).json({error: e.message});
    }
}

