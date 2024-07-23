import {Readable} from "node:stream";
import { v2 as cloudinary } from 'cloudinary'

const BASE_PATH = "ecommerce"

export async function uploadImageFromBuffer<T>(buffer: Buffer, path: string){
    return new Promise<T>((resolve, reject) =>{
        const stream = cloudinary.uploader.upload_stream({
            folder: `${BASE_PATH}/${path}`,
            use_filename: true,
        }, (error, result) => {
            if (error){
                reject(error)
            }else {
                // @ts-ignore
                resolve(result)
            }
        })
        const readableStream = new Readable()
        readableStream._read = () => {}
        readableStream.push(buffer)
        readableStream.push(null)
        readableStream.pipe(stream)
    })
}

export async function deleteImageFromCloudinary(publicId: string){
    return cloudinary.uploader.destroy(publicId, (error, result)=>{
        if (error){
            return error
        }else {
            return result
        }
    })
}
