//dont forget to change index.ts
export default async function Day5() {
  const data = await Deno.readTextFile("Day_5/input.txt");
  let split = data.split("\n\n");
  //parse steps
  let stepstemp = split[1].split("\n");
  let steps: number[][] = []
  stepstemp.forEach((e) => {
    let temp = [];
    let split = e.split(" ");
    temp.push(split[1]);
    temp.push(split[3]);
    temp.push(split[5]);
    steps.push(temp.map(Number));
  })
  //console.log(steps);
  //parse starting stacks
  let stacktemp = split[0].split("\n");
  //console.log(stacktemp);
  let lastrow = stacktemp.pop()?.split("") as string[];
  let numstacks = (Number(lastrow[lastrow.length-2]));
  //console.log(numstacks)
  //console.log(stacktemp)
  let rowlength = (numstacks*3)+numstacks-1;
  let stacktemp2: string[][] = [];
  for (let i = stacktemp.length-1; i >= 0; i-=1) {
    let temp:string[] = [];
    for (let j = 1; j < rowlength-1; j+=4) {
      temp.push(stacktemp[i][j]);
    }
    stacktemp2.push(temp);
  }
  //console.log(stacktemp2)

  let stacks: string[][] = [];
  for (let i = 0; i < numstacks; i++) {
    stacks.push([]);
  }
  stacktemp2.forEach((e) => {
    e.forEach((e, i) => {
      if (e == " ") return;
      stacks[i].push(e);
    })
  })
  //console.log(stacks)
  //holy shit that was just parsing
  
  steps.forEach((step) => {
    const n = step[0];
    const from = step[1]-1;
    const to = step[2]-1;
    for (let i = 0; i < n; i++) {
      //console.log(stacks[from])
      let box = stacks[from].pop() as string;
      stacks[to]?.push(box);
    }
  })
  //console.log(stacks);
  let final = "";
  stacks.forEach((e) => {
    let lastLetter = e.pop() as string;
    final = final.concat(lastLetter);
  })
  console.log(final);
}