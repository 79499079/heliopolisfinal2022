import mongoose from "mongoose";

const connection = {};

async function connect() {
  if (connection.isConnect) {
    console.log("DB está conectado");
    return;
  }
  if (mongoose.connection.length > 0) {
    connection.isConnect = mongoose.connection[0].readyState;
    if (connection.isConnect === 1) {
      console.log("uso de la conexión anterior");
      return;
    }
    await mongoose.disconnect();
  }
  const db = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Nueva conexion");
  connection.isConnect = db.connections[0].readyState;
}

async function disconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === "production") {
      await mongoose.disconnect();
      connection.isConnect = false;
    } else {
      console.log("no se ha desconectado");
    }
  }
}

/* function convertDocToObj(doc) {
  doc._id = doc._id.toString();
  doc.createdAt = doc.createdAt.toString();
  doc.updatedAt = doc.updatedAt.toString();
  return doc;
} */

const db = { connect, disconnect /*, convertDocToObj */ };

export default db;
