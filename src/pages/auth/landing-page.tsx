import { Button } from "@/components/custom/button";
import { useNavigate } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header / Navigation */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Pamtech Logo" className="h-10" />
            <span className="font-bold text-lg">Pamtech Bulk SMS</span>
          </div>
          <nav className="space-x-6 hidden md:flex">
            <a
                href="#"
                className="text-gray-700 hover:text-blue-600"
                onClick={(e) => {
                    e.preventDefault();
                    const section = document.getElementById("about");
                    if (section) section.scrollIntoView({ behavior: "smooth" });
                }}
            >About us
            </a>
            <a 
            href="#"
                className="text-gray-700 hover:text-blue-600"
                onClick={(e) => {
                    e.preventDefault();
                    const section = document.getElementById("contact");
                    if (section) section.scrollIntoView({ behavior: "smooth" });
                }}
            >Contact</a>
            <a href="/sign-in" className="text-gray-700 hover:text-blue-600">Log in</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Send Bulk SMS Instantly Across Tanzania
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Reliable, fast, and affordable bulk messaging services for businesses.
            Join thousands of businesses using our reliable SMS service.
          </p>
          <Button 
            className="h-14 text-lg px-8 py-4"
            onClick={() => navigate('/sign-up')}
            >
            Get Started
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Pamtech Bulk SMS?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center p-6 border rounded-lg hover:shadow-lg transition">
              <div className="text-blue-600 text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Deliver messages instantly to millions of users across East Africa within seconds.</p>
            </div>
            <div className="text-center p-6 border rounded-lg hover:shadow-lg transition">
              <div className="text-green-600 text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">Secure & Reliable</h3>
              <p className="text-gray-600">Our platform ensures secure communication and high uptime for critical business use.</p>
            </div>
            <div className="text-center p-6 border rounded-lg hover:shadow-lg transition">
              <div className="text-yellow-500 text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-2">Affordable Pricing</h3>
              <p className="text-gray-600">Get the best rates per message with flexible postpaid and prepaid plans.</p>
            </div>
          </div>
        </div>
      </section>


{/* About Section */}
    <section id="about" className="py-16 bg-white">
    <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">About Pamtech Web Services</h2>
        <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto text-center mb-12">
        Pamtech Web Services is a leading provider of digital communication tools and transformative tech solutions in East Africa.
        We specialize in building scalable, cloud-based systems that empower businesses to connect with their customers,
        streamline operations, and grow sustainably.
        </p>

        {/* Our Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
            <p className="text-gray-700">
            To provide budget-friendly, high-quality technology solutions that help businesses thrive in the digital era.
            We aim to be industry leaders through innovation and transformative change.
            </p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Our Vision</h3>
            <p className="text-gray-700">
            To revolutionize industries across Africa by turning ideas into reality through cutting-edge web, mobile,
            and software development.
            </p>
        </div>
        </div>

        {/* Core Services */}
        <h3 className="text-2xl font-bold text-center mb-6">Our Core Services</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <div className="border rounded-lg p-6 hover:shadow-lg transition">
            <h4 className="text-lg font-semibold mb-2">Website Development</h4>
            <p className="text-gray-600">
            We create tailor-made websites that reflect your brand identity and business goals. From e-commerce stores to corporate sites, we deliver professional and responsive designs.
            </p>
        </div>
        <div className="border rounded-lg p-6 hover:shadow-lg transition">
            <h4 className="text-lg font-semibold mb-2">Mobile App Development</h4>
            <p className="text-gray-600">
            Custom iOS and Android apps built using the latest technologies — empowering businesses to reach users on the go.
            </p>
        </div>
        <div className="border rounded-lg p-6 hover:shadow-lg transition">
            <h4 className="text-lg font-semibold mb-2">G Shop POS Software</h4>
            <p className="text-gray-600">
            A powerful point-of-sale system designed to streamline operations for supermarkets, pharmacies, liquor stores, and more.
            </p>
        </div>
        <div className="border rounded-lg p-6 hover:shadow-lg transition">
            <h4 className="text-lg font-semibold mb-2">Web Hosting</h4>
            <p className="text-gray-600">
            Reliable and fast hosting solutions to ensure your website stays online and performs at its best.
            </p>
        </div>
        <div className="border rounded-lg p-6 hover:shadow-lg transition">
            <h4 className="text-lg font-semibold mb-2">Email Hosting</h4>
            <p className="text-gray-600">
            Professional email addresses tied to your domain for improved branding and credibility.
            </p>
        </div>
        <div className="border rounded-lg p-6 hover:shadow-lg transition">
            <h4 className="text-lg font-semibold mb-2">Graphics Design</h4>
            <p className="text-gray-600">
            Branding materials, logos, banners, and visuals that align with your business identity and marketing strategy.
            </p>
        </div>
        </div>

        {/* Contact Section */}
        <section id="contact" className="py-16 bg-white">
        <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-6">Get in Touch</h2>
            <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Have questions or want to discuss a project? We'd love to hear from you! Reach out via WhatsApp, email, or visit our office.
            </p>

            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* WhatsApp */}
            <div className="bg-blue-50 p-6 rounded-lg shadow-sm text-center hover:shadow-md transition">
                <Phone className="w-10 h-10 mx-auto text-green-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">WhatsApp Us</h3>
                <p className="text-gray-700">
                <a href="https://wa.me/255717757750"  target="_blank" rel="noopener noreferrer" className="hover:text-green-600">
                    +255 717 757 750
                </a>
                </p>
            </div>

            {/* Email */}
            <div className="bg-blue-50 p-6 rounded-lg shadow-sm text-center hover:shadow-md transition">
                <Mail className="w-10 h-10 mx-auto text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                <p className="text-gray-700">
                <a href="mailto:info@pamtech.co.tz" className="hover:text-blue-600">
                    info@pamtech.co.tz
                </a>
                </p>
            </div>

            {/* Office Address */}
            <div className="bg-blue-50 p-6 rounded-lg shadow-sm text-center hover:shadow-md transition">
                <MapPin className="w-10 h-10 mx-auto text-red-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Visit Our Office</h3>
                <p className="text-gray-700">
                Office Direction<br />
                Dar es Salaam, Tanzania
                </p>
                <a
                href="https://maps.google.com/?q=Office+Location"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-blue-600 hover:underline"
                >
                View on Google Maps
                </a>
            </div>
            </div>
        </div>
        </section>

    </div>
    </section>

      {/* Footer */}
      <footer className="bg-white border-t mt-10 py-8">
        <div className="container mx-auto px-6 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} <a
           href="https://pamtech.co.tz"  className="hover:underline"
           >Pamtech Web Services </a>.  All rights reserved.
           </p>
          <div className="mt-2 space-x-4">
            <a href="https://pamtech.co.tz/terms-of-service/"  className="hover:underline">Terms of Service</a>
            <a href="https://pamtech.co.tz/privacy-policy/"  className="hover:underline">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;