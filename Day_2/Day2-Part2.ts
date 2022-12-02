//dont forget to change index.ts
export default async function Day2() {
  const data = await Deno.readTextFile("Day_2/input.txt");
  interface Indexable {
    [key: string] : any;
  }
  const scores: Indexable = {
    "A X" : 0+3,
    "A Y" : 3+1,
    "A Z" : 6+2,
    "B X" : 0+1,
    "B Y" : 3+2,
    "B Z" : 6+3,
    "C X" : 0+2,
    "C Y" : 3+3,
    "C Z" : 6+1,
  }
  let total = 0;
  data.split("\n").forEach((e) => {
    total += scores[e];
  })
  console.log(total)
}