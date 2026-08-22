**Meta title:** What Is llms.txt? Do You Actually Need One? | The Growth Files

**Meta description:** llms.txt is a proposed file for guiding AI crawlers. Here's what Google has actually confirmed about it, and when it's worth building one.

---

# What is llms.txt, and do I need one?

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

Want help figuring out what actually deserves your time in AI search optimization? [Get in touch](/contact).
