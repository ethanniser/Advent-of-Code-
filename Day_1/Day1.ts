export async function Day1() {

const data = await Deno.readTextFile("Day_1/input.txt");
let strDataSplit = data.split("\n");
console.log(strDataSplit);

let dataSplit: number[] = strDataSplit.map(Number);
console.log(dataSplit);

let spaces: number[] = [];
for (let i = 0; i < dataSplit.length; i++) {
  if (dataSplit[i] == 0) {
    dataSplit.length == 0? spaces.push(i) : spaces.push(i+1);
  }
}
spaces.unshift(0);
spaces.push(dataSplit.length);
console.log(spaces);

let elfsArr: number[][] = [];

for (let i = 0; i < spaces.length; i++) {
  let temp: number[] = dataSplit.slice(spaces[i], spaces[i+1]);
  if (temp[temp.length-1] == 0) {
    temp.pop();
  }
  elfsArr.push(temp);
}
elfsArr.pop();
console.log(elfsArr);

let totals: number[] = []

elfsArr.forEach((e) => {
  totals.push(e.reduce((x,y) => x+y))
})

console.log(totals);

totals.sort((x,y)=>x-y);
console.log(totals);

let top3 = totals.slice(totals.length-3, totals.length);
console.log(top3);


console.log(top3.reduce((x,y) => x+y));

}