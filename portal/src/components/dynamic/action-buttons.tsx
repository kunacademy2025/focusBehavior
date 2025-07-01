import { ActionButtonModel } from "@/models/global.model";
import { cn } from "@/utils";
import { getMediaInfo, getStrapiData } from "@/utils";
import { doDownload } from "@/utils/download";
import { FC } from "react";
import toast from "react-hot-toast";

interface Props {
  buttons: ActionButtonModel[];
}

export const ActionButtons: FC<Props> = ({ buttons }) => {
  let relateItem = "";

  const handleDownload = async (file: any) => {
    try {
      const { imgUrl: fileUrl, name } = getMediaInfo(file);
      const fileURL = fileUrl;
      const fileName = name;

      // relateItem = `${SourceType.Other}: ${fileName}`;

      await doDownload(fileURL, fileName);
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("An error occurred while downloading files.");
    }
  };

  return (
    <div className="mt-6">
      <ul className="gap-x-4 gap-y-2 flex flex-wrap w-full">
        {buttons.map((item, index) => {
          const {
            label,
            link,
            download,
            style,
          } = getStrapiData(item);

          const styleClass = (() => {
            switch (style) {
              case "primary":
                return "bg-primary";
              case "secondary":
                return "bg-secondary";
              case "wire":
              default:
                return "";
            }
          })();

          return (
            <li key={index} className="min-w-0">
              <button className={cn("btn-primary", styleClass)}>{label}</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
