import { Input as ChakraInput, InputProps as ChakraInputProps, Stack, Text } from '@chakra-ui/react'
import { Controller, useFormContext } from 'react-hook-form'

interface InputProps extends ChakraInputProps {
  label?: string
}

export const Input: React.FC<InputProps> = ({ label, name, ...rest }) => {
  const { control, formState } = useFormContext()
  const error = formState.errors.root

  return (
    <Stack width="full" spacing={4}>
      {label && <Text as="strong" color="gray.600">{label}</Text>}
      {name && <Controller control={control} name={name} render={({ field }) => (
        <ChakraInput name={field.name} value={field.value} onChange={field.onChange} focusBorderColor="primary.500" {...rest} />
      )}/>}
      {error?.message && <Text as="span" color="red.500">{error.message}</Text>}
    </Stack>
  )
}
