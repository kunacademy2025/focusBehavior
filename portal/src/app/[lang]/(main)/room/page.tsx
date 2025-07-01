//ts-ignore
"use client";

import React, { useEffect, useState } from "react";
import { HMSPrebuilt } from "@100mslive/roomkit-react";
import { useSearchParams } from "next/navigation";

const RoomPage = () => {
  const searchParams = useSearchParams();

  const roomCode = searchParams.get("roomCode") || undefined;

  const eventId = searchParams.get("eventId");

  const [token, setToken] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      if (!eventId) {
        setError("Missing event ID");
        return;
      }

      try {
        const res = await fetch(`/api/room-access?eventId=${eventId}`, {
          method: "GET",
          credentials: "include",
        });

        console.log("res", res);

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Access denied");
        } else {
          setToken(data.token);
        }
      } catch (err) {
        setError("Something went wrong while fetching the room token.");
      }
    };

    fetchToken();
  }, [eventId]);

  if (error) {
    return <p style={{ padding: 20 }}>{error}</p>;
  }

  if (!roomCode) {
    return <p style={{ padding: 20 }}>Loading room...</p>;
  }

  return (
    <div dir="ltr" style={{ height: "100vh" }}>
      {token && <HMSPrebuilt roomCode={roomCode} />}
    </div>
  );
};

export default RoomPage;
