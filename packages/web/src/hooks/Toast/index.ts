import { useToast } from '@chakra-ui/react'

const ShowToast = () => {
  const toast = useToast()
  const showError = () => {
    toast({
      title: 'Sorry.',
      description: 'Sorry but you dont have enougth money .',
      status: 'error',
      duration: 4000,
      isClosable: true
    })
  }

  const showSuccess = () => {
    toast({
      title: 'Yay.',
      description: 'Transaction completed!.',
      status: 'success',
      duration: 4000,
      isClosable: true
    })
  }

  return { showError, showSuccess }
}

export default ShowToast
