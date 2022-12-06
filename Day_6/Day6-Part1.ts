//dont forget to change index.ts
export default async function Day6() {
  const data = await Deno.readTextFile("Day_6/input.txt");
  //console.log(data);
  let index = 0;
  for (let i = 4; i < data.length; i++) {
    let slice = data.slice(i-4, i);
    let set = new Set([...slice])
    if (slice == [...set].join("")) {
      index = i;
      break;
    }
  }
  console.log(index);
}