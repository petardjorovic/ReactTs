import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import type { RecentBooking, RecentStay } from "../../services/apiBookings";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

interface StatsProps {
  bookings: RecentBooking[] | undefined;
  confirmedStays: RecentStay[] | undefined;
  numDays: number;
  cabinsCount: number | undefined;
}

export default function Stats({
  bookings,
  confirmedStays,
  numDays,
  cabinsCount,
}: StatsProps) {
  // 1. Number of bookings
  const numBookings = bookings?.length;

  // 2. Total sales
  const sales = bookings?.reduce((acc, curr) => acc + curr.totalPrice!, 0);

  // 3. Total check ins
  const checkIns = confirmedStays?.length;

  // 4. Occupancy rate
  const totalNights = confirmedStays?.reduce(
    (acc, curr) => acc + (curr.numNights ?? 0),
    0
  );

  const maxPossibleNights = numDays && cabinsCount ? numDays * cabinsCount : 0;

  const occupationRate =
    totalNights && maxPossibleNights
      ? Math.round((totalNights / maxPossibleNights) * 100)
      : 0;

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales!)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkIns}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={occupationRate + "%"}
      />
    </>
  );
}
