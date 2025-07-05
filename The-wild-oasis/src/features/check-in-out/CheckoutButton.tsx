import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";

type CheckoutButtonProps = {
  bookingId: number;
};

function CheckoutButton({ bookingId }: CheckoutButtonProps) {
  const { checkout, isCheckingOut } = useCheckout();
  return (
    <Button
      variation="primary"
      size="small"
      disabled={isCheckingOut}
      onClick={() => checkout({ bookingId, obj: { status: "checked-out" } })}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
