import React from 'react'
import { Form, useFormik } from 'formik'
import {
  Center,
  Square,
  Input,
  Text,
  Flex,
  Grid,
  FormControl,
  Box,
  VStack,
  HStack,
  Button
} from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'

import { api, CREATE_USER } from '../../axios'

export const UserForm: React.FC = () => {
  const history = useHistory()
  const formik = useFormik({
    initialValues: { name: '', email: '' },
    onSubmit: async values => {
      await api.post(CREATE_USER, values)
      history.push(`/transactions`)
    }
  })

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <VStack spacing={4} align="stretch">
          <Text fontSize="2xl">
            Please, fill this form to create your account
          </Text>
          <HStack direction="row" display="flex" justifyContent="center">
            <Box>
              <FormControl id="first-name" isRequired>
                <Input
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  placeholder="Name"
                  size="lg"
                  id="name"
                  name="name"
                  type="text"
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl id="email" isRequired>
                <Input
                  id="email"
                  name="email"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  placeholder="Email "
                  size="lg"
                />
              </FormControl>
            </Box>
            <Box>
              <Button
                isLoading={formik.isSubmitting}
                loadingText="Cadastrando"
                colorScheme="teal"
                variant="solid"
                type="submit"
              >
                Register
              </Button>
            </Box>
          </HStack>
        </VStack>
      </form>
    </>
  )
}
