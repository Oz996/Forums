import BackArrow from "@/components/BackArrow";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="w-full h-full pt-10">
      <BackArrow />
      <div className="mx-auto max-w-[30rem] mt-10 rounded-xl border shadow-lg p-10 flex flex-col gap-10 justify">
        {children}
      </div>
    </section>
  );
}
