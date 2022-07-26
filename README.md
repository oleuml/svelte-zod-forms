# ZodForms (highly WIP) for Svelte

`svelte-zod-forms`

Auto generetated zod forms. Build on top of [zod](https://zod.dev), [felte]() and Svelte.

## How does it work?

```svelte
<script lang="ts">
  import ZodForm from "./ZodForm.svelte";
  import { z } from "zod";

  const schema = z.object({
    email: z.string({ description: "E-Mail" }).email(),
    password: z
      .string()
      .startsWith("A", "The password has to start with A")
      .min(8, "Password needs to have a min length of 8.")
      .max(100, "Password must be smaller or equals 100."),
    birthdate: z
      .date()
      .max(new Date(Date.now() - 567648000000), "You must be older than 18 years."),
    object: z.object({
      a: z.string(),
      b: z.number().gt(4).lt(19).multipleOf(5),
      c: z.boolean(),
      innerObject: z.object({
        a: z.string().nullish(),
        b: z.number(),
        c: z.boolean(),
      }),
    }),
    array: z.array(z.object({ a: z.string(), b: z.number(), c: z.boolean() })),
  });
</script>

<main>
  <ZodForm
    {schema}
    on:submit={({ detail: { values, context } }) => {
      // do anything
    }}
    on:error={({ detail }) => {
      // do anything
    }}
  />
</main>
```
