"use client"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A020F0', '#888888'];

const RADIAN = Math.PI / 180;

interface OverviewProps {
    data: unknown[]
}

export function Overview({ data }: OverviewProps) {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
                <XAxis
                    dataKey={"name"}
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis

                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `Rs.${value}`}
                />
                <Bar dataKey={"total"} fill="#3498db" radius={[4, 4, 0, 0]} />

            </BarChart>

        </ResponsiveContainer>
    )
}





type ProductData = {
  name: string;
  quantity: number;
};

type ProductProps = {
  products: ProductData[];
  totalQuantity: number;
};

export function TopProductsPie({ products, totalQuantity }: ProductProps) {
  // Sort and split into top 5 + other
  const sorted = [...products].sort((a, b) => b.quantity - a.quantity);
  const top5 = sorted.slice(0, 5);
  const others = sorted.slice(5);

  const otherTotal = others.reduce((acc, p) => acc + p.quantity, 0);

  const chartData = [
    ...top5.map((p) => ({
      name: p.name,
      value: ((p.quantity / totalQuantity) * 100),
    })),
    {
      name: 'Other',
      value: ((otherTotal / totalQuantity) * 100),
    },
  ];

  return (
    <div style={{ width: '100%'}}>
      <h2 className="text-xl font-semibold mb-4 text-center">Top Products Breakdown By Number Of Order Placed</h2>
      <ResponsiveContainer width="100%" height={350}>
      <PieChart width={400} height={400}>
        <Pie
          dataKey="value"
          data={chartData}
          cx="50%"
          cy="50%"
          outerRadius={120}
          label={({ name, value }) => `${name} (${value.toFixed(1)}%)`}
        >
          {chartData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value: number) => `${value.toFixed(2)}%`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
    </div>
  );
}



type CategoryData = {
  name: string;
  quantity: number;
};

type CategoryProps = {
  categories: CategoryData[];
  totalQuantity: number;
};

export function TopCategoriesPie({ categories, totalQuantity }: CategoryProps) {
  const sorted = [...categories].sort((a, b) => b.quantity - a.quantity);
  const top5 = sorted.slice(0, 5);
  const others = sorted.slice(5);

  const otherTotal = others.reduce((acc, c) => acc + c.quantity, 0);

  const chartData = [
    ...top5.map((c) => ({
      name: c.name,
      value: (c.quantity / totalQuantity) * 100,
    })),
    {
      name: 'Other',
      value: (otherTotal / totalQuantity) * 100,
    },
  ];

  return (
    <div style={{ width: '100%'}}>
      <h2 className="text-xl font-semibold mb-4 text-center">Top Categories Breakdown By Number Of Order Placed</h2>
    <ResponsiveContainer width="100%" height={400}>
      <PieChart width={400} height={400}>
        <Pie
          dataKey="value"
          data={chartData}
          cx="50%"
          cy="50%"
          outerRadius={120}
          label={({ name, value }) => `${name} (${value.toFixed(1)}%)`}
        >
          {chartData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value: number) => `${value.toFixed(2)}%`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
    </div>
  );
}



type ProductRevenueData = {
  name: string;
  revenue: number;
};

type PropsProductRevenue = {
  products: ProductRevenueData[];
  totalRevenue: number;
};

export function TopProductRevenuePie({ products, totalRevenue }: PropsProductRevenue) {
  // Sort and split into top 5 + other
  const sorted = [...products].sort((a, b) => b.revenue - a.revenue);
  const top5 = sorted.slice(0, 5);
  const others = sorted.slice(5);

  const otherTotal = others.reduce((acc, p) => acc + p.revenue, 0);

  const chartData = [
    ...top5.map((p) => ({
      name: p.name,
      value: ((p.revenue / totalRevenue) * 100),
    })),
    {
      name: 'Other',
      value: ((otherTotal / totalRevenue) * 100),
    },
  ];

  return (
    <div style={{ width: '100%'}}>
      <h2 className="text-xl font-semibold mb-4 text-center">Top Products Breakdown By Revenue</h2>
      <ResponsiveContainer width="100%" height={400}>
      <PieChart width={400} height={400}>
        <Pie
          dataKey="value"
          data={chartData}
          cx="50%"
          cy="50%"
          outerRadius={120}
          label={({ name, value }) => `${name} (${value.toFixed(1)}%)`}
        >
          {chartData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value: number) => `${value.toFixed(2)}%`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
    </div>
  );
}




type CategoryRevenueData = {
  name: string;
  revenue: number;
};

type PropsCategoryRevenue = {
  categories: CategoryRevenueData[];
  totalRevenue: number;
};
export function TopCategoryRevenuePie({ categories, totalRevenue }: PropsCategoryRevenue) {
  const sorted = [...categories].sort((a, b) => b.revenue - a.revenue);
  const top5 = sorted.slice(0, 5);
  const others = sorted.slice(5);

  const otherTotal = others.reduce((acc, c) => acc + c.revenue, 0);

  const chartData = [
    ...top5.map((c) => ({
      name: c.name,
      value: (c.revenue / totalRevenue) * 100,
    })),
    {
      name: 'Other',
      value: (otherTotal / totalRevenue) * 100,
    },
  ];

  return (
    <div style={{ width: '100%'}}>
      <h2 className="text-xl font-semibold mb-4 text-center">Top Categories Breakdown By Revenue</h2>
    <ResponsiveContainer width="100%" height={400}>
      <PieChart width={400} height={400}>
        <Pie
          dataKey="value"
          data={chartData}
          cx="50%"
          cy="50%"
          outerRadius={120}
          label={({ name, value }) => `${name} (${value.toFixed(1)}%)`}
        >
          {chartData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value: number) => `${value.toFixed(2)}%`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
    </div>
  );
}
