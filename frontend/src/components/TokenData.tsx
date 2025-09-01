import { Box, Heading, Text, SimpleGrid, Spinner, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Alert, AlertIcon, Card, CardHeader, CardBody, Badge, Flex, Divider, Icon, useColorModeValue } from '@chakra-ui/react'
import { FiDollarSign, FiBarChart2, FiActivity, FiDroplet, FiTrendingUp } from 'react-icons/fi'

interface TokenDataProps {
  tokenData: any[] | null
  loading: boolean
  error: string | null
}

const TokenData = ({ tokenData, loading, error }: TokenDataProps) => {
  const cardBg = useColorModeValue('white', 'gray.800')
  const cardBorder = useColorModeValue('gray.200', 'gray.700')
  const statBg = useColorModeValue('gray.50', 'gray.700')
  
  if (loading) {
    return (
      <Box textAlign="center" py={10} bg={cardBg} borderRadius="lg" boxShadow="md">
        <Spinner size="xl" thickness="4px" speed="0.65s" color="brand.500" />
        <Text mt={4} fontSize="lg" fontWeight="medium">Loading token data...</Text>
      </Box>
    )
  }

  if (error) {
    return (
      <Alert status="error" borderRadius="lg" boxShadow="md">
        <AlertIcon />
        <Text fontWeight="medium">{error}</Text>
      </Alert>
    )
  }

  if (!tokenData || tokenData.length === 0) {
    return null
  }

  return (
    <Box>
      <Heading as="h2" size="lg" mb={4}>
        Token Information
      </Heading>
      
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {tokenData.map((token, index) => (
          <Card key={index} variant="outline" boxShadow="md" borderWidth="1px" borderColor={cardBorder}>
            <CardHeader bg="blue.50" p={4}>
              <Flex align="center" justify="space-between">
                <Box>
                  <Heading size="md">
                    {token.baseToken.name} <Text as="span" color="gray.500" fontWeight="medium">({token.baseToken.symbol})</Text>
                  </Heading>
                  <Flex fontSize="sm" mt={1} gap={2}>
                    <Badge colorScheme="blue" px={2} py={0.5} borderRadius="md">{token.chainId}</Badge>
                    <Badge colorScheme="green" px={2} py={0.5} borderRadius="md">{token.dexId}</Badge>
                  </Flex>
                </Box>
                <Badge colorScheme={token.priceChange24h >= 0 ? 'green' : 'red'} fontSize="md" px={2} py={1}>
                  <Flex align="center">
                    <Stat display="inline" mr={1}>
                      <StatArrow type={token.priceChange24h >= 0 ? 'increase' : 'decrease'} />
                    </Stat>
                    {Math.abs(token.priceChange24h).toFixed(2)}%
                  </Flex>
                </Badge>
              </Flex>
            </CardHeader>
            
            <CardBody p={4}>
              <SimpleGrid columns={2} spacing={4}>
                {/* Price Information */}
                <Stat bg={statBg} p={3} borderRadius="md">
                  <Flex align="center" mb={1}>
                    <Icon as={FiDollarSign} color="brand.500" mr={1} />
                    <StatLabel>Price (USD)</StatLabel>
                  </Flex>
                  <StatNumber>${parseFloat(token.priceUsd).toFixed(6)}</StatNumber>
                  {token.priceNative && (
                    <StatHelpText fontSize="xs" mb={0}>
                      {token.priceNative} {token.quoteToken?.symbol}
                    </StatHelpText>
                  )}
                </Stat>
                
                {/* 24h Price Change */}
                <Stat bg={statBg} p={3} borderRadius="md">
                  <Flex align="center" mb={1}>
                    <Icon as={FiTrendingUp} color={token.priceChange24h >= 0 ? "green.500" : "red.500"} mr={1} />
                    <StatLabel>24h Change</StatLabel>
                  </Flex>
                  <StatNumber>
                    <StatArrow type={token.priceChange24h >= 0 ? 'increase' : 'decrease'} />
                    {Math.abs(token.priceChange24h).toFixed(2)}%
                  </StatNumber>
                  {token.txns24h && (
                    <StatHelpText fontSize="xs" mb={0}>
                      <Flex justify="space-between">
                        <Badge colorScheme="green" variant="subtle" px={1}>{token.txns24h.buys} buys</Badge>
                        <Badge colorScheme="red" variant="subtle" px={1}>{token.txns24h.sells} sells</Badge>
                      </Flex>
                    </StatHelpText>
                  )}
                </Stat>
                
                {/* Liquidity Information */}
                <Stat bg={statBg} p={3} borderRadius="md">
                  <Flex align="center" mb={1}>
                    <Icon as={FiDroplet} color="purple.500" mr={1} />
                    <StatLabel>Liquidity (USD)</StatLabel>
                  </Flex>
                  <StatNumber>
                    ${token.liquidity?.usd ? token.liquidity.usd.toLocaleString() : 'N/A'}
                  </StatNumber>
                  <StatHelpText fontSize="xs" mb={0}>
                    {token.liquidity?.base ? `${token.liquidity.base.toLocaleString()} ${token.baseToken.symbol}` : ''}
                    {token.liquidity?.base && token.liquidity?.quote ? ' | ' : ''}
                    {token.liquidity?.quote ? `${token.liquidity.quote.toLocaleString()} ${token.quoteToken.symbol}` : ''}
                  </StatHelpText>
                </Stat>
                
                {/* Volume Information */}
                <Stat bg={statBg} p={3} borderRadius="md">
                  <Flex align="center" mb={1}>
                    <Icon as={FiActivity} color="green.500" mr={1} />
                    <StatLabel>24h Volume</StatLabel>
                  </Flex>
                  <StatNumber>
                    ${token.volume24h ? token.volume24h.toLocaleString() : 'N/A'}
                  </StatNumber>
                </Stat>
              </SimpleGrid>
              
              {/* Additional Market Information */}
              <SimpleGrid columns={2} spacing={4} mt={4}>
                {token.marketCap > 0 && (
                  <Stat size="sm" bg={statBg} p={2} borderRadius="md">
                    <Flex align="center" mb={1}>
                      <Icon as={FiBarChart2} color="blue.500" mr={1} boxSize={4} />
                      <StatLabel>Market Cap</StatLabel>
                    </Flex>
                    <StatNumber fontSize="md">${token.marketCap.toLocaleString()}</StatNumber>
                  </Stat>
                )}
                
                {token.fdv > 0 && (
                  <Stat size="sm" bg={statBg} p={2} borderRadius="md">
                    <Flex align="center" mb={1}>
                      <Icon as={FiBarChart2} color="blue.500" mr={1} boxSize={4} />
                      <StatLabel>Fully Diluted Value</StatLabel>
                    </Flex>
                    <StatNumber fontSize="md">${token.fdv.toLocaleString()}</StatNumber>
                  </Stat>
                )}
              </SimpleGrid>
              
              <Text fontSize="xs" color="gray.500" mt={4} bg={statBg} p={2} borderRadius="md" fontFamily="monospace">
                Pair Address: {token.pairAddress}
              </Text>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default TokenData