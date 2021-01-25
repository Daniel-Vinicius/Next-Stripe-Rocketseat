/*


// ATENÇÃO ESTE ARQUIVO SÓ É UM EXEMPLO DE COMO CRIAR PRODUTOS, SKUS E PRICES, USANDO A API DO STRIPE, NÃO É PARA SER BUILDADO

import Stripe from "stripe";

import stripeConfig from "../../config/stripe";

const stripe = new Stripe(stripeConfig.secretKey, {
  apiVersion: "2020-08-27",
});

export async function generate(name: string, cost: number) {
  const Product = await generateProduct(name);
  const SKU = await generateSKU(Product, cost);
  const Price = await generatePrice(Product, cost);

  return console.log(Product, SKU, Price);
}

async function generateProduct(name: string) {
  const product = await stripe.products.create({
    name: name,
    type: "good",
    attributes: ["name", "marca", "material", "edicao", "cor"],
  });

  return product;
}

async function generateSKU(product: Stripe.Product, cost) {
  const sku = await stripe.skus.create({
    currency: "brl",
    inventory: { type: "infinite" },
    price: cost,
    product: product.id,
    attributes: {
      name: product.name,
      marca: "Rolex",
      material: "Ouro",
      edicao: "2060",
      cor: "Dourado",
    },
  });

  return sku;
}

async function generatePrice(product: Stripe.Product, cost) {
  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: cost / 5,
    currency: "usd",
  });

  return price;
}

*/