import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

// Phase 1 placeholder — proves the layout foundation renders correctly.
// The full Home page composition (hero, growth ledger, proof metrics, etc.)
// is built in Phase 3.
export default function HomePage() {
  return (
    <>
      <Header active="Home" />
      <section className="bg-navy px-5 py-24 sm:px-8 md:px-12">
        <Container>
          <Eyebrow label="Foundation" />
          <h1 className="mt-6 max-w-2xl text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            Phase 1 foundation is live.
          </h1>
          <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-[#b6c0cc]">
            Fonts, design tokens, layout, Header, Footer and base UI primitives are wired up. Full page
            content lands in later phases.
          </p>
          <div className="mt-8">
            <Button href="/contact">Work with me</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
