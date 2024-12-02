import { BarChart, Card, Subtitle, Title } from "@tremor/react";
import React from "react";

const isNumeric = (value: string): boolean => {
  return /^-?\d+$/.test(value);
}

const valueFormatter = (number: any) => `${new Intl.NumberFormat("us").format(number).toString()}`;

const findCategoricalColIndex = (colNames: string[], rows: (string|number)[][]) => {
  // find the type of each column by checking the first row
  const categoricalColIndex: number[] = [];
  for (let i = 0; i < colNames.length; i++) {
    if (typeof rows[0][i] === "string") {
      categoricalColIndex.push(i);
    }
  }
  if (categoricalColIndex.length == 0){
    return -1;
  }
  return categoricalColIndex[0];
};

const findNumericColIndex = (colNames: string[], rows: (string|number)[][]): number[] => {
  const numericColIndex: number[] = [];
  for (let i = 0; i < colNames.length; i++) {
    if (typeof rows[0][i] === "number" || isNumeric(rows[0][i] as string)) {
      numericColIndex.push(i);
    }
  }
  return numericColIndex;
}

const toChartData = (colNames: string[], rows: (string|number)[][]) => {
  // Convert into chart data format
  const categoricalColIndex = findCategoricalColIndex(colNames, rows);
  // const numericColIndex = findNumericColIndex(colNames, rows);
  const chartData: any[] = [];
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const chartRow: any = {};
    for (let j = 0; j < colNames.length; j++) {
      if (j === categoricalColIndex) {
        chartRow.name = row[j];
      } else {
        chartRow[colNames[j]] = row[j];
      }
    }
    chartData.push(chartRow);
  }
  console.log(`chartData: ${JSON.stringify(chartData)}`);
  return chartData;
};

export default function WorkloadBarChartWindow({ title, colNames, rows }: { title: string; colNames: string[]; rows: (string | number)[][] }) {
  const numericColIndices = findNumericColIndex(colNames, rows); // Adjusted to handle multiple numeric columns
  const chartData = toChartData(colNames, rows);
  const isValidData = colNames.length > 0 && rows.length > 0 && numericColIndices.length > 0;

  console.log('numericColIndices', numericColIndices);
  console.log('rows', rows);

  // Present all the SQL queries and their execution times
  return (
    <Card>
      <Title>{title}</Title>
      {isValidData ? (
        <React.Fragment>
          <Subtitle>{`Summarization of SQL execution times`}</Subtitle>
          <BarChart
            className="mt-6"
            data={chartData}
            index="name" // Ensure the index corresponds to the key representing unique rows
            categories={numericColIndices.map((index) => colNames[index])} // Map numeric column indices to names
            colors={["blue", "green", "red", "yellow", "purple", "orange", "pink", "brown", "gray", "black"]} // Use different colors if there are multiple columns
            valueFormatter={valueFormatter}
            yAxisWidth={100}
            rotateLabelX={{ angle: 35, xAxisHeight: 85, verticalShift: 35 }}
          />
        </React.Fragment>
      ) : (
        <p>Invalid data for bar chart</p>
      )}
    </Card>
  );
}
