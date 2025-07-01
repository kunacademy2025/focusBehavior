import { getMediaInfo } from "./getMediaInfo";

export const doDownload = (file: any, fileName?: string) => {
  const download = async (file: string, fileName: string, fileType: string) => {
    try {
      const response = await fetch("/api/download", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ data: { file, fileName, fileType } }),
      });
      const respBlob = await response.blob();

      const a = document.createElement("a");
      a.href = window.URL.createObjectURL(respBlob);
      a.download = fileName;
      a.click();
      a.remove();
    } catch (error) {
      console.error(error);
    }
  };
  const { imgUrl, ext, alt, mime } = getMediaInfo(file);
  download(imgUrl, fileName || `${alt}${ext}`, mime);
};
