import imgUrl1 from "@/assets/images/Events/01.webp";
import imgUrl2 from "@/assets/images/Events/02.webp";
import imgUrl3 from "@/assets/images/Events/04.webp";
import imgUrl4 from "@/assets/images/Events/06.webp";
import imgUrl5 from "@/assets/images/Events/07.webp";
import imgUrl6 from "@/assets/images/Events/08.webp";

export const eventsData = [
  {
    title: "Introduction to Next.js",
    type: "Webinar",
    main_image: imgUrl1,
    date: "2024-12-10",
    private_content: "Exclusive Q&A session for attendees",
    price: 29.99,
    video_url: "",
    video: {
      id: 1,
      url: "https://example.com/videos/nextjs-intro-preview.mp4",
    },
    slug: "introduction-to-nextjs",
    brief:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    location: "Lebanon",
  },
  {
    title: "Mastering Tailwind CSS",
    type: "Workshop",
    main_image: imgUrl2,
    date: "2024-12-12",
    private_content: "Tailwind cheatsheet and templates",
    price: 39.99,
    video_url: "https://youtu.be/LXb3EKWsInQ?si=Z1UGU69EjnARoHCq",
    video: {
      id: 2,
      url: "https://example.com/videos/tailwind-workshop-preview.mp4",
    },
    slug: "mastering-tailwind-css",
    brief:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    location: "Lebanon",
  },
  {
    title: "JavaScript for Beginners",
    type: "Seminar",
    main_image: imgUrl3,
    date: "2024-12-15",
    private_content: "Beginner-friendly resources and recordings",
    price: 19.99,
    video_url: "",
    video: {
      id: 3,
      url: "",
    },
    slug: "javascript-for-beginners",
    brief:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    location: "Lebanon",
  },
  {
    title: "Advanced React Patterns",
    type: "Webinar",
    main_image: imgUrl4,
    date: "2024-12-18",
    private_content: "Exclusive access to sample projects",
    price: 49.99,
    video_url: "https://youtu.be/LXb3EKWsInQ?si=Z1UGU69EjnARoHCq",
    video: {
      id: 4,
      url: "https://example.com/videos/react-patterns-preview.mp4",
    },
    slug: "advanced-react-patterns",
    brief:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    location: "Lebanon",
  },
  {
    title: "State Management with Redux",
    type: "Workshop",
    main_image: imgUrl5,
    date: "2024-12-20",
    private_content: "Hands-on exercises and guides",
    price: 59.99,
    video_url: "",
    video: {
      id: 5,
      url: "",
    },
    slug: "state-management-with-redux",
    brief:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    location: "Lebanon",
  },
  {
    title: "Building Design Systems",
    type: "Seminar",
    main_image: imgUrl6,
    date: "2024-12-22",
    private_content: "Exclusive recorded sessions and templates",
    price: 69.99,
    video_url: "https://youtu.be/LXb3EKWsInQ?si=Z1UGU69EjnARoHCq",
    video: {
      id: 6,
      url: "https://example.com/videos/design-systems-preview.mp4",
    },
    slug: "building-design-systems",
    brief:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
    location: "Lebanon",
  },
];
