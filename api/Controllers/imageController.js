import grid from 'gridfs-stream'
import mongoose from 'mongoose'

const url = 'http://localhost:8000';

let gfs, gridfsBucket;

const conn = mongoose.connection;
conn.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'fs'
    });
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('fs');
});


export const uploadImage = (req, res) => {
    if(!req.file)
        {
            return res.status(404).json("file not found");
            
        }
    const imageUrl = `${url}/file/${request.file.filename}`;

    res.status(200).json(imageUrl);

}

export const getImage = async(req, res)=> {
    try {
        const file = await gfs.files.findOne({filename: req.params.filename})
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(res)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}