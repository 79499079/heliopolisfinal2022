import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    marca: { type: String, required: true },
    contenido: { type: String, required: true },
    sabor1: { type: String },
    sabor2: { type: String },
    sabor3: { type: String },
    sabor4: { type: String },
    categoria: { type: String, required: true },
    servicio: { type: String, required: true },
    descripcion: { type: String, required: true },
    preciocompra: { type: Number, required: true },
    precioventa: { type: Number, required: true },
    cantidad: { type: Number, required: true },
    proveedor: { type: String, required: true },
    promocion: { type: String, default: "ninguno", required: true },
    tipopromocion: { type: String },
    descuento: { type: Number, default: 0 },
    imagen: { type: String, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
