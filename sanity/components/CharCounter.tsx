import { Box, Text } from "@sanity/ui";
import type { StringInputProps, TextInputProps } from "sanity";
import { evaluateLength } from "./seoChecks";

type Thresholds = {
  /** [min, max] of the recommended range. */
  target: [number, number];
  /** Below this length, flag as unusually short. Optional — some fields only need an upper warning. */
  warnBelow?: number;
};

/**
 * Wraps a string/text field with a live character count and soft,
 * non-blocking guidance below it — never a validation error, just an
 * informational line. Used for SEO title, meta description, social
 * title, and social description, each with their own target range.
 * Shares its length-evaluation logic (seoChecks.ts) with the consolidated
 * warnings list in SeoPreviewPanel, so the two never disagree.
 */
export function withCharCounter(thresholds: Thresholds) {
  return function CharCounterInput(props: StringInputProps | TextInputProps) {
    const value = typeof props.value === "string" ? props.value : "";
    const { length, status } = evaluateLength(value, thresholds);
    const [min, max] = thresholds.target;

    const messages: Record<typeof status, string> = {
      empty: `0 characters — aim for roughly ${min}–${max}`,
      short: `${length} characters — shorter than usual for this field (roughly ${min}–${max} is typical)`,
      long: `${length} characters — longer than the ~${max} guideline (not a hard limit, may get truncated in search/social previews)`,
      ok: `${length} characters — within the typical ${min}–${max} range`,
    };
    const caution = status === "short" || status === "long";

    return (
      <Box>
        {props.renderDefault(props)}
        <Box marginTop={2}>
          <Text size={1} muted={!caution} weight={caution ? "medium" : undefined}>
            {messages[status]}
          </Text>
        </Box>
      </Box>
    );
  };
}
