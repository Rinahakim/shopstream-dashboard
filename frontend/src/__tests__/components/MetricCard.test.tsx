import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DollarSign } from 'lucide-react';
import { MetricCard } from '@/components/dashboard/MetricCard';

describe('MetricCard', () => {
  it('should render title and value', () => {
    render(
      <MetricCard
        title="Total Revenue"
        value="$15,420.50"
        icon={<DollarSign data-testid="icon" />}
      />
    );

    expect(screen.getByText('Total Revenue')).toBeInTheDocument();
    expect(screen.getByText('$15,420.50')).toBeInTheDocument();
  });

  it('should render icon', () => {
    render(
      <MetricCard
        title="Test"
        value="100"
        icon={<DollarSign data-testid="metric-icon" />}
      />
    );

    expect(screen.getByTestId('metric-icon')).toBeInTheDocument();
  });

  it('should render positive trend', () => {
    render(
      <MetricCard
        title="Orders"
        value="156"
        icon={<DollarSign />}
        trend={12.5}
      />
    );

    expect(screen.getByText('12.5%')).toBeInTheDocument();
    expect(screen.getByText('vs last week')).toBeInTheDocument();
  });

  it('should render numeric values correctly', () => {
    render(
      <MetricCard
        title="Products"
        value={24}
        icon={<DollarSign />}
      />
    );

    expect(screen.getByText('24')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(
      <MetricCard
        title="Test"
        value="100"
        icon={<DollarSign />}
        className="custom-class"
      />
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });
});

