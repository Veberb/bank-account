import React from 'react'
import { UserForm } from '../../components/User/Form'
import { Box } from '@chakra-ui/react'

export const RegisterUser = () => {
  return (
    <>
      <Box justifyContent="center" alignItems="center" display="flex">
        <UserForm />
      </Box>
    </>
  )
}
