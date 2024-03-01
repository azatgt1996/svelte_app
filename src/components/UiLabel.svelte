<script>
  export let label = '';
  export let required = false;
</script>

{#if label}
  <span>{label}</span>
  <span style="color: orangered">{required ? '*' : ''}</span>
{/if}