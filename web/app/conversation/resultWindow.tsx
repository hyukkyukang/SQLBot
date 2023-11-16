"use client";
import { useQueryResultContext } from "@/context/queryResultContext";
import { queryResultToColNames, queryResultToRows, validateSameNumCols } from "@/lib/table/utils";
import ResultTable from "@/ui/table/table";
import { Card, CardBody } from "@nextui-org/react";
import React, { useMemo } from "react";

export default function ResultWindow() {
    const { queryResult } = useQueryResultContext();
    const valideResult = useMemo(() => validateSameNumCols(queryResult), [queryResult]);
    const colNames = useMemo(() => valideResult ? queryResultToColNames(queryResult) : [], [queryResult, valideResult]);
    const rows = useMemo(() => valideResult ? queryResultToRows(queryResult) : [[]], [queryResult, valideResult]);
    const showResultTable = useMemo(() => valideResult && queryResult.length > 0, [valideResult, queryResult]);

    return (
        <React.Fragment>
            {
            showResultTable ?
            <ResultTable title="Result Table" colNames={colNames} rows={rows} /> :  
            <Card>
                <CardBody>
                    <p>Query result table will be shown here</p>
                </CardBody>
            </Card>
            }
        </React.Fragment>
    );
}
