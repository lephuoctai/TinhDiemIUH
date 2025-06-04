import React, { useState, type JSX } from "react";
import type { rowType } from "./type";
import Test from "./test";

const theader: string[] = ["Môn học", "Tín LT", "Tín TH", "TK 1", "TK 2", "TK 3", "GK", "CK", "TH 1", "TH 2", "TH 3", "TB LT", "TB TH", "TB Tổng", "Xếp loại"];
const numberOfRow: number = 1;

export default function CalculatorLayout() {
    const [refValue, setRefValue] = useState<rowType>(
        Array.from({ length: 15 }, () => null) as rowType);
    const [warm, setWarm] = useState<string>("");

    // Hàm render hàng trong bảng
    function renderTableRow(index: number = numberOfRow, refesh: boolean = false): JSX.Element[] {
        let renderRow: JSX.Element[] = [];
        for (let i = 0; i < index; i++) {
            if (refesh) {
                renderRow.push(
                    <tr>
                        <Test refValue={refValue} setRefValue={setRefValue} warm={warm} setWarm={setWarm} />
                    </tr>
                );
            }
            renderRow.push(
                <tr>
                    <Test refValue={refValue} setRefValue={setRefValue} warm={warm} setWarm={setWarm} />
                </tr>
            );
        };

        return renderRow;
    }

    // Hàm làm mới bảng
    function refreshTable(): void {
        setRefValue(Array.from({ length: 15 }, () => null) as rowType);
        setWarm("");
        renderTableRow(numberOfRow, true);
    }

    return <div className="flex flex-col items-center justify-center w-full h-full p-5">
        <table className="border-2">
            <thead>
                {theader.map((header, index) => (
                    <th
                        key={index}
                        className=" border-2 rounded-10 py-1 px-2 text-sm font-sans font-[400] ">
                        {header}
                    </th>
                ))}
            </thead>
            <tbody>
                {renderTableRow(numberOfRow, false)}
            </tbody>
        </table>
        <button
            onClick={refreshTable}
            className="mt-5 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors active:opacity-70"
        >
            Làm mới
        </button>
        <p style={{ color: "red" }}>{warm}</p>
    </div>
};