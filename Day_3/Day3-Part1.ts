////dont forget to change index.ts
export default async function Day3() {
  const data = await Deno.readTextFile("Day_3/input.txt");
  let total = 0;
  data.split("\n").forEach((e) => {
    let found = "";
    let set = new Set();
    let left = e.slice(0, e.length/2);
    let right = e.slice(e.length/2, e.length);
    [...left].forEach(e => set.add(e));
    [...right].forEach((e) => {
      if (set.has(e)) found = e
    })
    let add = 0;
    if (found == found.toLowerCase()) {
      add = found.charCodeAt(0)-"a".charCodeAt(0)+1
    } else {
      add = found.charCodeAt(0)-"A".charCodeAt(0)+27
    }
    total += add;
  })
  console.log(total);
}