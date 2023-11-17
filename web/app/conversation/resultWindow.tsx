"use client";
import BarChartWindow from "@/app/conversation/barChart";
import { useQueryResultContext } from "@/context/queryResultContext";
import { queryResultToColNames, queryResultToRows, validateSameNumCols } from "@/lib/table/utils";
import ResultTable from "@/ui/table/table";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import React, { useMemo } from "react";


export default function ResultWindow() {
  const { queryResult } = useQueryResultContext();
  const validResult = useMemo(() => validateSameNumCols(queryResult), [queryResult]);
  const colNames = useMemo(() => validResult && queryResult ? queryResultToColNames(queryResult) : [], [queryResult, validResult]);
  const rows = useMemo(() => validResult  && queryResult ? queryResultToRows(queryResult) : [[]], [queryResult, validResult]);
  const showResultTable = useMemo(() => validResult && queryResult && queryResult.length > 0, [validResult, queryResult]);

    return (
        <React.Fragment>
          {showResultTable
          ?
            <div className="flex w-full flex-col">
              <Tabs aria-label="Options">
                <Tab key="Table" title="Table">
                <ResultTable title="Result Table" colNames={colNames} rows={rows} />
                </Tab>
                <Tab key="Bar Chart" title="Bar Chart">
                  <BarChartWindow title="Result Bar Chart" colNames={colNames} rows={rows} />
                </Tab>
              </Tabs>
            </div>  
          :
            <Card>
              <CardBody>
                {validResult ? <p>Empty Result</p> : <p>Query result will be shown here</p>}
              </CardBody>
            </Card>
          }
        </React.Fragment>
    );
}
