//Lemon squuezy payment checkou url getting
const express = require("express");
const axios = require("axios");
const crypto = require("crypto");
const router = express.Router();

const { createCheckout } = require("lemonsqueezy.ts/checkout");
const { retrieveOrder, listAllOrders } = require("lemonsqueezy.ts/order");
const { getKeys } = require("../../envKeys/allKeys");
// const { retrieveStore, listAllStores } = require("lemonsqueezy.ts/store");
// const { retrieveVariant, listAllVariants } = require("lemonsqueezy.ts/variant");

const keysObjects = getKeys();
const apiKey = keysObjects.lemonApiKey;

const standardPlanName = "Stadard Plan";
const storeId = "18668";
const variantId = "101819";
const productPrice = 4.99;
const redirectUrl = "https://www.collabfortrello.com/add-member";

router.post("/", async (req, res) => {
  const { planName } = req.body;
  const productName = `${planName} Plans`;
  try {
    const newCheckout = await createCheckout({
      apiKey,
      checkout_data: {
        email: "carter@gmail.com",
      },
      custom_price: 100000,
      product_options: {
        description: "Hello World",
        name: productName,
        receipt_button_text: "Buy now",
        receipt_link_url: "https://lemonsqueezy.com",
        receipt_thank_you_note: "Thank you for your purchase",
        redirect_url: redirectUrl,
      },
      store: storeId,
      variant: variantId,
    });

    if (!newCheckout) return console.log("checkout not sucessfull");

    const checkoutUrl = newCheckout.data.attributes.url;
    console.log(checkoutUrl);

    return res.json({ checkoutUrl });
  } catch (error) {
    console.log("An error occurred:", error);
    res.json({ error });
  }
});

// Endpoint to handle incoming webhook events
router.post("/webhooks", (req, res) => {
  const secret = keysObjects.webHookSecret; // Replace with your actual secret
  const signature = Buffer.from(req.get("X-Signature") || "", "utf8");

  // Verify the signature
  const hmac = crypto.createHmac("sha256", secret);
  const digest = Buffer.from(hmac.update(req.rawBody).digest("hex"), "utf8");

  if (!crypto.timingSafeEqual(digest, signature)) {
    // Invalid signature
    return res.status(403).json({ error: "Invalid signature." });
  }

  // Signature is valid, process the webhook event
  const { event, data } = req.body;
  if (event === "order_created") {
    // Handle the successful order payment event
    // You can perform any actions you want here, such as updating your database, sending notifications, etc.
    console.log("Received successful order payment event:", data);
    // Respond with a 200 status to acknowledge receipt of the webhook
    return res.sendStatus(200);
  } else {
    // For other events, respond with a 204 status to indicate that the event is not handled by this endpoint
    return res.sendStatus(204);
  }
});

module.exports = router;
const userIdNow = "idgaabkaj568118nahaha";

// test();
async function test() {
  try {
    const newCheckout = await createCheckout({
      apiKey,
      checkout_data: {
        email: "carter@gmail.com",

        custom: {
          user_id: userIdNow,
        },
      },
      custom_price: productPrice * 100,
      product_options: {
        description: "Hello World",
        name: standardPlanName,
        receipt_button_text: "Buy now",
        receipt_link_url: redirectUrl,
        receipt_thank_you_note: "Thank you for your purchase",
        redirect_url: redirectUrl,
      },
      store: storeId,
      variant: variantId,
    });

    if (!newCheckout) return console.log("checkout not sucessfull");

    const checkoutUrl = newCheckout.data.attributes.url;
    console.log(checkoutUrl);
  } catch (error) {
    console.log("An error occurred:", error);
  }
}

// testOrder();
// async function testOrder() {
//   try {
//     const orders = await listAllOrders({
//       apiKey,
//     });

//     console.log(orders.data);
//     // console.log(orders.data[0].attributes);
//   } catch (error) {
//     console.log("An error occurred:", error);
//   }
// }
// testOrder();
async function testOrder() {
  const orderId = "986456";
  try {
    const order = await retrieveOrder({
      apiKey,
      id: orderId,
    });

    console.log(order);
    console.log(order.data.relationships);
  } catch (error) {
    console.log("An error occurred:", error);
  }
}

const secretsWebhook = "sx#9@Fc6:vzR;d4m";
createWebhooks();
async function createWebhooks() {
  const apiUrl = "https://api.lemonsqueezy.com/v1/webhooks";

  const requestData = {
    data: {
      type: "webhooks",
      attributes: {
        url: "https://www.collabfortrello.com/webhooks/",
        events: ["order_created"],
        secret: secretsWebhook,
      },
      relationships: {
        store: {
          data: {
            type: "stores",
            id: storeId,
          },
        },
      },
    },
  };

  const config = {
    headers: {
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  try {
    const response = await axios.post(apiUrl, requestData, config);
    console.log("Webhook created successfully:", response.data);
  } catch (error) {
    console.error("Error creating webhook:", error);
  }
}

createWebhooks();

const secret = keysObjects.webHookSecret;
const hmac = crypto.createHmac("sha256", secret);
const digest = Buffer.from(hmac.update(request.rawBody).digest("hex"), "utf8");
const signature = Buffer.from(request.get("X-Signature") || "", "utf8");

if (!crypto.timingSafeEqual(digest, signature)) {
  throw new Error("Invalid signature.");
}
