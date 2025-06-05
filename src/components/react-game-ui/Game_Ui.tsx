import React from "react";

/*
 * parent game ui component
 */

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
];

let example_table = "";

const generate_rows_cols = (
  cols: number,
  rows: number,
  maxArrLength: number,
) => {
  let tableRows = "";
  let id = 0;

  for (let i = 0; i <= cols; i++) {
    let row = `<tr>`;
    for (let j = 0; j <= rows; j++) {
      id++;
      row += `<td class='p-2 border'>${id} ${equipment[j]?.name ? equipment[j].name : "empty"}</td>`;
    }

    row += `</tr>`;
    tableRows += row;
  }

  return tableRows;
};

example_table = generate_rows_cols(5, 5, equipment.length);

export const Game_Ui = () => {
  return (
    <>
      <h1>Main game ui component</h1>

      <p>Example ui</p>

      <table
        dangerouslySetInnerHTML={{ __html: example_table }}
        className="table-fixed border border-collapse "
      ></table>
    </>
  );
};
