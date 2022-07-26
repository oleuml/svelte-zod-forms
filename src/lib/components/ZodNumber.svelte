<script lang="ts">
  import type { z } from "zod";
  import { ValidationMessage } from "@felte/reporter-svelte";

  export let key: string;
  export let label: string;
  export let _def: z.ZodNumberDef;
  let value: number;
  const checks = _def.checks;

  const min = checks?.find((value) => value.kind === "min");
  const max = checks?.find((value) => value.kind === "max");
  const int = checks?.find((value) => value.kind === "int");
  const multipleOf = checks?.find((value) => value.kind === "multipleOf");

  let step = multipleOf?.value;

  console.log(checks);
</script>

<label for={key}>{label}: </label>
<input id={key} name={key} type="number" min={min?.value} max={max?.value} {step} />
<ValidationMessage for={key} let:messages={message}>
  {#if message !== null && Array.isArray(message)}
    <ul>
      {#each message as m}
        <li>{m}</li>
      {/each}
    </ul>
  {/if}
</ValidationMessage>
