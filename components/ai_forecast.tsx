'use client'

import React, { useEffect, useState } from 'react'
import { Line, Bar, Pie, Radar, Bubble } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  BubbleController
} from 'chart.js'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { 
  Calendar, 
  AlertTriangle, 
  TrendingUp, 
  Package, 
  CloudSun, 
  Ticket, 
  Sun, 
  Zap,
  Thermometer,
  ShoppingBag,
  BarChart2,
  Percent,
  Clock,
  Box,
  Database,
  Activity,
  MessageSquare,
  Heart,
  Share2,
  Hash,
  Twitter,
  Instagram,
  Youtube
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  BubbleController
)

// ======== TYPES ========
type SocialMediaData = {
  date: string
  mentions: number
  sentiment: number // -1 to 1
  engagement: number
  influencers: { handle: string; platform: 'twitter' | 'instagram' | 'youtube' }[]
  trendingHashtags: string[]
  platformDistribution: {
    twitter: number
    instagram: number
    youtube: number
  }
}

type ForecastData = {
  date: string
  predictedSales: number
  confidenceInterval: [number, number]
  factors: {
    weatherImpact: number
    eventImpact: number
    trendImpact: number
    seasonalityImpact: number
    socialMediaImpact: number
  }
  socialMedia?: SocialMediaData
}

type ProductData = {
  id: string
  name: string
  category: string
  currentStock: number
  leadTime: number
  reorderLevel: number
  salesVelocity: number
  price: number
  imageUrl?: string
}

type RiskItem = {
  message: string
  severity: 'low' | 'medium' | 'high'
  action: string
  icon: React.ReactElement
}

type InsightItem = {
  title: string
  content: string
  icon: React.ReactElement
  color: string
}

// ======== CONSTANTS ========
const RISK_COLORS = {
  high: 'red',
  medium: 'orange',
  low: 'yellow'
}

const CATEGORY_COLORS = {
  'T-Shirts': 'bg-blue-100 text-blue-800',
  'Jackets': 'bg-purple-100 text-purple-800',
  'Sweaters': 'bg-amber-100 text-amber-800',
  'Party Wear': 'bg-pink-100 text-pink-800'
}

const PLATFORM_COLORS = {
  twitter: 'bg-blue-400',
  instagram: 'bg-pink-500',
  youtube: 'bg-red-500'
}

