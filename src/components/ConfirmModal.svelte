<script>
	import { Modal, Button, P, Input } from "flowbite-svelte";
  import ExclamationCircleOutline from 'flowbite-svelte-icons/ExclamationCircleOutline.svelte'
	import { confirmModal, confirmText, yesClick, noClick,
           promptModal, promptText, cancelClick, okClick, promptValue } from "../util/interaction";
  
</script>

<Modal bind:open={$confirmModal} size="xs" autoclose on:close={noClick}>
  <!-- <ExclamationCircleOutline size="lg" /> -->
  <P size="xl">{$confirmText}</P>
  <Button class="me-2" on:click={yesClick}>Yes, I'm sure</Button>
  <Button color="alternative" on:click={noClick}>No, cancel</Button>
</Modal>

<Modal bind:open={$promptModal} size="xs" autoclose on:close={cancelClick}>
  <!-- <ExclamationCircleOutline size="lg" /> -->
  <P size="xl">{$promptText}</P>
  <Input bind:value={$promptValue} placeholder="Type value"/>
  <Button class="me-2" on:click={() => okClick($promptValue)} disabled={!$promptValue.trim()}>OK</Button>
  <Button color="alternative" on:click={cancelClick}>Cancel</Button>
</Modal>