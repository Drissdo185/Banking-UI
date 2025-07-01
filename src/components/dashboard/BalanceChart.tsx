import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Card, Button } from '../ui';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ChartData } from '../../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface BalanceChartProps {
  data: ChartData;
  title?: string;
}

const ChartCard = styled(Card)``;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ChartTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.neutrals.gray800};
`;

const PeriodTabs = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.neutrals.gray50};
  padding: 4px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;

const PeriodTab = styled(Button)<{ active?: boolean }>`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  border: none;
  background: ${({ active, theme }) => active ? theme.colors.neutrals.white : 'transparent'};
  color: ${({ active, theme }) => active ? theme.colors.neutrals.gray800 : theme.colors.neutrals.gray500};
  box-shadow: ${({ active, theme }) => active ? theme.shadows.sm : 'none'};

  &:hover {
    background: ${({ active, theme }) => active ? theme.colors.neutrals.white : theme.colors.neutrals.gray100};
    transform: none;
  }
`;

const ChartContainer = styled.div`
  height: 300px;
  position: relative;
`;

const periods = [
  { id: '1mar', label: '1 Mar', active: false },
  { id: '31mar', label: '31 Mar', active: false },
  { id: '01', label: '01', active: true },
];

export const BalanceChart: React.FC<BalanceChartProps> = ({ 
  data, 
  title = "Monthly" 
}) => {
  const chartRef = useRef<ChartJS<'line'>>(null);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1F2937',
        titleColor: '#FFFFFF',
        bodyColor: '#FFFFFF',
        borderColor: '#374151',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function(context: any) {
            return `Balance: $${context.parsed.y}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 12,
            weight: 500,
          },
        },
      },
      y: {
        grid: {
          color: '#F1F5F9',
          borderDash: [5, 5],
        },
        border: {
          display: false,
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 12,
            weight: 500,
          },
          callback: function(value: any) {
            return '$' + value;
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 6,
        hoverRadius: 8,
        backgroundColor: '#10B981',
        borderColor: '#FFFFFF',
        borderWidth: 3,
      },
    },
  };

  const chartData = {
    ...data,
    datasets: data.datasets.map(dataset => ({
      ...dataset,
      borderColor: '#10B981',
      backgroundColor: (ctx: any) => {
        const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, 'rgba(16, 185, 129, 0.3)');
        gradient.addColorStop(1, 'rgba(16, 185, 129, 0.05)');
        return gradient;
      },
      borderWidth: 3,
      fill: true,
    }))
  };

  return (
    <ChartCard>
      <ChartHeader>
        <ChartTitle>{title}</ChartTitle>
        <PeriodTabs>
          {periods.map((period) => (
            <PeriodTab 
              key={period.id} 
              variant="secondary" 
              active={period.active}
            >
              {period.label}
            </PeriodTab>
          ))}
        </PeriodTabs>
      </ChartHeader>
      <ChartContainer>
        <Line ref={chartRef} data={chartData} options={options} />
      </ChartContainer>
    </ChartCard>
  );
};