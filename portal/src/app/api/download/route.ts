import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type Payload = {
  data: {
    file: string;
    fileName?: string;
    fileType?: string;
  };
};

export async function POST(req: NextRequest, res: NextResponse) {
  const data: Payload = await req.json();
  if (data?.data?.file?.length) {
    const fileBlob = await fetch(new URL(data.data.file)).then((res) =>
      res.blob()
    );
    const headers = new Headers();
    const downloadFileName =
      data?.data?.fileName ||
      data?.data?.file?.split("/")?.at(-1) ||
      "file.pdf";
    const downloadFileType = data?.data?.fileType || "application/pdf";
    headers.append(
      "Content-Disposition",
      `attachment; filename="${downloadFileName}"`
    );
    headers.append("Content-Type", downloadFileType);
    return new Response(fileBlob, { headers });
  } else return Response.json({ success: false });
}
