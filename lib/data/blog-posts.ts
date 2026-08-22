// Content ported verbatim from the prototype's blog-posts.js (12 published
// field-note articles). Do not edit the `md` bodies — they are the approved
// copy, sourced originally from assets/blogsrc/*.md.
export type BlogPost = {
  num: string;
  slug: string;
  tag: string;
  date: string;
  read: string;
  metaTitle: string;
  metaDesc: string;
  title: string;
  md: string;
};

export const POSTS: BlogPost[] = [
  {
    num: "01",
    slug: "ai-search-optimization-explained",
    tag: "AI SEARCH",
    date: "Aug 18, 2026",
    read: "7 min read",
    metaTitle: "AI Search Optimization Explained (2026) | The Growth Files",
    metaDesc: "AI search optimization means structuring content so ChatGPT, Perplexity, and Google AI Overviews cite it directly. Here's what that actually involves.",
    title: "AI search optimization, explained",
    md: `# AI search optimization, explained

AI search optimization is the practice of structuring a website's content, technical setup, and trust signals so AI systems like ChatGPT, Perplexity, Google AI Overviews, and Microsoft Copilot cite it directly in the answers they generate, rather than optimizing purely to rank on a search results page. It covers two more specific disciplines that people often use interchangeably: [answer engine optimization (AEO)](/blog/what-is-aeo-vs-seo), which focuses on being selected as the source for a direct question, and [generative engine optimization (GEO)](/blog/what-is-geo-vs-aeo), the broader practice of being present across AI-generated discovery overall.

This shift matters because AI answer engines increasingly hand people a synthesized answer with a small number of credited sources instead of a ranked list of ten links. [ChatGPT alone processes over 2.5 billion prompts a day](https://www.tryprofound.com/resources/articles/what-is-answer-engine-optimization), and [Gartner predicts traditional search volume will drop 25% by 2026](https://www.frase.io/blog/what-is-answer-engine-optimization-the-complete-guide-to-getting-cited-by-ai) as more of that discovery moves into chat interfaces. For a brand or a consultant, the practical question isn't "do we rank," it's "does the AI even know we exist, and does it trust us enough to name us."

## What AI search optimization actually involves

It isn't one task, it's three connected areas working together:

1. **Content.** Does the material answer real questions people ask, structured so an AI system can extract a clean, standalone answer from it? This means answer-first writing, clear headings that match actual questions, and passages that make sense read in isolation, since AI systems retrieve chunks of a page, not the whole thing.
2. **Trust.** Is there a verifiable reason for an AI system to treat the content as credible? Identified authorship, cited sources, and a track record all function as trust signals here, similar to the EEAT (experience, expertise, authoritativeness, trustworthiness) framework Google has used for years.
3. **Technical.** Can AI crawlers actually access and parse the site correctly? This covers crawler permissions, page structure, and, more cautiously than many guides suggest, structured data.

## Why this is different from traditional SEO

Traditional SEO optimizes for a position on a results page a human then clicks. AI search optimization optimizes for something narrower and more binary: whether an AI system names a source at all when it generates an answer. [Most AI answers cite only 2 to 7 domains total](https://seoresellerscanada.ca/how-to-create-and-structure-content-so-chatgpt-and-google-ai-overviews-can-cite-it/), compared to the ten blue links of a standard search results page, which means the competition for inclusion is far more concentrated. A page can rank well on Google and still never get mentioned by ChatGPT for the same topic.

## A quick example

Instead of a page titled "Flower Pots" targeting the keyword "flower pot," an AI-optimized page answers a real question directly: "What is the best sustainable flower pot for a balcony?" leads with a direct answer in the first sentence, then explains the reasoning, the materials, and the trade-offs, the way a knowledgeable person would answer the question out loud.

## Frequently asked questions

**Is AI search optimization the same thing as SEO?**
No. Traditional SEO targets ranking position on a search results page that a person then clicks through. AI search optimization targets whether an AI system selects and names a source when it generates a direct answer, which is a narrower, more competitive outcome with far fewer winners per query.

**Do I need to choose between SEO and AI search optimization?**
No, they overlap significantly. Content that's genuinely well structured, well sourced, and answer-first tends to perform in both. The main shift is prioritizing extractable, standalone answers and verifiable trust signals over purely keyword-driven copy.

**How fast is this shift actually happening?**
Quickly enough to act on now rather than wait. [Google's AI Overviews reach roughly 2 billion monthly users](https://searchengineland.com/how-to-optimize-content-for-ai-search-engines-a-step-by-step-guide-467272), and multiple 2026 buyer research reports put AI chatbot usage in B2B research well above half of all buyers.

**What's the single most important first step?**
Auditing where a brand currently stands: running its own target prompts through ChatGPT, Perplexity, and Google AI Overviews to see whether it's mentioned at all, and if so, what's actually being said. Without that baseline, it's guesswork.

## Related services

This work sits under [AI Search & SEO](/services#ai-search-seo). See a real, worked example in [AI visibility: from invisible to citable](/case-studies/ai-visibility-geo-aeo).

Curious where your own brand currently stands in AI search? [Get in touch](/contact) and I'll walk through what an audit would look like for your site.`
  },
  {
    num: "02",
    slug: "what-is-aeo-vs-seo",
    tag: "AEO & GEO",
    date: "Aug 14, 2026",
    read: "6 min read",
    metaTitle: "What Is AEO? Answer Engine Optimization vs. SEO | The Growth Files",
    metaDesc: "AEO stands for answer engine optimization: structuring content so AI systems cite it as the source for a direct question. Here's how it differs from SEO.",
    title: "What is AEO, and how is it different from SEO?",
    md: `# What is AEO, and how is it different from SEO?

AEO stands for answer engine optimization, the practice of structuring content so AI systems like ChatGPT, Perplexity, and Google AI Overviews select it as the cited source when answering a specific question. The core difference from traditional SEO is what's actually being optimized for: SEO targets a ranked position on a search results page, while [AEO targets selection inside an answer the AI writes before a person ever sees a list of links](https://www.loudface.co/blog/answer-engine-optimization-guide-2026). A page can rank in the top three on Google for a query and still be cited zero percent of the time by an AI engine answering the same question.

## How AEO actually works

Answer engines follow a retrieve-then-synthesize process: they pull candidate sources for a query, then generate an answer citing the ones they trust most. [AEO improves the odds at each step](https://siftly.ai/blog/aeo-prompts-optimization-guide):

- **Retrievable**: the page allows AI crawlers and is properly indexed
- **Extractable**: it uses answer-first paragraphs and clear, question-based headings
- **Trustworthy**: claims are corroborated across sources, fact-dense, and dated
- **Complete**: it covers the related sub-questions someone would naturally ask next, so one page satisfies a whole cluster of related queries

## Why the shift from SEO to AEO matters

Traditional SEO optimizes for keyword matching. Answer engines, powered by large language models, understand semantic meaning instead, so [an AEO-optimized page doesn't need to repeat an exact keyword phrase](https://www.articsledge.com/post/answer-engine-optimization-aeo), it needs to cover the concept, the entities involved, and the context clearly enough that an AI system can extract a complete, accurate answer regardless of the exact words used in the original question.

Authority signals shift too. In classic SEO, backlinks are the dominant authority signal. In AEO, authority also comes from brand entity recognition (is the brand a known entity in knowledge graphs), citation quality (are reputable sources linking to it), and clear expertise signals like author bios and a visible publication history.

## A concrete example

A traditional SEO page targeting "best CRM software 2026" might repeat that exact phrase throughout the copy. An AEO-optimized page instead answers a more specific, natural question: "What CRM should a 20-person SaaS startup use?" It names specific products, structures the comparison clearly, and lets the AI extract the relevant part regardless of whether the visitor's original question used those exact words.

## Frequently asked questions

**What does AEO stand for?**
Answer engine optimization. It's the practice of structuring content so AI systems select and cite it directly when generating an answer to a question, rather than optimizing for a ranked position on a traditional search results page.

**Is AEO a replacement for SEO?**
No. [AEO builds on SEO fundamentals](https://www.rygr.us/2026/02/04/why-aeo-answer-engine-optimization-is-critical-to-2026-marketing-planning) like crawlability, site structure, and quality content, it doesn't replace them. The two disciplines increasingly need to run together, since a well-structured, well-sourced page tends to perform in both.

**Does AEO use different ranking signals than SEO?**
Partly. Backlinks remain relevant in both, but AEO adds weight to entity recognition in knowledge graphs, citation quality across sources, and explicit expertise signals like author identification, which matter less directly in traditional keyword-based SEO.

**Can a page rank well on Google and still be invisible to AI systems?**
Yes, and this happens often. Ranking position and AI citation are measured differently: a top-three Google result for a query can be cited zero times by ChatGPT or Perplexity answering the same question, since those systems select from a much smaller pool of sources per answer.

## Related services

This is part of [AI Search & SEO](/services#ai-search-seo). For a worked example of applying this in practice, see [AI visibility: from invisible to citable](/case-studies/ai-visibility-geo-aeo). For the related but broader discipline, see [what is GEO, and how is it different from AEO](/blog/what-is-geo-vs-aeo).

Want a straight answer on whether your content is structured for AEO right now? [Get in touch](/contact).`
  },
  {
    num: "03",
    slug: "what-is-geo-vs-aeo",
    tag: "AEO & GEO",
    date: "Aug 11, 2026",
    read: "5 min read",
    metaTitle: "What Is GEO? Generative Engine Optimization Explained | The Growth Files",
    metaDesc: "GEO stands for generative engine optimization: the broader practice of improving visibility across AI-generated answers. Here's how it relates to AEO.",
    title: "What is GEO, and how is it different from AEO?",
    md: `# What is GEO, and how is it different from AEO?

GEO stands for generative engine optimization: [the practice of structuring digital content and managing online presence to improve visibility in responses generated by AI systems](https://en.wikipedia.org/wiki/Generative_engine_optimization), influencing how large language models retrieve, summarize, and present information across the full range of AI-generated discovery, not just direct question-and-answer moments. The term was first proposed by researchers at Princeton in late 2023, ahead of the current wave of AI search products.

GEO and AEO are closely related, and the terms get used loosely in practice, but they describe different scopes of the same underlying shift. [GEO is the broader discipline: being present across generative AI discovery overall](https://machinerelations.ai/research/what-is-answer-engine-optimization-aeo-2026). AEO is the answer-layer discipline inside that broader surface, specifically focused on being selected when a system needs a source for a concrete fact, definition, or recommendation. In practice, GEO is the umbrella term, and AEO is one operational piece of it.

## What falls under GEO specifically

GEO work spans a wider set of activities than AEO alone, including:

- Being represented correctly in AI training data and retrieval systems generally, not just for a single question
- Managing brand entity recognition across knowledge graphs and AI-referenced sources
- Building the kind of broad topical authority that shows up when an AI system is reasoning about a category, not answering one narrow question
- Monitoring how a brand is described, characterized, or recommended across multiple AI platforms over time

## Why this distinction is worth knowing

If a brand only optimizes for AEO, narrow, answer-first content built to win specific direct questions, it can still be effectively invisible in broader AI-generated discovery, where a model is reasoning across a category rather than answering one discrete query. GEO work, building topical depth, consistent entity recognition, and cross-platform presence, is what supports AEO wins over time rather than treating each one as a one-off.

## Frequently asked questions

**What does GEO stand for in marketing?**
Generative engine optimization: structuring content and managing online presence so AI systems retrieve, summarize, and represent a brand accurately and favorably across AI-generated responses, covering a broader scope than answering any single question.

**Is GEO the same as AEO?**
Not exactly. GEO is the broader discipline covering visibility across generative AI discovery generally. AEO is the specific, narrower practice of being cited as the source for a direct question or fact. AEO sits inside GEO rather than being a separate, competing approach.

**Who coined the term GEO?**
[Researchers at Princeton University introduced the term generative engine optimization in late 2023](https://searchengineland.com/how-to-optimize-content-for-ai-search-engines-a-step-by-step-guide-467272), ahead of the current wave of consumer AI search products.

**Does GEO replace traditional SEO work?**
No. GEO extends SEO into AI-generated discovery specifically, it doesn't replace the underlying fundamentals of crawlability, site structure, and genuinely useful content that SEO has always depended on.

## Related services

This is part of [AI Search & SEO](/services#ai-search-seo). For the narrower, question-focused discipline, see [what is AEO, and how is it different from SEO](/blog/what-is-aeo-vs-seo). For a direct side-by-side comparison of all three terms, see [SEO vs AEO vs GEO](/blog/seo-vs-aeo-vs-geo).

Not sure where your brand currently stands across AI platforms? [Get in touch](/contact) for an honest read.`
  },
  {
    num: "04",
    slug: "seo-vs-aeo-vs-geo",
    tag: "AEO & GEO",
    date: "Aug 7, 2026",
    read: "7 min read",
    metaTitle: "SEO vs AEO vs GEO: The Difference, Side by Side | The Growth Files",
    metaDesc: "SEO, AEO, and GEO overlap but aren't the same thing. A direct comparison of what each one targets and when each one matters.",
    title: "SEO vs AEO vs GEO: a side by side comparison",
    md: `# SEO vs AEO vs GEO: a side by side comparison

SEO, AEO, and GEO all aim to make content discoverable, but they target three different outcomes: SEO targets a ranked position on a traditional search results page, AEO targets being cited as the source for a direct question inside an AI-generated answer, and GEO targets broad visibility and accurate representation across AI-generated discovery generally. They overlap in practice, strong SEO fundamentals support both, but treating them as interchangeable leads to strategies built for the wrong outcome.

## The core difference in one line each

| Discipline | What it optimizes for |
|---|---|
| SEO | Ranking position on a search results page a human clicks |
| AEO | Being the cited source for a direct question inside an AI-generated answer |
| GEO | Broad visibility and accurate representation across AI-generated discovery overall |

## Where they overlap

All three depend on the same underlying fundamentals: crawlable, well-structured content, genuine expertise, and a site AI systems and search engines alike can actually access and parse. A page that's well sourced, clearly organized, and genuinely useful tends to perform reasonably across all three, which is why none of these disciplines fully replaces the others.

## Where they diverge

The differences show up in what's being measured and how narrow the competition is:

- **SEO** measures rank position across ten or more results per page. Competition is broad, and a page in position 8 still gets some traffic.
- **AEO** measures citation inside a specific answer, where [most AI responses cite only 2 to 7 domains total](https://seoresellerscanada.ca/how-to-create-and-structure-content-so-chatgpt-and-google-ai-overviews-can-cite-it/). A page can rank on Google and still be cited zero times for the identical question asked in ChatGPT.
- **GEO** measures something broader and harder to track precisely: whether a brand is recognized, correctly described, and consistently surfaced across AI systems over time, not just for one query.

Platform behavior differs too. [Google AI Mode draws from the same index as traditional Google Search](https://www.pravinkumar.co/blog/perplexity-chatgpt-google-ai-mode-citation-differences-2026), so SEO fundamentals influence it directly, and roughly 97% of AI Overview citations reportedly come from pages already in Google's top 20 organic results. ChatGPT and Perplexity behave differently, drawing on different retrieval and crawling systems, which is why a page can perform well in one AI surface and be invisible in another.

## Which one to prioritize

There isn't a universal answer, it depends on where the target audience is actually searching. A business whose buyers still primarily use Google search benefits most from strong SEO with AEO-aware structure layered on top. A business whose buyers increasingly research through AI chat tools, which is now common in B2B software purchasing specifically, needs deliberate AEO and GEO work, not just an assumption that good SEO will carry over automatically.

## Frequently asked questions

**Is AEO the same as GEO?**
No. AEO is the narrower discipline of being cited for a specific question. GEO is the broader discipline of visibility and accurate representation across AI-generated discovery generally. AEO sits inside GEO rather than competing with it.

**Do I need to pick one of SEO, AEO, or GEO?**
No, and picking just one usually isn't the right call. They share enough fundamentals that most of the underlying work, clear structure, genuine expertise, crawlable content, supports all three. The real decision is where to put additional, discipline-specific effort based on how the target audience actually searches.

**Does ranking well on Google guarantee AI citation?**
Not automatically, though it helps significantly for Google's own AI features specifically. For Google AI Mode and AI Overviews, ranking well is strongly correlated with citation. For ChatGPT and Perplexity, which use different retrieval systems, a strong Google ranking doesn't guarantee a citation on the same question.

**Which is more important for a B2B company: SEO, AEO, or GEO?**
It depends on the buyer's research behavior, but multiple 2026 B2B buyer surveys show a majority of buyers now use AI chat tools somewhere in their research process, which makes AEO and GEO harder to ignore for B2B specifically than they might be for a purely local or transactional business.

## Related services

This is part of [AI Search & SEO](/services#ai-search-seo). For the individual definitions, see [what is AEO](/blog/what-is-aeo-vs-seo) and [what is GEO](/blog/what-is-geo-vs-aeo). For a real, worked example, see [AI visibility: from invisible to citable](/case-studies/ai-visibility-geo-aeo).

Not sure which of these actually matters for your business? [Get in touch](/contact) and I'll give you a straight read.`
  },
  {
    num: "05",
    slug: "how-to-structure-content-for-ai-citation",
    tag: "AI SEARCH",
    date: "Aug 4, 2026",
    read: "8 min read",
    metaTitle: "How to Structure Content So AI Search Engines Cite It | The Growth Files",
    metaDesc: "How to write and structure content so ChatGPT, Perplexity, Google AI Overviews, and Microsoft Copilot actually cite it, with what differs by platform.",
    title: "How to structure content so AI search engines actually cite it",
    md: `# How to structure content so AI search engines actually cite it

To get content cited by AI search engines, lead with a direct, standalone answer in the first sentence of each section, structure the page with clear question-based headings, back claims with named sources and specific data, and make sure the page is technically accessible to AI crawlers. [The formula that consistently earns citations is direct answer, one supporting fact, no preamble](https://www.naganamedia.com/blogs/how-to-structure-content-so-chatgpt-and-ai-overviews-cite-you), no "great question," no scene-setting before the point.

## The core structure that works across platforms

1. **Answer-first paragraphs.** Every major section should open with a direct answer to the question its heading implies, [roughly 20 to 60 words](https://www.naganamedia.com/blogs/how-to-structure-content-so-chatgpt-and-ai-overviews-cite-you), before expanding into supporting detail.
2. **Question-based headings.** Headings phrased as the actual questions people ask help AI systems match a section to a query, rather than requiring them to infer intent from a vague label.
3. **Standalone passages.** Each chunk of content should make sense read in isolation, since AI systems extract passages, not whole pages, when building an answer.
4. **Named statistics and sources.** Specific, sourced claims outperform vague ones. "Conversion improved 47% after implementing X" is far more citable than "conversion improved significantly."
5. **Schema markup.** [Article, HowTo, FAQPage, and Service schema help AI systems map content to the query being asked](https://www.visibilitystack.ai/signals/article/optimize-content-google-chatgpt-perplexity), though the evidence on how much this actually moves citation rates specifically is mixed, more on that in the [structured data and llms.txt post](/blog/structured-data-and-llms-txt).

## What differs by platform

The platforms don't behave identically, so a single generic approach undersells the opportunity:

- **ChatGPT** tends to favor consensus sources and has been observed citing Wikipedia and even competitor sites at a notably higher rate than Google does for the same query, alongside original data and clearly authored content.
- **Perplexity** leans heavily on real-time sources and, in some analyses, Reddit threads specifically, and it respects robots.txt, so crawl permissions matter directly here.
- **Google AI Overviews and AI Mode** draw from the same underlying index as traditional Google Search, so [roughly 97% of AI Overview citations reportedly come from pages already ranking in Google's top 20 organic results](https://www.pravinkumar.co/blog/perplexity-chatgpt-google-ai-mode-citation-differences-2026), meaning SEO fundamentals influence this surface directly.
- **Microsoft Copilot** draws on Bing's index, which makes standard technical SEO and Bing-specific indexing relevant in a way it may not be for ChatGPT or Perplexity.

Because [the same question often pulls different sources on each platform](https://www.joinamply.com/post/how-to-get-cited-by-chatgpt-perplexity-and-google-ai-overviews), a citation win on one engine isn't automatically a win everywhere, testing target prompts across each platform separately is the only way to know where a gap actually is.

## A practical starting workflow

1. Choose 10 to 20 target prompts, the bottom-funnel questions a buyer close to a decision would actually type, not vanity topics.
2. Run each prompt across ChatGPT, Perplexity, Gemini, and Google AI Overviews separately, and log whether the brand is cited, and if not, who is.
3. Study the tone, structure, and sourcing of whichever pages are getting cited for that prompt right now, that's the real, current bar to clear.
4. Rewrite or build content that opens with a direct answer to that exact prompt, then re-test.

## Frequently asked questions

**How do I get cited by ChatGPT specifically?**
Lead with a direct, quotable answer in the first sentence of each section, back it with named data, and be aware ChatGPT has been observed favoring consensus sources like Wikipedia and, notably, competitor sites at a higher rate than Google does for equivalent queries.

**How do I get cited by Perplexity?**
Ensure the site is crawlable (Perplexity respects robots.txt, so verify AI crawler access explicitly), structure content comprehensively across multiple facets of a topic, and include specific, named data rather than general claims, since Perplexity's retrieval leans on real-time and community sources more than some other platforms.

**How do I optimize for Google AI Overviews specifically?**
Focus on standard SEO fundamentals first: ranking well in traditional Google Search strongly correlates with AI Overview citation, since the two draw from the same index. Layer answer-first structure and clear headings on top of that foundation.

**How do I write content that AI chatbots actually cite, in one sentence?**
Answer the exact question in the first sentence of the relevant section, with no preamble, then support it with a specific, sourced fact.

## Related services

This is part of [AI Search & SEO](/services#ai-search-seo). See the approach applied in practice in [AI visibility: from invisible to citable](/case-studies/ai-visibility-geo-aeo). For the technical layer behind this, see [structured data and llms.txt for AI search visibility](/blog/structured-data-and-llms-txt).

Want a second pair of eyes on whether your content is actually structured to be cited? [Get in touch](/contact).`
  },
  {
    num: "06",
    slug: "structured-data-and-llms-txt",
    tag: "TECHNICAL",
    date: "Jul 31, 2026",
    read: "7 min read",
    metaTitle: "What Is llms.txt? Do You Actually Need One? | The Growth Files",
    metaDesc: "llms.txt is a proposed file for guiding AI crawlers. Here's what Google has actually confirmed about it, and when it's worth building one.",
    title: "What is llms.txt, and do I need one?",
    md: `# What is llms.txt, and do I need one?

llms.txt is a plain-text file placed at a website's root that's meant to give AI models a structured, curated summary of a site's key pages, similar in concept to an XML sitemap but written for AI systems rather than search crawlers. The honest, current answer on whether a site needs one is: probably not for the reason most guides claim. [Google's own Search Central documentation states plainly that site owners do not need machine-readable files, AI-specific markup, or an llms.txt file to appear in Google Search](https://www.fogdigitalmarketing.com/blog/llms-txt-file/), and that maintaining one will not harm visibility but will not help it either.

## What Google has actually confirmed

This is worth being precise about, since the marketing around llms.txt has often overstated it. [Gary Illyes confirmed at Google Search Central Live that Google does not support llms.txt and has no plans to](https://medium.com/@kaispriestersbach/the-llms-txt-is-dead-more-precisely-a-dud-ab7bee4f469c), and John Mueller has compared it directly to the old keywords meta tag, a self-declared signal that search engines learned to ignore because site owners control it and it's therefore easy to manipulate. When Google's own developer documentation briefly carried an llms.txt file in December 2025, Mueller clarified on the record that it was for **agent functionality**, not search, an internal platform rollout, not an endorsement.

One independent test is worth citing directly here: [out of 62,100 AI bot requests to one domain, exactly 84 went to its llms.txt file, about 0.1%](https://medium.com/@kaispriestersbach/the-llms-txt-is-dead-more-precisely-a-dud-ab7bee4f469c), performing worse than an average content page on the same site. The only consistent visitor to the file in that test was a technology-detection bot cataloguing which files exist, not an AI system using it to inform an answer.

## Where llms.txt might still have a legitimate role

This appears to hedge case by case, not a settled yes: [Lighthouse, Chrome's auditing tool, now includes an llms.txt check in an experimental "agentic browsing" category](https://searchengineland.com/google-llms-txt-chrome-lighthouse-478246), separate from search ranking entirely, aimed at browser-based AI agents completing tasks on a user's behalf, not at search or chat-based citation. AEO tracking tools like Peec.ai and AthenaHQ reportedly parse llms.txt when profiling a brand's AI visibility, so it may support monitoring workflows even without a confirmed citation benefit. Some practitioners argue for early adoption anyway on the logic that web standards get adopted because publishers start serving them first, the way XML sitemaps did in 2005, not because usage data proves value on day one.

## What to prioritize instead

Given the current, honest state of the evidence, the higher-leverage work is the same regardless of llms.txt: crawlable, well-structured HTML, genuine first-party data and expertise signals, and answer-first content, covered in more depth in [how to structure content so AI search engines cite it](/blog/how-to-structure-content-for-ai-citation).

## Frequently asked questions

**What is an llms.txt file?**
A plain-text file placed at a website's root, intended to give AI systems a structured, curated overview of a site's key pages, similar in concept to an XML sitemap but aimed at AI models rather than search engine crawlers.

**Does Google use llms.txt to improve AI search visibility?**
No. Google's Search Central documentation explicitly states llms.txt isn't necessary for Google Search or its AI features, and Google engineers have confirmed there's no plan to support it as a ranking or citation signal.

**Is there any confirmed benefit to having an llms.txt file?**
Not for citation in ChatGPT, Perplexity, or Google Search specifically, based on current evidence. It may have a narrow, separate role supporting browser-based AI agents and some third-party AEO monitoring tools, which is a different use case from search visibility.

**Should I remove my llms.txt file if I already have one?**
Not necessarily. Having one causes no confirmed harm. The mistake is treating it as a meaningful AI visibility lever and deprioritizing the content structure and technical fundamentals work that actually has evidence behind it.

## Related services

This is part of [AI Search & SEO](/services#ai-search-seo). For the content side of this work, see [how to structure content so AI search engines cite it](/blog/how-to-structure-content-for-ai-citation). See it applied in a real project in [AI visibility: from invisible to citable](/case-studies/ai-visibility-geo-aeo).

Want help figuring out what actually deserves your time in AI search optimization? [Get in touch](/contact).`
  },
  {
    num: "07",
    slug: "faq-schema-ai-visibility",
    tag: "TECHNICAL",
    date: "Jul 28, 2026",
    read: "6 min read",
    metaTitle: "Does FAQ Schema Still Help AI Visibility in 2026? | The Growth Files",
    metaDesc: "Google retired FAQ rich results in May 2026. Here's what that actually means for FAQ schema and AI search citation, honestly.",
    title: "What's FAQ schema, and does it still help AI visibility?",
    md: `# What's FAQ schema, and does it still help AI visibility?

FAQ schema, technically FAQPage structured data, is JSON-LD markup that explicitly labels a page's questions and their corresponding answers so search engines and AI systems can identify the question-answer relationship in the content. The honest 2026 answer to whether it helps AI visibility is more nuanced than most guides suggest: [Google officially retired FAQ rich results, the expandable dropdown display in search results, on May 7, 2026](https://www.searchenginejournal.com/google-drops-faq-rich-results-from-search/574429/), and [Google's own generative AI search guidance states plainly that structured data isn't required for AI Overviews or AI Mode](https://www.quattr.com/blog/faq-schema-in-2026), with no special schema needed for either.

## What actually changed, and what didn't

FAQPage schema itself is not deprecated, and [Google has said unused structured data doesn't cause problems for Search](https://www.tryvizup.com/blog/google-kills-faq-rich-results), so there's no need to strip it out. What changed is the visible SERP treatment: the expandable Q&A dropdown that used to appear beneath a search listing no longer renders for any site, following an earlier restriction in 2023 that limited it mostly to government and health domains. [Search Console's FAQ reporting and the Rich Results Test lose FAQ support in June 2026, with the API losing it in August 2026](https://www.quattr.com/blog/faq-schema-in-2026).

## Does FAQ schema still help with AI citation specifically

This is genuinely contested, and worth hedging honestly rather than repeating a confident claim either way. Some 2026 analyses report FAQ-schema pages are meaningfully more likely to appear in Google AI Overviews and to be cited by ChatGPT, but [that claim isn't confirmed by Google or any AI vendor directly](https://www.quattr.com/blog/faq-schema-in-2026), and should be treated as an unproven correlation rather than an established fact. What Google has confirmed is narrower: structured data isn't a required input for its generative AI features, though schema that accurately matches visible page content is still a reasonable, low-risk practice.

## What to actually do with FAQ content in 2026

The practical guidance that holds up regardless of the schema debate: [only mark up FAQ content where a page genuinely contains real questions people ask, with real, standalone answers](https://alevdigital.com/blog/faq-structured-data-2026/), not FAQ blocks added purely to chase a rich result that no longer exists. Structured data must match what's visibly on the page, this is a hard rule for a reason, mismatched schema is a trust problem, not a shortcut. The value of a genuinely useful FAQ section, clear questions, concise 40 to 100 word answers, doesn't depend on whether Google renders a dropdown for it.

## Frequently asked questions

**What is FAQ schema?**
FAQPage structured data: JSON-LD markup that explicitly labels a page's questions and their answers so search engines and AI systems can identify and extract the question-answer relationship in the content.

**Did Google remove FAQ rich results?**
Yes. Google officially ended the FAQ rich result display feature in Google Search on May 7, 2026, with related Search Console reporting and testing tool support removed in stages through June and August 2026.

**Should I remove FAQPage schema from my site now that rich results are gone?**
Not necessarily. Google has said unused structured data doesn't cause problems for Search. The stronger guidance is to keep FAQ markup only where the content is genuinely question-and-answer material, and to make sure it matches what's visibly on the page.

**Does FAQ schema improve citation in ChatGPT or Perplexity?**
This isn't confirmed. Some third-party analyses report a correlation, but neither Google nor other AI vendors have confirmed FAQ schema as a direct citation input. Treat any specific lift percentage cited elsewhere with caution until it's verifiable against a primary source.

## Related services

This is part of [AI Search & SEO](/services#ai-search-seo). For the broader technical picture, see [structured data and llms.txt for AI search visibility](/blog/structured-data-and-llms-txt). See genuine, question-led content structure applied in [AI visibility: from invisible to citable](/case-studies/ai-visibility-geo-aeo).

Not sure whether your FAQ content is pulling its weight? [Get in touch](/contact).`
  },
  {
    num: "08",
    slug: "check-track-ai-brand-visibility",
    tag: "MEASUREMENT",
    date: "Jul 24, 2026",
    read: "7 min read",
    metaTitle: "How to Check and Track AI Search Visibility (GA4 Guide) | The Growth Files",
    metaDesc: "How to check whether ChatGPT and Perplexity know your brand, and how to track AI referral traffic in GA4 once you know.",
    title: "How do I check and track whether AI systems know my brand?",
    md: `# How do I check and track whether AI systems know my brand?

Checking whether AI systems know a brand starts with manual testing: running the actual questions a buyer would ask, category questions, comparison questions, "who does X" questions, directly into ChatGPT, Perplexity, Google AI Overviews, and Microsoft Copilot, and recording whether the brand is mentioned, how it's characterized, and which competitors appear instead. This manual audit is the necessary first step, since standard rank trackers don't see AI citations at all.

## Auditing AI citation manually

A workable starting process:

1. Choose 10 to 20 target prompts that reflect real buyer questions, not vanity searches for the brand name itself.
2. Run each prompt separately across ChatGPT, Perplexity, Gemini, and Google AI Overviews, since [the same question often pulls different sources on each platform](https://www.joinamply.com/post/how-to-get-cited-by-chatgpt-perplexity-and-google-ai-overviews).
3. Log, for each prompt and platform, whether the brand was cited, and if not, which competitor was.
4. Repeat this on a rolling basis, since AI-generated answers change as models update and as content changes.

## Tracking AI referral traffic in GA4

Once a brand knows it's being cited somewhere, the next question is whether that citation actually sends visitors, and GA4 needs deliberate setup to answer this, since it doesn't track this cleanly by default.

**The native option.** [Google added a built-in "AI Assistant" channel to GA4's Default Channel Group on May 13, 2026](https://finance.yahoo.com/sectors/technology/articles/track-ai-traffic-ga4-chatgpt-122500037.html). When an incoming session's referrer matches a recognized AI domain, GA4 now automatically tags it with the medium \`ai-assistant\` and files it under this channel, no setup required. Find it under Reports → Acquisition → Traffic acquisition, with the primary dimension set to Session default channel group.

**Its limits.** This native channel has real gaps. [Google's documentation names sources like ChatGPT, Gemini, DeepSeek, Copilot, and Grok, but Perplexity is not listed, and clicks from Google AI Overviews and AI Mode are bundled into Organic Search rather than broken out separately](https://www.darwinapps.com/blog/how-to-track-chatgpt-gemini-and-perplexity-referral-traffic-in-ga4-and-crm/). Traffic from native mobile apps or privacy-restricted contexts often carries no referrer header at all, landing silently in Direct traffic, meaning the true AI referral number is very likely higher than what any channel report shows.

**Building a custom channel group.** For full coverage, including Perplexity: go to Admin → Data display → Channel groups, copy the Default Channel Group, and add a rule with Session source matching a regex pattern covering the AI domains that matter, for example a pattern including \`chatgpt.com\`, \`perplexity.ai\`, \`claude.ai\`, \`gemini.google.com\`, and \`copilot.microsoft.com\`. This custom rule needs to sit above the built-in Referral rule in the channel order, or GA4 will file matching sessions under generic Referral before ever checking the AI rule.

## What this data is actually good for

Once conversions or key events are properly configured in GA4, this setup makes it possible to see, per AI source, how many sessions, conversions, and how much revenue or lead value are attributable to AI referral traffic specifically, the evidence needed to justify continued investment in AI search optimization to anyone who needs a number, not just a citation screenshot.

## Frequently asked questions

**How do I check if ChatGPT knows about my brand?**
Run the actual questions a buyer would ask directly in ChatGPT, category questions and comparisons, not just a search for the brand name, and note whether the brand appears, how it's described, and which competitors are named instead. Repeat this regularly, since answers change over time.

**How do I track AI referral traffic in GA4?**
Use GA4's native AI Assistant channel, added May 13, 2026, for a no-setup baseline, then build a custom channel group with a regex rule covering additional platforms like Perplexity that the native channel doesn't include, placed above the default Referral rule.

**Does the native GA4 AI Assistant channel capture everything?**
No. It excludes Perplexity, bundles Google AI Overviews and AI Mode traffic into Organic Search rather than a separate line, and misses sessions where no referrer header is passed, which land in Direct instead.

**Why would AI traffic show up as "Direct" in GA4?**
Some AI platforms, particularly native mobile apps, don't pass a referrer header when a user clicks a citation link, so GA4 has no source to attribute the session to and defaults it to Direct, which means the real AI referral number is very likely an undercount.

## Related services

This is part of [AI Search & SEO](/services#ai-search-seo) and [Analytics & Data](/services#analytics-data). This diagnosis process is exactly what's covered in [AI visibility: from invisible to citable](/case-studies/ai-visibility-geo-aeo).

Want help setting this up properly, or interpreting what the data is actually telling you? [Get in touch](/contact).`
  },
  {
    num: "09",
    slug: "aeo-for-b2b-companies",
    tag: "AI SEARCH",
    date: "Jul 21, 2026",
    read: "6 min read",
    metaTitle: "Does AEO Matter for B2B Companies in 2026? | The Growth Files",
    metaDesc: "B2B buyers are shifting to AI chatbots for vendor research faster than most sites are updating their content. What the 2026 data actually shows.",
    title: "Does AEO matter for B2B companies?",
    md: `# Does AEO matter for B2B companies?

Yes, and the shift has moved faster than most B2B content strategies have kept up with. [A March to April 2026 Semrush survey of over 600 U.S. B2B professionals found 76% use ChatGPT for work and 71% specifically for product research](https://www.semrush.com/blog/how-ai-shapes-b2b-buying/), with Google Gemini following at 61% for product research. This isn't a niche behavior confined to early adopters, it's now a mainstream part of how B2B buyers evaluate vendors before ever contacting sales.

## What the broader B2B research shows

Multiple independent 2026 studies converge on the same direction, even where the exact percentages differ:

- [G2's March 2026 survey of 1,076 B2B software decision-makers found 51% now begin their research in an AI chatbot rather than a traditional search engine](https://www.prnewswire.com/news-releases/new-g2-research-half-of-b2b-software-buyers-now-start-their-research-with-ai-chatbots-302742807.html), up sharply from 29% just a year earlier.
- The same G2 report found 69% of buyers chose a different vendor than they originally planned based on AI chatbot guidance, and roughly a third purchased from a vendor they'd never previously heard of.
- Forrester's 2026 Buyers' Journey Survey, covering nearly 18,000 global business buyers, found 94% used AI somewhere during their most recent purchase process, and named generative AI as a more meaningful research source than any single traditional channel.

## Why this matters more for B2B specifically

B2B purchasing decisions typically involve longer research cycles and more independent evaluation before a buyer ever speaks to a salesperson, which is exactly the phase AI chatbots are compressing. If a company isn't part of the answer an AI system gives when a buyer asks it to compare vendors in a category, it risks being excluded from the shortlist before a sales conversation is even possible, regardless of how strong that company's outbound sales motion is.

## What this means practically

The response isn't necessarily building brand-new content from scratch. Much of it starts with checking what's already true: does the company's existing site content actually answer the comparison and evaluation questions a buyer would ask, and is it structured so an AI system can extract a clean, confident answer from it, covered in more depth in [how to structure content so AI search engines cite it](/blog/how-to-structure-content-for-ai-citation). The first step is always finding out where the gap currently is, not guessing.

## Frequently asked questions

**What percentage of B2B buyers use AI tools in their research?**
Estimates vary by study and methodology, but 2026 research consistently puts the figure well above half. A Semrush survey found 71% of B2B professionals use AI tools specifically for product research, while separate G2 and Forrester research put overall AI usage in the buying process between roughly half and the low nineties percent, depending on how the question was asked.

**Is this shift limited to software or tech buyers?**
The clearest data currently comes from B2B software buying specifically, where G2 and Forrester have both tracked the shift closely. Broader B2B categories appear to be following a similar direction based on general AI adoption trends, though less category-specific data currently exists outside software.

**Does AEO replace the need for a traditional B2B content strategy?**
No. It extends it. The underlying need, genuinely useful, expert content that answers real buyer questions, hasn't changed. What's changed is that a meaningful share of buyers now encounter that content indirectly, through an AI-generated summary, rather than by landing on the page directly.

**How urgent is this for a B2B company that hasn't started yet?**
Reasonably urgent, given how quickly the reported adoption numbers have moved year over year in the research above. The practical first step isn't a full rebuild, it's an audit: running real buyer questions through the major AI platforms to see where the company currently stands.

## Related services

This is part of [AI Search & SEO](/services#ai-search-seo) and [B2B Lead Generation](/services#b2b-lead-generation). See a real B2B AI visibility project in [AI visibility: from invisible to citable](/case-studies/ai-visibility-geo-aeo).

Want to know where your company currently stands when a buyer asks AI to compare vendors in your category? [Get in touch](/contact).`
  },
  {
    num: "10",
    slug: "is-geo-the-future-of-seo",
    tag: "AEO & GEO",
    date: "Jul 17, 2026",
    read: "7 min read",
    metaTitle: "Is GEO the Future of SEO? Will AI Replace Google Search? | The Growth Files",
    metaDesc: "Traditional search isn't disappearing, but its share of how people find things is shrinking. What the 2026 data actually says about where this goes.",
    title: "Is GEO the future of SEO, and will AI search replace Google?",
    md: `# Is GEO the future of SEO, and will AI search replace Google?

AI search is very unlikely to fully replace traditional search, but it's already taking a real, measurable share of discovery away from it, which makes generative engine optimization (GEO) a genuine addition to SEO rather than science fiction or a temporary trend. [Gartner predicts traditional search engine volume will drop 25% by 2026 as AI chatbots and virtual agents absorb queries that previously went through search engines](https://www.frase.io/blog/what-is-answer-engine-optimization-the-complete-guide-to-getting-cited-by-ai). That's a significant shift in share, not the end of search itself.

## What the numbers actually show

A few data points worth holding side by side, since they tell a consistent but not apocalyptic story:

- [Google's AI Overviews already reach roughly 2 billion monthly users](https://searchengineland.com/how-to-optimize-content-for-ai-search-engines-a-step-by-step-guide-467272), which means AI-generated answers are increasingly appearing inside Google's own results, not just in separate chat apps.
- [ChatGPT processes over 2.5 billion prompts a day](https://www.tryprofound.com/resources/articles/what-is-answer-engine-optimization), with weekly active users in the hundreds of millions.
- In B2B software specifically, [G2's 2026 research found 51% of buyers now start their research in an AI chatbot rather than Google](https://www.prnewswire.com/news-releases/new-g2-research-half-of-b2b-software-buyers-now-start-their-research-with-ai-chatbots-302742807.html), up from 29% a year earlier, a fast enough move to be a genuine planning consideration, not a rounding error.

At the same time, [Google's own AI Mode and AI Overviews draw from the same underlying index as traditional Search](https://www.pravinkumar.co/blog/perplexity-chatgpt-google-ai-mode-citation-differences-2026), and around 97% of AI Overview citations reportedly come from pages already ranking in Google's top 20 organic results. That's a meaningful signal: Google's own AI features are built on top of traditional search fundamentals, not as a replacement for them.

## So is GEO "the future," or just an addition

The more accurate framing is that GEO is becoming a required addition to SEO, not a replacement for it. [AEO builds on SEO fundamentals rather than replacing them](https://www.rygr.us/2026/02/04/why-aeo-answer-engine-optimization-is-critical-to-2026-marketing-planning), crawlability, site structure, and genuinely useful content still matter in both worlds. What's changed is that a growing share of discovery now happens through a synthesized answer with very few cited sources, rather than a ranked list a person scrolls through, which raises the stakes of being one of those few sources considerably.

## What this means practically, without overreacting

Nobody needs to abandon SEO. The sensible response is treating AI search optimization as an added layer on the same foundation: keep the technical and content fundamentals strong, then add answer-first structure, verifiable trust signals, and deliberate testing of how the brand shows up across AI platforms specifically, covered in [how to structure content so AI search engines cite it](/blog/how-to-structure-content-for-ai-citation).

## Frequently asked questions

**Will AI search completely replace Google?**
Unlikely in the near term. Google's own AI features are built on top of its traditional search index, and the evidence so far points to AI search taking a growing share of discovery rather than eliminating traditional search entirely.

**How much is traditional search volume actually expected to decline?**
Gartner's widely cited prediction puts the decline at 25% by 2026 due to AI chatbots and virtual agents, a meaningful shift in share rather than a collapse of search as a category.

**Is GEO worth investing in if my industry hasn't shifted to AI search yet?**
It depends on the audience, but the shift has moved faster than most industries expected, particularly in B2B software. Running a quick audit of how the brand currently appears (or doesn't) across ChatGPT, Perplexity, and Google AI Overviews is a low-cost way to check before committing significant budget.

**Does investing in GEO mean deprioritizing traditional SEO?**
No. The fundamentals overlap heavily. GEO is additive work layered on top of solid SEO, not a reason to abandon rank tracking, technical SEO, or content built for traditional search.

## Related services

This is part of [AI Search & SEO](/services#ai-search-seo). For the practical structure work this points to, see [how to structure content so AI search engines cite it](/blog/how-to-structure-content-for-ai-citation), and for a real example of results, see [AI visibility: from invisible to citable](/case-studies/ai-visibility-geo-aeo).

Want an honest read on how much this actually matters for your specific business right now? [Get in touch](/contact).`
  },
  {
    num: "11",
    slug: "cost-of-ai-search-optimization",
    tag: "WORKING WITH ME",
    date: "Jul 14, 2026",
    read: "6 min read",
    metaTitle: "How Much Does AI Search Optimization Cost in 2026? | The Growth Files",
    metaDesc: "AEO and GEO pricing ranges widely by scope. A grounded look at what businesses are actually paying in 2026, and what changes the number.",
    title: "How much does AI search optimization cost?",
    md: `# How much does AI search optimization cost?

AI search optimization pricing varies widely by scope, but most published 2026 estimates converge on a similar range: [entry-level engagements start around €1,500 per month, mid-market programs typically run €3,000 to €8,000 per month, and enterprise-scale engagements reach €15,000 to €30,000 or more](https://theremarkableagency.com/blog/aeo-geo-agency-cost). A standalone AEO or GEO audit, without an ongoing retainer, commonly costs €1,000 to €5,000 as a one-time fee across multiple published sources.

## What actually changes the price

The number moves based on a few concrete factors, not the agency's branding:

- **Number of platforms covered.** [Optimizing for Google AI Overviews alone is a narrower scope than building visibility across ChatGPT, Perplexity, Gemini, and Copilot simultaneously](https://thedigitalelevator.com/blog/aeo-and-geo-pricing-guide/), and pricing scales with how many platforms are actively monitored and targeted.
- **Content volume and page count.** More pages needing restructuring or new content means more production hours, regardless of the specific pricing model used.
- **Off-site authority and monitoring work.** Programs that include ongoing prompt auditing, competitive citation tracking, and digital PR for third-party mentions cost meaningfully more than on-page structure work alone.
- **Whether it's bundled with existing SEO.** [Many agencies price AEO and GEO as a 20 to 40% premium layered onto an existing SEO retainer](https://blog.frizerly.com/22935/how_to_price_ai_seo_services_aeo__geo_pricing_models_for_agencies), rather than as a fully separate line item, on the logic that the underlying technical and content work overlaps significantly.

## A useful warning sign

Multiple independent pricing guides flag the same pattern: [offers below roughly €1,500 a month claiming full AEO scope are usually a relabeled traditional SEO retainer](https://www.310creative.com/blog/aeo-agency-pricing) without a genuine AI-specific methodology, cross-platform monitoring, or citation-focused deliverables. That doesn't mean cheap engagements are worthless, but it's worth checking specifically what's included before assuming "AEO" in the name means AI-specific work is actually happening.

## Tools versus services

Separate from agency or consultant fees, AI visibility monitoring tools themselves run roughly €20 to €500 a month depending on the platform and scope, a real ongoing cost worth budgeting for even in a mostly in-house or freelance-led approach, since manual prompt testing alone doesn't scale well past a handful of tracked queries.

## Frequently asked questions

**What's a realistic starting budget for AI search optimization?**
Based on multiple 2026 pricing guides, a focused, mid-market engagement typically runs €3,000 to €8,000 per month, with smaller or narrower-scope engagements starting closer to €1,500 per month and enterprise programs running considerably higher.

**Is a one-time audit worth doing before committing to an ongoing retainer?**
Often, yes. A standalone AEO or GEO audit commonly costs €1,000 to €5,000 and can establish a genuine baseline, where a brand currently stands across AI platforms, before committing to a larger recurring spend.

**Why do AEO and GEO cost more than equivalent traditional SEO work?**
Several pricing guides attribute the premium to added cross-platform tracking, since a brand needs to be tested separately across ChatGPT, Perplexity, Gemini, and Google AI Overviews rather than tracked on one search engine, plus the additional content volume many programs require.

**Is it cheaper to build AI search optimization capability in-house instead of hiring an agency?**
It can be, particularly for a business with an existing content team, but it depends on internal capacity. In-house teams still need investment in monitoring tools and specific AEO/GEO knowledge that differs meaningfully from traditional SEO practice, so the cost shifts rather than disappears.

## Related services

This is part of [AI Search & SEO](/services#ai-search-seo). For how to think about whether to bring in outside help at all, see [do you need an SEO agency or an AEO specialist](/blog/seo-agency-vs-aeo-specialist).

Want a straightforward, no-pressure read on what a realistic scope of work would look like for your business? [Get in touch](/contact).`
  },
  {
    num: "12",
    slug: "seo-agency-vs-aeo-specialist",
    tag: "WORKING WITH ME",
    date: "Jul 10, 2026",
    read: "7 min read",
    metaTitle: "Do You Need an SEO Agency or an AEO Specialist? | The Growth Files",
    metaDesc: "Splitting SEO and AEO across two providers usually backfires. What to actually look for when deciding who should own this work.",
    title: "Do I need an SEO agency or an AEO specialist?",
    md: `# Do I need an SEO agency or an AEO specialist?

Most businesses are better served by one provider who genuinely understands both disciplines, rather than splitting SEO and AEO across two separate agencies or teams. [Guidance from agencies working in this space directly warns against splitting AEO and SEO across two different providers, or two different budgets with separate reporting](https://www.yesoptimist.com/best-aeo-agencies/), since the two disciplines share enough underlying fundamentals, crawlability, content quality, technical structure, that dividing ownership tends to create duplicated work and conflicting priorities rather than better results.

## Why the split usually backfires

SEO and AEO aren't competing disciplines pulling in different directions, they're overlapping work aimed at different, related outcomes. A generalist SEO provider without real AEO experience risks applying traditional keyword-ranking tactics to a problem that behaves differently: [hiring a generalist SEO team for AEO work is one of the most commonly cited mistakes in 2026 agency guidance](https://organikpi.com/blog/geo-ai-search/aeo-services-pricing-buy-vs-build/), since answer-first structure, entity building, and cross-platform citation testing require a different day-to-day practice than rank tracking alone.

## What to actually check before hiring anyone

Regardless of whether it's a specialist AEO agency, a combined SEO/AEO shop, or an independent consultant, a few concrete questions separate real capability from a relabeled SEO offering:

1. **Do they test across multiple AI platforms, not just one?** Real AEO work involves running target prompts across ChatGPT, Perplexity, Gemini, and Google AI Overviews separately, since citation behavior differs meaningfully by platform.
2. **Can they show specific AEO deliverables, not just SEO ones with new branding?** This includes answer-first content restructuring, entity and trust signal work, and AI citation monitoring, distinct from a standard SEO content calendar.
3. **Do they explain what's unconfirmed, not just what's proven?** Given how much of this space is genuinely unsettled, structured data's actual effect on citation, llms.txt's real impact, a provider who's honest about the limits of current evidence is a stronger signal than one selling certainty.
4. **How do they measure success?** AI citation rate and AI referral traffic in tools like GA4 are the relevant metrics here, not just traditional keyword rank position.

## When an in-house approach makes more sense

[Businesses with an existing content team of three or more marketers and a culture of ongoing content experimentation are sometimes better served bringing in a consultant briefly to set the initial strategy, then executing in-house](https://www.yesoptimist.com/best-aeo-agencies/), rather than an ongoing agency retainer. This tends to be more cost-effective for teams that already have the underlying content production capacity and just need the AEO-specific direction.

## Frequently asked questions

**Should I hire a separate agency for AEO in addition to my current SEO agency?**
Generally not recommended. Guidance from practitioners in this space consistently favors one provider owning both SEO and AEO together, since the disciplines overlap significantly and splitting them tends to create duplicated or conflicting work.

**How do I know if an "AEO agency" actually does AEO-specific work?**
Ask specifically whether they test across multiple AI platforms separately, whether they can show distinct AEO deliverables like answer-first restructuring and entity building, and how they measure success. A provider only offering traditional SEO tactics with AEO branding is a common pattern worth watching for.

**Is a freelance AEO specialist a reasonable alternative to an agency?**
Yes, for a well-scoped need, particularly if the business already has in-house content production capacity and mainly needs strategic direction and initial setup rather than ongoing full-service execution.

**What questions should I ask before signing an AEO or AEO/SEO retainer?**
Which specific AI platforms are covered, how citation success is measured and reported, what's included in the scope versus billed as an add-on, and whether the provider can point to concrete evidence for their recommendations rather than presenting unsettled claims as established fact.

## Related services

This is part of [AI Search & SEO](/services#ai-search-seo). For a sense of what a realistic budget looks like, see [how much does AI search optimization cost](/blog/cost-of-ai-search-optimization). See the underlying approach applied directly in [AI visibility: from invisible to citable](/case-studies/ai-visibility-geo-aeo).

If you're trying to figure out whether this needs an agency, a specialist, or an in-house push, [get in touch](/contact) and I'll give you a straight answer, even if that answer isn't me.`
  }
];
export default POSTS;
