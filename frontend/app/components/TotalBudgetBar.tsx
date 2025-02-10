"use client";

import { ResponsiveBar } from "@nivo/bar";

interface BarItem {
  club: string;
  Expense: number; // Ensure it's always a number
}

// Ensure `data` structure is correct
const TotalBudgetBar = ({ data }: { data: BarItem[] }) => {
  // Convert null values to 0
  const formattedData = data.map((item) => ({
    ...item,
    Expense: item.Expense ?? 0, // Ensure all values are numbers
  }));

  return (
    <ResponsiveBar
      data={formattedData} // Use formattedData
      keys={["Expense"]}
      indexBy="club"
      margin={{ top: 50, right: 130, bottom: 50, left: 100 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Club",
        legendPosition: "middle",
        legendOffset: 32,
        truncateTickAt: 0,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Expense ( in ₹ )",
        legendPosition: "middle",
        legendOffset: -80,
        truncateTickAt: 0,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      ariaLabel="Nivo bar chart demo"
      barAriaLabel={(e) =>
        `${e.id}: ${e.formattedValue} in category: ${e.indexValue}`
      }
    />
  );
};

export default TotalBudgetBar;
