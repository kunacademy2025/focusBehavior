import { useTranslation } from "@/i18n/client";
import { SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/24/outline";

export const MuteButton = ({
  muted,
  toggleMute,
  lang,
}: {
  muted: boolean;
  toggleMute: () => void;
  lang: string;
}) => {
  const { t } = useTranslation("common", lang);

  return (
    <div className="absolute bottom-20 lg:bottom-10 ltr:left-0 rtl:right-0 z-20 px-6 lg:px-10 w-4/5 lg:w-2/5">
      <button
        type="button"
        className="text-sm lg:text-base flex items-center text-white bg-primary hover:bg-primary/85 transition duration-300 rounded-lg py-1 md:py-2 pl-2 md:pl-4 pr-1 md:pr-2 font-semibold"
        onClick={toggleMute}
      >
        {muted ? t("terms.unmute") : t("terms.mute")}
        <span className="p-2 rounded-md bg-white text-white bg-opacity-20 ltr:ml-4 rtl:mr-4">
          {muted ? (
            <SpeakerXMarkIcon className="w-6 h-6" />
          ) : (
            <SpeakerWaveIcon className="w-6 h-6" />
          )}
        </span>
      </button>
    </div>
  );
};
