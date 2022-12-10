//dont forget to change index.ts
export default async function Day10() {
  const data = await Deno.readTextFile("Day_10/input.txt");
  //console.log(data);
  let lines = data.split("\n");
  let x = 1;
  let clock = 0;

  let total = 0
  const check = () => {
    if (clock == 20 || (clock-20)%40 == 0) {
      //console.log(clock, x)
      total += clock * x;
      //console.log(total)
    }
  }
  
  lines.forEach((line) => {
    //console.log(line)
    if (line == "noop") {
      clock++;
      check();
    }
    else {
      let amount = Number(line.split(" ")[1]);
      clock++;
      check();
      x += amount;
      clock++;
      check();
    }
  })

  console.log(total);
}