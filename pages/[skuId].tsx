import React from "react";
import Stripe from "stripe";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";

import stripeConfig from "../config/stripe";
import CheckoutButton from "../components/CheckoutButton";

interface Props {
  sku: Stripe.Sku;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const stripe = new Stripe(stripeConfig.secretKey, {
    apiVersion: "2020-08-27",
  });

  const skus = await stripe.skus.list();

  // console.log(skus.data);

  const paths = skus.data.map((sku) => ({
    params: {
      skuId: sku.id,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const stripe = new Stripe(stripeConfig.secretKey, {
    apiVersion: "2020-08-27",
  });

  const { skuId } = params;

  const sku = await stripe.skus.retrieve(skuId as string);

  return {
    props: {
      sku,
    },
  };
};

const Product: React.FC<Props> = ({ sku }) => {
  return (
    <div>
      {sku.image && (
        <img
          src={sku.image}
          style={{
            width: "100px",
          }}
        />
      )}

      <h2>
        {Number(sku.price / 100).toFixed(2)} {sku.currency.toUpperCase()}
      </h2>

      <CheckoutButton
        skuId={sku.id}
        itemName={sku.attributes.name}
      ></CheckoutButton>

      <h3>Atributos</h3>

      <ul>
        <ul>
          {sku.attributes.tamanho && <li>{sku.attributes.tamanho}</li>}
          {sku.attributes.cor && <li>{sku.attributes.cor}</li>}
          {sku.attributes.genero && <li>{sku.attributes.genero}</li>}
          {sku.attributes.material && <li>{sku.attributes.material}</li>}
        </ul>
      </ul>

      <Link href="/">Voltar</Link>
    </div>
  );
};

export default Product;
