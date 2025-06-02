import { useState } from "react";
import Row from "./row";

export default function CalculatorLayout() {
    // Example usage of Row with an array of cell texts
    let keyArray: string[] = ["Môn học", "Tín LT", "Tín TH", "TK 1", "TK 2", "TK 3", "GK", "CK", "TH 1", "TH 2", "TH 3"];

    let valueArray: string[] = new Array<string>(11).fill("");
    let keyResultArray: string[] = ["Điểm TB", "Xếp loại"];
    let valueResultArray: string[] = ["", ""];
    const [result, setResult] = useState<string[]>(valueResultArray);
 
    return <>
        <div className="flex direction-row items-start">
            <form action="" method="dialog">
                <table className="m-5 mr-0 font-sans text-xs">
                    <Row id={"R1"} numOfCells={keyArray} />
                    <Row id={"R2"} numOfCells={valueArray} canInput={true} />
                    <Row id={"R3"} numOfCells={valueArray} canInput={true} />
                    <Row id={"R4"} numOfCells={valueArray} canInput={true} />
                    <Row id={"R5"} numOfCells={valueArray} canInput={true} />
                    <Row id={"R6"} numOfCells={valueArray} canInput={true} />
                    <Row id={"R7"} numOfCells={valueArray} canInput={true} />
                    <Row id={"R8"} numOfCells={valueArray} canInput={true} />
                </table>
                <button id="submit" type="submit" className="bg-blue-500 text-white px-4 py-1 m-5 hover:bg-blue-600 cursor-pointer">Tính</button>
            </form>
            <table className="m-5 ml-0 font-sans text-xs">
                <Row id="R10" numOfCells={keyResultArray} />
                <Row id="R11" numOfCells={result} />
            </table>
        </div>

    </>
};