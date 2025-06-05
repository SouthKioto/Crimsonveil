import React from "react";

type Sword = {
  name: string;
  rarity: string;
  damage: number;
};

type Potion = {
  name: string;
  duration: number;
  effect: "poison" | "heal";
};

const equipment = [
  {
    name: "sword",
    rarity: "RARE",
    damage: 19.3,
  },
  {
    name: "bow",
    rarity: "RARE",
    damage: 19.3,
  },
  {
    name: "lance",
    rarity: "RARE",
    damage: 19.3,
  },
  {
    name: "potion",
    rarity: "RARE",
    regen_hp: 10,
  },
  {
    name: "poison",
    rarity: "RARE",
    regen_hp: 10,
  },
];

let example_table: string = "";

const generate_rows_cols = (
  cols: number,
  rows: number,
  maxArrLength: number,
) => {
  let tableRows = "";
  let id = 0;

  for (let i = 0; i <= cols; i++) {
    let row = `<tr>`;
    if (
      equipment[i]?.name &&
      equipment[i]?.damage &&
      equipment[i]?.regen_hp &&
      equipment[i]?.rarity
    ) {
      return;
    }

    for (let j = 0; j <= rows; j++) {
      id++;
      row += `<td class='p-2 border'><p class="border rounded-2xl p-2">${id} ${id <= maxArrLength ? equipment[j].name : "empty"}</p></td>`;
    }

    row += `</tr>`;
    tableRows += row;
  }

  return tableRows;
};

example_table = generate_rows_cols(5, 5, equipment.length);

export const Equipment_Ui = () => {
  return (
    <>
      <h1>Equipment_Ui</h1>
      <p>Example equipment ui</p>
      <br></br>
      <table
        dangerouslySetInnerHTML={{ __html: example_table }}
        className="table-fixed border bg-amber-950"
      ></table>
    </>
  );
};
