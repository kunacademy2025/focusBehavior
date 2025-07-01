import { cn, getStrapiData, parseContent } from "@/utils";
import { ActionButtons } from "../action-buttons";
import { FC } from "react";
import { ContentBlockModel } from "@/models/dynamic.model";

interface Props {
  options: ContentBlockModel;
}

const DynamicContentBlock: FC<Props> = ({ options }) => {
  const { title, content, action_buttons } = getStrapiData(options);

  return (
    <section className="">
      <div className={cn("container relative overflow-hidden")}>
        <div className={cn("w-full h-full")}>
          {/* Content */}
          <div className={cn("w-full")}>
            <div className="flex flex-col justify-center mb-6">
              {title && (
                <h2 className="uppercase text-xl lg:text-2xl text-primary mb-3">
                  {title}
                </h2>
              )}
              {content && (
                <div className="text-base text-darkGray">
                  {parseContent(content)}
                </div>
              )}
            </div>
            <ActionButtons buttons={action_buttons} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DynamicContentBlock;
