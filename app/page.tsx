import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Store,
    BarChart3,
    ShoppingCart,
    Brain,
    Shield,
    Globe,
    Star,
    Mail,
    Phone,
    MapPin,
    ArrowRight,
    CheckCircle,
} from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Navigation */}
            <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2">
                            <Store className="h-8 w-8 text-primary" />
                            <span className="text-2xl font-bold text-foreground">Storix</span>
                        </div>
                        <div className="hidden md:flex items-center space-x-8">
                            <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                                Features
                            </Link>
                            <Link href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                                About
                            </Link>
                            <Link href="#reviews" className="text-muted-foreground hover:text-foreground transition-colors">
                                Reviews
                            </Link>
                            <Link href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                                Contact
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Button variant="ghost" asChild>
                                <Link href="/signin">Sign In</Link>
                            </Button>
                            <Button asChild>
                                <Link href="/signup">Get Started</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="py-20 lg:py-32 bg-gradient-to-br from-background to-muted/20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-4xl mx-auto">
                        <Badge variant="secondary" className="mb-4">
                            🚀 Now with AI-Powered Features
                        </Badge>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                            The Complete
                            <span className="text-primary"> Ecommerce Admin </span>
                            Platform
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Create and manage multiple online stores with powerful tools for inventory, analytics, and sales
                            optimization. Everything you need to scale your ecommerce business.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="text-lg px-8" asChild>
                                <Link href="/signup">
                                    Start Free Trial
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
                                Watch Demo
                            </Button>
                        </div>
                        <p className="text-sm text-muted-foreground mt-4">No credit card required • 14-day free trial</p>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-muted/30">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Everything You Need to Succeed</h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Comprehensive tools and features designed to help you build, manage, and scale your ecommerce empire.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Multi-Store Management */}
                        <Card className="border-2 hover:border-primary/50 transition-colors">
                            <CardHeader>
                                <Store className="h-12 w-12 text-primary mb-4" />
                                <CardTitle>Multi-Store Management</CardTitle>
                                <CardDescription>
                                    Create and manage unlimited stores from a single dashboard. Perfect for scaling your business.
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        {/* Product Management */}
                        <Card className="border-2 hover:border-primary/50 transition-colors">
                            <CardHeader>
                                <ShoppingCart className="h-12 w-12 text-primary mb-4" />
                                <CardTitle>Advanced Product Management</CardTitle>
                                <CardDescription>
                                    Manage products, categories, sizes, colors, and billboards with an intuitive interface.
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        {/* Analytics */}
                        <Card className="border-2 hover:border-primary/50 transition-colors">
                            <CardHeader>
                                <BarChart3 className="h-12 w-12 text-primary mb-4" />
                                <CardTitle>Detailed Analytics</CardTitle>
                                <CardDescription>
                                    Get comprehensive insights into your sales, orders, and customer behavior with advanced reporting.
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        {/* API Integration */}
                        <Card className="border-2 hover:border-primary/50 transition-colors">
                            <CardHeader>
                                <Globe className="h-12 w-12 text-primary mb-4" />
                                <CardTitle>Powerful API</CardTitle>
                                <CardDescription>
                                    Connect your storefront websites with our robust API for seamless integration and data sync.
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        {/* AI Features */}
                        <Card className="border-2 hover:border-primary/50 transition-colors">
                            <CardHeader>
                                <Brain className="h-12 w-12 text-primary mb-4" />
                                <CardTitle>AI-Powered Insights</CardTitle>
                                <CardDescription>
                                    Leverage AI for inventory optimization, sales predictions, and automated business intelligence.
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        {/* Checkout System */}
                        <Card className="border-2 hover:border-primary/50 transition-colors">
                            <CardHeader>
                                <Shield className="h-12 w-12 text-primary mb-4" />
                                <CardTitle>Secure Checkout</CardTitle>
                                <CardDescription>
                                    Built-in secure checkout system with multiple payment options and fraud protection.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">Built for Modern Ecommerce</h2>
                            <p className="text-lg text-muted-foreground mb-6">
                                {"Storix was created by ecommerce experts who understand the challenges of managing multiple online"}
                                {"stores. We've built a platform that scales with your business and adapts to your needs."}
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <CheckCircle className="h-6 w-6 text-primary" />
                                    <span className="text-foreground">Enterprise-grade security and reliability</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <CheckCircle className="h-6 w-6 text-primary" />
                                    <span className="text-foreground">99.9% uptime guarantee</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <CheckCircle className="h-6 w-6 text-primary" />
                                    <span className="text-foreground">24/7 customer support</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <CheckCircle className="h-6 w-6 text-primary" />
                                    <span className="text-foreground">Regular updates and new features</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-primary mb-2">10K+</div>
                                    <div className="text-muted-foreground">Active Stores</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-primary mb-2">$50M+</div>
                                    <div className="text-muted-foreground">Revenue Processed</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
                                    <div className="text-muted-foreground">Uptime</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                                    <div className="text-muted-foreground">Support</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Reviews Section */}
            <section id="reviews" className="py-20 bg-muted/30">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Loved by Thousands of Merchants</h2>
                        <p className="text-xl text-muted-foreground">See what our customers have to say about Storix</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center space-x-4">
                                    <Avatar>
                                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                                        <AvatarFallback>SJ</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-semibold">Sarah Johnson</div>
                                        <div className="text-sm text-muted-foreground">Fashion Store Owner</div>
                                    </div>
                                </div>
                                <div className="flex space-x-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                                    ))}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    {` "Storix has completely transformed how I manage my online stores. The analytics are incredible and the
                                    AI features have boosted my sales by 40%!"`}
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <div className="flex items-center space-x-4">
                                    <Avatar>
                                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                                        <AvatarFallback>MR</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-semibold">Mike Rodriguez</div>
                                        <div className="text-sm text-muted-foreground">Electronics Retailer</div>
                                    </div>
                                </div>
                                <div className="flex space-x-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                                    ))}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    {`"The multi-store management feature is a game-changer. I can now handle 5 different stores from one
                                    dashboard. Absolutely love it!"`}
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <div className="flex items-center space-x-4">
                                    <Avatar>
                                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                                        <AvatarFallback>EL</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-semibold">Emily Liu</div>
                                        <div className="text-sm text-muted-foreground">Home Decor Business</div>
                                    </div>
                                </div>
                                <div className="flex space-x-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                                    ))}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    {`"The API integration made connecting my custom storefront so easy. Customer support is also top-notch
                                    - they helped me set everything up perfectly."`}
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Get in Touch</h2>
                        <p className="text-xl text-muted-foreground">{`Have questions? We'd love to hear from you.`}</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-2xl font-semibold text-foreground mb-6">Contact Information</h3>
                            <div className="space-y-6">
                                <div className="flex items-center space-x-4">
                                    <Mail className="h-6 w-6 text-primary" />
                                    <div>
                                        <div className="font-semibold">Email</div>
                                        <div className="text-muted-foreground">hello@storix.com</div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <Phone className="h-6 w-6 text-primary" />
                                    <div>
                                        <div className="font-semibold">Phone</div>
                                        <div className="text-muted-foreground">+1 (555) 123-4567</div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <MapPin className="h-6 w-6 text-primary" />
                                    <div>
                                        <div className="font-semibold">Address</div>
                                        <div className="text-muted-foreground">
                                            123 Business Ave, Suite 100
                                            <br />
                                            San Francisco, CA 94105
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle>Send us a message</CardTitle>
                                <CardDescription>{`We'll get back to you within 24 hours.`}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium">First Name</label>
                                        <input
                                            type="text"
                                            className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background"
                                            placeholder="John"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">Last Name</label>
                                        <input
                                            type="text"
                                            className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background"
                                            placeholder="Doe"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Email</label>
                                    <input
                                        type="email"
                                        className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Message</label>
                                    <textarea
                                        className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background h-32"
                                        placeholder="Tell us how we can help you..."
                                    />
                                </div>
                                <Button className="w-full">Send Message</Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-muted/50 border-t py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <Store className="h-8 w-8 text-primary" />
                                <span className="text-2xl font-bold text-foreground">Storix</span>
                            </div>
                            <p className="text-muted-foreground">The complete ecommerce admin platform for modern businesses.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-foreground mb-4">Product</h4>
                            <ul className="space-y-2 text-muted-foreground">
                                <li>
                                    <Link href="#" className="hover:text-foreground transition-colors">
                                        Features
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:text-foreground transition-colors">
                                        Pricing
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:text-foreground transition-colors">
                                        API Docs
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:text-foreground transition-colors">
                                        Integrations
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-foreground mb-4">Company</h4>
                            <ul className="space-y-2 text-muted-foreground">
                                <li>
                                    <Link href="#" className="hover:text-foreground transition-colors">
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:text-foreground transition-colors">
                                        Blog
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:text-foreground transition-colors">
                                        Careers
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:text-foreground transition-colors">
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-foreground mb-4">Support</h4>
                            <ul className="space-y-2 text-muted-foreground">
                                <li>
                                    <Link href="#" className="hover:text-foreground transition-colors">
                                        Help Center
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:text-foreground transition-colors">
                                        Community
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:text-foreground transition-colors">
                                        Status
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:text-foreground transition-colors">
                                        Privacy
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
                        <p>&copy; 2024 Storix. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
