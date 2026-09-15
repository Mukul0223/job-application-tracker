import { useMemo } from 'react';
import {
  ResponsiveContainer,
  FunnelChart,
  Funnel,
  LabelList,
  Tooltip,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

// Stage colors transitioning from primary brand to success green
const STAGE_COLORS = [
  'hsl(var(--primary, 221.2 83.2% 53.3%))', // Applied
  'hsl(215 85% 62%)', // Responded
  'hsl(180 70% 45%)', // Interviewed
  'hsl(142 71% 45%)', // Offer
];

export const ConversionFunnelChart = ({ byStatus = {} }) => {
  // Derive cumulative "at or beyond" counts from byStatus data
  const funnelData = useMemo(() => {
    const statusCounts = {
      Applied: 0,
      Screening: 0,
      Interview: 0,
      Offer: 0,
      Rejected: 0,
      Wishlist: 0,
    };

    if (Array.isArray(byStatus)) {
      byStatus.forEach((item) => {
        const key = item?.status || item?.name;
        if (key && statusCounts[key] !== undefined) {
          statusCounts[key] = Number(item.count || item.value || 0);
        }
      });
    } else if (typeof byStatus === 'object' && byStatus !== null) {
      Object.entries(byStatus).forEach(([key, value]) => {
        const matchedKey = Object.keys(statusCounts).find(
          (k) => k.toLowerCase() === key.toLowerCase()
        );
        if (matchedKey) {
          statusCounts[matchedKey] = Number(value || 0);
        }
      });
    }

    // Backend-aligned cumulative stage arithmetic:
    const offer = statusCounts.Offer;
    const interviewed = statusCounts.Interview + offer;
    const responded =
      statusCounts.Screening + statusCounts.Rejected + interviewed;
    const applied = statusCounts.Applied + responded;

    // Direct `fill` properties on each data item for native Recharts rendering
    return [
      { name: 'Applied', value: applied, fill: STAGE_COLORS[0] },
      { name: 'Responded', value: responded, fill: STAGE_COLORS[1] },
      { name: 'Interviewed', value: interviewed, fill: STAGE_COLORS[2] },
      { name: 'Offer', value: offer, fill: STAGE_COLORS[3] },
    ];
  }, [byStatus]);

  return (
    <Card className="p-6! shadow-sm rounded-xl">
      <CardHeader className="p-0! pb-6!">
        <CardTitle className="text-lg font-semibold text-foreground">
          Conversion Funnel
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0!">
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <FunnelChart margin={{ top: 10, right: 120, left: 20, bottom: 10 }}>
              <Tooltip
                contentStyle={{
                  borderRadius: '8px',
                  padding: '12px!',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                  border: '1px solid var(--border, #e5e7eb)',
                }}
                formatter={(value, name) => [`${value} Applications`, name]}
              />
              <Funnel
                dataKey="value"
                data={funnelData}
                isAnimationActive
                neckWidth="25%"
                neckHeight="25%"
              >
                {/* Count displayed inside/on the funnel segments */}
                <LabelList
                  position="center"
                  fill="#ffffff"
                  stroke="none"
                  dataKey="value"
                  className="font-bold text-sm"
                />

                {/* Stage names displayed to the right of the funnel */}
                <LabelList
                  position="right"
                  fill="var(--foreground, #111827)"
                  stroke="none"
                  dataKey="name"
                  className="text-xs font-semibold"
                />
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConversionFunnelChart;
