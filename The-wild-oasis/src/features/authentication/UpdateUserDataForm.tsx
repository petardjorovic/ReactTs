import styled from "styled-components";
import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";

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

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const { user } = useUser();

  const [fullName, setFullName] = useState<string>(
    user?.user_metadata.fullName
  );
  const [avatar, setAvatar] = useState<File | null>(null);
  const { isUpdating, updateUser } = useUpdateUser();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!fullName) return;
    if (!avatar) {
      updateUser({ fullName });
    } else {
      updateUser(
        { fullName, avatar },
        {
          onSuccess: () => {
            setAvatar(null);
            const form = e.target as HTMLFormElement;
            form.reset();
          },
        }
      );
    }
  }

  function handleCancel() {
    setFullName(user?.user_metadata.fullName);
    setAvatar(null);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address" error="">
        <Input value={user?.email} disabled />
      </FormRow>
      <FormRow label="Full name" error="">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Avatar image" error="">
        <FileInput
          id="avatar"
          accept="image/*"
          disabled={isUpdating}
          onChange={(e) => {
            return e.target.files ? setAvatar(e.target.files[0]) : null;
          }}
        />
      </FormRow>
      <FormRow2>
        <Button
          type="reset"
          variation="secondary"
          size="medium"
          disabled={isUpdating}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button size="medium" variation="primary" disabled={isUpdating}>
          Update account
        </Button>
      </FormRow2>
    </Form>
  );
}

export default UpdateUserDataForm;
