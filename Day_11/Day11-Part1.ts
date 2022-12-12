//dont forget to change index.ts
export default async function Day11() {
  const data = await Deno.readTextFile("Day_11/input.txt");
  //console.log(data);
  let blocks = data.split("\n\n");
  type monkey = {
    items: number[],
    opOp: string,
    opNum: number,
    testNum: number,
    tru: number,
    fals: number,
    inspect: number
  }

  let monkeys: monkey[] = [];
  blocks.forEach((e) => {
    let lines = e.split("\n");
    let items = lines[1].split(": ")[1].split(", ").map(Number);
    let test = lines[2].split("old ")[1].split(" ");
    let opOp = test[0];
    let opNum = test[1] == "old" ? -1 : Number(test[1])
    let testNum = Number(lines[3].split("by ")[1])
    let tru = Number(lines[4].split("monkey ")[1])
    let fals = Number(lines[5].split("monkey ")[1])
    monkeys.push({
      items: items,
      opOp: opOp,
      opNum: opNum,
      testNum: testNum,
      tru: tru,
      fals: fals,
      inspect: 0
    })
  })
  // console.log(monkeys);

  let rounds = 20;
  for (let i = 0; i < rounds; i++) {
    monkeys.forEach((monk) => {
      monk.items.forEach((item) => {
        monk.inspect++;
        let temp = item;
        let opNum = monk.opNum
        if (monk.opNum == -1) {
          opNum = temp;
        }
        if (monk.opOp == "+") {
          temp += opNum;
        }
        else {
          temp *= opNum
        }
        temp = Math.floor(temp/3);
        if (temp%monk.testNum == 0) {
          monkeys[monk.tru].items.push(temp);
        }
        else {
          monkeys[monk.fals].items.push(temp);
        }
      })
      monk.items = [];
    })
  }
  let inspect: number[] = []
  monkeys.forEach(monk => inspect.push(monk.inspect))
  inspect.sort((x,y) => x-y)
  let final = inspect.slice(inspect.length-2, inspect.length).reduce((x,y) => x*y, 1)
  console.log(final)
}