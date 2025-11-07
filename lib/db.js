import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://<dawar>:<dawar>@cluster0.7b9t5dx.mongodb.net/nextcms";

if (!global._mongooseConnection) {
  global._mongooseConnection = mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export default async function dbConnect() {
  await global._mongooseConnection;
  console.log("✅ MongoDB connected");
}
