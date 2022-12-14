//dont forget to change index.ts
export default async function Day13() {
  const data = await Deno.readTextFile("Day_13/input.txt");
  //console.log(data);
  const lines: any[] = []
  data.split("\n\n").forEach((block) => {
    block.split("\n").forEach((line) => {
      lines.push(eval(line));
    })
  })
  lines.push([[2]]);
  lines.push([[6]]);
  // console.log(lines);
  // let count = 0;
  const compare = (first: number | Array<any>, second: number | Array<any>): {result:boolean, add:boolean} => {
    // if (count > 20) throw "k"
    // count++;
    // console.log("COMPARING", first, second);
    let result = false;
    let done = false;
    let add = false;
    let index = 0;
    while (!done) {
      // console.log("while")
      let left: number | Array<any>;
      let right: number | Array<any>;
      let lundef = false;
      let rundef = false;
      if (typeof first === "object") {
        left = first[index];
        if (left == undefined) {
          lundef = true;
        }
      }
      else {
        left = first;
      }
      if (typeof second === "object") {
        right = second[index];
        if (right == undefined) {
          rundef = true;
        }
      }
      else {
        right = second;
      }
      // console.log(lundef, rundef)
      if (lundef && !rundef) {
        done = true;
        result = true;
      }
      else if (!lundef && rundef) {
        result = false;
        done = true;
      }
      else if (lundef && rundef) {
        add = true;
        done = true;
      }
      // console.log("CHECKING", left, right, add, done);
      if (!done){
        if (typeof left === "number" && typeof right === "number") {
          if (left < right) {
            //correct
            result = true;
            done = true;
          }
          else if (left > right) {
            //incorrect
            result = false;
            done = true;
          }
          else {
            index++;
          }
        }
        else if (typeof left === "object" && typeof right === "object") {
          let res = compare(left, right);
          // console.log("yep", res)
          if (res.add == true) {
            index++
            done = false;
          }
          else {
            result = res.result
            done = true;
          }
        } 
        else if (typeof left === "number" && typeof right === "object") {
          let res = compare([left], right)
          if (res.add == true) {
            index++
            done = false;
          }
          else {
            result = res.result
            done = true;
          }
        }
        else if (typeof left === "object" && typeof right === "number") {
          let res = compare(left, [right])
          if (res.add == true) {
            index++
            done = false;
          }
          else {
            result = res.result
            done = true;
          }
        }
      }
    }
    // console.log("returning", first, second, result, add)
    return {result:result, add:add};
  }
  
  let swapped = true;
  while (swapped) {
    swapped = false;
    for (let i = 0; i < lines.length-1; i++) {
      let line1 = lines[i];
      let line2 = lines[i+1];
      let res = compare(line1, line2);
      if (!res.result) {
        swapped = true;
        lines[i] = line2;
        lines[i+1] = line1;
      }
    }
  }
  // console.log(lines)

  let div1 = 0;
  let div2 = 0;
  lines.forEach((e, i) => {
    if (e.length == 1 && typeof e[0] === "object" && e[0].length == 1) {
      if (e[0][0] == 2) {
        div1 = i+1;
      }
      else if (e[0][0] == 6) {
        div2 = i+1;
      }
    }
  })
  // console.log(div1, div2);
  console.log(div1*div2)
}