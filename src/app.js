const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/product_model')


mongoose.connect(process.env.DB_URL)
const db = mongoose.connection
const app = express()
const port = process.env.PORT 

db.on('error', (err) => {
    console.error(err)
})

db.on('open', ()=> {
    console.log('Connected to database')
})

app.use(express.json())

app.get('/api/products', async (req, res) => {
   try {
        const products = await Product.find()
        res.set('Access-Control-Allow-Origin', '*');
        res.json(products)
   } catch (err) { 
        res.status(500).json({message: err.message})
   }
})

app.get('api/products/:id', getProductMiddleware, async(req, res)=>{
    res.set('Access-Control-Allow-Origin', '*');
    res.json(res.product)
})

app.post('/api/products', async(req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const product = new Product({
        name: req.body.name,
        img: req.body.img,
        img_alt: req.body.img_alt,
        description: req.body.description,
        price: req.body.price,
        price_old: req.body.price_old,
        currency: req.body.currency,
        discounted: req.body.discounted,
        rating: req.body.rating,
        category: req.body.category
    })

    try {
        const newProduct = await product.save()
        res.status(201).json(newProduct)
    } catch (err) {
        res.status(400).json({message: err.message})
    }

})

// TODO patch request handling

app.delete('/api/products/:id', getProductMiddleware, async(req,res) => {
    try {
        await res.product.deleteOne()
        res.set('Access-Control-Allow-Origin', '*');
        res.json({message: 'Deleted product'})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

async function getProductMiddleware (req, res, next) {
    let product
    try { 
        product = await Product.findById(req.params.id)
        if(product === null){
            return res.status(404).json(
                {message: 'Unable to find machine with id ' + req.params.id}
            )
        }
    }catch (err) {
        return res.status(500).json({message: err.message})
    }

    res.product = product
    next()
}

app.listen(port, () => {
    console.log('Server up on port: ' + port)
})