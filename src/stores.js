import { writable } from 'svelte/store';
import { persisted } from 'svelte-persisted-store'

function serializeMap(map) {
    return JSON.stringify(Array.from(map.entries()));
  }

  function deserializeMap(jsonStr) {
    return new Map(JSON.parse(jsonStr));
  }

// Initialize the store with data from localStorage or default data
const initialMapJson = localStorage.getItem("timeMap");
const initialMap = initialMapJson ? deserializeMap(initialMapJson) : new Map([
  ["Field", [0.25, 0.5, 1, 0, 0.25]],
  ["Record", [0.5, 1, 2, 0, 0.25]],
  ["Page", [2, 4, 8, 0.5, 0.5]],
  ["Component", [0.5, 1, 2, 0, 0.25]],
  ["Component Interface", [1, 4, 8, 0, 0.5]],
  ["Application Engine", [3, 6, 12, 0.5, 0.5]],
  ["PeopleCode", [1, 4, 8, 1, 0.75]],
  ["SQL", [1, 4, 8, 1, 0.75]],
  ["Configuration", [1, 4, 8, 1, 0.75]],
  ["Research", [5, 10, 20, 0, 0]]
]);

export const timeMap = writable(initialMap);

// Subscribe to the store and update localStorage on changes
timeMap.subscribe(currentMap => {
  localStorage.setItem("timeMap", serializeMap(currentMap));
});

const initialMapTableJson = localStorage.getItem("tableData");
const initialMapTable = initialMapTableJson ? deserializeMap(initialMapTableJson) : new Map([
    ["Row1", ["Field", "Modify", "Default", "0", "Easy", "0"]],
]);
export const table = writable(initialMapTable);

table.subscribe(currentMap => {
    localStorage.setItem("tableData", serializeMap(currentMap));
  });


// export const table = writable(new Map([
//     ["Row1", ["Field", "Modify", "Default", "0", "Easy", "0"]],
// ]));

export const columns = writable(
    ["Definition", "Easy", "Intermediate", "Complex", "Testing", "Modify"]
);

export const totalTime = writable(0);

export const totalTestTime = writable(0);

const defaultTypeOptions = [
  { value: "Field", name: "Field" },
  { value: "Record", name: "Record" },
  { value: "Page", name: "Page" },
  { value: "Component", name: "Component" },
  { value: "Component Interface", name: "Component Interface" },
  { value: "Application Engine", name: "Application Engine" },
  { value: "PeopleCode", name: "PeopleCode" },
  { value: "SQL", name: "SQL" },
  { value: "Configuration", name: "Configuration" },
  { value: "Research", name: "Research" }
];

function serialize(data) {
  return JSON.stringify(data);
}

function deserialize(jsonStr) {
  return JSON.parse(jsonStr);
}

// Initialize the store with data from localStorage or default data
const initialTypeOptionsJson = localStorage.getItem("typeOptions");
const initialTypeOptions = initialTypeOptionsJson ? deserialize(initialTypeOptionsJson) : defaultTypeOptions;

export const typeOptions = writable(initialTypeOptions);

// Subscribe to the store and update localStorage on changes
typeOptions.subscribe(currentOptions => {
  localStorage.setItem("typeOptions", serialize(currentOptions));
});