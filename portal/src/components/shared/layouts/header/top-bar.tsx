import { SocialLinks } from "../social-links";

export const TobBar = async () => {

  return (
    <div className="hidden lg:block bg-lightGray h-10 w-full">
      <div
        className={
          "w-full h-full relative container flex items-center justify-end "
        }
      >
        <SocialLinks className={"text-secondary gap-x-4"} />
      </div>
    </div>
  );
};
