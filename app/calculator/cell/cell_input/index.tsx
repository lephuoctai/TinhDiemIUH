type CellProps = {
    id: string;
};

export default function CellInput(props: CellProps) {
    return (
        <td className="border border-gray-300 text-center max-w-10 h-8">
            <input id={props.id} className="p-2 w-full" type="text" autoComplete="on"/>
        </td>
    );
}