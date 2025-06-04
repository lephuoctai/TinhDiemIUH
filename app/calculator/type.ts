export type rankType = "A+"|"A"|"B+"|"B"|"C+"|"C"|"D+"|"D"|"F";
export type rowType = [
    subject: string | null,
    lectureCredit: number | null,
    practicalCredit: number | null,

    normal1: number | null,
    normal2: number | null,
    normal3: number | null,
    midterm: number | null,
    final: number | null,

    practical1: number | null,
    practical2: number | null,
    practical3: number | null,
    
    averageLecture: number | null,
    averagePractical: number | null,
    averageTotal: number | null,
    rank: rankType | null
]