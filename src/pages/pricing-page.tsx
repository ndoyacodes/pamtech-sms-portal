import { Button } from "@/components/custom/button";
import { useNavigate } from 'react-router-dom';
import {Mail, MapPin, Phone, Check, X, User } from 'lucide-react';
import { ContactCard } from "./landing-page";
import { useAppSelector } from "@/store/store-hooks";

const PricingPage = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Pamtech Logo" className="h-6 md:h-10 lg:h-12 pointer" />
          </div>
          <nav className="space-x-6 hidden md:flex">
            <a href="/welcome" className="font-bold text-lg hover:text-blue-600">Home</a>
            <a href="#" className="font-bold text-lg hover:text-blue-600" onClick={(e) => {
              e.preventDefault();
              const section = document.getElementById("contact");
              if (section) section.scrollIntoView({ behavior: "smooth" });
            }}>Contact us</a>
            {isAuthenticated ? (
              <a href="/" className="font-bold text-lg hover:text-blue-600 flex items-center gap-2">
                 <Button onClick={()=> navigate("/sign-in")}> <User className="w-6 h-6" /> <span>My Account</span></Button>
              </a>
            ) : (     
              <Button onClick={()=> navigate("/sign-in")}>Sign in</Button>
            )}
          </nav>
        </div>
      </header>


     
      {/* Hero Section */}
     <section className="flex items-center bg-gradient-to-br from-blue-50 via-white to-purple-50 animate-fadeIn mb-0 p-0 "
          style={{
            backgroundImage: `linear-gradient(to left, var(--brand-color-right), var(--brand-color-left))`,
          }}
        >
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
             Pricing
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg">
              Reliable, fast, and affordable bulk messaging services for businesses. Join thousands of businesses using our reliable SMS service.
            </p>
            <Button className="h-14 text-lg px-8 py-4" onClick={() => navigate('/sign-up')}>
              Get Started
            </Button>
          </div>

          {/* Image */}
          <div className="w-full h-full">
            <img
              src="/lady2.png" // Replace this with your image
              alt="User using system"
              className="rounded-xl  w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <PricingCard 
              title="Individual" 
              price="16" 
              description="Perfect for small businesses getting started" 
              features={[
                "5,999 SMS Max",
                "TZS 10 per extra SMS",
                "Basic Support",
                "No API Access"
              ]}
              nonFeatures={[
                "Priority Support",
                "Dedicated Account Manager"
              ]}
              buttonText="Choose Individual"
              onClick={() => navigate('/sign-up')}
            />
            <PricingCard 
              title="Community" 
              price="15" 
              description="For growing businesses with more needs" 
              features={[
                "54,999 SMS Max",
                "TZS 9 per extra SMS",
                "Email Support",
                "Basic API Access"
              ]}
              nonFeatures={[
                "Priority Support",
                "Dedicated Account Manager"
              ]}
              buttonText="Choose Community"
              onClick={() => navigate('/sign-up')}
              popular={true}
            />
            <PricingCard 
              title="Start-up" 
              price="14"  
              description="For established businesses" 
              features={[
                "409,999 SMS Max",
                "TZS 8 per extra SMS",
                "Priority Support",
                "Full API Access",
                "Access to analytical report",
                "Direct Feedback"
              ]}
              nonFeatures={[
                "Dedicated Account Manager"
              ]}
              buttonText="Choose Start-up"
              onClick={() => navigate('/sign-up')}
            />
            <PricingCard 
              title="Enterprise" 
              price="Talk to Sales" 
              description="For high-volume senders" 
              features={[
                "Beyond 410,000 SMS",
                "TZS 7 per extra SMS",
                "24/7 Support",
                "Full API Access",
                "Priority Support",
                "Access to analytical report",
                "Dedicated Account Manager"
              ]}
              nonFeatures={[]}
              buttonText="Choose Enterprise"
              onClick={() => navigate('/sign-up')}
            />
            {/* <PricingCard 
              title="Enterprise" 
              price="CUSTOM" 
              description="Custom solutions for large organizations" 
              features={[
                "Volume Discounts",
                "Dedicated Support Team",
                "Custom API Solutions",
                "Account Manager",
                "Service Level Agreement"
              ]}
              nonFeatures={[]}
              buttonText="Contact Sales"
              onClick={() => window.location.href = 'mailto:sales@pamtech.co.tz'}
            /> */}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Compare Features</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="p-4">Feature</th>
                  <th className="p-4">Individual</th>
                  <th className="p-4">Community</th>
                  <th className="p-4">Start-up</th>
                  <th className="p-4">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="p-4 font-medium">SMS Credits</td>
                  <td className="p-4">5,999  SMS Max</td>
                  <td className="p-4">54,999 SMS Max</td>
                  <td className="p-4">409,999 SMS Max</td>
                  <td className="p-4">Beyond 410,000 SMS</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-4 font-medium">Extra SMS Rate</td>
                  <td className="p-4">TZS 10</td>
                  <td className="p-4">TZS 9</td>
                  <td className="p-4">TZS 8</td>
                  <td className="p-4">TZS 7</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-4 font-medium">API Access</td>
                  <td className="p-4"><X className="text-red-500 inline" /></td>
                  <td className="p-4">Basic</td>
                  <td className="p-4">Full</td>
                  <td className="p-4">Full + Support</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-4 font-medium">Support</td>
                  <td className="p-4">Basic</td>
                  <td className="p-4">Email</td>
                  <td className="p-4">Priority</td>
                  <td className="p-4">Dedicated</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Account Manager</td>
                  <td className="p-4"><X className="text-red-500 inline" /></td>
                  <td className="p-4"><X className="text-red-500 inline" /></td>
                  <td className="p-4"><Check className="text-green-500 inline" /></td>
                  <td className="p-4"><Check className="text-green-500 inline" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>



