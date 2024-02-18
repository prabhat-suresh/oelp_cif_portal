import  mongoose from "mongoose";
const mongoDBURI="mongodb+srv://oelp:<password>@cluster0.rypu0hh.mongodb.net/?retryWrites=true&w=majority"
export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB has been connected successfully');
        })

        connection.on('error', (err) => {
            console.log('Something went wrong, please check MongoDB' + err);
            process.exit();
        })
    } catch (error){
        console.log('Something went wrong!');
        console.log(error);
    }

}