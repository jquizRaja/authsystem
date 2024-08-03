import { GiTerror } from "react-icons/gi";
import CardWrapper from "./CardWrapper";

const ErrorCard = () => {
  return (
    <CardWrapper
    headerLabel="OooPs!! Something Went Wrong!"
    backButtonLabel="Back to Login"
    backButtonHref="/login"
    >
      <div className="w-full items-center flex justify-center">
      <GiTerror className="w-20 h-20 text-destructive "/>
      </div>
    </CardWrapper>

  );
};

export default ErrorCard;
