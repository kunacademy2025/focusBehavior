module.exports = ({ env }) => ({
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: "mail.focusbehevior.com",
        port: 587,
        auth: {
          user: process.env.SMTP_USERNAME || env("SMTP_USERNAME"),
          pass: process.env.SMTP_PASSWORD || env("SMTP_PASSWORD"),
        },
        secure: false,
        tls: {
          rejectUnauthorized: false, // Accept self-signed certificates if any (for testing purposes)
        },
      },
      settings: {
        defaultFrom: process.env.SMTP_USERNAME || env("SMTP_USERNAME"),
        defaultReplyTo: process.env.SMTP_USERNAME || env("SMTP_USERNAME"),
      },
    },
  },
  slugify: {
    enabled: true,
    config: {
      contentTypes: {
        event: {
          field: "slug",
          references: "title",
        },
        blog: {
          field: "slug",
          references: "title",
        },
        "event-type": {
          field: "slug",
          references: "title",
        },
        speaker: {
          field: "slug",
          references: "name",
        },
        tag: {
          field: "slug",
          references: "tag",
        },
      },
    },
  },
  // email: {
  //   config: {
  //     provider: "strapi-provider-email-postmark",
  //     providerOptions: {
  //       apiKey: "8753573c-1e77-4d5e-8e8f-472066b25ab6",
  //     },
  //     settings: {
  //       defaultMessageStream: "outbound",
  //       defaultFrom: "dev.khaled.ayouch@gmail.com",
  //     },
  //   },
  // },
  // "fuzzy-search": {
  //   enabled: true,
  //   config: {
  //     contentTypes: [
  //       {
  //         uid: "api::blog.blog",
  //         modelName: "blog",
  //         transliterate: false,
  //         fuzzysortOptions: {
  //           characterLimit: 300,
  //           threshold: -600,
  //           limit: 12,
  //           keys: [
  //             { name: "title", weight: 100 },
  //             { name: "search_keywords", weight: 50 },
  //           ],
  //         },
  //       },
  //       {
  //         uid: "api::event.event",
  //         modelName: "event",
  //         transliterate: false,
  //         fuzzysortOptions: {
  //           characterLimit: 300,
  //           threshold: -600,
  //           limit: 12,
  //           keys: [
  //             { name: "title", weight: 100 },
  //             { name: "search_keywords", weight: 50 },
  //           ],
  //         },
  //       },
  //       {
  //         uid: "api::event-type.event-type",
  //         modelName: "event-type",
  //         transliterate: false,
  //         fuzzysortOptions: {
  //           characterLimit: 300,
  //           threshold: -600,
  //           limit: 12,
  //           keys: [
  //             { name: "title", weight: 100 },
  //             { name: "search_keywords", weight: 50 },
  //           ],
  //         },
  //       },
  //       {
  //         uid: "api::speaker.speaker",
  //         modelName: "speaker",
  //         transliterate: false,
  //         fuzzysortOptions: {
  //           characterLimit: 300,
  //           threshold: -600,
  //           limit: 12,
  //           keys: [
  //             { name: "title", weight: 100 },
  //             { name: "search_keywords", weight: 50 },
  //           ],
  //         },
  //       },
  //     ],
  //   },
  // },
  // "rest-cache": {
  //   config: {
  //     provider: {
  //       name: "memory",
  //       options: {
  //         max: 32767,
  //         maxAge: 3600,
  //       },
  //     },
  //     strategy: {
  //       contentTypes: [
  //         "api::about-page.about-page",
  //         "api::blog.blog",
  //         "api::blog-page.blog-page",
  //         "api::contact.contact",
  //         "api::contact-page.contact-page",
  //         "api::event.event",
  //         "api::event-page.event-page",
  //         "api::event-type.event-type",
  //         "api::faq.faq",
  //         "api::faq-page.faq-page",
  //         "api::home-page.home-page",
  //         "api::privacy-policy.privacy-policy",
  //         "api::session.session",
  //         "api::speaker.speaker",
  //         "api::speaker-page.speaker-page",
  //         "api::sponsor.sponsor",
  //         "api::subscription.subscription",
  //         "api::subscription-page.subscription-page",
  //         "api::social-link.social-link",
  //         "api::tag.tag",
  //         "api::terms-conditions-page.terms-conditions-page",
  //         "api::testimonial.testimonial",
  //         "api::ticket.ticket",
  //         "api::training-schedule.training-schedule",
  //         "api::wishlist.wishlist",
  //       ],
  //     },
  //   },
  // },
});
