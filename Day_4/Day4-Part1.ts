////dont forget to change index.ts
export default async function Day4() {
  const data = await Deno.readTextFile("Day_4/input.txt");
  let count = 0;
  data.split("\n").forEach((e) => {
    let pair: number[][] = [];
    e.split(",").forEach((e) => {
      pair.push(e.split("-").map(Number));
    })
    //console.log(pair);
    if (
      (pair[0][0] >= pair[1][0] && pair[0][1] <= pair[1][1]) 
      ||
      (pair[0][0] <= pair[1][0] && pair[0][1] >= pair[1][1])
    ) {
      //console.log("MATCH")
      count += 1;
    }
  })
  console.log(count);
}