import React, { useEffect, useState } from 'react'
import { UserForm } from '../../components/User/Form'
import { Box, Spinner } from '@chakra-ui/react'
import { api, GET_USER } from '../../axios'
import { useHistory } from 'react-router-dom'

export const RegisterUser = () => {
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const checkIfUserExists = async () => {
    const { data } = await api.get(GET_USER)
    if (data) history.push(`/transactions`)

    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    checkIfUserExists()
  }, [])

  return (
    <>
      <Box justifyContent="center" alignItems="center" display="flex">
        {loading ? (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        ) : (
          <UserForm />
        )}
      </Box>
    </>
  )
}
