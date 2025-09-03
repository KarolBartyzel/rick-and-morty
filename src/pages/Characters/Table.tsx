import { useMemo } from "react";
import type { Character } from "../../types";
import {
    useReactTable,
    getCoreRowModel,
    type ColumnDef,
    flexRender,
  } from "@tanstack/react-table";
import { Link } from "@tanstack/react-router";

interface Props {
    characters: Character[];
}

export const Table = ({ characters }: Props) => {
    const columns = useMemo<ColumnDef<Character>[]>(
        () => [
            { header: "Image", size: 100, cell: (row) => <img src={row.row.original.image} alt={row.row.original.name} className="rounded-sm" width={100} height={100} /> },
            { header: "Name", size: 500, enableResizing: false, cell: (row) => row.row.original.name },
            { header: "Status", size: 150, enableResizing: false, cell: (row) => row.row.original.status },
            { header: "Species", size: 150, enableResizing: false, cell: (row) => row.row.original.species },
            { header: "Gender", size: 150, enableResizing: false, cell: (row) => row.row.original.gender },
            { header: "Details", size: 50, cell: (row) => <Link to="/character/$id" disabled={row.row.original.id === 0} params={{ id: row.row.original.id.toString() }}>Details</Link> },
        ],
        []
    );
    
    const table = useReactTable<Character>({
        data: characters,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <table className="w-100">
            <thead>
            {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                    <th key={header.id} className="text-center">
                    {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                        )}
                    </th>
                ))}
                </tr>
            ))}
            </thead>
            <tbody>
            {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id} width={`${cell.column.columnDef.size}px`}>
                                <div className="p-3 text-center">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </div>
                            </td>
                        ))}
                    </tr>
            ))}
            </tbody>
            <tfoot>
            {table.getFooterGroups().map(footerGroup => (
                <tr key={footerGroup.id}>
                {footerGroup.headers.map(header => (
                    <th key={header.id}>
                    {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.footer,
                            header.getContext()
                        )}
                    </th>
                ))}
                </tr>
            ))}
            </tfoot>
        </table>
    );
}

export const TableError = ({ error, retry }: { error: string, retry: () => void }) => {
    return (
        <div className="p-4 d-flex flex-column align-items-center">
            <div className="text-center">Error loading characters: {error}</div>
            <button className="btn btn-primary mt-2" onClick={retry}>Retry</button>
        </div>
    );
}