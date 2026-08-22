import { notFound } from "next/navigation";
import { CaseStudyDetailTemplate } from "@/components/case-studies/CaseStudyDetailTemplate";
import { CASE_STUDIES } from "@/lib/data/case-studies";

export function generateStaticParams() {
  return CASE_STUDIES.map((s) => ({ slug: s.slug }));
}

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = CASE_STUDIES.find((s) => s.slug === slug);
  if (!study) notFound();

  return <CaseStudyDetailTemplate study={study} />;
}
