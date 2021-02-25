import { useToast } from '@chakra-ui/react'

const ShowToast = () => {
  const toast = useToast()
  const showError = () => {
    toast({
      title: 'Ocorreu um problema.',
      description: 'Parece que você não tem dinheiro suficiente.',
      status: 'error',
      duration: 4000,
      isClosable: true
    })
  }

  const showSuccess = () => {
    toast({
      title: 'Sucesso',
      description: 'Transação completa!',
      status: 'success',
      duration: 4000,
      isClosable: true
    })
  }

  return { showError, showSuccess }
}

export default ShowToast
