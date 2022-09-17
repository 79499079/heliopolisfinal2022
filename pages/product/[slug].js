import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import Layout from "../../components/Layout";
import Product from "../../models/Product";
import db from "../../utils/db";
import { Store } from "../../utils/Store";

export default function ProductScreen(props) {
  const { product } = props;
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  if (!product) {
    return <div>Producto no existe</div>;
  }
  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    /*  const { data } = await axios.get(`/api/products/${product._id}`); */

    /* if (data.countInStock < quantity) {
      return toast.error("Sorry. Product is out of stock");
    }  */

    if (product.countInStock < quantity) {
      alert("Upsss. Producto agotado");
      return;
    }

    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    router.push("/cart");
  };

  const myLoader = ({ src }) => {
    return `https://res.cloudinary.com/ultranatural/image/upload/${src}}`;
  };

  return (
    <Layout title={product.nombre}>
      <div className="py-2">
        <Link href="/">Regresar a Productos</Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={myLoader}
            alt={product.nombre}
            width={640}
            height={640}
            layout="responsive"
          />
        </div>
        <div>
          <ul>
            <li>
              <h1 className="text-lg">{product.nombre}</h1>
            </li>
            <li>Categoria: {product.categoria}</li>
            <li>Proveedor: {product.proveedor}</li>
            <li>
              {product.rating} of {product.numReviews} reviews
            </li>
            <li>Descripcion: {product.descripcion}</li>
          </ul>
        </div>
        <div>
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              <div>Precio</div>
              <div>${product.precioventa}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>Status</div>
              <div>{product.cantidad > 0 ? "In stock" : "Unavailable"}</div>
            </div>
            <button
              className="primary-button w-full"
              onClick={addToCartHandler}
            >
              Adiciona carrito
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}
