import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export const TrendChart = ({ trend = [] }) => {
  return (
    <Card className="p-6! shadow-sm rounded-xl">
      <CardHeader className="p-0! pb-6!">
        <CardTitle className="text-lg font-semibold text-foreground">
          Analytics Trend
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0!">
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={trend}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                opacity={0.3}
              />
              <XAxis
                dataKey="period"
                tickLine={false}
                axisLine={false}
                tickMargin={12}
                className="text-xs text-muted-foreground"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
                tickMargin={12}
                className="text-xs text-muted-foreground"
              />
              <Tooltip
                contentStyle={{
                  borderRadius: '8px',
                  padding: '12px!',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                  border: '1px solid var(--border, #e5e7eb)',
                }}
              />
              <Line
                type="monotone"
                dataKey="count"
                stroke="var(--primary, #2563eb)"
                strokeWidth={2.5}
                dot={{ r: 4, strokeWidth: 2, fill: 'var(--primary, #2563eb)' }}
                activeDot={{ r: 6 }}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendChart;
