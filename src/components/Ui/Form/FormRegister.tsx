import { cloneElement } from 'react'
import {
  FieldPath,
  FieldValues,
  get,
  useFormContext,
  UseFormRegister,
} from 'react-hook-form'

import {
  FormControl as FormControlChakra,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HTMLChakraProps,
} from '@chakra-ui/react'

export interface FormRegisterProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<HTMLChakraProps<'div'>, 'children'> {
  name: TName
  register: UseFormRegister<TFieldValues>
  children: React.ReactElement
  label?: React.ReactNode
  helper?: React.ReactNode
  ['data-testid']?: string
}

export const FormRegister = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  label,
  helper,
  register,
  children,
  ...rest
}: FormRegisterProps<TFieldValues, TName>) => {
  const { formState } = useFormContext()
  const error = get(formState.errors, name)

  return (
    <FormControlChakra isInvalid={!!error} {...rest}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      {cloneElement(children, {
        ...children.props,
        ...register(name, {
          onBlur: children.props?.onBlur,
          onChange: children.props?.onChange,
        }),
      })}
      {helper && <FormHelperText>{helper}</FormHelperText>}
      {error?.message && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControlChakra>
  )
}
