import styled from "styled-components";
import { useForm, type SubmitHandler } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import type { Cabin } from "../../services/apiCabins";

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

export type CabinFormValues = {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: FileList | string;
};

type CreateCabinProps = {
  onCloseModal?: () => void;
};

function CreateCabinForm({ onCloseModal }: CreateCabinProps) {
  const { isCreating, createCabin } = useCreateCabin();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<CabinFormValues>();

  const onSubmit: SubmitHandler<CabinFormValues> = (data) => {
    createCabin(data, {
      onSuccess: (data: Cabin) => {
        console.log(data);
        reset();
        onCloseModal?.();
      },
    });
  };

  // function onSubmit(data: FormData) {
  //   // console.log(data);
  //   SubmitHandler()
  //   createNewCabin(data);
  // }

  // function onError(errors: unknown) {
  //   console.log(errors);
  // }

  // const onError: SubmitErrorHandler<CabinFormValues> = (errors) => {
  //   console.log(errors);
  // };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)} // drugi argument je onError function
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isCreating}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
          defaultValue={0}
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
          defaultValue=""
          disabled={isCreating}
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow2>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          size="medium"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button size="medium" variation="primary" disabled={isCreating}>
          Create new cabin
        </Button>
      </FormRow2>
    </Form>
  );
}

export default CreateCabinForm;
