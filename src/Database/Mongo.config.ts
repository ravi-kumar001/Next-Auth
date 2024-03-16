import mongoose from "mongoose";
export function connect() {
  mongoose
    .connect(process.env.MONGO_URL!, { tls: true })
    .then(() => console.log("Connect successfully"))
    .catch((e) => console.log("Can't Connect", e));
}