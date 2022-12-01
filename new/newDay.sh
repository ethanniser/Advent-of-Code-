cat new/tree.txt
printf "\n"
echo "ITS A NEW DAY OF ADVENT OF CODE!"
printf "\n...\n\n"
mkdir Day_$1
cd Day_$1
touch input.txt
touch Day$1.ts
printf "export async function Day$1() {\n  const data = await Deno.readTextFile(\"Day_$1/input.txt\");\n  console.log(data);\n}" > Day$1.ts
echo "NEW DAY TEMPLATE WRITTEN SUCESSFULLY"

cd ../
printf "import {Day$1} from \'./Day_$1/Day$1.ts\';\nDay$1();" > index.ts
echo "INDEX.TS UPDATED SECESSFULLY"