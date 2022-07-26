"use strict";

import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string(),
  object: z.object({
    a: z.string(),
    // b: z.number().nullish(),
    c: z.boolean(),
    innerObject: z.object({
      a: z.string(),
      b: z.number(),
      c: z.boolean(),
    }),
  }),
  // array: z.array(z.object({ a: z.string(), b: z.number(), c: z.boolean() })),
  // union: z.union([z.string(), z.number()]),
});

type test = z.infer<typeof schema>;

const t: test = {};
