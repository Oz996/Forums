function layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="w-full h-full">
      <div className="mx-auto max-w-[30rem] mt-10 rounded-xl border shadow-lg p-10 flex flex-col gap-10 justify">
        {children}
      </div>
    </section>
  );
}

export default layout;
