import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import type { BookingWithRelations } from "../../services/apiBookings";
import Menus from "../../ui/Menus";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

type BookingRowProps = {
  booking: BookingWithRelations;
};

export type BookingStatus = "unconfirmed" | "checked-in" | "checked-out";

function BookingRow({ booking }: BookingRowProps) {
  const { checkout } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();
  const statusToTagName: Record<BookingStatus, "blue" | "green" | "silver"> = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  const navigate = useNavigate();

  const safeStatus = (booking.status ?? "unconfirmed") as BookingStatus;

  return (
    <Table.Row>
      <Cabin>{booking.cabins?.name}</Cabin>

      <Stacked>
        <span>{booking.guests?.fullName}</span>
        <span>{booking.guests?.email}</span>
      </Stacked>

      <Stacked>
        <span>
          {booking.startDate
            ? isToday(new Date(booking.startDate))
              ? "Today"
              : formatDistanceFromNow(booking.startDate)
            : "Unknown start"}{" "}
          &rarr; {booking.numNights} night stay
        </span>
        <span>
          {booking.startDate && booking.endDate
            ? `${format(new Date(booking.startDate), "MMM dd yyyy")} —
          ${format(new Date(booking.endDate), "MMM dd yyyy")}`
            : "Unknown dates"}
          `
        </span>
      </Stacked>

      <Tag type={statusToTagName[safeStatus]}>
        {booking?.status?.replace("-", " ")}
      </Tag>

      <Amount>{formatCurrency(booking.totalPrice ?? 0)}</Amount>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={booking.id.toString()} />
          <Menus.List id={booking.id.toString()}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/bookings/${booking.id}`)}
            >
              See details
            </Menus.Button>

            {booking.status === "unconfirmed" && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/checkin/${booking.id}`)}
              >
                Check in
              </Menus.Button>
            )}

            {booking.status === "checked-in" && (
              <Menus.Button
                icon={<HiArrowUpOnSquare />}
                onClick={() =>
                  checkout({
                    bookingId: booking.id,
                    obj: { status: "checked-out" },
                  })
                }
              >
                Check out
              </Menus.Button>
            )}
            <Modal.Open opens="deleteBooking">
              <Menus.Button icon={<HiTrash />}>Delete booking</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="deleteBooking">
          <ConfirmDelete
            resourceName="booking"
            disabled={isDeleting}
            onConfirm={() => deleteBooking(booking.id)}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
