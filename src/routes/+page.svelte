<script lang="ts">
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
  import { table } from "../stores";
  import { GradientButton  } from 'flowbite-svelte';
  import { MinusOutline, PlusOutline, PenOutline } from 'flowbite-svelte-icons';
	import { get } from 'svelte/store';

  let columns = ["Type", "Action", "Name", "Amount", "Complexity", "Hours"]


  function remove(key){
      console.log("delete");
      table.update(map=> {
          map.delete(key);
          return map;
      })
  }

  function add(){
      const tableValue = get(table);
      let keys = Array.from(tableValue.keys());
      let tempKey = "";
      let keyCounter = 0;
      do {
          keyCounter++;
          tempKey = "Row" + keyCounter;
      } while (keys.includes(tempKey));  // Check if the key exists and increment until finding an unused one

      table.update(map=> {
          map.set(tempKey,["Select", "Create", "Default", "0", "Easy", "0"]);
          return map;
      })
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
              <TableHeadCell>
                <span class="sr-only">Remove</span>
              </TableHeadCell>
            </TableHead>
          <TableBody class="divide-y">
              {#each [...$table] as [key,value]}
              <TableBodyRow>
                  {#each value as text, index (index)}
                      <TableBodyCell>{text}</TableBodyCell>
                  {/each}
                      <TableBodyCell>
                        <GradientButton href={`/edit?key=${key}`} outline color="purpleToPink" pill><PenOutline size="sm"/></GradientButton>
                      </TableBodyCell>
                      <TableBodyCell>
                          <GradientButton on:click={e => remove(key)} outline color="purpleToPink" pill><MinusOutline size="sm"/></GradientButton>
                      </TableBodyCell>
              </TableBodyRow>
              {/each}
              <TableBodyRow>
                  <GradientButton on:click={add} outline color="purpleToPink" pill><PlusOutline size="sm"/></GradientButton>
              </TableBodyRow>
          </TableBody>
      </Table>
 </div> 
