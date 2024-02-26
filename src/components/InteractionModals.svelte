<script>
	import { Modal, Button, P, Input } from 'flowbite-svelte';
	import { confirmModal, confirmText, yesClick, noClick } from '../util/interaction';
	import { promptModal, promptText, promptHint, promptValue, cancelClick, okClick } from '../util/interaction';
</script>

<Modal bind:open={$confirmModal} autoclose on:close={noClick}
       class="text-center" style="max-width: 360px">
	<P size="xl" align="center">{$confirmText}</P>
	<Button class="me-2" on:click={yesClick}>Yes, I'm sure</Button>
	<Button color="alternative" on:click={noClick}>No, cancel</Button>
</Modal>

<Modal bind:open={$promptModal} title={$promptText} size="xs"
			 autoclose on:close={cancelClick}>
	<Input bind:value={$promptValue} placeholder={$promptHint} />
	<Button class="me-2" on:click={() => okClick($promptValue)} disabled={!$promptValue.trim()}>OK</Button>
	<Button color="alternative" on:click={cancelClick}>Cancel</Button>
</Modal>