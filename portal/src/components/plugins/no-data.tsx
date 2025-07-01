"use client";

export const NoData: React.FC<{ title: string; message: string }> = ({
  title,
  message,
}) => {
  return (
    <section className="relative py-[50px] flex items-center justify-center text-center">
      <div className="container relative">
        <div className="grid grid-cols-1">
          <div className="title-heading text-center my-auto">
            <h4 className="mt-6 mb-8 md:text-2xl text-xl font-bold">{title}</h4>
            <p className="text-slate-400 max-w-xl mx-auto">{message}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
