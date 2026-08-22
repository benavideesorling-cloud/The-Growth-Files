**Meta title:** How to Check and Track AI Search Visibility (GA4 Guide) | The Growth Files

**Meta description:** How to check whether ChatGPT and Perplexity know your brand, and how to track AI referral traffic in GA4 once you know.

---

# How do I check and track whether AI systems know my brand?

Checking whether AI systems know a brand starts with manual testing: running the actual questions a buyer would ask, category questions, comparison questions, "who does X" questions, directly into ChatGPT, Perplexity, Google AI Overviews, and Microsoft Copilot, and recording whether the brand is mentioned, how it's characterized, and which competitors appear instead. This manual audit is the necessary first step, since standard rank trackers don't see AI citations at all.

## Auditing AI citation manually

A workable starting process:

1. Choose 10 to 20 target prompts that reflect real buyer questions, not vanity searches for the brand name itself.
2. Run each prompt separately across ChatGPT, Perplexity, Gemini, and Google AI Overviews, since [the same question often pulls different sources on each platform](https://www.joinamply.com/post/how-to-get-cited-by-chatgpt-perplexity-and-google-ai-overviews).
3. Log, for each prompt and platform, whether the brand was cited, and if not, which competitor was.
4. Repeat this on a rolling basis, since AI-generated answers change as models update and as content changes.

## Tracking AI referral traffic in GA4

Once a brand knows it's being cited somewhere, the next question is whether that citation actually sends visitors, and GA4 needs deliberate setup to answer this, since it doesn't track this cleanly by default.

**The native option.** [Google added a built-in "AI Assistant" channel to GA4's Default Channel Group on May 13, 2026](https://finance.yahoo.com/sectors/technology/articles/track-ai-traffic-ga4-chatgpt-122500037.html). When an incoming session's referrer matches a recognized AI domain, GA4 now automatically tags it with the medium `ai-assistant` and files it under this channel, no setup required. Find it under Reports → Acquisition → Traffic acquisition, with the primary dimension set to Session default channel group.

**Its limits.** This native channel has real gaps. [Google's documentation names sources like ChatGPT, Gemini, DeepSeek, Copilot, and Grok, but Perplexity is not listed, and clicks from Google AI Overviews and AI Mode are bundled into Organic Search rather than broken out separately](https://www.darwinapps.com/blog/how-to-track-chatgpt-gemini-and-perplexity-referral-traffic-in-ga4-and-crm/). Traffic from native mobile apps or privacy-restricted contexts often carries no referrer header at all, landing silently in Direct traffic, meaning the true AI referral number is very likely higher than what any channel report shows.

**Building a custom channel group.** For full coverage, including Perplexity: go to Admin → Data display → Channel groups, copy the Default Channel Group, and add a rule with Session source matching a regex pattern covering the AI domains that matter, for example a pattern including `chatgpt.com`, `perplexity.ai`, `claude.ai`, `gemini.google.com`, and `copilot.microsoft.com`. This custom rule needs to sit above the built-in Referral rule in the channel order, or GA4 will file matching sessions under generic Referral before ever checking the AI rule.

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

Want help setting this up properly, or interpreting what the data is actually telling you? [Get in touch](/contact).
