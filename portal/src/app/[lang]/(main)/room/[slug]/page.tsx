"use client";

import { HMSPrebuilt } from "@100mslive/roomkit-react";

export default function Home({ params }: { params: { slug: string } }) {
  return (
    <div dir="ltr" style={{ height: "100vh" }}>
      <HMSPrebuilt roomCode={params.slug} />
    </div>
  );
}

// "use server";

// import { HmsSession } from "../_components/HmsSession";

// type Params = Promise<{ lang: string; slug: string }>;

// const RoomPage = async ({ params }: { params: Params }) => {
//   const { slug, lang } = await params;

//   const roomCode = slug;

//   return (
//     <div dir="ltr" style={{ height: "100vh" }}>
//       <HmsSession roomCode={roomCode} />
//     </div>
//   );
// };

// export default RoomPage;

// // authToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJzaW9uIjoyLCJ0eXBlIjoiYXBwIiwiYXBwX2RhdGEiOm51bGwsImFjY2Vzc19rZXkiOiI2N2M5ZmVhMzQ5NDRmMDY3MzEzYTkwZDUiLCJyb2xlIjoiYnJvYWRjYXN0ZXIiLCJyb29tX2lkIjoiNjdjYTlmOGMzNmQ0Y2ZjMTk4MWVmOGIyIiwidXNlcl9pZCI6IjNhNGNhNmE0LTVkNGMtNDY4Ni05NjU5LWEwOWU3YTA5MjU4NiIsImV4cCI6MTc0MTQxODc2NSwianRpIjoiYTc3NTQ1OGUtZGVmYi00ZGI4LTk3N2YtYWZhMmMxZTQ2NzFlIiwiaWF0IjoxNzQxMzMyMzY1LCJpc3MiOiI2N2M5ZmVhMzQ5NDRmMDY3MzEzYTkwZDMiLCJuYmYiOjE3NDEzMzIzNjUsInN1YiI6ImFwaSJ9.zxwa9pTwWr083t84SqFQrzFVWoUWo5Hoc4YUCX1ndRU"
