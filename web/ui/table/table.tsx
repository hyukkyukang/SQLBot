import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import React from "react";

export default function ResultTable({ title, colNames, rows }: { title: string; colNames: string[]; rows: (string|number)[][] }) {
    return (
        <React.Fragment>
            <Table aria-label={title}>
                <TableHeader>
                {colNames.map((colName) => (
                    <TableColumn key={colName}>{colName}</TableColumn>
                ))}
                </TableHeader>
                <TableBody>
                    {
                        rows.map((row) => (
                            <TableRow key={row[0]}>
                                {row.map((col) => (
                                    <TableCell key={col}>{col}</TableCell>
                                ))}
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </React.Fragment>
    );
}
