import { useState, useEffect} from 'react';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/custom/button";
import { Rocket, Lock, Wallet, Mail, MapPin, Phone, User, Check, X, Menu } from 'lucide-react';
import { useAppSelector } from "@/store/store-hooks";
import TextCarousel from "@/components/text-carousel";



type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
};

type ContactCardProps = {
  icon: React.ReactNode;
  title: string;
  value: string;
  link?: string;
};

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


const carouselTextsLanding = [
  {
    title: "Send Bulk SMS Instantly in Tanzania",
    description: "Deliver messages to thousands of users with just one click. Fast, secure and reliable."
  },
  {
    title: "Grow Your Business With Pamtech",
    description: "Engage your audience effectively and increase conversions through targeted SMS campaigns."
  },
  {
    title: "Affordable Messaging Plans for Every Budget",
    description: "Choose from flexible prepaid or postpaid plans and start reaching customers today."
  }
];

const carouselTextsPricing = [
  {
    title: "Flexible Plans for Every Business",
    description: "Whether you're a startup or an enterprise, our pricing scales with your needs and budget."
  },
  {
    title: "No Hidden Fees, Just Clear Value",
    description: "Get transparent pricing with no surprises. What you see is exactly what you pay."
  },
  {
    title: "Pay-As-You-Go or Monthly Plans",
    description: "Choose between one-time bulk messaging or recurring plans—only pay for what you use."
  },
  {
    title: "Volume Discounts Available",
    description: "Save more as you scale. The more you send, the less you pay per SMS."
  },
];

const customerLogos = [
  'logo.png',
  'logo1.png',
  'logo2.png',
  'logo3.png',
  'logo4.png',
];

// Hero Section Component
const HeroSection = ({ carouselItems }: { carouselItems: typeof carouselTextsLanding }) => {
  const navigate = useNavigate();

  return (
    <section className="flex items-center bg-gradient-to-br from-blue-50 via-white to-purple-50 animate-fadeIn mb-0 p-0 min-h-[50vh]"
      style={{
        backgroundImage: `linear-gradient(to left, var(--brand-color-right), var(--brand-color-left))`,
      }}
    >
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="text-center md:text-left">
          <TextCarousel items={carouselItems} interval={6000} />
          <Button className="h-14 text-lg px-8 py-4 mt-4" onClick={() => navigate('/sign-up')}>
            Get Started
          </Button>
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <img
            src="/lady.webp"
            alt="User using system"
            className="rounded-xl h-full max-w-xs sm:max-w-sm md:max-w-full"
            style={{ height: "90%" }}
          />
        </div>
      </div>
    </section>
  );
};


const ContactSection = () => (
  <section id="contact" className="py-16">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-bold text-center mb-6">Get in Touch</h2>
      <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
        Have questions or want to discuss a project? We'd love to hear from you! Reach out via WhatsApp, email, or visit our office.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <ContactCard 
          icon={<Phone className="w-10 h-10 mx-auto text-green-500 mb-4" />} 
          title="WhatsApp Us" 
          value="+255 717 757 750" 
          link="https://wa.me/255717757750" 
        />
        <ContactCard 
          icon={<Mail className="w-10 h-10 mx-auto text-blue-500 mb-4" />} 
          title="Email Us" 
          value="info@pamtech.co.tz" 
          link="mailto:info@pamtech.co.tz" 
        />
        <ContactCard 
          icon={<MapPin className="w-10 h-10 mx-auto text-red-500 mb-4" />} 
          title="Visit Our Office" 
          value="New Safari Hotel Rd, Arusha 23103" 
          link="https://maps.app.goo.gl/hMhtnx6hnCRkuzm58" 
        />
      </div>
    </div>
  </section>
);

