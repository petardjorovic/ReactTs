import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useForm, type SubmitHandler } from "react-hook-form";
import styled from "styled-components";

import { editCabin, type Cabin } from "../../services/apiCabins";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import type { CabinFormValues } from "./CreateCabinForm";

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

type UpdateCabinProps = {
  newCabin: {
    name: string;
    maxCapacity: number;
    regularPrice: number;
    discount: number;
    description: string;
    image: FileList | string;
  };
  id: number;
};

type EditCabinFormProps = {
  cabin: Cabin;
};

function EditCabinForm({ cabin }: EditCabinFormProps) {
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

  const queryClient = useQueryClient();

  const { isPending: isEditing, mutate: updateCabin } = useMutation<
    Cabin,
    Error,
    UpdateCabinProps
  >({
    mutationFn: ({ newCabin, id }) => editCabin(newCabin, id),
    onSuccess: () => {
      toast.success("Cabin successfully updated");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit: SubmitHandler<CabinFormValues> = (data) => {
    const image = data.image?.[0] ? data.image : cabin.image ?? "";

    console.log(data);

    updateCabin({ newCabin: { ...data, image }, id: cabin.id });
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
          disabled={isEditing}
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
