const points = [
  {
    title: "Your inputs stay put",
    body: "Salary, loan amount, date of birth — none of it is uploaded, because there is no server behind these tools.",
  },
  {
    title: "Indian formats, not a retrofit",
    body: "Lakh and Crore grouping, CGST and SGST split, and both tax regimes for the current financial year.",
  },
  {
    title: "The formula is on the page",
    body: "Each answer sits beside its working, so you can verify it by hand or explain it to someone else.",
  },
  {
    title: "Nothing in the way",
    body: "No popups, no autoplay video, no sign-up wall between you and the answer.",
  },
];

const stats = [
  { value: "9", label: "free tools" },
  { value: "100%", label: "runs in your browser" },
  { value: "0", label: "sign-ups required" },
  { value: "5", label: "guides published" },
];

export default function WhyChooseUs() {
  return (
    <section className="max-w-content mx-auto px-5 py-20">
      <h2 className="font-display text-3xl md:text-[2.6rem] tracking-[-.03em] leading-[1.1] text-ink dark:text-white max-w-[20ch] mb-12">
        Built to give you a number you can actually check
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
        {points.map((p) => (
          <div
            key={p.title}
            className="group rounded-[22px] border border-line dark:border-white/10 bg-surface dark:bg-white/[0.03] p-7 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-indigo/40 hover:shadow-xl hover:shadow-indigo/10"
          >
            <span className="block w-10 h-1 rounded-full bg-indigo mb-5 transition-all duration-500 group-hover:w-16" />
            <h3 className="font-display text-lg text-ink dark:text-white mb-2">{p.title}</h3>
            <p className="text-muted leading-relaxed">{p.body}</p>
          </div>
        ))}
      </div>

      <dl className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 border-t border-line dark:border-white/10 pt-10">
        {stats.map((s) => (
          <div key={s.label}>
            <dt className="sr-only">{s.label}</dt>
            <dd>
              <span className="block font-mono font-bold text-3xl tabular text-ink dark:text-white mb-1">
                {s.value}
              </span>
              <span className="text-sm text-muted">{s.label}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
