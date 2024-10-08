import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import type { WormholeConnectConfig } from '@wormhole-foundation/wormhole-connect'
import WormholeConnect from '@wormhole-foundation/wormhole-connect'
import getConfig from './getConfig'

function App() {
  const { id } = useParams<{ id: string }>()
  const [config, setConfig] = useState<WormholeConnectConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadConfig = async () => {
      if (!id) {
        setError('No ID provided')
        setLoading(false)
        return
      }

      try {
        const configData = await getConfig(id)
        if (configData) {
          configData.walletConnectProjectId = "845a98d91542c49d23069a91227874ad"

        }
        setConfig(configData)
        setError(null)
      } catch (err) {
        console.error('Error loading config:', err)
        setError('Failed to load bridge configuration')
      } finally {
        setLoading(false)
      }
    }

    loadConfig()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (error || !config) {
    return (
      <div className="min-h-screen w-full bg-black flex items-center justify-center">
        <div className="text-red-500">{error || 'Configuration not available'}</div>
      </div>
    )
  }

  return (
    <div className="wormhole-container">
      <div className="wormhole-content">
        <WormholeConnect config={config} />
      </div>
    </div>
  )
}

export default App
