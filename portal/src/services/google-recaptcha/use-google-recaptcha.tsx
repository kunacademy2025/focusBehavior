import { useContext } from "react";
import { GoogleReCaptchaContext } from "./index";

export const useGoogleReCaptcha = () => useContext(GoogleReCaptchaContext);
