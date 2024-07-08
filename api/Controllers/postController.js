import Post from "../model/post.js";

export const createPost = async(req, res) => {
    try {
        const post = await new Post (req.body)
        post.save();
        res.status(200).json("post saved successfully")
    } catch (error) {
        res.status(500).json(error)
    }
}

export const updatePost =async(req, res) =>{
    try {
        const {id} = req.params
        const post = await Post.findById(id)

        if(!post){
            res.status(404).json({message: "post not found"})
        }

        await Post.findByIdAndUpdate(id, {$set: req.body})
        res.status(200).json({message: "post updated successfully"})
    } catch (error) {
        res.status(500).json(error)
        
    }
}

export const deletePost = async (req, res) => {
    try {
        const {id} = req.params
        const post = await Post.findById(id)
        await post.delete()

        return res.status(200).json({message: "post deleted successfully"})

    } catch (error) {
        res.status(500).json(error)
    }
}

export const getPost = async(req, res) => {
    try {
        const {id} = req.params
        const post = await Post.findById(id)
        
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
}


export const getAllPosts = async(req, res) => {
    let username = req.query.username;
    let category = req.query.categroy;

    let posts;

    try {
        if(username)
            posts= await Post.find({username: username});
        else if(category)
            posts = await Post.find({category: category});
        else
            posts = await Post.find({});
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
}