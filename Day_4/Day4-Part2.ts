////dont forget to change index.ts
export default async function Day4() {
  const data = await Deno.readTextFile("Day_4/input.txt");
  let count = 0;
  data.split("\n").forEach((e) => {
    let pair: number[][] = [];
    e.split(",").forEach((e) => {
      pair.push(e.split("-").map(Number));
    })
    let set = new Set();
    for (let i = pair[0][0]; i <= pair[0][1]; i++) {
      set.add(i);
    }
    for (let i = pair[1][0]; i <= pair[1][1]; i++) {
      if (set.has(i)) {
        count++;
        break;
      }
    }
  })
  console.log(count);
}