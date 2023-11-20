"use client";
import { Membership } from "@/types";
import { Button, Card } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { getOptions } from "./api/api";
import { FaCircle, FaPlus, FaCheck } from "react-icons/fa";
import classnames from "classnames";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function Page() {
  const { data } = useQuery({
    queryKey: ["options"],
    queryFn: getOptions,
  });
  console.log(data);
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/home");
    }
  }, [isAuthenticated, router]);

  return (
    <section className="container mx-auto pb-5 lg:pb-0">
      <h1 className="text-4xl font-semibold text-center capitalize pb-20">
        choose your plan
      </h1>
      <div className="flex flex-col gap-10 lg:flex-row lg:gap-20 mx-auto justify-center items-center">
        {data?.map((option: Membership) => (
          <Card
            key={option.id}
            className={classnames({
              "grid grid-cols-1 gap-8 p-12 rounded-3xl h-[40rem]": true,
              "bg-primary-600 text-white": option.option === "premium",
            })}
          >
            <div className="flex justify-center">
              {option.option === "regular" ? (
                <FaCircle size={70} className="text-primary-600 self-center" />
              ) : (
                <FaPlus size={70} className="self-center" />
              )}
            </div>
            <h2 className="capitalize font-semibold text-2xl text-center">
              {option.option}
            </h2>
            <div className="flex gap-3 justify-center items-center">
              {option.price === 0 ? (
                <p className="text-4xl font-bold capitalize">free</p>
              ) : (
                <>
                  <p className="text-4xl font-bold">€{option.price}</p>
                  <p
                    className={classnames({
                      capitalize: true,
                      "text-zinc-300": option.option === "premium",
                      "text-zinc-400": option.option === "regular",
                    })}
                  >
                    / month
                  </p>
                </>
              )}
            </div>
            <p
              className={classnames({
                "text-center w-72": true,
                "text-zinc-300": option.option === "premium",
                "text-zinc-500": option.option === "regular",
              })}
            >
              {option.description}
            </p>
            <ul className="flex flex-col gap-5">
              {option.features.map((feature) => (
                <li key={feature} className="flex gap-4">
                  <FaCheck
                    size={20}
                    className={classnames({
                      "text-white": option.option === "premium",
                      "text-primary-600": option.option === "regular",
                    })}
                  />
                  <p>{feature}</p>
                </li>
              ))}
            </ul>
            <Link href={option.option === "regular" ? "/register" : ""}>
              <Button
                variant="bordered"
                size="lg"
                className={classnames({
                  "w-full duration-200 font-semibold": true,
                  "bg-white text-primary-600 border-primary-700":
                    option.option === "premium",
                  "hover:border-primary-600 hover:bg-primary-600 hover:text-white":
                    option.option === "regular",
                })}
              >
                Choose Plan
              </Button>
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
}
