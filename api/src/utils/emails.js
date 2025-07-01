const EMAIL_TEMPLATES = {
  PAYMENT_ERROR: "focus_behavior-payment-error",
  PAYMENT_SUCCESS: "focus_behavior-payment-success",
  PAYMENT_CANCELLED: "focus_behavior-payment-cancelled",
  THANK_YOU: "focus_behavior-thank-you",
};

const EMAIL_SUBJECTS = {
  PAYMENT_ERROR: "An error occured while processing a payment!",
  PAYMENT_SUCCESS: "A new payment has been processed successfully!",
  CONTACT: "New contact request from website!",
};

const EMAIL_TEXTS = {
  PAYMENT_ERROR: (order_number) =>
    `An error occured while processing payment #${order_number} on the website.`,
  PAYMENT_SUCCESS: (order_number) =>
    `Payment #${order_number} has been processed successfully on the website.`,
  CONTACT:
    "New contact request has been received from website with the following information.",
};

const EMAIL_BODIES = {
  PAYMENT_ERROR: (total, id, order_code, errorText) => `
                Dear Admin,<br /><br />
                An error occurred while paying a total of AED ${total} on <strong>Focus Behavior</strong>. To view order details please click on the link below:<br /><br />
                <div><a href="https://backend.focusbehevior.com/admin/content-manager/collectionType/api::payment.payment/${id}" target="_blank">View Payment #${order_code}</a></div><br />
                <div>Error Occurred: ${errorText}</div><br /><br />
                <small>Please note that you can contact the sender by replying to this email.</small>`,
  PAYMENT_SUCCESS: (total, id, order_code) => `Dear Admin,<br /><br />
                A new payment of total ${total} on <strong>Focus Behavior</strong> has been processed successfully. To view order details please click on the link below:<br /><br />
                <div><a href="https://backend.focusbehevior.com/admin/content-manager/collectionType/api::payment.payment/${id}" target="_blank">View Payment #${order_code}</a></div><br /><br />
                <div><b>Amount Paid:</b>&nbsp;${total}</div><br /><br />
                <small>Please note that you can contact the sender by replying to this email.</small>`,
  CONTACT: (
    first_name,
    last_name,
    email,
    phone_number,
    message,
    id
  ) => `Dear Admin,<br /><br />
                You have received a new contact request from the website with the following information:<br /><br />
                <strong>Full Name:</strong>&nbsp;${first_name} ${last_name}<br />
                <strong>Email:</strong>&nbsp;${email}<br />
                <strong>Phone Number:</strong>&nbsp;${phone_number}<br />
                <strong>Message:</strong>&nbsp;${message}<br />
                <p>For more details, <a href="https://backend.focusbehevior.com/admin/content-manager/collectionType/api::contact-request.contact-request/${id}" target="_blank">click here</a><br />
                <small>Please note that you can contact the sender by replying to this email.</small>`,
};

const TAG_NAME = "FocusBehavior";
const RECEIVER_EMAIL = "training@focus_behavior.ae";
const PRODUCT_NAME = "FocusBehavior";

const EMAILS = {
  async sendPaymentError(id) {
    const payment = await strapi.entityService.findOne(
      "api::payment.payment",
      id
    );
    if (payment.id === id) {
      const { first_name, last_name, email, order_code, total, response_text } =
        payment;
      //send to admin
      try {
        await strapi.plugins.email.services.email.send({
          to: RECEIVER_EMAIL,
          replyTo: email,
          subject: EMAIL_SUBJECTS.PAYMENT_ERROR,
          text: EMAIL_TEXTS.PAYMENT_ERROR(order_code),
          html: EMAIL_BODIES.PAYMENT_ERROR(
            total,
            id,
            order_code,
            response_text
          ),
          tag: TAG_NAME,
        });
      } catch (ex) {
        console.error(ex);
      }
      //send to member
      try {
        await strapi.plugins.email.services.email.send({
          to: `${first_name} ${last_name} <${email}>`,
          replyTo: email,
          templateAlias: EMAIL_TEMPLATES.PAYMENT_ERROR,
          variables: {
            name: `${first_name} ${last_name}`,
            year: new Date().getFullYear(),
            value: total,
            product_name: PRODUCT_NAME,
          },
          tag: TAG_NAME,
        });
      } catch (ex) {
        console.error(ex);
      }
    }
  },
  async sendPaymentSuccess(id) {
    const payment = await strapi.entityService.findOne(
      "api::payment.payment",
      id
    );
    if (payment.id === id) {
      const { first_name, last_name, email, order_code, total } = payment;
      //send to admin
      try {
        await strapi.plugins.email.services.email.send({
          to: RECEIVER_EMAIL,
          replyTo: email,
          subject: EMAIL_SUBJECTS.PAYMENT_SUCCESS,
          text: EMAIL_TEXTS.PAYMENT_SUCCESS(order_code),
          html: EMAIL_BODIES.PAYMENT_SUCCESS(total, id, order_code),
          tag: TAG_NAME,
        });
      } catch (ex) {
        console.error(ex);
      }
      //send to member
      try {
        await strapi.plugins.email.services.email.send({
          to: `${first_name} ${last_name} <${email}>`,
          replyTo: email,
          templateAlias: EMAIL_TEMPLATES.PAYMENT_SUCCESS,
          variables: {
            name: `${first_name} ${last_name}`,
            year: new Date().getFullYear(),
            value: total,
            product_name: PRODUCT_NAME,
          },
          tag: TAG_NAME,
        });
      } catch (ex) {
        console.error(ex);
      }
    }
  },
  async sendPaymentCanceled(id) {
    const payment = await strapi.entityService.findOne(
      "api::payment.payment",
      id
    );
    if (payment.id === id) {
      const { first_name, last_name, email, total } = payment;
      //send to member
      try {
        await strapi.plugins.email.services.email.send({
          to: `${first_name} ${last_name} <${email}>`,
          replyTo: email,
          templateAlias: EMAIL_TEMPLATES.PAYMENT_CANCELLED,
          variables: {
            name: `${first_name} ${last_name}`,
            year: new Date().getFullYear(),
            value: total,
            product_name: PRODUCT_NAME,
          },
          tag: TAG_NAME,
        });
      } catch (ex) {
        console.error(ex);
      }
    }
  },
  async sendContact(id) {
    const contact = await strapi.entityService.findOne(
      "api::contact.contact",
      id
    );
    if (contact.id === id) {
      const { first_name, last_name, email, phone_number, message } = contact;
      //send to admin
      try {
        await strapi.plugins.email.services.email.send({
          to: RECEIVER_EMAIL,
          replyTo: email,
          subject: EMAIL_SUBJECTS.CONTACT,
          text: EMAIL_TEXTS.CONTACT,
          html: EMAIL_BODIES.CONTACT(
            first_name,
            last_name,
            email,
            phone_number,
            message,
            id
          ),
          tag: TAG_NAME,
        });
      } catch (ex) {
        console.error(ex);
      }
      //send to member
      try {
        await strapi.plugins.email.services.email.send({
          to: `${first_name} ${last_name} <${email}>`,
          replyTo: email,
          templateAlias: EMAIL_TEMPLATES.THANK_YOU,
          variables: {
            name: `${first_name} ${last_name}`,
            year: new Date().getFullYear(),
            product_name: PRODUCT_NAME,
          },
          tag: TAG_NAME,
        });
      } catch (ex) {
        console.error(ex);
      }
    }
  },
};

module.exports = { EMAILS };
