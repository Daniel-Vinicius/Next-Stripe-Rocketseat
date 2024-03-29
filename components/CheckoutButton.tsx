import React from "react";

import { loadStripe } from "@stripe/stripe-js";

import stripeConfig from "../config/stripe";

const stripePromise = loadStripe(stripeConfig.publicKey);

interface Props {
  skuId: string;
  itemName: string;
}

const CheckoutButton: React.FC<Props> = ({ skuId, itemName }) => {
  async function handleClick() {
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: skuId,
          quantity: 1,
        },
      ],
      mode: "payment",
      // // Para Rodar Localmente:
      // successUrl: `http://localhost:3000/success?itemName=${itemName}`,
      // cancelUrl: "http://localhost:3000/cancel",
      // Para Meu Deploy
      successUrl: `https://next-stripe-rocketseat.vercel.app/success?itemName=${itemName}`,
      cancelUrl: "https://next-stripe-rocketseat.vercel.app/cancel",
    });

    if (error) {
      console.log(error);
    }
  }
  return (
    <button
      role="link"
      onClick={handleClick}
      id="checkout-button-sku_IodVcKIM7GtB73"
    >
      Comprar
    </button>
  );
};

export default CheckoutButton;
