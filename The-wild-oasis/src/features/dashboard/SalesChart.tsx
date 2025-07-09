import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import { useDarkMode } from "../../hooks/useDarkMode";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Heading from "../../ui/Heading";
import { type RecentBooking } from "../../services/apiBookings";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

interface SalesChartProps {
  bookings: RecentBooking[] | undefined;
  numDays: number;
}

export default function SalesChart({ bookings, numDays }: SalesChartProps) {
  const { isDarkMode } = useDarkMode();

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const allData = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      totalSales: bookings
        ?.filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, curr) => acc + (curr.totalPrice ?? 0), 0),
      extrasSales: bookings
        ?.filter((bookings) => isSameDay(date, new Date(bookings.created_at)))
        .reduce((acc, curr) => acc + (curr.extrasPrice ?? 0), 0),
    };
  });

  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  return (
    <StyledSalesChart>
      <Heading as={"h2"}>Sales</Heading>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={allData}>
          <CartesianGrid strokeDasharray="4" />
          <XAxis
            dataKey={"label"}
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey={"totalSales"}
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            type="monotone"
            strokeWidth={2}
            name="Total sales"
            unit={"$"}
          />
          <Area
            dataKey={"extrasSales"}
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            type="monotone"
            strokeWidth={2}
            name="Extras sales"
            unit={"$"}
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}
