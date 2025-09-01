import { useState } from 'react'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Box, Container, Heading, Text, Flex, Image, useColorModeValue } from '@chakra-ui/react'
import TokenForm from './components/TokenForm'
import TokenData from './components/TokenData'
import './App.css'

// Define a custom theme for a more professional look
const theme = extendTheme({
  colors: {
    brand: {
      50: '#e6f7ff',
      100: '#b3e0ff',
      200: '#80caff',
      300: '#4db3ff',
      400: '#1a9dff',
      500: '#0080ff',
      600: '#0066cc',
      700: '#004d99',
      800: '#003366',
      900: '#001a33',
    },
  },
  fonts: {
    heading: '"Inter", sans-serif',
    body: '"Inter", sans-serif',
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
      },
      variants: {
        solid: (props: any) => ({
          bg: props.colorScheme === 'blue' ? 'brand.500' : undefined,
          _hover: {
            bg: props.colorScheme === 'blue' ? 'brand.600' : undefined,
          },
        }),
      },
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: 'lg',
          overflow: 'hidden',
        },
      },
    },
  },
})

interface TokenInfo {
  pairAddress: string
  dexId: string
  chainId: string
  baseToken: {
    name: string
    symbol: string
    address: string
  }
  quoteToken: {
    name: string
    symbol: string
    address: string
  }
  priceUsd: string
  priceNative: string
  liquidity: {
    usd: number
    base: number
    quote: number
  }
  volume24h: number
  priceChange24h: number
  txns24h: {
    buys: number
    sells: number
  }
  fdv: number
  marketCap: number
}

function App() {
  const [tokenData, setTokenData] = useState<TokenInfo[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const headerBg = useColorModeValue('white', 'gray.800')
  
  return (
    <ChakraProvider theme={theme}>
      <Box bg={bgColor} minH="100vh">
        {/* Professional Header */}
        <Box bg={headerBg} boxShadow="sm" py={4} mb={8}>
          <Container maxW="container.xl">
            <Flex justify="space-between" align="center">
              <Flex align="center">
                <Heading as="h1" size="lg" color="brand.500">TokenDashboard</Heading>
              </Flex>
              <Text fontSize="sm" color="gray.500">Powered by DexScreener API</Text>
            </Flex>
          </Container>
        </Box>
        
        <Container maxW="container.xl" py={4}>
          <Box textAlign="center" mb={8}>
            <Heading as="h2" size="xl" mb={3} color="brand.700">Crypto Token Analytics</Heading>
            <Text fontSize="lg" color="gray.600" maxW="container.md" mx="auto">
              Enter a token address to view comprehensive market data including price, liquidity, and 24-hour trading metrics
            </Text>
          </Box>
          
          <Box bg="white" p={6} borderRadius="lg" boxShadow="md" mb={8}>
            <TokenForm 
              setTokenData={setTokenData}
              setLoading={setLoading}
              setError={setError}
            />
          </Box>
          
          <TokenData 
            tokenData={tokenData}
            loading={loading}
            error={error}
          />
        </Container>
      </Box>
    </ChakraProvider>
  )
}

export default App
