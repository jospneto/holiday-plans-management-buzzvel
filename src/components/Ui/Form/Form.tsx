import React from 'react'
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form'

import { Stack, StackProps } from '@chakra-ui/react'

export interface FormProps<TFieldValues extends FieldValues = FieldValues>
  extends Omit<StackProps, 'as' | 'onSubmit'> {
  form: UseFormReturn<TFieldValues>
  children: React.ReactNode
  onSubmit?: SubmitHandler<TFieldValues>
}

export const Form = <TFieldValues extends FieldValues = FieldValues>({
  form,
  children,
  onSubmit,
  ...props
}: FormProps<TFieldValues>) => {
  return (
    <FormProvider {...form}>
      {onSubmit ? (
        <Stack as="form" onSubmit={form.handleSubmit(onSubmit)} {...props}>
          {children}
        </Stack>
      ) : (
        children
      )}
    </FormProvider>
  )
}
