import styled from "styled-components";
import { useForm, type SubmitHandler } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { useUpdateCabin } from "./useUpdateCabin";
import type { CabinFormValues } from "./CreateCabinForm";
import { type Cabin } from "../../services/apiCabins";

const FormRow2 = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

type EditCabinFormProps = {
  cabin: Cabin;
};

function EditCabinForm({ cabin }: EditCabinFormProps) {
  const { isEditing, updateCabin } = useUpdateCabin();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<CabinFormValues>({
    defaultValues: {
      name: cabin.name ?? "",
      description: cabin.description ?? "",
      regularPrice: cabin.regularPrice ?? 0,
      discount: cabin.discount ?? 0,
      maxCapacity: cabin.maxCapacity ?? 1,
      image: undefined as unknown as FileList,
    },
  });

  const onSubmit: SubmitHandler<CabinFormValues> = (data) => {
    const image = data.image?.[0] ? data.image : cabin.image ?? "";

    updateCabin(
      { newCabin: { ...data, image }, id: cabin.id },
      {
        onSuccess: () => {
          reset();
        },
      }
    );
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isEditing}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isEditing}
          {...register("maxCapacity", {
            valueAsNumber: true,
            required: "This field is required",
            min: { value: 1, message: "Capacity should be at least 1" },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isEditing}
          {...register("regularPrice", {
            valueAsNumber: true,
            required: "This field is required",
            min: { value: 1, message: "Price should be at least 1" },
          })}
        />
      </FormRow>
      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isEditing}
          {...register("discount", {
            valueAsNumber: true,
            required: "This field is required",
            validate: (value: number) => {
              const regularPrice = getValues("regularPrice");
              return (
                value <= regularPrice ||
                "Discount should be less than regular price"
              );
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          id="description"
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput id="image" accept="image/*" {...register("image")} />
      </FormRow>

      <FormRow2>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" size="medium">
          Cancel
        </Button>
        <Button size="medium" variation="primary" disabled={isEditing}>
          Edit cabin
        </Button>
      </FormRow2>
    </Form>
  );
}

export default EditCabinForm;
