"use client";

import { useSearchParams } from "next/navigation";
import CardWrapper from "./CardWrapper";
import { RiseLoader } from "react-spinners";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";
import FormError from "../FormError";
import FormSuccess from "../FormSuccess";

const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Missing Token!");
      return;
    }
    newVerification(token)
      .then((data) => {
        setSuccess(data?.success);
        setError(data?.error);
      })
      .catch(() => {
        setError("Something Went Wrong!");
      });
  }, [token]);
  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <CardWrapper
      headerLabel="Confirm your Account Verification"
      backButtonLabel="Back to Login"
      backButtonHref="/login"
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error &&(
        <RiseLoader />
        )}
        <FormError message={error} />
        <FormSuccess message={success} />
      </div>
    </CardWrapper>
  );
};

export default NewVerificationForm;
