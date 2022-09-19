import Link from "next/link";
import React from "react";

export default function ProductItem({ product, addToCartHandler }) {
  return (
    <div className="card">
      <Link href={`/product/${product.slug}`}>
        <a>
          <img
            src={product.imagen}
            alt={product.nombre}
            className="rounded shadow"
          />
        </a>
      </Link>
      <div className="flex flex-col items-center justify-center  p-5">
        <Link href={`/product/${product.slug}`}>
          <a>
            <h2 className="text-lg">{product.nombre}</h2>
          </a>
        </Link>
        <p className="mb-2">{product.categoria}</p>
        <p>${new Intl.NumberFormat("de-DE").format(product.precioventa)}</p>
        <button
          className="primary-button"
          type="button"
          onClick={() => addToCartHandler(product)}
        >
          Adicionar carrito
        </button>
      </div>
    </div>
  );
}
