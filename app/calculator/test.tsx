import type { JSX } from "react";
import type React from "react";
import type { rankType, rowType } from "./type";

type propType = {
    refValue: rowType;
    setRefValue: React.Dispatch<React.SetStateAction<rowType>>;
    warm: string;
    setWarm: React.Dispatch<React.SetStateAction<string>>;
}

export default function Test(props: propType) {
    // Hàm kiểm tra giá trị nhập vào có hợp lệ hay không
    function isValidInput(value: string): boolean {
        const num = Number(value);

        // Tắt cảnh báo sau 2 giây
        setTimeout(() => {
            props.setWarm("");
        }, 2000);

        // Kiểm tra số hợp lệ
        if (isNaN(Number(num))) {
            props.setWarm("Bảo đảm bạn đã nhập là dạng số!");
            return false;
        } else if (num < 0 || num > 10) {
            props.setWarm("Điểm phải trong khoảng từ 0 - 10!");
            return false;
        } else {
            props.setWarm("");
            return true;
        }
    }

    // Hàm kiểm tra ô input có rỗng hay không
    function isEmpty(value: string): boolean {
        const trimmedValue = value.trim();

        return trimmedValue === "" || trimmedValue === null;
    }

    // Tính điểm và xếp loại
    /*
            Xử lý logic nghiệp vụ:
    - Một số môn có thể chỉ có Lý thuyết or có thực hành hoặc cả 2.

    - Điểm TB thực hành = tổng số điểm Thực hành / số cột có điểm
    (vd: TH 2 con 10 trên 3 cột thì averagePractical = (10+10)/2 cột, nên nhớ kiểm tra có bao nhiêu cột được nhập nhé.)

    - Điểm TB Lý thuyết = (0.2*(trung bình điểm TK - tức là thường kì 1 2 3, cũng chia theo số cột có điểm) + 0.3*điểm GK + 0.5*điểm CK

    - Tổng điểm TB = (số tín chỉ LT * điểm TB lsy thuyết + số tín chỉ TH * điểm TB thực hành)/ (tổng tín chỉ của môn)
    *Với môn chỉ có 1 trong 2 loại tín chỉ thì vẫn dùng dc CT tính tổng điểm TB do số Tín chỉ của môn còn lại = 0.

    */
    function process(values: rowType): void {
        const newValues: rowType = [...values];
        const lectureCredit: number = newValues[1] ?? 0;
        const practicalCredit: number = newValues[2] ?? 0;
        let averageLecture: number | null = null;
        let averagePractical: number | null = null;
        let averageTotal: number | null = null;
        let rank: rankType | null = null;

        // Tính điểm trung bình lý thuyết
        if (lectureCredit > 0) {
            const tempL: number[] = newValues.slice(3, 6).filter(v => (v !== null)).map(v => Number(v));
            const countLecture: number = tempL.length;
            const sumLecture: number = tempL.reduce((sum: number, v) => sum + Number(v), 0);
            const averageLectureNormal = sumLecture / countLecture;
            averageLecture = (0.2 * averageLectureNormal) + (0.3 * Number(newValues[6])) + (0.5 * Number(newValues[7]));
            averageLecture = parseFloat(averageLecture.toFixed(1));
        }

        // Tính điểm trung bình thực hành
        if (practicalCredit > 0) {
            const tempP: number[] = newValues.slice(8, 11).filter(v => (v !== null)).map(v => Number(v));
            const countPractical: number = tempP.length;
            const sumPractial: number = tempP.reduce((sum: number, v) => sum + Number(v), 0);
            averagePractical = sumPractial / countPractical;
            averagePractical = parseFloat(averagePractical.toFixed(1));
        }

        // Tính điểm trung bình tổng và xếp loại
        if (lectureCredit > 0 || practicalCredit > 0) {
            // Nếu có tín chỉ thì tính điểm trung bình tổng
            const countCredit = lectureCredit + practicalCredit;
            averageTotal = (lectureCredit * Number(averageLecture) + practicalCredit * Number(averagePractical)) / countCredit;
            averageTotal = parseFloat(averageTotal.toFixed(1));

            // Xếp loại
            if (averageTotal <= 10 && averageTotal >= 0) {
                if (averageTotal >= 9) {
                    rank = "A+";
                } else if (averageTotal >= 8.5) {
                    rank = "A";
                } else if (averageTotal >= 8) {
                    rank = "B+";
                } else if (averageTotal >= 7) {
                    rank = "B";
                } else if (averageTotal >= 6) {
                    rank = "C+";
                } else if (averageTotal >= 5.5) {
                    rank = "C";
                } else if (averageTotal >= 5) {
                    rank = "D+";
                } else if (averageTotal >= 4) {
                    rank = "D";
                } else if (averageTotal >= 0) {
                    rank = "F";
                } else {
                    rank = null; // Nếu điểm trung bình không hợp lệ
                }
            }
        } else {
            averageTotal = null;
            rank = null;
        }

        // Gán giá trị trung bình vào mảng
        newValues[11] = averageLecture;
        newValues[12] = averagePractical;
        newValues[13] = averageTotal;
        newValues[14] = rank;


        // Cập nhật giá trị mới vào state refValue
        props.setRefValue(newValues);
    }

    // Hàm xử lý sự kiện khi người dùng nhập vào ô input
    function handleInputChange(index: number, event: React.ChangeEvent<HTMLInputElement>): void {
        let value: string = event.target.value;
        const newValues: rowType = [...props.refValue];

        if (index === 0) // Xử lý ô nhập tên môn học
        {
            // Giới hạn độ dài của ô nhập liệu môn học
            if (value.length > 15) {
                value = value.slice(0, 15);
            }

            newValues[0] = value;
        } else // Xử lý các ô nhập điểm
        {
            // Báo đỏ (border red input) nếu giá trị không hợp lệ
            if ((isEmpty(value) || isValidInput(value))) {
                event.target.classList.remove("bg-red-200");
            } else {
                event.target.classList.add("bg-red-200");
            }

            // Xử lý gán giá trị cho state refValue
            if (value.trim() === "" || value === null) {
                //Nếu không có giá trị thì set lại giá trị về lại null
                newValues[index] = null;
            } else if (isValidInput(value)) {
                //Làm tròn số thập phân 1 chữ số
                if (value.includes(".")) {
                    value = Number(value).toFixed(1)
                }

                newValues[index] = Number(value);
            }
        }
        // Gía trị nhập vào được cập nhật
        props.setRefValue(newValues);
        // Gia trị được tính toán
        process(newValues);
    }

    // Render các ô nhập
    const render: JSX.Element[] = props.refValue.slice(0, 11).map((v, i) => {

        if (i === 0) // Ô nhập tên môn học
        {
            return <td key={i}>
                <input
                    type="text"
                    className="max-w-30 border-black border-1 rounded-10 py-1 px-2"
                    onChange={(e) => handleInputChange(i, e)}
                />
            </td>
        } else  // Ô nhập điểm
        {
            return <td key={i}>
                <input
                    className="max-w-15 border-black border-1 rounded-10 py-1 px-2"
                    onChange={(e) => handleInputChange(i, e)}
                />
            </td>
        }
    })
    // Ô hiện kết quả
    render.push(<>
        <td key={11}>
            <input
                type="text"
                className="min-w-10 max-w-20 border-black border-1 rounded-10 py-1 px-2"
                value={props.refValue[11] ?? ""}
                readOnly
            />
        </td>
        <td key={12}>
            <input
                type="text"
                className="min-w-10 max-w-20 border-black border-1 rounded-10 py-1 px-2"
                value={props.refValue[12] ?? ""}
                readOnly
            />
        </td>
        <td key={13}>
            <input
                type="text"
                className="min-w-10 max-w-20 border-black border-1 rounded-10 py-1 px-2"
                value={props.refValue[13] ?? ""}
                readOnly
            />
        </td>
        <td key={14}>
            <input
                type="text"
                className="min-w-10 max-w-20 border-black border-1 rounded-10 py-1 px-2"
                value={props.refValue[14] ?? ""}
                readOnly
            />
        </td>
    </>);

    return render;
}
