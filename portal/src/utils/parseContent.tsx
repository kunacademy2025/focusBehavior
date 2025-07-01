import parse, { domToReact, attributesToProps } from "html-react-parser";
import React, { Fragment } from "react";
import Link from "next/link";
import { EmailLink, PhoneLink } from "@/components/controls";
import { cn } from "./cn";

export const parseContent = (content: string, className?: string) => {
  const parsedContent = parse(String(content), {
    replace: format,
  });

  return typeof content === "string" ? (
    <Fragment>
      <div className={cn("bullet-list space-y-5", className)}>
        {parsedContent}
      </div>
    </Fragment>
  ) : null;
};

const format = (domNode: any) => {
  if (domNode.type === "tag") {
    const { name, children, attribs } = domNode;

    if (name === "p") {
      let props: any = attributesToProps(attribs);
      props = { ...props, className: cn(props.className, "mb-2") };
      return <p {...props}>{domToReact(children, { replace: format })}</p>;
    }

    if (name === "ul") {
      let props: any = attributesToProps(attribs);
      props = {
        ...props,
        className: cn(props.className, "list-disc"),
      };
      return <ul {...props}>{domToReact(children, { replace: format })}</ul>;
    }

    if (name === "ol") {
      let props: any = attributesToProps(attribs);
      props = {
        ...props,
        className: cn(props.className, "list-decimal"),
      };
      return <ol {...props}>{domToReact(children, { replace: format })}</ol>;
    }

    if (name === "li") {
      let props: any = attributesToProps(attribs);
      props = {
        ...props,
        className: cn(props.className, "flex items-start mb-2"),
      };
      return (
        <li {...props}>
          {/* <div className="min-w-[16px] min-h-[16px] w-4 h-4 ltr:mr-4 rtl:ml-4 shrink-0">
            <FaCheck className="min-w-[12px] mt-1 min-h-[12px] text-primary" />
          </div> */}
          <span className="w-full">
            {domToReact(domNode.children, { replace: format })}
          </span>
        </li>
      );
    }

    if (name === "a") {
      let props: any = attributesToProps(attribs);
      props = {
        ...props,
        className: cn(props.className, "text-primary hover:underline"),
      };
      const { href } = attribs;

      if (href && href?.toString().startsWith("mailto"))
        return (
          <EmailLink email={href.toString().replace("mailto:", "")} {...props}>
            {domToReact(domNode.children, { replace: format })}
          </EmailLink>
        );

      if (href && href?.toString().startsWith("tel:"))
        return (
          <PhoneLink
            phone_number={href.toString().replace("tel:", "")}
            {...props}
          >
            {domToReact(domNode.children, { replace: format })}
          </PhoneLink>
        );

      if (href && href?.toString().startsWith("http"))
        props = { ...props, target: "_blank", rel: "noopener" };

      return (
        <Link {...props}>
          {domToReact(domNode.children, { replace: format })}
        </Link>
      );
    }

    if (name === "strong") {
      let props: any = attributesToProps(attribs);
      props = {
        ...props,
        className: cn(props.className, "font-bold"),
      };
      return (
        <span {...props}>
          {domToReact(domNode.children, { replace: format })}
        </span>
      );
    }
  }
};
