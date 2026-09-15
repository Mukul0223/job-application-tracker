import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export const ResponseRateChart = ({ responseRate = 0 }) => {
  // Convert fractional rates (0.75) to percentage (75) if needed
  const rateValue =
    responseRate <= 1 && responseRate > 0 ? responseRate * 100 : responseRate;

  const normalizedRate = Math.min(100, Math.max(0, Number(rateValue) || 0));

  const data = [
    {
      name: 'Response Rate',
      value: normalizedRate,
      fill: 'hsl(var(--primary, 221.2 83.2% 53.3%))',
    },
  ];

  return (
    <Card className="p-6! shadow-sm rounded-xl">
      <CardHeader className="p-0! pb-4!">
        <CardTitle className="text-lg font-semibold text-foreground">
          Response Rate
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0! relative">
        <div className="w-full h-60 relative">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="75%"
              outerRadius="100%"
              barSize={14}
              data={data}
              startAngle={90}
              endAngle={-270}
            >
              <PolarAngleAxis
                type="number"
                domain={[0, 100]}
                angleAxisId={0}
                tick={false}
              />
              <RadialBar
                background={{ fill: 'var(--muted, #f3f4f6)' }}
                dataKey="value"
                cornerRadius={10}
              />
            </RadialBarChart>
          </ResponsiveContainer>

          {/* Centered overlay label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center gap-1!">
            <span className="text-4xl! font-bold text-foreground tracking-tight">
              {Math.round(normalizedRate)}%
            </span>
            <span className="text-xs font-medium text-muted-foreground">
              Total Responded
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResponseRateChart;
