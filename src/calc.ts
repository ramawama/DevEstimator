import { get, writable } from 'svelte/store';
import { timeMap, table, totalTestTime, totalTime } from './stores';

  //     Definition	Easy	Intermediate	Complex	TESTING	MODIFY
  // Field	0.25	0.5	1	0	0.25	
  // Record	0.5	1	2	0	0.25	
  // Page	2	4	8	0.5	0.5	
  // Component	0.5	1	2	0	0.25	
  // Component Interface	1	4	8	0	0.5	
  // Application Engine	3	6	12	0.5	0.5	
  // PeopleCode	1	4	8	1	0.75	
  // SQL	1	4	8	1	0.75	
  // Configuration	1	4	8	1	0.75	
  // Research	5	10	20	0	0	
  // layout is as such
  const timeMapValue = get(timeMap);
  const tableValue = get(table);

  function saveTime(testTime: any, time:any){
    totalTime.update((n: any) => n + time);
    totalTestTime.update((n: any) => n + testTime);
  }

  function calcHelper(array: any): number {
    let hours = 0;
    let testingTime = 0;
    switch (array.at(4)){ //get difficulty times
      case "Easy": {
        hours += timeMapValue.get(array.at(0))?.at(0);
        break;
      }
      case "Intermediate": {
        hours += timeMapValue.get(array.at(0))?.at(1);
        break;
      }
      case "Complex": {
        hours += timeMapValue.get(array.at(0))?.at(2);
        break;
      }
    }

    if (array.at(1) === "Create"){
      hours *= array.at(3) // multiply difficulty time with amount 
      testingTime = hours * timeMapValue.get(array.at(0))?.at(3); //difftime * testing
      
      hours += testingTime;
      // if Creating add testing time to reg creation time, else only take into account modify
    }
    else{
      // modifying so calculate modify time as base hours first
      hours *= array.at(3) * timeMapValue.get(array.at(0))?.at(4);
      testingTime = hours * timeMapValue.get(array.at(0))?.at(3);
      hours += testingTime;
    }
    console.log(hours);
    saveTime(testingTime, hours);
    return hours;

  }


  function save(key:any, arr:any) {
    console.log("hours calculated");
    console.log(arr);
    // Correctly update the store without the $ prefix
    table.update(map => {
        map.set(key, arr);
        return map; // Always return the map for the update to be applied
    });
    
  }


  // Function to calculate the hours for a task
  function calculateHours() {
    // Retrieve the current state of the timeMap store

    // Get the corresponding multipliers for the definition
    let totalHours = 0;
    let taskHours = 0;
    totalTestTime.set(0);
    totalTime.set(0); 
    //reset at beginnings of calculations if rows have changed

    for (let [key,value] of tableValue) {
      taskHours = calcHelper(value);
      let arr = [...value];
      arr[value.length - 1] = taskHours;
      save(key,arr);
      totalHours += taskHours;
    }

  
    // Calculate the hours based on the complexity and the action
    // const baseHours = multipliers[complexityIndexMap[task.Complexity]];
    // const modifyHours = task.Action === 'Modify' ? multipliers[4] : 0;
    // const totalHours = (baseHours + modifyHours) * task.Quantity;
  
    //return totalHours;
  }
  
  // Export the calculateHours function for reuse
  export { calculateHours };