"use client"
import React from "react";
import { HMSPrebuilt } from "@100mslive/roomkit-react";

export const HmsSession = ({
  roomCode,
  authToken,
}: {
  roomCode: string;
  authToken?: string;
}) => {
  return (
    <div>
      <HMSPrebuilt roomCode={roomCode} />
    </div>
  );
};
