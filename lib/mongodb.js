import MongoDB from 'mongodb';



let client = null;

export const connectDB = async(constr)=>{
    try {
        client = new MongoDB.MongoClient(constr,{maxPoolSize:50});
        const db = (await client.connect()).db(process.env.DB_NAME);
        return db;
    } catch (error) {
         console.error(error)
    }
  
}

export const closeDB = async()=>{
    try {
        await client.close();
        client = null;
    } catch (error) {
        console.error(error)
    }
  
}