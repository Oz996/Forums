"use client";

import { useAuth } from "@/hooks/useAuth";
import { getBaseUrl } from "@/lib/utils/URL";
import {
  validateCardName,
  validateCardNumber,
} from "@/lib/utils/cardValidator";
import { ErrorMessage } from "@hookform/error-message";
import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function Upgrade() {
  const [isLoading, setIsLoading] = useState(false);
  const { userId, setPremium } = useAuth();
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // Handling user upgrade to premium

  const handlePremiumUpgrade = async () => {
    try {
      setIsLoading(true);
      const res = await axios.put(getBaseUrl() + `/api/user/${userId}`, {
        isPremium: true,
      });
      if (res.status === 200) {
        setPremium(true);
        router.push("/home");
        toast.success("Upgraded to Premium!");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-center font-semibold text-xl">Upgrade to Premium</h1>
      <h2 className="text-center text-primary-600 font-semibold text-lg -mt-5">
        12€ / Month
      </h2>
      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(handlePremiumUpgrade)}
      >
        <Input
          type="text"
          {...register("cardName", {
            required: "This field is required",
            validate: validateCardName,
          })}
          label="Cardholder Name"
        />
        <ErrorMessage
          errors={errors}
          name="cardName"
          render={({ message }) => (
            <p className="text-red-500 text-sm font-semibold">{message}</p>
          )}
        ></ErrorMessage>
        <Input
          type="text"
          {...register("cardNumber", {
            required: "This field is required",
            validate: validateCardNumber,
          })}
          label="Card Number"
        />
        <ErrorMessage
          errors={errors}
          name="cardNumber"
          render={({ message }) => (
            <p className="text-red-500 text-sm font-semibold">{message}</p>
          )}
        ></ErrorMessage>
        <Button
          isLoading={isLoading}
          type="submit"
          className="w-full"
          color="primary"
        >
          Submit
        </Button>
      </form>
    </>
  );
}
