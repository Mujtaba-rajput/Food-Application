import { Input } from "../../components";
import React from "react";
import { Button, SafeAreaView, Text } from "react-native";
import styles from "./auth.style";
import { Resolver, useController, useForm } from "react-hook-form";
// import { setUser } from './auth.slice';

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values,
    errors: {},
  };
};

const SignUp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  const InputPrivate = ({
    label,
    name,
    control: internalControl,
    isSecure = false,
    error = "",
  }: {
    label: string;
    name: string;
    control: any;
    isSecure?: boolean;
    error?: string;
  }) => {
    const { field } = useController({
      name,
      control: internalControl,
      defaultValue: "",
    });

    return (
      <Input
        label={label}
        onChange={field.onChange}
        value={field.value}
        secureTextEntry={isSecure}
        error={error}
      />
    );
  };
  const onSubmit = (data: any) => {};

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>Sign Up</Text>
        <InputPrivate label="First Name" name="firstName" control={control} />
        <InputPrivate label="Last Name" name="lastName" control={control} />
        <InputPrivate label="Email" name="email" control={control} />
        <InputPrivate label="Phone" name="phone" control={control} />
        <InputPrivate
          label="Password"
          name="password"
          control={control}
          isSecure={true}
        />
        <Button onPress={handleSubmit(onSubmit)} title="Sign Up" />
      </SafeAreaView>
    </>
  );
};

export default SignUp;
