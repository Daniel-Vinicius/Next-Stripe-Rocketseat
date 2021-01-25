import React from "react";
import Stripe from "stripe";
import { GetStaticProps } from "next";
import Link from "next/link";

import stripeConfig from "../config/stripe";

interface Props {
  skus: Stripe.Sku[];
}

export const getStaticProps: GetStaticProps = async () => {
  const stripe = new Stripe(stripeConfig.secretKey, {
    apiVersion: "2020-08-27",
  });

  const skus = await stripe.skus.list();

  return {
    props: {
      skus: skus.data,
    },
  };
};

const HomePage: React.FC<Props> = ({ skus }) => {
  return (
    <>
      <h1>Simple Store Stripe</h1>

      {skus.map((sku) => (
        <div key={sku.id}>
          <h1>{sku.attributes.name}</h1>

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

          <h3>Atributos</h3>

          <ul>
            {sku.attributes.tamanho && <li>{sku.attributes.tamanho}</li>}
            {sku.attributes.cor && <li>{sku.attributes.cor}</li>}
            {sku.attributes.genero && <li>{sku.attributes.genero}</li>}
            {sku.attributes.material && <li>{sku.attributes.material}</li>}
          </ul>

          <Link href={`/${sku.id}`}>Saiba Mais</Link>

          <hr />
        </div>
      ))}
    </>
  );
};

export default HomePage;
