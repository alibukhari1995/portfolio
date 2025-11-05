import mongoose from "mongoose";

const MONGODB_URI = "mongodb://127.0.0.1:27017/nextcms";

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
