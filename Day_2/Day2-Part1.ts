//dont forget to change index.ts
export default async function Day2() {
  const data = await Deno.readTextFile("Day_2/input.txt");
  interface Indexable {
    [key: string] : any;
  }
  const scores: Indexable = {
    "A X" : 3+1,
    "B X" : 0+1,
    "C X" : 6+1,
    "A Y" : 6+2,
    "B Y" : 3+2,
    "C Y" : 0+2,
    "A Z" : 0+3,
    "B Z" : 6+3,
    "C Z" : 3+3,
  }
  let total = 0;
  data.split("\n").forEach((e) => {
    total += scores[e];
  })
  console.log(total)
}