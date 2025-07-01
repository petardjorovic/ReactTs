import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSettings } from "./useUpdateSettings";

function UpdateSettingsForm() {
  const { isLoading, settings } = useSettings();
  const { isUpdating, updateSetting } = useUpdateSettings();

  if (isLoading) return <Spinner />;

  function handleUpdate(e: React.FocusEvent<HTMLInputElement>, field: string) {
    const { value } = e.target;
    if (!value) return;
    updateSetting({ [field]: Number(value) });
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking" error={undefined}>
        <Input
          type="number"
          id="min-nights"
          defaultValue={
            settings?.minBookingLength ? settings.minBookingLength : 0
          }
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking" error={undefined}>
        <Input
          type="number"
          id="max-nights"
          defaultValue={
            settings?.maxBookingLength ? settings.maxBookingLength : 0
          }
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking" error={undefined}>
        <Input
          type="number"
          id="max-guests"
          defaultValue={
            settings?.maxGuestPerBooking ? settings.maxGuestPerBooking : 0
          }
          onBlur={(e) => handleUpdate(e, "maxGuestPerBooking")}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Breakfast price" error={undefined}>
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={settings?.breakfastPrice ? settings.breakfastPrice : 0}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
          disabled={isUpdating}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
