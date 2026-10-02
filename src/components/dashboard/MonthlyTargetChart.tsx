import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { formatBDT, toBanglaDigits } from '../../utils/formatters';

const rawMonthlyData = [
  { monthEn: 'Apr', monthBn: 'এপ্রিল', target: 20000000, collected: 21500000 },
  { monthEn: 'May', monthBn: 'মে', target: 25000000, collected: 24200000 },
  { monthEn: 'Jun', monthBn: 'জুন', target: 25000000, collected: 27800000 },
  { monthEn: 'Jul', monthBn: 'জুলাই', target: 30000000, collected: 28500000 },
  { monthEn: 'Aug', monthBn: 'আগস্ট', target: 30000000, collected: 32000000 },
  { monthEn: 'Sep', monthBn: 'সেপ্টেম্বর', target: 35000000, collected: 36800000 },
];

export const MonthlyTargetChart: React.FC = () => {
  const { language, t } = useApp();
  const isBn = language === 'bn';

  const chartData = rawMonthlyData.map((d) => ({
    ...d,
    month: isBn ? d.monthBn : d.monthEn,
  }));

  return (
    <div className={`bg-white p-5 rounded-2xl border border-black/10 shadow-2xs flex flex-col justify-between ${isBn ? 'font-bangla' : ''}`}>
      <div className="flex items-center justify-between pb-3 border-b border-[#EEEEEE]">
        <div>
          <h3 className="text-sm font-bold text-black tracking-tight">
            {t('monthlyCollectionVsTarget')}
          </h3>
          <p className="text-[11px] text-black/60">
            {t('monthlyCollectionSubtitle')}
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#0038BD]" />
            <span className="text-black/70">{t('collected')}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#EF8E01]" />
            <span className="text-black/70">{t('target')}</span>
          </div>
        </div>
      </div>

      <div className="h-56 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barGap={4} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <XAxis
              dataKey="month"
              stroke="#000000"
              opacity={0.4}
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#EEEEEE' }}
            />
            <YAxis
              stroke="#000000"
              opacity={0.4}
              fontSize={10}
              tickLine={false}
              axisLine={{ stroke: '#EEEEEE' }}
              tickFormatter={(v) =>
                isBn
                  ? `৳${toBanglaDigits((v / 10000000).toFixed(1))}কোটি`
                  : `৳${(v / 10000000).toFixed(1)}Cr`
              }
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-3 rounded-xl shadow-lg border border-black/10 text-xs">
                      <p className="font-bold text-black mb-1">
                        {payload[0].payload.month} {isBn ? '২০২৬' : '2026'}
                      </p>
                      <p className="text-[#0038BD] font-semibold">
                        {t('collected')}: {formatBDT(payload[0].value as number, false, language)}
                      </p>
                      <p className="text-[#EF8E01] font-semibold">
                        {t('target')}: {formatBDT(payload[1].value as number, false, language)}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="collected" fill="#0038BD" radius={[4, 4, 0, 0]} maxBarSize={28} />
            <Bar dataKey="target" fill="#EF8E01" radius={[4, 4, 0, 0]} maxBarSize={28} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="pt-3 border-t border-[#EEEEEE] flex items-center justify-between text-[11px] text-black/60">
        <span>
          {t('targetAchievementRate')}{' '}
          <strong className="text-black font-mono">{isBn ? '১০৫.১%' : '105.1%'}</strong>
        </span>
        <span className="text-[#0038BD] font-semibold">{t('aboveTarget')}</span>
      </div>
    </div>
  );
};
