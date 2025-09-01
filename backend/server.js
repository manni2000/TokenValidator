const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Route to fetch token data from DexScreener API
app.get('/api/token/:address', async (req, res) => {
  try {
    const { address } = req.params;
    
    // Validate the address (basic validation)
    if (!address || address.length < 10) {
      return res.status(400).json({ error: 'Invalid token address' });
    }
    
    // Fetch data from DexScreener API
    // Using the /latest/dex/tokens/{tokenAddress} endpoint as per documentation
    const response = await axios.get(`https://api.dexscreener.com/latest/dex/tokens/${address}`);
    
    // Check if we got valid data
    if (!response.data || !response.data.pairs || response.data.pairs.length === 0) {
      return res.status(404).json({ error: 'Token not found or no liquidity pairs available' });
    }
    
    // Extract the required data with more detailed information
    const tokenData = response.data.pairs.map(pair => ({
      pairAddress: pair.pairAddress,
      dexId: pair.dexId,
      chainId: pair.chainId,
      baseToken: {
        name: pair.baseToken.name,
        symbol: pair.baseToken.symbol,
        address: pair.baseToken.address
      },
      quoteToken: {
        name: pair.quoteToken.name,
        symbol: pair.quoteToken.symbol,
        address: pair.quoteToken.address
      },
      priceUsd: pair.priceUsd,
      priceNative: pair.priceNative,
      liquidity: {
        usd: pair.liquidity?.usd || 0,
        base: pair.liquidity?.base || 0,
        quote: pair.liquidity?.quote || 0
      },
      volume24h: pair.volume?.h24 || 0,
      priceChange24h: pair.priceChange?.h24 || 0,
      txns24h: {
        buys: pair.txns?.h24?.buys || 0,
        sells: pair.txns?.h24?.sells || 0
      },
      fdv: pair.fdv || 0,
      marketCap: pair.marketCap || 0
    }));
    
    res.json({ success: true, data: tokenData });
  } catch (error) {
    console.error('Error fetching token data:', error.message);
    res.status(500).json({ error: 'Failed to fetch token data' });
  }
});

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});