// ======== MAIN COMPONENT ========
export function AIDemandForecast() {
  const [forecastData, setForecastData] = useState<ForecastData[]>([])
  const [products, setProducts] = useState<ProductData[]>([])
  const [selectedProduct, setSelectedProduct] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [timeHorizon, setTimeHorizon] = useState<7 | 30 | 90>(30)
  const [riskItems, setRiskItems] = useState<RiskItem[]>([])
  const [insights, setInsights] = useState<InsightItem[]>([])
  const [socialMediaData, setSocialMediaData] = useState<SocialMediaData[]>([])

  // ======== DATA GENERATION ========
  const generateAIForecast = async (productId: string, days: number) => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const product = products.find(p => p.id === productId)
    if (!product) return

    const mockData: ForecastData[] = []
    const today = new Date()
    const month = today.getMonth()

    // Seasonality patterns
    const seasonality = {
      'T-Shirts': (m: number) => m >= 5 && m <= 8 ? 1.5 : 0.8,
      'Jackets': (m: number) => m >= 10 || m <= 2 ? 1.8 : 0.6,
      'Sweaters': (m: number) => m >= 9 && m <= 3 ? 1.4 : 0.7,
      'Party Wear': (m: number) => [11, 12, 0, 1, 6, 7].includes(m) ? 1.6 : 1.1
    }

    // Generate daily forecasts
    for (let i = 0; i < days; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      const dayOfWeek = date.getDay()
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

      // Base sales with variability
      let baseSales = product.salesVelocity * (0.9 + Math.random() * 0.2)

      // Apply factors
      baseSales *= seasonality[product.category as keyof typeof seasonality](date.getMonth())
      baseSales *= isWeekend ? 1.3 : 1
      baseSales *= 1 + (Math.random() > 0.95 ? Math.random() * 0.5 : 0) // Random spikes

      mockData.push({
        date: date.toISOString().split('T')[0],
        predictedSales: Math.round(baseSales),
        confidenceInterval: [
          Math.round(baseSales * 0.85),
          Math.round(baseSales * 1.15)
        ],
        factors: {
          weatherImpact: 1 + (Math.random() * 0.3),
          eventImpact: 1 + (Math.random() > 0.9 ? Math.random() * 0.5 : 0),
          trendImpact: 1 + (Math.random() > 0.9 ? Math.random() : 0),
          seasonalityImpact: seasonality[product.category as keyof typeof seasonality](date.getMonth()),
          socialMediaImpact: 1 // Will be updated with real social data
        }
      })
    }

    // Generate mock social media data
    const mockSocialData: SocialMediaData[] = mockData.map((_, i) => {
      const viralChance = product.name.includes('Graphic') ? 0.3 : 
                         product.category === 'Party Wear' ? 0.25 : 0.1
      const isViral = Math.random() < viralChance
      const platforms: Array<'twitter' | 'instagram' | 'youtube'> = ['twitter', 'instagram', 'youtube']
      
      return {
        date: mockData[i].date,
        mentions: Math.round(50 + Math.random() * (isViral ? 500 : 100)),
        sentiment: (Math.random() * 2) - 0.3, // Slightly positive bias
        engagement: Math.round(5 + Math.random() * (isViral ? 50 : 15)),
        influencers: isViral ? [
          { handle: '@fashionista', platform: platforms[Math.floor(Math.random() * 3)] },
          { handle: '@trendwatcher', platform: platforms[Math.floor(Math.random() * 3)] }
        ] : [],
        trendingHashtags: isViral ? [
          `#${product.name.replace(/\s+/g, '')}`,
          `#${product.category.replace(/\s+/g, '')}`,
          seasonality[product.category as keyof typeof seasonality](month) > 1 ? 
            `#${month >= 5 && month <= 8 ? 'Summer' : 'Winter'}Fashion` : '#TrendingNow'
        ] : [],
        platformDistribution: {
          twitter: Math.floor(Math.random() * 60) + 20,
          instagram: Math.floor(Math.random() * 60) + 20,
          youtube: Math.floor(Math.random() * 60) + 20
        }
      }
    })

    // Enhance forecast data with social impact
    const enhancedData = mockData.map((d, i) => ({
      ...d,
      factors: {
        ...d.factors,
        socialMediaImpact: 1 + (mockSocialData[i].mentions / 200) * 
                         (mockSocialData[i].sentiment > 0 ? 1 : 0.5) *
                         (mockSocialData[i].engagement / 10)
      },
      socialMedia: mockSocialData[i]
    }))

    setForecastData(enhancedData)
    setSocialMediaData(mockSocialData)
    generateRiskAnalysis(product, enhancedData)
    generateProductInsights(product, enhancedData)
    setIsLoading(false)
  }

  // ======== RISK ANALYSIS ========
  const generateRiskAnalysis = (product: ProductData, forecast: ForecastData[]) => {
    const risks: RiskItem[] = []
    const avgDailySales = forecast.reduce((sum, day) => sum + day.predictedSales, 0) / forecast.length
    const daysOfStock = product.currentStock / avgDailySales

    // Stockout risk
    if (daysOfStock < product.leadTime) {
      risks.push({
        message: `Critical stockout risk in ${Math.floor(daysOfStock)} days`,
        severity: 'high',
        action: `Urgent reorder needed - ${Math.ceil(product.leadTime * avgDailySales - product.currentStock)} units required`,
        icon: <AlertTriangle className="h-4 w-4" />
      })
    }

    // Overstock risk
    if (daysOfStock > 60) {
      risks.push({
        message: `Overstock warning (${Math.floor(daysOfStock)} days inventory)`,
        severity: 'medium',
        action: 'Run promotions or discounts to reduce stock',
        icon: <Box className="h-4 w-4" />
      })
    }

    // Social media risks
    const negativeSentimentDays = forecast.filter(d => 
      d.socialMedia && d.socialMedia.sentiment < -0.2
    ).length

    if (negativeSentimentDays > 2) {
      risks.push({
        message: `Negative sentiment detected (${negativeSentimentDays} days)`,
        severity: 'medium',
        action: 'Review recent customer feedback and address issues',
        icon: <MessageSquare className="h-4 w-4" />
      })
    }

    // Seasonal risks
    if (product.category === 'T-Shirts' && [9, 10, 11].includes(new Date().getMonth())) {
      risks.push({
        message: 'End of season approaching',
        severity: 'medium',
        action: 'Plan end-of-season sale to clear inventory',
        icon: <Sun className="h-4 w-4" />
      })
    }

    if (product.category === 'Jackets' && [3, 4, 5].includes(new Date().getMonth())) {
      risks.push({
        message: 'Winter inventory buildup needed soon',
        severity: 'low',
        action: 'Start increasing orders for next season',
        icon: <Thermometer className="h-4 w-4" />
      })
    }

    setRiskItems(risks)
  }

  // ======== PRODUCT INSIGHTS ========
  const generateProductInsights = (product: ProductData, forecast: ForecastData[]) => {
    const insights: InsightItem[] = []
    const avgDailySales = forecast.reduce((sum, day) => sum + day.predictedSales, 0) / forecast.length
    const peakDay = forecast.reduce((max, day) => day.predictedSales > max.predictedSales ? day : max, forecast[0])
    const socialData = forecast.flatMap(d => d.socialMedia ? [d.socialMedia] : [])

    // General insights
    insights.push({
      title: "Sales Velocity",
      content: `Selling ${avgDailySales.toFixed(1)} units/day on average`,
      icon: <Activity className="h-4 w-4" />,
      color: 'text-blue-600'
    })

    insights.push({
      title: "Inventory Health",
      content: `${Math.floor(product.currentStock / avgDailySales)} days of inventory remaining`,
      icon: <Database className="h-4 w-4" />,
      color: product.currentStock / avgDailySales < product.leadTime ? 'text-red-600' : 'text-green-600'
    })

    // Social media insights
    if (socialData.length > 0) {
      const avgSentiment = socialData.reduce((sum, d) => sum + d.sentiment, 0) / socialData.length
      const totalMentions = socialData.reduce((sum, d) => sum + d.mentions, 0)
      
      insights.push({
        title: "Social Buzz",
        content: `${totalMentions} mentions (${(avgSentiment * 100).toFixed(0)}% sentiment)`,
        icon: <MessageSquare className="h-4 w-4" />,
        color: avgSentiment > 0.2 ? 'text-green-600' : avgSentiment > 0 ? 'text-blue-600' : 'text-amber-600'
      })

      const viralDays = socialData.filter(d => d.mentions > 200).length
      if (viralDays > 0) {
        insights.push({
          title: "Viral Potential",
          content: `Trending on ${viralDays} day${viralDays > 1 ? 's' : ''}`,
          icon: <Zap className="h-4 w-4" />,
          color: 'text-purple-600'
        })
      }
    }

    // Category-specific insights
    if (product.category === 'T-Shirts') {
      insights.push({
        title: "Weather Sensitivity",
        content: "Demand increases by 12% for every 5°C above 25°C",
        icon: <CloudSun className="h-4 w-4" />,
        color: 'text-yellow-600'
      })
    }

    if (product.category === 'Jackets') {
      insights.push({
        title: "Cold Weather Boost",
        content: "Demand doubles when temperature drops below 10°C",
        icon: <Thermometer className="h-4 w-4" />,
        color: 'text-blue-600'
      })
    }

    if (product.category === 'Party Wear') {
      insights.push({
        title: "Weekend Surge",
        content: "Weekend sales are 45% higher than weekdays",
        icon: <Ticket className="h-4 w-4" />,
        color: 'text-purple-600'
      })
    }

    // Peak performance insight
    insights.push({
      title: "Peak Day Forecast",
      content: `${peakDay.predictedSales} units on ${new Date(peakDay.date).toLocaleDateString()}`,
      icon: <Zap className="h-4 w-4" />,
      color: 'text-green-600'
    })

    setInsights(insights)
  }

  // ======== CHART DATA ========
  const forecastChartData = {
    labels: forecastData.map(d => d.date),
    datasets: [
      {
        label: 'Predicted Sales',
        data: forecastData.map(d => d.predictedSales),
        borderColor: 'rgba(79, 70, 229, 1)',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        tension: 0.3,
        fill: true
      },
      {
        label: 'Confidence Range',
        data: forecastData.map(d => d.confidenceInterval[1]),
        borderColor: 'rgba(79, 70, 229, 0.3)',
        backgroundColor: 'rgba(79, 70, 229, 0.05)',
        borderDash: [5, 5],
        fill: '-1'
      }
    ]
  }

  const factorsRadarData = {
    labels: ['Weather', 'Events', 'Trends', 'Seasonality', 'Social Media'],
    datasets: [{
      label: 'Impact Factors',
      data: [
        forecastData.reduce((sum, d) => sum + d.factors.weatherImpact, 0) / forecastData.length,
        forecastData.reduce((sum, d) => sum + d.factors.eventImpact, 0) / forecastData.length,
        forecastData.reduce((sum, d) => sum + d.factors.trendImpact, 0) / forecastData.length,
        forecastData.reduce((sum, d) => sum + d.factors.seasonalityImpact, 0) / forecastData.length,
        forecastData.reduce((sum, d) => sum + d.factors.socialMediaImpact, 0) / forecastData.length
      ],
      backgroundColor: 'rgba(79, 70, 229, 0.2)',
      borderColor: 'rgba(79, 70, 229, 1)',
      pointBackgroundColor: 'rgba(79, 70, 229, 1)',
      pointBorderColor: '#fff',
      pointHoverRadius: 5
    }]
  }

  const socialTrendsChart = {
    labels: socialMediaData.map(d => d.date),
    datasets: [
      {
        label: 'Mentions',
        data: socialMediaData.map(d => d.mentions),
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.3,
        yAxisID: 'y'
      },
      {
        label: 'Sentiment',
        data: socialMediaData.map(d => d.sentiment * 100),
        borderColor: 'rgba(16, 185, 129, 1)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.3,
        yAxisID: 'y1'
      }
    ]
  }

  const engagementBubbleData = {
    datasets: [{
      label: 'Social Engagement',
      data: socialMediaData.map(d => ({
        x: d.mentions,
        y: d.engagement,
        r: d.sentiment > 0 ? 10 + (d.sentiment * 5) : 5
      })),
      backgroundColor: socialMediaData.map(d => 
        d.sentiment > 0 ? 'rgba(16, 185, 129, 0.7)' : 'rgba(239, 68, 68, 0.7)'
      )
    }]
  }

  const platformDistributionData = {
    labels: ['Twitter', 'Instagram', 'YouTube'],
    datasets: [{
      data: socialMediaData.length > 0 ? [
        socialMediaData[0].platformDistribution.twitter,
        socialMediaData[0].platformDistribution.instagram,
        socialMediaData[0].platformDistribution.youtube
      ] : [30, 30, 30],
      backgroundColor: [
        'rgba(29, 161, 242, 0.7)',
        'rgba(225, 48, 108, 0.7)',
        'rgba(255, 0, 0, 0.7)'
      ]
    }]
  }

  const dailyPatternData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Average Sales by Day',
      data: [85, 78, 82, 88, 92, 120, 115],
      backgroundColor: 'rgba(99, 102, 241, 0.7)'
    }]
  }

  // ======== INITIALIZATION ========
  useEffect(() => {
    // Mock product data - replace with API call
    const mockProducts: ProductData[] = [
      { 
        id: '1', 
        name: 'Premium Cotton Tee', 
        category: 'T-Shirts', 
        currentStock: 120, 
        leadTime: 14, 
        reorderLevel: 80, 
        salesVelocity: 8.5, 
        price: 24.99,
        imageUrl: 'https://example.com/tee.jpg'
      },
      { 
        id: '2', 
        name: 'Graphic Print Tee', 
        category: 'T-Shirts', 
        currentStock: 85, 
        leadTime: 10, 
        reorderLevel: 60, 
        salesVelocity: 6.2, 
        price: 29.99,
        imageUrl: 'https://example.com/graphic-tee.jpg'
      },
      { 
        id: '3', 
        name: 'Winter Parka', 
        category: 'Jackets', 
        currentStock: 45, 
        leadTime: 21, 
        reorderLevel: 30, 
        salesVelocity: 3.8, 
        price: 149.99,
        imageUrl: 'https://example.com/parka.jpg'
      },
      { 
        id: '4', 
        name: 'Cashmere Sweater', 
        category: 'Sweaters', 
        currentStock: 60, 
        leadTime: 18, 
        reorderLevel: 40, 
        salesVelocity: 4.5, 
        price: 89.99,
        imageUrl: 'https://example.com/sweater.jpg'
      },
      { 
        id: '5', 
        name: 'Sequin Party Top', 
        category: 'Party Wear', 
        currentStock: 30, 
        leadTime: 12, 
        reorderLevel: 25, 
        salesVelocity: 5.1, 
        price: 49.99,
        imageUrl: 'https://example.com/party-top.jpg'
      }
    ]
    setProducts(mockProducts)
    setSelectedProduct(mockProducts[0].id)
  }, [])

  useEffect(() => {
    if (selectedProduct && products.length > 0) {
      generateAIForecast(selectedProduct, timeHorizon)
    }
  }, [selectedProduct, timeHorizon, products])

  // ======== COMPONENT RENDER ========
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">AI Demand Forecasting</h1>
          <p className="text-muted-foreground">
            Predictive analytics powered by machine learning and social trends
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
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

      {/* PRODUCT SELECTOR & KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Product</h3>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {products.length > 0 ? (
              <select
                className="w-full p-2 border rounded bg-background text-sm"
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
          <CardFooter className="pt-0">
            {products.length > 0 && (
              <Badge variant="outline" className={CATEGORY_COLORS[products.find(p => p.id === selectedProduct)?.category as keyof typeof CATEGORY_COLORS] || ''}>
                {products.find(p => p.id === selectedProduct)?.category}
              </Badge>
            )}
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Current Stock</h3>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? <Skeleton className="h-8 w-full" /> : products.find(p => p.id === selectedProduct)?.currentStock}
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <div className="text-xs text-muted-foreground">
              {isLoading ? <Skeleton className="h-4 w-1/2" /> : `Reorder at ${products.find(p => p.id === selectedProduct)?.reorderLevel} units`}
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Lead Time</h3>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? <Skeleton className="h-8 w-full" /> : products.find(p => p.id === selectedProduct)?.leadTime}
              <span className="text-sm font-normal ml-1">days</span>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <div className="text-xs text-muted-foreground">
              {isLoading ? <Skeleton className="h-4 w-1/2" /> : 'From order to delivery'}
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">AI Confidence</h3>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? <Skeleton className="h-8 w-full" /> : 
                forecastData.length > 0 ? 
                `${Math.round(100 - (forecastData.reduce((sum, d) => {
                  const range = d.confidenceInterval[1] - d.confidenceInterval[0]
                  return sum + (range / d.predictedSales)
                }, 0) / forecastData.length * 100))}%` : 
                'N/A'}
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <div className="text-xs text-muted-foreground">
              {isLoading ? <Skeleton className="h-4 w-1/2" /> : 'Forecast accuracy'}
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* MAIN CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <h3 className="text-lg font-semibold">Demand Forecast</h3>
            <p className="text-sm text-muted-foreground">
              Predicted sales with confidence intervals
            </p>
          </CardHeader>
          <CardContent className="h-80">
            {isLoading ? (
              <Skeleton className="h-full w-full" />
            ) : (
              <Line 
                data={forecastChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { position: 'top' },
                    tooltip: {
                      callbacks: {
                        afterLabel: (context) => {
                          const data = forecastData[context.dataIndex]
                          return [
                            `Weather: ${data.factors.weatherImpact.toFixed(1)}x`,
                            `Events: ${data.factors.eventImpact.toFixed(1)}x`,
                            `Trends: ${data.factors.trendImpact.toFixed(1)}x`,
                            `Seasonality: ${data.factors.seasonalityImpact.toFixed(1)}x`,
                            `Social: ${data.factors.socialMediaImpact.toFixed(1)}x`
                          ].join('\n')
                        }
                      }
                    }
                  }
                }}
              />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Demand Drivers</h3>
            <p className="text-sm text-muted-foreground">
              Key factors influencing demand
            </p>
          </CardHeader>
          <CardContent className="h-80">
            {isLoading ? (
              <Skeleton className="h-full w-full" />
            ) : (
              <Radar 
                data={factorsRadarData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    r: {
                      angleLines: { display: true },
                      suggestedMin: 0,
                      suggestedMax: 2
                    }
                  }
                }}
              />
            )}
          </CardContent>
        </Card>
      </div>

      {/* SOCIAL MEDIA INSIGHTS */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold">Social Media Insights</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Trending conversations and sentiment analysis
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {isLoading ? (
            <Skeleton className="h-64 w-full" />
          ) : (
            <>
              <div className="h-64">
                <Line 
                  data={socialTrendsChart}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        title: { display: true, text: 'Mentions' }
                      },
                      y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        min: -100,
                        max: 100,
                        title: { display: true, text: 'Sentiment (%)' },
                        grid: { drawOnChartArea: false }
                      }
                    }
                  }}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Hash className="h-5 w-5 text-purple-600" />
                    <div>
                      <h4 className="font-medium">Trending Hashtags</h4>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {socialMediaData[0]?.trendingHashtags.length ? (
                          socialMediaData[0].trendingHashtags.map((tag, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-sm text-muted-foreground">No trending hashtags</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="h-48">
                    <Pie 
                      data={platformDistributionData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false
                      }}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Heart className="h-5 w-5 text-pink-600" />
                    <div>
                      <h4 className="font-medium">Engagement Rate</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {socialMediaData.length ? 
                          `${Math.round(socialMediaData.reduce((sum, d) => sum + d.engagement, 0) / socialMediaData.length)}x average` : 
                          'N/A'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="h-48">
                    <Bubble 
                      data={engagementBubbleData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                          x: { title: { display: true, text: 'Mentions' } },
                          y: { title: { display: true, text: 'Engagement' } }
                        }
                      }}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Share2 className="h-5 w-5 text-green-600" />
                    <div>
                      <h4 className="font-medium">Influencer Activity</h4>
                      <div className="space-y-2 mt-1">
                        {socialMediaData[0]?.influencers.length ? (
                          socialMediaData[0].influencers.map((inf, i) => (
                            <div key={i} className="flex items-center space-x-2">
                              {inf.platform === 'twitter' && <Twitter className="h-4 w-4 text-blue-400" />}
                              {inf.platform === 'instagram' && <Instagram className="h-4 w-4 text-pink-500" />}
                              {inf.platform === 'youtube' && <Youtube className="h-4 w-4 text-red-500" />}
                              <span className="text-sm">{inf.handle}</span>
                            </div>
                          ))
                        ) : (
                          <span className="text-sm text-muted-foreground">No influencer activity</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Activity className="h-5 w-5 text-blue-600" />
                    <div>
                      <h4 className="font-medium">Sentiment Analysis</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {socialMediaData.length ? 
                          `${Math.round((socialMediaData.reduce((sum, d) => sum + d.sentiment, 0) / socialMediaData.length * 100))}% positive` : 
                          'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* RISK ANALYSIS */}
      {riskItems.length > 0 && (
        <Card className={`border-${RISK_COLORS[riskItems[0].severity]}-200 bg-${RISK_COLORS[riskItems[0].severity]}-50`}>
          <CardHeader className="flex flex-row items-center space-x-2">
            <AlertTriangle className={`h-5 w-5 text-${RISK_COLORS[riskItems[0].severity]}-600`} />
            <h3 className="text-lg font-semibold">Risk Analysis</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {riskItems.map((risk, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <div className={`mt-1 flex-shrink-0 text-${RISK_COLORS[risk.severity]}-600`}>
                    {risk.icon}
                  </div>
                  <div>
                    <h4 className="font-medium">{risk.message}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{risk.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm">
              View Mitigation Strategies
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* INSIGHTS & RECOMMENDATIONS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">AI Insights</h3>
            <p className="text-sm text-muted-foreground">
              Key patterns and observations
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isLoading ? (
                Array(4).fill(0).map((_, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                ))
              ) : (
                insights.map((insight, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <div className={`mt-1 flex-shrink-0 ${insight.color}`}>
                      {insight.icon}
                    </div>
                    <div>
                      <h4 className="font-medium">{insight.title}</h4>
                      <p className="text-sm text-muted-foreground">{insight.content}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Recommendations</h3>
            <p className="text-sm text-muted-foreground">
              Actionable strategies based on forecast
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ) : (
              <>
                {socialMediaData.some(d => d.trendingHashtags.length > 0) && (
                  <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                    <Zap className="h-5 w-5 mt-0.5 text-green-600" />
                    <div>
                      <h4 className="font-medium">Viral Opportunity</h4>
                      <p className="text-sm text-muted-foreground">
                        Product is trending with hashtags: {socialMediaData[0].trendingHashtags.join(', ')}. 
                        Increase social ad spend by 25% to capitalize.
                      </p>
                    </div>
                  </div>
                )}

                {socialMediaData.some(d => d.sentiment < -0.2) && (
                  <div className="flex items-start space-x-3 p-4 bg-amber-50 rounded-lg">
                    <AlertTriangle className="h-5 w-5 mt-0.5 text-amber-600" />
                    <div>
                      <h4 className="font-medium">Sentiment Alert</h4>
                      <p className="text-sm text-muted-foreground">
                        Negative sentiment detected. Review recent customer feedback and 
                        consider promotional adjustments.
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-start space-x-3">
                  <BarChart2 className="h-5 w-5 mt-0.5 text-purple-600" />
                  <div>
                    <h4 className="font-medium">Inventory Optimization</h4>
                    <p className="text-sm text-muted-foreground">
                      Suggested reorder point: {Math.round(
                        (products.find(p => p.id === selectedProduct)?.leadTime || 0) * 
                        (forecastData.reduce((sum, d) => sum + d.predictedSales, 0) / forecastData.length)
                      )} units
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Percent className="h-5 w-5 mt-0.5 text-blue-600" />
                  <div>
                    <h4 className="font-medium">Promotion Strategy</h4>
                    <p className="text-sm text-muted-foreground">
                      Bundle with complementary items to increase average order value.
                    </p>
                  </div>
                </div>

                {socialMediaData[0]?.influencers.length > 0 && (
                  <div className="flex items-start space-x-3">
                    <Share2 className="h-5 w-5 mt-0.5 text-pink-600" />
                    <div>
                      <h4 className="font-medium">Influencer Collaboration</h4>
                      <p className="text-sm text-muted-foreground">
                        Reach out to {socialMediaData[0].influencers.map(i => i.handle).join(', ')} 
                        for potential partnerships.
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button size="sm" className="w-full">
              Generate Purchase Order
            </Button>
            <Button variant="outline" size="sm" className="w-full">
              Create Marketing Campaign
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* ADDITIONAL CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Weekly Sales Pattern</h3>
            <p className="text-sm text-muted-foreground">
              Historical daily averages
            </p>
          </CardHeader>
          <CardContent className="h-64">
            <Bar 
              data={dailyPatternData}
              options={{
                responsive: true,
                maintainAspectRatio: false
              }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Inventory Health</h3>
            <p className="text-sm text-muted-foreground">
              Current stock vs. forecasted demand
            </p>
          </CardHeader>
          <CardContent className="h-64">
            {isLoading ? (
              <Skeleton className="h-full w-full" />
            ) : (
              <Pie 
                data={{
                  labels: ['Current Stock', '30-Day Demand'],
                  datasets: [{
                    data: [
                      products.find(p => p.id === selectedProduct)?.currentStock || 0,
                      forecastData.reduce((sum, d) => sum + d.predictedSales, 0)
                    ],
                    backgroundColor: [
                      'rgba(16, 185, 129, 0.7)',
                      'rgba(239, 68, 68, 0.7)'
                    ]
                  }]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false
                }}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}