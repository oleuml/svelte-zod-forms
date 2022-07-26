<script lang="ts">
  import type { z } from "zod";
  import ZodBoolean from "./components/ZodBoolean.svelte";
  import ZodDate from "./components/ZodDate.svelte";
  import ZodNumber from "./components/ZodNumber.svelte";
  import ZodString from "./components/ZodString.svelte";

  type T = $$Generic<z.ZodRawShape>;

  export let object: z.ZodObject<T>;
  export let namePrefix = "";
  console.log(object);
</script>

{#each Object.entries(object._def.shape()) as [childName, childZodObject]}
  {@const key = namePrefix ? namePrefix + "." + childName : childName}
  {@const childType = childZodObject._def.typeName}
  {@const childDef = childZodObject._def}
  <div>
    {#if childType === "ZodString"}
      <ZodString {key} label={childName} />
    {:else if childType === "ZodBoolean"}
      <ZodBoolean {key} label={childName} />
    {:else if childType === "ZodNumber"}
      <ZodNumber {key} label={childName} _def={childDef} />
    {:else if childType === "ZodDate"}
      <ZodDate {key} label={childName} />
    {:else if childType === "ZodObject"}
      <svelte:self object={childZodObject} namePrefix={key} />
    {:else}
      Not implemented yet: {childType}
    {/if}
  </div>
{/each}
