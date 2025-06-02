type CellProps = {
    text: string;
};

export default function CellView(props: CellProps) {
    return (
        <td className="border border-gray-300 p-2 text-center max-w-20 h-8">
            {props.text}
        </td>
    );
}