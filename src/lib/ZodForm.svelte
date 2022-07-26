<script lang="ts">
  import { createForm } from "felte";
  import type { SubmitContext } from "@felte/common/dist/types";
  import { reporter } from "@felte/reporter-svelte";
  import { validator } from "@felte/validator-zod";
  import type { z } from "zod";
  import ZodObject from "./ZodObject.svelte";
  import { createEventDispatcher } from "svelte";

  type T = $$Generic<z.ZodRawShape>;

  export let schema: z.ZodObject<T>;

  type SchemaType = z.infer<typeof schema>;
  export let submitTitle = "Submit";

  const recursiveTransform = (values: any, schema: z.ZodObject<T>) => {
    let transformed: any = {};
    Object.entries(schema._def.shape()).forEach(([key, value]) => {
      switch (value._def.typeName) {
        case "ZodDate":
          transformed[key] = new Date(values[key]);
          break;
        case "ZodObject":
          transformed[key] = recursiveTransform(values[key], schema._def.shape()[key]);
          break;
        default:
          transformed[key] = values[key];
          break;
      }
    });
    return transformed;
  };

  const dispatchSubmit =
    createEventDispatcher<{ submit: { values: SchemaType; context: SubmitContext<SchemaType> } }>();
  const dispatch = createEventDispatcher();
  const { form, data } = createForm({
    onSubmit: (values: SchemaType, context: SubmitContext<SchemaType>) => {
      dispatchSubmit("submit", { values: values, context: context });
    },
    onSuccess: (response, context) => {
      // Not working
      dispatch("success", { response: response, context: context });
    },
    onError: (error, context) => {
      // Not working
      dispatch("error", { error: error, context: context });
    },
    transform: (values) => recursiveTransform(values, schema),
    extend: [reporter, validator({ schema })],
  });
</script>

<form use:form>
  <ZodObject object={schema} />
  <button type="submit">{submitTitle}</button>
</form>
