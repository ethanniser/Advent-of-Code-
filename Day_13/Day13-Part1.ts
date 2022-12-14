//dont forget to change index.ts
export default async function Day13() {
  const data = await Deno.readTextFile("Day_13/input.txt");
  //console.log(data);
  const pairs: any[] = []
  data.split("\n\n").forEach((block) => {
    let temp: any[] = []
    block.split("\n").forEach((line) => {
      temp.push(eval(line));
    })
    pairs.push(temp);
  })
  //console.log(pairs)
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
          result = res.result
          done = true;
        }
        else if (typeof left === "object" && typeof right === "number") {
          let res = compare(left, [right])
          result = res.result
          done = true;
        }
      }
    }
    // console.log("returning", first, second, result, add)
    return {result:result, add:add};
  }

  let sum = 0;
  pairs.forEach((pair, i) => {
    let line1 = pair[0];
    let line2 = pair[1];
    let res = compare(line1, line2);
    // console.log("THUS")
    // console.log(pair, res.result)
    // console.log("")
    if (res.result) {
      sum += i+1;
    }
  })
  console.log(sum)
}