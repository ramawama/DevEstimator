<script lang="ts">
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
    import { Input } from 'flowbite-svelte';
    import { Select } from 'flowbite-svelte';
    import { table, totalTestTime, totalTime, typeOptions } from "../../stores";
    import { GradientButton } from 'flowbite-svelte';
    import { HourglassOutline } from 'flowbite-svelte-icons';
    import { page } from '$app/stores';
	import { calculateHours } from '../../calc';

    const editKey = $page.url.searchParams.get('key');
  
    let columns = ["Type", "Action", "Name", "Amount", "Complexity", "Hours"]

    let actionOptions = [
        { value: "Create", name: "Create"},
        { value: "Modify", name: "Modify"},
    ]

    let complexityOptions = [
        { value: "Easy", name: "Easy"},
        { value: "Intermediate", name: "Intermediate"},
        { value: "Complex", name: "Complex"},
    ]

    let inputVal = [];

    $: if (editKey) {
        table.subscribe(map => {
            if (map.has(editKey)) {
                inputVal = map.get(editKey).slice(); // Copy values for editing
            }
        });
    }
  
    function save() {
        console.log("updated");
        // Correctly update the store without the $ prefix
        table.update(map => {
            map.set(editKey, inputVal);
            return map; // Always return the map for the update to be applied
        });
        calculateHours();

        totalTestTime.subscribe((value) => {
        console.log("Test time: " + value);
        }); 

        totalTime.subscribe((value) => {
        console.log("Total time: " + value);
        }); 

    }

    function updateValue(index, newValue) {
    inputVal[index] = newValue;
    inputVal = inputVal.slice(); // Create a new array to trigger reactivity
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
                {#each columns as column}
                      <TableHeadCell>{column}</TableHeadCell>
                {/each}
                <TableHeadCell>
                  <span class="sr-only">Save</span>
                </TableHeadCell>
              </TableHead>
            <TableBody class="divide-y">
                {#each [...$table] as [key,value]}
                <TableBodyRow>
                    {#if key === editKey}
                        {#each value as text, index (index)}
                            {#if index === 0}
                                <TableBodyCell>
                                    <Select size="sm" items={$typeOptions} bind:value={inputVal[index]} />
                                </TableBodyCell>
                            {:else if index === 1}
                                <TableBodyCell>
                                    <Select size="sm" items={actionOptions} bind:value={inputVal[index]} />
                                </TableBodyCell>
                            {:else if index === 2}
                                <TableBodyCell>
                                    <Input type="text" size="sm" value={inputVal[index]} on:input={e => updateValue(index, e.target.value)} />
                                </TableBodyCell>
                            {:else if index === 3}
                                <TableBodyCell>
                                    <Input type="number" size="sm" value={inputVal[index]} on:input={e => updateValue(index, e.target.value)} />
                                </TableBodyCell>
                            {:else if index === 4}
                                <TableBodyCell>
                                    <Select size="sm" items={complexityOptions} bind:value={inputVal[index]} />
                                </TableBodyCell>
                            {:else if index === 5}
                                <TableBodyCell>
                                    <HourglassOutline size="sm"></HourglassOutline>
                                </TableBodyCell>
                            {/if}
                        {/each}


                        <!-- {#each value as text, index (index)}
                        <TableBodyCell>
                            <Input type="number" value={inputVal[index]} on:input={e => updateValue(index, e.target.value)} size="sm" />
                        </TableBodyCell>
                        {/each} -->
                    {:else}
                        {#each value as text, index (index)}
                            <TableBodyCell>{text}</TableBodyCell>
                        {/each}
                    {/if}
                    
                        <TableBodyCell>
                            <a href="./">
                                <GradientButton on:click={save} outline color="purpleToPink">Save</GradientButton>
                            </a>
                        </TableBodyCell>
                </TableBodyRow>
                {/each}

            </TableBody>
        </Table>
   </div> 
  