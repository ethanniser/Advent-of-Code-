////dont forget to change index.ts
export default async function Day3() {
  const data = await Deno.readTextFile("Day_3/input.txt");
  let split = data.split("\n");
  let total = 0;
  for (let i = 0; i < split.length; i += 3) {
    const chunk = split.slice(i, i + 3);
    let found = "";
    let set1 = new Set();
    let set2 = new Set();
    [...chunk[0]].forEach(e => set1.add(e));
    [...chunk[1]].forEach(e => set2.add(e));
    [...chunk[2]].forEach((e) => {
      if (set1.has(e) && set2.has(e)) found = e
    })
    let add = 0;
    if (found == found.toLowerCase()) {
      add = found.charCodeAt(0)-"a".charCodeAt(0)+1
    } else {
      add = found.charCodeAt(0)-"A".charCodeAt(0)+27
    }
    total += add;
  }
  console.log(total);
}