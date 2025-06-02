import type { JSX } from "react";
import CellInput from "../cell/cell_input";
import CellView from "../cell/cell_view";

// prameters: array of text for each cell
type RowProps = {
    canInput?: boolean;
    id: string;
    numOfCells: Array<string>;
};

const controller = (prams: RowProps) => {
    let rowOfCells: JSX.Element[] = [];

    if (prams.canInput) {
        rowOfCells = prams.numOfCells.map((index: string) => {
            return <CellInput id={prams.id + index}/>;
        });
    } else {
        rowOfCells = prams.numOfCells.map((text: string, index) => {
            return <CellView key={ prams.id + index.toString()} text={text} />;
        });
    }

    return rowOfCells;
}

export default function Row(props: RowProps) {    
    const rowOfCells: JSX.Element[] = controller(props);

    return (
        <tr id={props.id}>
            {rowOfCells}
        </tr>
    );
}