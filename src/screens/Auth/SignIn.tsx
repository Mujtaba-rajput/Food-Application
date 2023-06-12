import { Input } from '../../components';
import React from 'react';
import { Button, SafeAreaView, Text } from 'react-native';
import styles from './auth.style';
import { Resolver, useController, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../hooks/redux';
import { setUser } from './auth.slice';
import { CommonActions, useNavigation } from '@react-navigation/native';
// import { setUser } from './auth.slice';

type FormValues = {
  email: string;
  password: string;
};

const resolver: Resolver<FormValues> = async values => {
  return {
    values: values.email && values.password ? values : {},
    errors: !values.email
      ? {
          email: {
            type: 'required',
            message: 'Email is required.',
          },
        }
      : !values.password
      ? {
          password: {
            type: 'required',
            message: 'Password is required.',
          },
        }
      : {},
  };
};

const SignIn = () => {
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });
  const navigation = useNavigation();

  const InputPrivate = ({
    label,
    name,
    control: internalControl,
    isSecure = false,
    error = '',
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
      defaultValue: '',
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

  const onSubmit = (data: any) => {
    dispatch(
      setUser({
        email: data?.email,
      }),
    );
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'HomeBase' }],
      }),
    );
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Sign In</Text>
        <InputPrivate
          label="Email"
          name="email"
          control={control}
          error={errors?.email ? errors?.email?.message : ''}
        />
        <InputPrivate
          label="Password"
          name="password"
          control={control}
          isSecure={true}
          error={errors?.password ? errors?.password?.message : ''}
        />
        <Button onPress={handleSubmit(onSubmit)} title="Sign In" />
      </SafeAreaView>
    </>
  );
};

export default SignIn;
