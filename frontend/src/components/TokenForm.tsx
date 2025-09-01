import { useState } from 'react'
import { Box, Button, useToast, FormControl, FormLabel, Input, FormErrorMessage } from '@chakra-ui/react'
import axios from 'axios'

interface TokenFormProps {
  setTokenData: React.Dispatch<React.SetStateAction<any[] | null>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  setError: React.Dispatch<React.SetStateAction<string | null>>
}

const TokenForm = ({ setTokenData, setLoading, setError }: TokenFormProps) => {
  const [tokenAddress, setTokenAddress] = useState('')
  const [isInvalid, setIsInvalid] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const toast = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!tokenAddress || tokenAddress.trim().length < 10) {
      setIsInvalid(true)
      return
    }
    
    setIsInvalid(false)
    setIsSubmitting(true)
    setLoading(true)
    setError(null)
    setTokenData(null)
    
    try {
      const response = await axios.get(`http://localhost:5000/api/token/${tokenAddress.trim()}`)
      
      if (response.data.success && response.data.data) {
        setTokenData(response.data.data)
      } else {
        setError('No data found for this token')
        toast({
          title: 'No data found',
          description: 'Could not find data for the provided token address',
          status: 'warning',
          duration: 5000,
          isClosable: true,
        })
      }
    } catch (error) {
      console.error('Error fetching token data:', error)
      setError('Failed to fetch token data. Please try again.')
      toast({
        title: 'Error',
        description: 'Failed to fetch token data. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
      setIsSubmitting(false)
    }
  }

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <FormControl isInvalid={isInvalid} mb={5}>
        <FormLabel htmlFor="tokenAddress" fontWeight="medium" fontSize="md" color="gray.700">Token Contract Address</FormLabel>
        <Input
          id="tokenAddress"
          placeholder="Enter token address (e.g., 0x...)"
          value={tokenAddress}
          onChange={(e) => setTokenAddress(e.target.value)}
          size="lg"
          borderRadius="md"
          borderColor="gray.300"
          _hover={{ borderColor: 'brand.300' }}
          _focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 1px #0080ff' }}
          bg="white"
          fontSize="md"
        />
        {isInvalid && (
          <FormErrorMessage>Please enter a valid token contract address</FormErrorMessage>
        )}
      </FormControl>
      
      <Button
        type="submit"
        colorScheme="blue"
        width="full"
        isLoading={isSubmitting}
        loadingText="Fetching Data"
        size="lg"
        height="50px"
        borderRadius="md"
        boxShadow="sm"
        _hover={{ transform: 'translateY(-1px)', boxShadow: 'md' }}
        _active={{ transform: 'translateY(0)', boxShadow: 'sm' }}
      >
        Analyze Token
      </Button>
    </Box>
  )
}

export default TokenForm