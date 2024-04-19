<script lang="ts">
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
    import { writable } from 'svelte/store';
    import { Input, GradientButton } from 'flowbite-svelte';
    import { timeMap, columns, typeOptions } from '../../../stores';
    import { page } from '$app/stores';
    const editKey = $page.url.searchParams.get('key');

    let inputVal = [];
    let newKey;

    $: if (editKey) {
        timeMap.subscribe(map => {
            if (map.has(editKey)) {
                inputVal = map.get(editKey).slice(); // Copy values for editing
                newKey = editKey; // Initialize newKey with current editing key
            }
        });
    }

    function save() {
        if (editKey !== newKey) {
            // Handle key change: Remove old key, add new key
            timeMap.update(map => {
                map.delete(editKey);
                map.set(newKey, inputVal);
                updateTypeOptions(editKey, newKey); // Update typeOptions with new key
                return map;
            });
        } else {
            // Update without changing the key
            timeMap.update(map => {
                map.set(newKey, inputVal);
                return map;
            });
        }
    }

    function updateValue(index, newValue) {
        if (newValue < 0) newValue = 0;
        else if (newValue > 999) newValue = 999;
        inputVal[index] = newValue;
        inputVal = inputVal.slice(); // Create a new array to trigger reactivity
    }

    // Update the typeOptions store when keys change
    function updateTypeOptions(oldKey, newKey) {
        typeOptions.update(options => {
            const index = options.findIndex(option => option.value === oldKey);
            if (index !== -1) {
                options[index].value = newKey;
                options[index].name = newKey; // You might want to customize the name differently
            } else {
                options.push({ value: newKey, name: newKey }); // Add new option if not found
            }
            return options;
        });
    }
</script>

<style>
    .centered-content {
      min-height: calc(100vh - 81px); 
    }
</style>

<div class="flex flex-col items-center justify-center centered-content bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  <Table hoverable={true}>
    <TableHead>
        {#each $columns as col}
        <TableHeadCell>{col}</TableHeadCell>
        {/each}
      <TableHeadCell>
        <span class="sr-only">Save</span>
      </TableHeadCell>
    </TableHead>
    <TableBody class="divide-y">
        {#each [...$timeMap] as [key, value]}
            <TableBodyRow>
                {#if key === editKey}
                    <TableBodyCell>
                        <Input type="text" value={newKey} on:input={e => newKey = e.target.value} size="sm" />
                    </TableBodyCell>
                    {#each value as text, index (index)}
                    <TableBodyCell>
                        <Input type="number" value={inputVal[index]} on:input={e => updateValue(index, e.target.value)} max="999" min="0" size="sm" />
                    </TableBodyCell>
                    {/each}
                    <TableBodyCell>
                        <a href="./">
                            <GradientButton on:click={save} outline color="purpleToPink">Save</GradientButton>
                        </a>
                    </TableBodyCell>
                {:else}
                    <TableBodyCell>{key}</TableBodyCell>
                    {#each value as text}
                    <TableBodyCell>{text}</TableBodyCell>
                    {/each}
                    <TableBodyCell>
                    </TableBodyCell>
                {/if}
            </TableBodyRow>
        {/each}
    </TableBody>
  </Table>
</div>