// Feature Card Component
const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, className = '' }) => (
  <div className={`text-center p-6 border rounded-lg hover:shadow-lg transition-all duration-300 ${className}`}>
    <div className="flex justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

// Pricing Card Component
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
      {!isNaN(Number(price)) && <span className="text-4xl font-extrabold"> TZS </span>} 
      <span className="text-4xl font-extrabold">{price}</span> 
      {!isNaN(Number(price)) && <span> /SMS</span>}
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

const ContactCard: React.FC<ContactCardProps> = ({ icon, title, value, link }) => {
  const cardContent = (
    <>
      {icon}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-700">{value}</p>
    </>
  );

  return link ? (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-blue-50 p-6 rounded-lg shadow-sm text-center hover:shadow-md transition hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
      style={{ textDecoration: "none" }}
    >
      {cardContent}
    </a>
  ) : (
    <div className="bg-blue-50 p-6 rounded-lg shadow-sm text-center hover:shadow-md transition">
      {cardContent}
    </div>
  );
};
export const HomePage = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const [activeSection, setActiveSection] = useState<'home' | 'pricing'>('home');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
  document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';
}, [isMobileMenuOpen]);


  const changeSection = (section: 'home' | 'pricing') => {
    if (section === activeSection) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveSection(section);
      setIsTransitioning(false);
    }, 150); // Match this duration with CSS transition
  };

  const scrollToContact = () => {
    const section = document.getElementById("contact");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <div className="flex items-center gap-2 pointer">
          <button onClick={() => changeSection('home')}>
            <img src="/logo.png" alt="Pamtech Logo" className="h-6 md:h-10 lg:h-12 pointer" />
          </button>
        </div>

        {isMobileMenuOpen ? (
        <button
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Close menu"
        >
          <X className="w-6 h-6 text-gray-800" />
        </button>
      ) : (
        <button
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6 text-gray-800" />
        </button>
      )}
          <nav className="space-x-4 items-center hidden md:flex">
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6 text-gray-800" />
          </button>
            <button
              onClick={() => changeSection('home')}
             className={`font-bold text-base sm:text-lg ${activeSection === 'home' ? 'text-blue-600' : 'hover:text-blue-600'}`}
            >
              Home
            </button>
            <button
              onClick={() => changeSection('pricing')}
              className={`font-bold text-base sm:text-lg ${activeSection === 'pricing' ? 'text-blue-600' : 'hover:text-blue-600'}`}
            >
              Pricing
            </button>
            <button
              className="font-bold text-base sm:text-lg hover:text-blue-600"
              onClick={scrollToContact}
            >
              Contact
            </button>
            {isAuthenticated ? (
              <Button
                onClick={() => navigate("/dashboard")}
                className="flex items-center gap-2 text-base sm:text-lg"
              >
                <User className="w-6 h-6" />
                <span className="text-sm sm:text-base">My Account</span>
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button onClick={() => navigate("/sign-in")} className="text-base sm:text-lg">
                  Sign in
                </Button>
                <Button onClick={() => navigate("/sign-up")} className="text-base sm:text-lg">
                  Sign Up
                </Button>
              </div>
            )}
          </nav>
        </div>
      </header>

      <div className={`transition-opacity duration-150 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {activeSection === 'home' ? (
          <>
            <HeroSection carouselItems={carouselTextsLanding} />
            
            <section className="py-16 bg-white">
              <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-12">Why Choose Pamtech Bulk SMS?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  <FeatureCard 
                    icon={<Rocket className="w-10 h-10 mx-auto text-blue-500 mb-4" />} 
                    title="Fast Delivery" 
                    description="Deliver messages instantly to millions of users across Tanzania within seconds." 
                  />
                  <FeatureCard 
                    icon={<Lock className="w-10 h-10 mx-auto text-green-500 mb-4" />} 
                    title="Secure & Reliable" 
                    description="Our platform ensures secure communication and high uptime for critical business use." 
                  />
                  <FeatureCard 
                    icon={<Wallet className="w-10 h-10 mx-auto text-purple-500 mb-4" />} 
                    title="Affordable Pricing" 
                    description="Get the best rates per message with flexible postpaid and prepaid plans." 
                  />
                </div>
              </div>
              <div className="flex items-center justify-center h-64">
                <Button className="h-14 text-lg px-8 py-4" onClick={() => navigate('/sign-up')}>
                  Try it today
                </Button>
              </div>
            </section>

            <section className="bg-gray py-12">
              <h2 className="text-3xl font-bold text-center mb-6">Our Clients</h2>
              <p className="text-center mb-6">Our Clients are our top Priority, and we are commited to providing them with the highest Level of service</p>
              <div className="container mx-auto px-6">
                <div className="overflow-hidden max-w-screen-lg mx-auto">
                  <div className="flex animate-marquee gap-12 whitespace-nowrap w-max">
                    {[...Array(2)].flatMap(() =>
                      customerLogos.map((logo, index) => (
                        <img
                          key={`${logo}-${index}`}
                          src={`/customers/${logo}`}
                          alt={`Customer ${index + 1}`}
                          className="h-12 w-auto object-contain mx-4"
                        />
                      ))
                    )}
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : (
          <>
            <HeroSection carouselItems={carouselTextsPricing} />
            
            <section className="py-16 bg-white">
              <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <PricingCard 
                    title="Individual" 
                    price="16" 
                    description="Perfect for small businesses" 
                    features={[
                      "5,999 SMS Max",
                      "Custom Sender ID",
                      "Daily Report",
                      "Full API Access",
                      "24/7 Support",
                    ]}
                    nonFeatures={["Dedicated Account Manager"]}
                    buttonText="Choose Individual"
                    onClick={() => navigate('/sign-up')}
                  />
                  <PricingCard 
                    title="Community" 
                    price="15" 
                    description="Perfect for growing businesses" 
                    features={[
                      "54,999 SMS Max",
                      "Custom Sender ID",
                      "Daily Report",
                      "Full API Access",
                      "24/7 Support",
                    ]}
                    nonFeatures={["Dedicated Account Manager"]}
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
                      "Custom Sender ID",
                      "Daily Report",
                      "Full API Access",
                      "24/7 Support",
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
                      "Custom Sender ID",
                      "Daily Report",
                      "Full API Access",
                      "24/7 Support",
                      "Dedicated Account Manager"
                    ]}
                    buttonText="Choose Enterprise"
                    onClick={() => navigate('/sign-up')}
                  />
                </div>
              </div>
            </section>
          </>
        )}

        {/* Contact Section (shared between both views) */}
        <div style={{ backgroundImage: `linear-gradient(to left, var(--brand-color-right), var(--brand-color-left))` }}>
          <ContactSection />
        </div>
      </div>

          {/* Mobile Full Screen Menu */}
          <div
            className={`
              fixed top-16 right-0 bottom-0 left-0 z-20 bg-white flex flex-col justify-center items-center
              transform transition-transform duration-300 ease-in-out
              ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
              h-[calc(100vh-64px)]
            `}>
  
            <nav className="flex flex-col space-y-6 text-xl font-semibold">
              <button onClick={() => {
                setIsMobileMenuOpen(false);
                changeSection('home');
              }}>Home</button>
              <button onClick={() => {
                setIsMobileMenuOpen(false);
                changeSection('pricing');
              }}>Pricing</button>
              <button onClick={() => {
                setIsMobileMenuOpen(false);
                scrollToContact();
              }}>Contact</button>
              {isAuthenticated ? (
                <Button onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate('/dashboard');
                }}>My Account</Button>
              ) : (
                <>
                  <Button onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate('/sign-in');
                  }}>Sign In</Button>
                  <Button onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate('/sign-up');
                  }}>Sign Up</Button>
                </>
              )}
            </nav>
          </div>




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
       <Outlet />
    </div>
  );
};


export default HomePage;