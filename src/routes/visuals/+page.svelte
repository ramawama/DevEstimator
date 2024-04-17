<script>
	import PieChart from './PieChart.svelte';
    import { table, totalTime, totalTestTime } from "../../stores";
    import { get } from 'svelte/store';
    import { calculateHours } from '../../calc';
    import { Card } from 'flowbite-svelte';


    calculateHours();
    const tableMap = get(table);
    const totalHours = get(totalTime);
    const testHours = get(totalTestTime);
    const devTime = totalHours - testHours;
    
    function toJSON(){
    let results = new Map();  // Use a Map to combine results with the same name

    tableMap.forEach((value, key) => {
      const name = value[0];
      // Parse the last element as a float to get the hours
      const hours = parseFloat(value[value.length - 1]);
      
      // Check if this name already exists and sum the values if it does
      if (results.has(name)) {
        results.set(name, results.get(name) + hours);
      } else {
        results.set(name, hours);
      }
    });
    console.log(results);
    console.log(totalHours);
    // Convert the Map to an array of objects suitable for JSON serialization
    // and calculate the percentage of total hours for each item
    const resultArray = Array.from(results).map(([name, hours]) => ({
      name,
      // Calculate the percentage relative to total hours
      value: ((hours / totalHours) * 100).toFixed(2)  // Keep two decimal places for the percentage
    }));
    console.log(resultArray);
    return resultArray;
  }

    const data = toJSON();

</script>

<style>
    .centered-content {
      min-height: calc(100vh - 81px); 
    }
  </style>
    <div class="flex flex-col items-center justify-center centered-content bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
        <PieChart {data} />
        <aside class="mt-2">
            <p>
                <Card >
                    <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Development Hours: {devTime}</h5>
                    <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Testing Hours: {testHours}</h5>
                    <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Total Hours: {totalHours}</h5>
                  </Card>
            </p>
            
        
        </aside>
   </div> 
  