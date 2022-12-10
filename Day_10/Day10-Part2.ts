//dont forget to change index.ts
export default async function Day10() {
  const data = await Deno.readTextFile("Day_10/input.txt");
  //console.log(data);
  let lines = data.split("\n");
  let x = 1;
  let clock = 0;
  let screen: string[] = Array(6).fill("")
  screen[0] += "#"
  let line = 0;
  const check = () => {
    if (clock >= 240) return;
    console.log(clock-(40*line), x);
    if (clock%40 == 0) {
      line++;
    }
    
    if (x == clock-(40*line) ||
        x-1 == clock-(40*line) ||
        x+1  == clock-(40*line)
       ) {
      screen[line] += "#"
    }
    else {
      screen[line] += "."
    }
    console.log(screen[line])
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
      clock++;
      x += amount;
      check();
    }
  })

  console.log(screen);
}