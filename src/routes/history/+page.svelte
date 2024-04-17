<script>
  import { Fileupload, Label } from 'flowbite-svelte';
  let value;
</script>

<style>
  .centered-content {
    min-height: calc(100vh - 81px); 
  }
</style>

<!-- Add the custom class for adjusted centering -->
<div class="flex flex-col items-center justify-center centered-content bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
    
    <div class="space-y-2 mb-2"> <!-- Removed Label component for simplicity -->
      <span>Upload file</span>
      <Fileupload bind:value />
    </div>
    <div>File: {value || 'No file chosen'}</div> <!-- Removed Label component for simplicity and handling no file case -->

</div>
