import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    neam:{
        type: String,
        required: true
    }
});


const Catgeory = mongoose.model('Category', categorySchema)

export default Category