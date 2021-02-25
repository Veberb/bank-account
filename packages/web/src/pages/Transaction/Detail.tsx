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
  Input
} from '@chakra-ui/react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { format } from 'date-fns'
import { api, LIST_TRANSACTION, GET_USER } from '../../axios'

export const Detail = () => {
  const [{ user, userTransactions, loading, pagination }, setState] = useState<
    any
  >({
    userTransactions: [],
    user: {},
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
      userTransactions: [...state.userTransactions, ...res.data],
      pagination: {
        ...state.pagination,
        hasMore: res.data.length === pagination.take
      }
    }))
  }

  const currencyFormat = num => {
    const x = num / 100
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
          <Text fontSize="2xl">Account details</Text>
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
          <div id="scrollableDiv" style={{ height: 200, overflow: 'auto' }}>
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
                  <b>Yay! You have seen it all</b>
                </p>
              }
              scrollableTarget="scrollableDiv"
            >
              <Table variant="striped" colorScheme="teal">
                <Thead>
                  <Tr>
                    <Th>#</Th>
                    <Th>ID</Th>
                    <Th>Description</Th>
                    <Th>Type</Th>
                    <Th>Value</Th>
                    <Th>Date</Th>
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
        </VStack>
      </Box>
    </>
  )
}
