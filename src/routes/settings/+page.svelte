<script lang="ts">
    import { Button, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
    import {timeMap, columns, typeOptions, table} from '../../stores';
    import { GradientButton  } from 'flowbite-svelte';
    import { MinusOutline, PlusOutline, PenOutline } from 'flowbite-svelte-icons'
    import { get } from 'svelte/store';

    
    function remove(key){
      console.log("delete from settings and types");
      timeMap.update(map=> {
          map.delete(key);
          return map;
      })
      if (checkDependencies(key)){
        //set default to field.
        updateDependenciesToDefault(key);
      }
      typeOptions.update(options => options.filter(option => option.value !== key));

  }
    function checkDependencies(checkKey: any) {
          for (let [key,value] of $table){
            if (value[0] === checkKey) return true;

          }
          // Example function to check if key is used elsewhere
          // You need to implement the actual check based on your application's logic
          return false;  // Return true if used, false if not
      }

    function updateDependenciesToDefault(checkKey: any) {
        for (let [key,value] of $table){
              if (value[0] === checkKey){
                value[0] = "Select";
              } 

            }
        console.log(`Updating ${checkKey} dependencies to 'NaN'`);
    }

  function add(){
      const tableValue = get(timeMap);
      let keys = Array.from(tableValue.keys());
      let tempKey = "temp";
      
      timeMap.update(map=> {
          map.set(tempKey,["0", "0", "0", "0", "0"]);
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
        {#each $columns as col}
      <TableHeadCell>{col}</TableHeadCell>
        {/each}
      <TableHeadCell>
        <span class="sr-only">Edit</span>
      </TableHeadCell>
      <TableHeadCell>
        <span class="sr-only">Remove</span>
      </TableHeadCell>
    </TableHead>
    <TableBody class="divide-y">
        {#each [...$timeMap] as [key,value]}
            <TableBodyRow>
                <TableBodyCell>{key}</TableBodyCell>
                {#each value as text}
                <TableBodyCell>{text}</TableBodyCell>
                {/each}
                <TableBodyCell>
                    <a href={`/settings/edit?key=${key}`} class="font-medium text-primary-600 hover:underline dark:text-primary-500">Edit</a>
                </TableBodyCell>
                <TableBodyCell>
                  <Button on:click={e => remove(key)} outline color="purpleToPink" pill><MinusOutline size="sm"/></Button>
              </TableBodyCell>
            </TableBodyRow>
        {/each}
        <TableBodyRow>
          <Button on:click={add} outline color="purpleToPink" pill><PlusOutline size="md"/></Button>
      </TableBodyRow>
    </TableBody>
  </Table>
  </div>