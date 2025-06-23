import { Button } from "@/components/custom/button";
import { useNavigate } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Pamtech Logo" className="h-10" />
            <span className="font-bold text-lg">Pamtech Bulk SMS</span>
          </div>
          <nav className="space-x-6 hidden md:flex">
            <a href="#" className="text-gray-700 hover:text-blue-600" onClick={(e) => {
              e.preventDefault();
              const section = document.getElementById("about");
              if (section) section.scrollIntoView({ behavior: "smooth" });
            }}>About</a>
            <a href="#" className="text-gray-700 hover:text-blue-600" onClick={(e) => {
              e.preventDefault();
              const section = document.getElementById("contact");
              if (section) section.scrollIntoView({ behavior: "smooth" });
            }}>Contact</a>
            <a href="/sign-in" className="text-gray-700 hover:text-blue-600">Log in</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              Send Bulk SMS Instantly Across Tanzania
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg">
              Reliable, fast, and affordable bulk messaging services for businesses. Join thousands of businesses using our reliable SMS service.
            </p>
            <Button className="h-14 text-lg px-8 py-4" onClick={() => navigate('/sign-up')}>
              Get Started
            </Button>
          </div>

          {/* Image */}
          <div className="w-full">
            <img
              src="/lady.png" // Replace this with your image
              alt="User using system"
              className="rounded-xl  w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Pamtech Bulk SMS?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <FeatureCard emoji="🚀" title="Fast Delivery" description="Deliver messages instantly to millions of users across East Africa within seconds." />
            <FeatureCard emoji="🔒" title="Secure & Reliable" description="Our platform ensures secure communication and high uptime for critical business use." />
            <FeatureCard emoji="💰" title="Affordable Pricing" description="Get the best rates per message with flexible postpaid and prepaid plans." />
          </div>
        </div>
      </section>

      {/* About & Contact */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          {/* You can add an "About Us" section here if needed */}

          {/* Contact Section */}
          <section id="contact" className="py-16">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold text-center mb-6">Get in Touch</h2>
              <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
                Have questions or want to discuss a project? We'd love to hear from you! Reach out via WhatsApp, email, or visit our office.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <ContactCard icon={<Phone className="w-10 h-10 mx-auto text-green-500 mb-4" />} title="WhatsApp Us" value="+255 717 757 750" link="https://wa.me/255717757750" />
                <ContactCard icon={<Mail className="w-10 h-10 mx-auto text-blue-500 mb-4" />} title="Email Us" value="info@pamtech.co.tz" link="mailto:info@pamtech.co.tz" />
                <ContactCard icon={<MapPin className="w-10 h-10 mx-auto text-red-500 mb-4" />} title="Visit Our Office" value="New Safari Hotel, 310. Arusha, Tanzania" />
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t mt-10 py-8">
        <div className="container mx-auto px-6 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} <a href="https://pamtech.co.tz" className="hover:underline">Pamtech Web Services</a>. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <a href="https://pamtech.co.tz/terms-of-service/" className="hover:underline">Terms of Service</a>
            <a href="https://pamtech.co.tz/privacy-policy/" className="hover:underline">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Reusable Card Components with TypeScript

type FeatureCardProps = {
  emoji: string;
  title: string;
  description: string;
};

const FeatureCard: React.FC<FeatureCardProps> = ({ emoji, title, description }) => (
  <div className="text-center p-6 border rounded-lg hover:shadow-lg transition">
    <div className="text-4xl mb-4">{emoji}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

type ContactCardProps = {
  icon: React.ReactNode;
  title: string;
  value: string;
  link?: string;
};

const ContactCard: React.FC<ContactCardProps> = ({ icon, title, value, link }) => (
  <div className="bg-blue-50 p-6 rounded-lg shadow-sm text-center hover:shadow-md transition">
    {icon}
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-700">
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer" className="hover:underline">
          {value}
        </a>
      ) : (
        value
      )}
    </p>
  </div>
);

export default LandingPage;
