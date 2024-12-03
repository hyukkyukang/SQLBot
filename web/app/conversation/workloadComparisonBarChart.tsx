import { BarChart, Card, Subtitle, Title } from "@tremor/react";
import React, { useMemo } from "react";
import { QuestionSqlPair, TuningResultPair } from '@/lib/model/tuning/type';

export default function WorkloadComparisonBarChartWindow({ 
  title, 
  questionSqlPairs, 
  tuningResultPairs 
}: { 
  title: string, 
  questionSqlPairs: QuestionSqlPair[], 
  tuningResultPairs: TuningResultPair[] | null 
}) {
  console.log('tuningResultPairs', tuningResultPairs);
  console.log('questionSqlPairs', questionSqlPairs);
  const isValidData = useMemo(() => 
    questionSqlPairs?.length > 0 && tuningResultPairs && tuningResultPairs.length > 0, 
    [questionSqlPairs, tuningResultPairs]
  );
  
  const data = useMemo(() => {
    if (!isValidData) return [];
    return questionSqlPairs.map((pair, index) => ({
      name: `${pair.qid} (${pair.sql})`,
      before: pair.execution_time,
      after: tuningResultPairs?.[index]?.execution_time_after_tuning ?? 0
    }));
  }, [questionSqlPairs, tuningResultPairs, isValidData]);

  return (
    <Card>
      <Title>{title}</Title>
      {isValidData ? (
        <React.Fragment>
          <Subtitle>Execution Times Comparison</Subtitle>
          <BarChart
            data={data}
            index="name"
            categories={['before', 'after']}
            colors={['red', 'green']}
            valueFormatter={(value) => `${value} ms`}
          />
        </React.Fragment>
      ) : (
        <p>No comparison data available</p>
      )}
    </Card>
  );
}