<section
        id="about"
        className="py-16 bg-white mb-0"
        style={{
          backgroundImage: `linear-gradient(to left, var(--brand-color-right), var(--brand-color-left))`,
        }}
      >
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
      <footer className="bg-black border-t mt-0 py-8">
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

// Pricing Card Component
type PricingCardProps = {
  title: string;
  price: string;
  description: string;
  features: string[];
  nonFeatures?: string[];
  buttonText: string;
  onClick: () => void;
  popular?: boolean;
};

const PricingCard: React.FC<PricingCardProps> = ({ 
  title, 
  price, 
  description, 
  features, 
  nonFeatures = [], 
  buttonText, 
  onClick,
  popular = false
}) => (
  <div className={`relative text-center p-6 border rounded-lg hover:shadow-lg transition-all duration-300 bg-white ${popular ? 'border-blue-500 border-2' : 'border-gray-200'}`}>
    {popular && (
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
        POPULAR
      </div>
    )}
    
    <h3 className="text-2xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    
    <div className="my-6">
     {!isNaN(Number(price)) && <span className="text-4xl font-extrabold"> TZS </span>} <span className="text-4xl font-extrabold">{price}</span> {!isNaN(Number(price)) && <span> /SMS</span>}
      {price !== "Custom" && <span className="text-gray-500"></span>}
    </div>
    
    <ul className="mb-8 space-y-2 text-left">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center">
          <Check className="w-5 h-5 text-green-500 mr-2" />
          <span>{feature}</span>
        </li>
      ))}
      {nonFeatures.map((feature, index) => (
        <li key={index + features.length} className="flex items-center text-gray-400">
          <X className="w-5 h-5 text-red-500 mr-2" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    
    <Button 
      className={`w-full h-12 ${popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-800 hover:bg-gray-700'}`}
      onClick={onClick}
    >
      {buttonText}
    </Button>
  </div>
);

export default PricingPage;