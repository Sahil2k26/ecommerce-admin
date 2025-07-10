'use client'

import { useEffect, useState } from 'react'
import { Line, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Calendar, AlertTriangle, TrendingUp, Package } from 'lucide-react'

import { Category, Color, Product, Size } from '@prisma/client'

export type ProductWithRelations = Product & {
  category: Category
  size: Size
  color: Color
}

interface AIDemandForecastProps {
  initialProducts: ProductWithRelations[]
}

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

type ForecastData = {
  date: string
  predictedSales: number
  confidenceInterval: [number, number]
  factors: {
    weatherImpact: number
    eventImpact: number
    trendImpact: number
    seasonalityImpact: number
  }
}

type ProductData = {
  id: string
  name: string
  category: string
  currentStock: number
  leadTime: number // days
}

export function AIDemandForecast() {
  const [forecastData, setForecastData] = useState<ForecastData[]>([])
  const [products, setProducts] = useState<ProductData[]>([])
  const [selectedProduct, setSelectedProduct] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [timeHorizon, setTimeHorizon] = useState<7 | 30 | 90>(30)
  const [riskItems, setRiskItems] = useState<string[]>([])

  // Mock AI prediction function - replace with real API calls
  const generateAIForecast = async (productId: string, days: number) => {
    setIsLoading(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Generate mock forecast data with realistic patterns
    const mockData: ForecastData[] = []
    const today = new Date()
    
    // Base sales with seasonality
    const seasonalityMultiplier = selectedProduct.includes('Jacket') ? 
      (month: number) => month >= 10 || month <= 2 ? 1.8 : 0.6 : // Winter items
      selectedProduct.includes('T-Shirt') ? 
      (month: number) => month >= 5 && month <= 8 ? 1.5 : 0.8 : // Summer items
      () => 1 // Neutral
    
    // Event dates that affect sales
    const eventDates = [
      { date: new Date(today.getFullYear(), 11, 25), impact: 2.5, name: 'Christmas' },
      { date: new Date(today.getFullYear(), 10, 24), impact: 2.0, name: 'Black Friday' },
      { date: new Date(today.getFullYear(), 6, 1), impact: 1.5, name: 'Summer Start' }
    ]
    
    for (let i = 0; i < days; i++) {
      const date = new Date()
      date.setDate(today.getDate() + i)
      const month = date.getMonth()
      
      // Base sales with random variation
      let baseSales = 50 + Math.random() * 30
      
      // Apply seasonality
      baseSales *= seasonalityMultiplier(month)
      
      // Weekend boost
      if (date.getDay() === 0 || date.getDay() === 6) {
        baseSales *= 1.3
      }
      
      // Check for events
      let eventImpact = 1
      let eventName = ''
      for (const event of eventDates) {
        const diff = Math.abs(date.getTime() - event.date.getTime())
        const daysDiff = diff / (1000 * 60 * 60 * 24)
        if (daysDiff < 7) { // One week before/after event
          eventImpact = event.impact - (daysDiff * 0.1)
          eventName = event.name
        }
      }
      
      // Weather impact (mock)
      const weatherImpact = month >= 11 || month <= 2 ? 
        (selectedProduct.includes('Jacket') ? 1.5 : 0.7) : 
        (selectedProduct.includes('T-Shirt') ? 1.4 : 1)
      
      // Social trend impact (random viral potential)
      const trendImpact = Math.random() > 0.9 ? 2 + Math.random() * 3 : 1
      
      const predictedSales = Math.round(
        baseSales * 
        eventImpact * 
        weatherImpact * 
        trendImpact
      )
      
      mockData.push({
        date: date.toISOString().split('T')[0],
        predictedSales,
        confidenceInterval: [
          Math.round(predictedSales * 0.8),
          Math.round(predictedSales * 1.2)
        ],
        factors: {
          weatherImpact,
          eventImpact,
          trendImpact,
          seasonalityImpact: seasonalityMultiplier(month)
        }
      })
    }
    
    // Identify risk items (stockouts or overstock)
    const mockRiskItems = []
    if (selectedProduct.includes('Jacket') && today.getMonth() >= 8) {
      mockRiskItems.push('Winter inventory buildup needed')
    }
    if (selectedProduct.includes('T-Shirt') && today.getMonth() <= 3) {
      mockRiskItems.push('Summer inventory reduction recommended')
    }
    if (Math.random() > 0.7) {
      mockRiskItems.push('Potential supply chain delay detected')
    }
    
    setForecastData(mockData)
    setRiskItems(mockRiskItems)
    setIsLoading(false)
  }

  useEffect(() => {
    // Fetch products from your API
    const fetchProducts = async () => {
      // Replace with actual API call to your Prisma backend
      const mockProducts: ProductData[] = [
        { id: '1', name: 'Cotton V-Neck Tee', category: 'T-Shirts', currentStock: 150, leadTime: 14 },
        { id: '2', name: 'Graphic Print Tee', category: 'T-Shirts', currentStock: 85, leadTime: 10 },
        { id: '3', name: 'Bomber Jacket', category: 'Jackets', currentStock: 45, leadTime: 21 },
        { id: '4', name: 'Cable Knit Sweater', category: 'Sweaters', currentStock: 60, leadTime: 18 },
        { id: '5', name: 'Sequined Top', category: 'Party Wear', currentStock: 30, leadTime: 12 }
      ]
      setProducts(mockProducts)
      setSelectedProduct(mockProducts[0].id)
    }
    
    fetchProducts()
  }, [])

  useEffect(() => {
    if (selectedProduct) {
      generateAIForecast(selectedProduct, timeHorizon)
    }
  }, [selectedProduct, timeHorizon])

  // Chart data configuration
  const lineChartData = {
    labels: forecastData.map(item => item.date),
    datasets: [
      {
        label: 'AI Predicted Demand',
        data: forecastData.map(item => item.predictedSales),
        borderColor: 'rgba(99, 102, 241, 1)',
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        tension: 0.4,
        fill: true,
        pointRadius: 3,
        pointHoverRadius: 5
      },
      {
        label: 'Confidence Range',
        data: forecastData.map(item => item.confidenceInterval[1]),
        borderColor: 'rgba(99, 102, 241, 0.3)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        borderDash: [5, 5],
        pointRadius: 0,
        fill: '-1'
      }
    ]
  }

  const factorsData = forecastData.length > 0 ? {
    labels: ['Weather', 'Events', 'Trends', 'Seasonality'],
    datasets: [{
      label: 'Impact Factors',
      data: [
        forecastData.reduce((sum, item) => sum + item.factors.weatherImpact, 0) / forecastData.length,
        forecastData.reduce((sum, item) => sum + item.factors.eventImpact, 0) / forecastData.length,
        forecastData.reduce((sum, item) => sum + item.factors.trendImpact, 0) / forecastData.length,
        forecastData.reduce((sum, item) => sum + item.factors.seasonalityImpact, 0) / forecastData.length
      ],
      backgroundColor: [
        'rgba(59, 130, 246, 0.7)',
        'rgba(16, 185, 129, 0.7)',
        'rgba(245, 158, 11, 0.7)',
        'rgba(139, 92, 246, 0.7)'
      ]
    }]
  } : null

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">AI Demand Forecasting</h2>
        <div className="flex space-x-2">
          <Button 
            variant={timeHorizon === 7 ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setTimeHorizon(7)}
          >
            7 Days
          </Button>
          <Button 
            variant={timeHorizon === 30 ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setTimeHorizon(30)}
          >
            30 Days
          </Button>
          <Button 
            variant={timeHorizon === 90 ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setTimeHorizon(90)}
          >
            90 Days
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Product</h3>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {products.length > 0 ? (
              <select
                className="w-full p-2 border rounded"
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
              >
                {products.map(product => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            ) : (
              <Skeleton className="h-8 w-full" />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Current Stock</h3>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-full" />
            ) : (
              <div className="text-2xl font-bold">
                {products.find(p => p.id === selectedProduct)?.currentStock || 0}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Lead Time</h3>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-full" />
            ) : (
              <div className="text-2xl font-bold">
                180 days
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">AI Confidence</h3>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-full" />
            ) : (
              <div className="text-2xl font-bold">
                {forecastData.length > 0 ? 
                  `${Math.round((1 - (forecastData.reduce((sum, item) => {
                    const range = item.confidenceInterval[1] - item.confidenceInterval[0]
                    return sum + (range / item.predictedSales)
                  }, 0) / forecastData.length)) * 100)}%` : 
                  'N/A'}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <h3 className="text-lg font-semibold">AI Demand Forecast</h3>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-80 w-full" />
            ) : (
              <div className="h-80">
                <Line 
                  data={lineChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'top' as const,
                      },
                      tooltip: {
                        callbacks: {
                          afterLabel: (context) => {
                            const data = forecastData[context.dataIndex]
                            return [
                              `Weather Impact: ${data.factors.weatherImpact.toFixed(1)}x`,
                              `Event Impact: ${data.factors.eventImpact.toFixed(1)}x`,
                              `Trend Impact: ${data.factors.trendImpact.toFixed(1)}x`,
                              `Seasonality: ${data.factors.seasonalityImpact.toFixed(1)}x`
                            ].join('\n')
                          }
                        }
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        title: {
                          display: true,
                          text: 'Units Sold'
                        }
                      }
                    }
                  }}
                />
              </div>
            )}
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground">
            <p>AI model considers weather patterns, events, social trends, and historical seasonality</p>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Demand Drivers</h3>
          </CardHeader>
          <CardContent>
            {isLoading || !factorsData ? (
              <Skeleton className="h-80 w-full" />
            ) : (
              <div className="h-80">
                <Bar
                  data={factorsData as import('chart.js').ChartData<'bar', number[], string>}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false
                      },
                      tooltip: {
                        callbacks: {
                          label: (context: import('chart.js').TooltipItem<'bar'>) => {
                            return `${context.dataset.label}: ${context.raw}x impact`
                          }
                        }
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        title: {
                          display: true,
                          text: 'Impact Factor'
                        }
                      }
                    }
                  } as import('chart.js').ChartOptions<'bar'>}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {riskItems.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader className="flex flex-row items-center space-x-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            <h3 className="text-lg font-semibold">AI Risk Alerts</h3>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {riskItems.map((item, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-red-500">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm">
              View Recommendations
            </Button>
          </CardFooter>
        </Card>
      )}

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">AI Insights</h3>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ) : (
            <div className="prose prose-sm">
              {selectedProduct.includes('Jacket') && (
                <p>
                  <strong>Winter Preparation:</strong> Our AI detects increasing demand for winter apparel. 
                  Consider increasing inventory by 30-40% in the next 2 weeks to meet projected demand.
                </p>
              )}
              {selectedProduct.includes('T-Shirt') && (
                <p>
                  <strong>Summer Season:</strong> T-shirt demand is entering peak season. 
                  Our models suggest ordering 25% more stock now to account for longer lead times.
                </p>
              )}
              <p>
                <strong>Trend Alert:</strong> Social media mentions of similar products have increased by 
                18% this week, which may lead to higher than expected demand.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}