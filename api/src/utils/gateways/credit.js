const NP = require("number-precision");
const axios = require("axios");
const moment = require("moment");
const querystring = require("querystring");

const IS_LIVE = false;

const TEST_BASE_URL = "https://api-gateway.sandbox.ngenius-payments.com";
const LIVE_BASE_URL = "https://api-gateway.sandbox.ngenius-payments.com";

const TEST_OUTLET_ID = "36520337-af7d-45c7-a233-c21ee25d3ac2";
const LIVE_OUTLET_ID = "36520337-af7d-45c7-a233-c21ee25d3ac2";

const TEST_API_KEY =
  "OGU4YmI2MDktZDc4Mi00YjJmLThiOTYtZTA0OGU4ZmNjODM3OjljNGEyZGY4LTdiMmEtNGI0Zi05NzUwLWI0OWQxNjAzN2U1NA==";
const LIVE_API_KEY =
  "OGU4YmI2MDktZDc4Mi00YjJmLThiOTYtZTA0OGU4ZmNjODM3OjljNGEyZGY4LTdiMmEtNGI0Zi05NzUwLWI0OWQxNjAzN2U1NA==";

const BASE_URL = IS_LIVE ? LIVE_BASE_URL : TEST_BASE_URL;
const OUTLET_ID = IS_LIVE ? LIVE_OUTLET_ID : TEST_OUTLET_ID;
const API_KEY = IS_LIVE ? LIVE_API_KEY : TEST_API_KEY;

async function createPaymentLink(order) {
  const { payment_link, order_code, total, currencyCode, email } = order;

  // console.log("Order: ", order);

  // const item = getItem(order);

  let ret = null;
  let errorMessage = "";
  let session = null;

  let data = {
    action: "SALE",
    amount: {
      currencyCode: currencyCode,
      value: total * 100,
    },
    emailAddress: email,
    merchantAttributes: {
      redirectUrl: payment_link,
      cancelUrl: payment_link,
    },
    merchantOrderReference: order_code,
    language: "en",
  };

  const access_token = await __getAccessToken();

  try {
    session = await axios.post(
      `${BASE_URL}/transactions/outlets/${OUTLET_ID}/orders`,
      data,
      {
        headers: {
          "Content-Type": "application/vnd.ni-payment.v2+json",
          Accept: "application/vnd.ni-payment.v2+json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
  } catch (ex) {
    console.error("Error occurred: ", ex?.response?.data || ex.message);
    errorMessage =
      ex?.response?.data?.message || ex.message || "An error occurred";
  }
  ret = {
    request_url: `${BASE_URL}/transactions/outlets/${OUTLET_ID}/orders`,
    request_body: JSON.stringify(data),
    gateways: [],
  };

  if (
    session &&
    (session?.status === 201 || session?.status === 200) &&
    session?.data?._id
  ) {
    const links = session?.data?._links;
    let pay_link = "";

    // Access the 'payment' link directly from the object
    if (links && links.payment?.href) {
      pay_link = links.payment.href;
    }

    ret = {
      ...ret,
      response_body: JSON.stringify(session?.data),
      remote_pay_link: pay_link,
      reference_id: session?.data?.reference.toString(),
      success: true,
      payment_lnk_created: pay_link ? "true" : "false",
      pay_link_msg: "",
    };
  } else {
    ret = {
      ...ret,
      response_body: JSON.stringify(session),
      remote_pay_link: "",
      reference_id: "",
      success: false,
      payment_lnk_created: "false",
      pay_link_msg: errorMessage || "Couldn't create a payment link!",
    };
  }
  return ret;
}

async function checkPaymentStatus(order) {
  const { reference_id } = order;

  let session = {};
  let errorMessage = "";

  const access_token = await __getAccessToken();

  try {
    session = await axios.get(
      `${BASE_URL}/transactions/outlets/${OUTLET_ID}/orders/${reference_id}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
  } catch (ex) {
    console.error("Error occurred: ", ex?.response?.data || ex.message);
    errorMessage =
      ex?.response?.data?.message || ex.message || "An error occurred";
  }

  console.log("session", session?.data?._embedded?.payment?.[0]?.state);
  console.log("session?.status", session?.status);
  console.log("session?.data?.id", session?.data?.id);

  let ret = {
    request_url: `${BASE_URL}/transactions/outlets/${OUTLET_ID}/orders/${reference_id}`,
    request_body: reference_id,
  };

  if (session && (session?.status === 201 || session?.status === 200)) {
    const paymentState =
      session?.data?._embedded?.payment?.[0]?.state ?? "FAILED";

    console.log("paymentState", paymentState);

    ret = {
      ...ret,
      response_body: JSON.stringify(session?.data),
      success: true,
      error_message: "",
      newStatus: mapStatus(paymentState),
    };
  } else {
    ret = {
      ...ret,
      response_body: JSON.stringify(session?.data),
      remote_pay_link: "",
      reference_id: "",
      success: false,
      error_message: errorMessage,
      newStatus: "Error",
    };
  }

  return ret;
}

async function __generateAccessToken() {
  try {
    const resp = await axios.post(
      `${BASE_URL}/identity/auth/access-token`,
      {},
      {
        headers: {
          Authorization: `basic ${API_KEY}`,
          Accept: "application/vnd.ni-identity.v1+json",
          "Content-Type": "application/vnd.ni-identity.v1+json",
        },
      }
    );

    if (resp?.status === 200)
      return {
        success: true,
        access_token: resp?.data?.access_token,
        expires: resp?.data?.expires_in,
      };
    else console.error(resp);
  } catch (ex) {
    console.error(ex);
  }
  return { success: false, access_token: "", expires: 0 };
}

async function __getAccessToken() {
  let access_token = "";

  if (!access_token) {
    const resp = await __generateAccessToken();

    if (resp.success) {
      access_token = resp.access_token;
    }
  }
  return access_token;
}

const mapStatus = (gatewayStatus) => {
  switch (gatewayStatus) {
    case "CAPTURED":
      return "Paid";
    case "PURCHASED":
      return "Paid";
    case "FAILED":
      return "Error";
    case "EXPIRED":
      return "Error";
    case "CANCELLED":
      return "Cancelled";
    case "REFUNDED":
      return "Error";
    case "INITIATED":
      return "Pending";
    default:
      return "Error";
  }
};

module.exports = {
  createPaymentLink,
  checkPaymentStatus,
};

// const getItem = (order) => {
//   if (order?.event_booking?.id)
//     return {
//       title: order?.event_booking?.title,
//       quantity: 1,
//       unit_price: NP.round(order?.event_booking?.price, 2).toString(),
//       id: order?.course?.id,
//     };
// };

const safeStringify = (obj) => {
  const cache = new Set();
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (cache.has(value)) {
        // Circular reference found, discard key
        return;
      }
      // Store value in the cache
      cache.add(value);
    }
    return value;
  });
};
