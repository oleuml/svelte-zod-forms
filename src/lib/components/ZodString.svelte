<script lang="ts">
  import { ValidationMessage } from "@felte/reporter-svelte";

  export let key: string;
  export let label: string;
</script>

<label for={key}>{label}: </label>
<input id={key} name={key} type="text" />
<ValidationMessage for={key} let:messages>
  {#if messages !== null && Array.isArray(messages)}
    <ul>
      {#each messages as m}
        <li>{m}</li>
      {/each}
    </ul>
  {/if}
</ValidationMessage>
