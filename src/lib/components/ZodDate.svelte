<script lang="ts">
  import { ValidationMessage } from "@felte/reporter-svelte";

  export let key: string;
  export let label: string;
</script>

<label for={key}>{label}: </label>
<input id={key} name={key} type="date" />
<ValidationMessage for={key} let:messages={message}>
  {#if message !== null && Array.isArray(message)}
    <ul>
      {#each message as m}
        <li>{m}</li>
      {/each}
    </ul>
  {/if}
</ValidationMessage>
