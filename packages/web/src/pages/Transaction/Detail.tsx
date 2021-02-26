import React, { useEffect, useState } from 'react'
import {
  Box,
  VStack,
  Text,
  Spinner,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  HStack,
  FormControl,
  Input,
  FormLabel,
  Select,
  Button
} from '@chakra-ui/react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { format } from 'date-fns'
import { Form, useFormik } from 'formik'
import {
  api,
  LIST_TRANSACTION,
  CREATE_TRANSACTION,
  GET_USER
} from '../../axios'
import Toast from '../../hooks/Toast'

export const Detail = () => {
  const [value, setValue] = useState('')
  const { showError, showSuccess } = Toast()
  const [
    { user, userTransactions, loading, pagination, balance },
    setState
  ] = useState<any>({
    userTransactions: [],
    user: {},
    balance: 0,
    loading: false,
    pagination: {
      skip: 0,
      hasMore: true
    }
  })

  const getUserTransactions = async () => {
    const res = await api.get(LIST_TRANSACTION, {
      params: { ...pagination }
    })

    setState(state => ({
      ...state,
      userTransactions: [...state.userTransactions, ...res.data.transactions],
      balance: res.data.balance,
      pagination: {
        ...state.pagination,
        hasMore: res.data.transactions.length === pagination.take
      }
    }))
  }

  const onlyNumbers = value => {
    return value.replace(/\D/g, '')
  }

  const currencyFormat = num => {
    if (!num) return 'R$ 0'
    const x = onlyNumbers(num.toString()) / 100
    return 'R$' + x.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  const fetchMoreTransactions = () => {
    setState(state => ({
      ...state,
      pagination: { ...state.pagination, page: state.pagination.page + 1 }
    }))
    getUserTransactions()
  }

  const getUserDetail = async () => {
    const res = await api.get(GET_USER)
    setState(state => ({ ...state, user: res.data, loading: false }))
  }

  useEffect(() => {
    setState(state => ({ ...state, loading: true }))
    getUserDetail()
    getUserTransactions()
  }, [])

  const formik = useFormik({
    initialValues: { type: 'payment' },
    onSubmit: async values => {
      try {
        const res = await api.post(CREATE_TRANSACTION, {
          ...values,
          value: onlyNumbers(value)
        })
        showSuccess()
        setValue('')
        setState(state => ({
          ...state,
          userTransactions: [],
          pagination: { ...state.pagination, page: 0 }
        }))
        getUserTransactions()
      } catch (error) {
        console.log(error)
        showError()
      }
    }
  })

  if (loading)
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    )

  return (
    <>
      <Box justifyContent="center" alignItems="center" display="flex">
        <VStack spacing={4} align="stretch">
          <Text fontSize="2xl">Detalhes da conta</Text>
          <HStack direction="row" display="flex" justifyContent="start">
            <Box>
              <FormControl id="first-name">
                <Input
                  value={user.name}
                  placeholder="Name"
                  size="lg"
                  id="name"
                  name="name"
                  type="text"
                  disabled
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl id="email">
                <Input
                  id="email"
                  name="email"
                  type="text"
                  disabled
                  value={user.email}
                  placeholder="Email "
                  size="lg"
                />
              </FormControl>
            </Box>
          </HStack>
          <form onSubmit={formik.handleSubmit}>
            <HStack direction="row" display="flex" justifyContent="start">
              <Box>
                <FormControl id="value">
                  <Input
                    placeholder="Value"
                    size="lg"
                    onChange={evt => {
                      console.log(evt.currentTarget.value)
                      setValue(currencyFormat(evt.currentTarget.value))
                    }}
                    value={value}
                    id="value"
                    name="value"
                    type="text"
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="type">
                  <Select
                    onChange={formik.handleChange}
                    value={formik.values.type}
                  >
                    <option value="deposit">Depositar</option>
                    <option value="withdraw">Retirar</option>
                    <option value="payment">Pagar</option>
                  </Select>
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
                  Continuar
                </Button>
              </Box>
            </HStack>
          </form>
          <Text fontSize="1xl">Balance: {currencyFormat(balance)}</Text>
          {!userTransactions.length && (
            <Text fontSize="1xl">Nenhuma transação </Text>
          )}
          {userTransactions.length && (
            <div id="scrollableDiv" style={{ height: 400, overflow: 'auto' }}>
              <InfiniteScroll
                dataLength={userTransactions.length}
                next={fetchMoreTransactions}
                hasMore={pagination.hasMore}
                loader={
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                  />
                }
                endMessage={
                  <p style={{ textAlign: 'center' }}>
                    <b>Isso é tudo :) </b>
                  </p>
                }
                scrollableTarget="scrollableDiv"
              >
                <Table variant="striped" colorScheme="teal">
                  <Thead>
                    <Tr>
                      <Th>#</Th>
                      <Th>ID</Th>
                      <Th>Descrição</Th>
                      <Th>Tipo</Th>
                      <Th>Valor</Th>
                      <Th>Data</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {userTransactions.map((repo, index) => (
                      <Tr key={index}>
                        <Td>{index + 1}</Td>
                        <Td>{repo['id']}</Td>
                        <Td>{repo['description']}</Td>
                        <Td>{repo['type']}</Td>
                        <Td>{currencyFormat(repo['value'])}</Td>
                        <Td>
                          {format(new Date(repo['createdAt']), 'dd-MM-yyyy')}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </InfiniteScroll>
            </div>
          )}
        </VStack>
      </Box>
    </>
  )
}
